import React, { Component } from 'react'
import ReactLoading from 'react-loading'
import Alert from 'react-s-alert'
import styled from 'styled-components'
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
import PatientModel from '../model/PatientModel'
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
  PaginationStyle
} from './ViewUtils'

const WAIT_INTERVAL = 500
const ENTER_KEY = 13

class Patient extends Component {
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
    loading: false
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
    const { paging } = this.state
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
        <Div>P Dock</Div>
      </ViewSplit>
    )
  }
}

export default Patient

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

const PaginationArea = styled.div`
  margin: 0;
  margin-left: 2rem;
  padding: 0;
  height: 50px;

  & ul {
    margin-top: 12;
    margin-bottom: 0;
  }

  .rc-pagination * {
    outline: none;
  }

  .rc-pagination-item {
    background-color: #191e23;
    border-color: #4e5966;
  }

  .rc-pagination-item a {
    color: #4e5966;
  }

  .rc-pagination-item:hover,
  .rc-pagination-item:hover a {
    border-color: #82d8d8;
    color: white;
  }

  .rc-pagination-item-active {
    background-color: #191e23;
    border-color: #82d8d8;
  }

  .rc-pagination-item-active a {
    color: white;
  }

  .rc-pagination-prev,
  .rc-pagination-next,
  .rc-pagination-prev a,
  .rc-pagination-next a {
    border: none;
    color: #4e5966;
  }

  .rc-pagination-jump-prev:after,
  .rc-pagination-jump-next:after {
    color: #4e5966;
  }

  .rc-pagination-jump-prev:hover:after,
  .rc-pagination-jump-next:hover:after {
    color: #82d8d8;
  }

  .rc-select-dropdown {
    background-color: #191e23;
    border-color: #4e5966;
    box-shadow: 0 0px 4px black;
  }

  li.rc-select-dropdown-menu-item {
    color: #4e5966;
  }

  li.rc-select-dropdown-menu-item-selected {
    color: white;
    background-color: #191e23;
  }

  li.rc-select-dropdown-menu-item:hover {
    color: white;
    background-color: #191e23;
  }

  .rc-select-selection {
    background-color: #191e23;
    border-color: #4e5966;
    color: #4e5966;
  }

  .rc-select-focused .rc-select-selection,
  .rc-select-enabled .rc-select-selection:hover,
  .rc-select-open .rc-select-selection {
    border-color: #82d8d8;
  }

  .rc-select-arrow b {
    border-color: #4e5966 transparent transparent transparent;
  }

  .rc-pagination-options {
    color: #4e5966;
  }

  .rc-pagination-options input[type='text'] {
    background-color: #191e23;
    border-color: #4e5966;
    color: white;
  }
`

const Div = styled.div`
  background-color: #0f1419;
  width: 50px;
`
