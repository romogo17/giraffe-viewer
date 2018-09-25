import React, { Component } from 'react'
import ReactLoading from 'react-loading'
import Alert from 'react-s-alert'
import differenceInYears from 'date-fns/difference_in_years'
import Modal from 'react-modal'
import Select from 'rc-select'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import 'rc-select/assets/index.css'
import localeInfo from 'rc-pagination/lib/locale/en_US'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faTimes,
  faBinoculars
} from '@fortawesome/free-solid-svg-icons'
import PatientModel from '../../model/PatientModel'
import ViewDock from '../ViewDock'
import { ViewMode } from '../../utils/Enums'
import {
  ViewSplit,
  Panel,
  SearchArea,
  SearchInput,
  InputIconSpan,
  ItemContainer,
  CenteredContainer,
  ItemDiv,
  Meta,
  PaginationArea
} from '../ViewUtils'

import styled from 'styled-components'

const WAIT_INTERVAL = 500
const ENTER_KEY = 13

const customStyles = {
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '0.7rem',
    background: '#191e23',
    border: '1px solid #82d8d8'
  }
}

class PatientView extends Component {
  state = {
    items: [],
    paging: {
      page: 1,
      pageSize: 10
    },
    search: {
      keyword: '',
      filters: [{ column: 'active', value: true }]
    },
    loading: false,
    isShowingItemModal: false,
    isShowingFilterModal: false,
    activeItem: {},
    mode: ViewMode.VIEW
  }
  timer = null

  componentDidMount = () => this.search()

  search = () => {
    const { search, paging } = this.state
    this.setState({ loading: true })
    PatientModel.getPatients(search, paging)
      .then(result => this.setState({ items: result, loading: false }))
      .catch(err => this.alertModelError(err))
  }

  handleSearchChange = e => {
    clearTimeout(this.timer)
    const { search } = this.state
    this.setState({
      search: { keyword: e.target.value, filters: search.filters },
      loading: true
    })
    this.timer = setTimeout(this.search, WAIT_INTERVAL)
  }

  handleSearchClick = e => {
    const { search } = this.state
    if (search.keyword !== '') {
      this.setState(
        {
          search: { keyword: '', filters: search.filters },
          loading: true
        },
        this.search
      )
    }
  }

  onPagingChange = (current, size) => {
    this.setState(
      {
        paging: {
          page: current,
          pageSize: size
        },
        loading: true
      },
      this.search
    )
  }

  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      clearTimeout(this.timer)
      this.search()
    }
  }

  alertModelError({ code, routine, hint, ...rest }) {
    Alert.error(`<b>${code}: ${routine}.</b> ${hint}`, {
      timeout: 4000,
      html: true
    })
    console.error({ code, routine, hint, ...rest })
  }

  render() {
    const { items, search, loading, paging } = this.state
    return (
      <ViewSplit>
        <Modal
          isOpen={this.state.isShowingItemModal}
          onRequestClose={() =>
            this.setState({ isShowingItemModal: false, mode: ViewMode.VIEW })
          }
          style={customStyles}
          contentLabel="Item Modal"
        >
          {this.state.mode === ViewMode.ADD ? (
            <h2>New patient:</h2>
          ) : (
            <React.Fragment>
              <h2>Patient:</h2>
              <p className="uuid">sdfvjsfdjov-34r234f34-23d2ef4</p>
            </React.Fragment>
          )}

          <ModalSplit>
            <div className="floating-label">
              <input placeholder="Given name" type="text" autoComplete="off" />
              <label>Given name:</label>
            </div>
            <div className="floating-label">
              <input placeholder="Family name" type="text" autoComplete="off" />
              <label>Family name:</label>
            </div>
            <div className="floating-label">
              <input placeholder="Email" type="text" autoComplete="off" />
              <label>Email:</label>
            </div>
          </ModalSplit>
          <ModalSplit>
            <div className="floating-label">
              <input placeholder="Country" type="text" autoComplete="off" />
              <label>Country:</label>
            </div>
            <div className="floating-label">
              <input placeholder="State" type="text" autoComplete="off" />
              <label>State:</label>
            </div>
            <div className="floating-label">
              <input placeholder="City" type="text" autoComplete="off" />
              <label>City:</label>
            </div>
          </ModalSplit>
        </Modal>
        <Panel>
          <SearchArea>
            <SearchInput
              type="text"
              placeholder="Search..."
              value={search.keyword}
              onChange={this.handleSearchChange}
              onKeyDown={this.handleKeyDown}
            />
            <InputIconSpan onClick={this.handleSearchClick}>
              <FontAwesomeIcon
                icon={search.keyword === '' ? faSearch : faTimes}
              />
            </InputIconSpan>
          </SearchArea>
          {loading ? <LoadingIndicator /> : <ItemList items={items} />}
          <PaginationArea>
            <Pagination
              selectComponentClass={Select}
              showQuickJumper
              showSizeChanger
              defaultPageSize={paging.pageSize}
              defaultCurrent={paging.page}
              onShowSizeChange={this.onPagingChange}
              onChange={this.onPagingChange}
              total={200}
              locale={localeInfo}
            />
          </PaginationArea>
        </Panel>
        <ViewDock
          onAddClick={() =>
            this.setState({ isShowingItemModal: true, mode: ViewMode.ADD })
          }
          onFilterClick={() => this.setState({ isShowingFilterModal: true })}
        />
      </ViewSplit>
    )
  }
}

export default PatientView

const ModalSplit = styled.div`
  display: flex;
  /* height: calc(100vh - 22px); */
  /* align-items: center; */
`

const ItemList = ({ items }) => (
  <ItemContainer>
    {items.length > 0 ? (
      items.map(item => <Item data={item} key={item.uuid} />)
    ) : (
      <NoResultsFound />
    )}
  </ItemContainer>
)

const Item = ({
  data: { uuid, given_name, family_name, sex, birthdate, address }
}) => (
  <ItemDiv>
    <div style={{ flex: 3 }}>
      <h2>
        {given_name} {family_name}
      </h2>
      <p className="uuid">{uuid}</p>
    </div>
    <Meta color="#add1d1" flex="1">
      {differenceInYears(new Date(), birthdate)} years
    </Meta>
    <Meta
      color={sex === 1 ? '#adb4d1' : sex === 2 ? '#d1add0' : '#4e5966'}
      flex="1"
    >
      {sex === 0
        ? 'Not known'
        : sex === 1
          ? 'Male'
          : sex === 2
            ? 'Female'
            : 'N/A'}
    </Meta>
    <Meta color="#add1d1" flex="2">
      <div>{address.country}</div>
      <div>{address.city}</div>
    </Meta>
  </ItemDiv>
)

const NoResultsFound = () => (
  <CenteredContainer>
    <FontAwesomeIcon
      icon={faBinoculars}
      size="4x"
      style={{ color: '#82d8d8' }}
    />
    <h1>No results found</h1>
  </CenteredContainer>
)

const LoadingIndicator = () => (
  <CenteredContainer>
    <ReactLoading type="spin" color="white" />
    <p>Loading...</p>
  </CenteredContainer>
)
