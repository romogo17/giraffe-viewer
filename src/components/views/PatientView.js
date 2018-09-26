import React, { Component } from 'react'
import ReactLoading from 'react-loading'
import Alert from 'react-s-alert'
import differenceInYears from 'date-fns/difference_in_years'
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
import PatientItemModal from '../modals/PatientItemModal'
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

const WAIT_INTERVAL = 500
const ENTER_KEY = 13

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

  itemModalCallback = ({ action, uuid, success }) => {
    this.setState({
      isShowingItemModal: false,
      mode: ViewMode.VIEW,
      activeItem: {}
    })
    if (success)
      Alert.success(`${action} patient <b>${uuid}</b> was successful.`, {
        timeout: 4000,
        html: true
      })
    else
      Alert.error(`couldn't ${action} patient. An error occurred`, {
        timeout: 4000
      })
    this.search()
  }

  render() {
    const {
      items,
      search,
      loading,
      paging,
      isShowingItemModal,
      mode,
      activeItem
    } = this.state
    return (
      <ViewSplit>
        {isShowingItemModal && (
          <PatientItemModal
            item={activeItem}
            showing={isShowingItemModal}
            mode={mode}
            onModalClose={() =>
              this.setState({
                isShowingItemModal: false,
                mode: ViewMode.VIEW,
                activeItem: {}
              })
            }
            callback={this.itemModalCallback}
          />
        )}
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
          {loading ? (
            <LoadingIndicator />
          ) : (
            <ItemList items={items} self={this} />
          )}
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
            this.setState({
              isShowingItemModal: true,
              mode: ViewMode.ADD,
              activeItem: {}
            })
          }
          onFilterClick={() => this.setState({ isShowingFilterModal: true })}
        />
      </ViewSplit>
    )
  }
}

export default PatientView

const ItemList = ({ items, self }) => (
  <ItemContainer>
    {items.length > 0 ? (
      items.map(item => <Item data={item} key={item.uuid} self={self} />)
    ) : (
      <NoResultsFound />
    )}
  </ItemContainer>
)

const Item = ({
  data: { uuid, given_name, family_name, sex, birthdate, address },
  data,
  self
}) => (
  <ItemDiv>
    <div style={{ flex: 3 }}>
      <h2
        onClick={() =>
          self.setState({
            isShowingItemModal: true,
            mode: ViewMode.VIEW,
            activeItem: data
          })
        }
      >
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
