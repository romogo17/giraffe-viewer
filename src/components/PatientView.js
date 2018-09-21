import React, { Component } from 'react'
import ReactLoading from 'react-loading'
import Alert from 'react-s-alert'
import styled from 'styled-components'
import differenceInYears from 'date-fns/difference_in_years'
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
  Meta
} from './ViewUtils'

const WAIT_INTERVAL = 500
const ENTER_KEY = 13

class Patient extends Component {
  state = {
    items: [],
    paging: {
      page: 1,
      pageSize: 7
    },
    search: {
      keyword: '',
      filters: [{ column: 'active', value: true }]
    },
    loading: false
  }
  timer = null

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

  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      clearTimeout(this.timer)
      this.search()
    }
  }

  componentDidMount = () => this.search()

  alertModelError({ code, routine, hint, ...rest }) {
    Alert.error(`<b>${code}: ${routine}.</b> ${hint}`, {
      timeout: 4000,
      html: true
    })
    console.error({ code, routine, hint, ...rest })
  }

  render() {
    const { items, search, loading } = this.state
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
          <PaginationArea>Pagination Here</PaginationArea>
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
  padding: 0;
  height: 50px;
`

const Div = styled.div`
  background-color: #0f1419;
  width: 50px;
`
