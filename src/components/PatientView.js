import React, { Component } from 'react'
import ReactLoading from 'react-loading'
import Alert from 'react-s-alert'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import PatientModel from '../model/PatientModel'
import {
  ViewSplit,
  Panel,
  SearchArea,
  SearchInput,
  InputIconSpan,
  ItemContainer,
  LoadingContainer
} from './ViewUtils'

class Patient extends Component {
  state = {
    items: [],
    paging: {
      page: 1,
      itemsByPage: 7
    },
    search: {
      keyword: '',
      filters: [{ column: 'active', value: true }]
    },
    loading: false
  }

  search() {
    const { search, paging } = this.state
    this.setState({ loading: true })
    PatientModel.getPatients(search, paging)
      .then(result => this.setState({ items: result, loading: false }))
      .catch(err => this.alertModelError(err))
  }

  onSearchChange = e => {
    const { search } = this.state
    this.setState({
      search: { keyword: e.target.value, filters: search.filters }
    })
    this.search()
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
              onChange={this.onSearchChange}
            />
            <InputIconSpan>
              <FontAwesomeIcon icon={faSearch} />
            </InputIconSpan>
          </SearchArea>
          {loading ? (
            <LoadingContainer>
              <ReactLoading type="spin" color="white" />
              Loading...
            </LoadingContainer>
          ) : (
            <ItemContainer>
              {items.map(item => (
                <Item data={item} key={item.uuid} />
              ))}
            </ItemContainer>
          )}
          <PaginationArea>Pagination Here</PaginationArea>
        </Panel>
        <Div>P Dock</Div>
      </ViewSplit>
    )
  }
}

export default Patient

const Item = ({ data: { uuid, given_name, family_name, sex, birthdate } }) => (
  <div>
    <h1>{uuid}</h1>
    <h2>{given_name}</h2>
  </div>
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
