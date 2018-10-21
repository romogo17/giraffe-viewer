import React, { Component } from 'react'
import ReactLoading from 'react-loading'
import Alert from 'react-s-alert'
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
import ThumbnailModel from '../../model/ThumbnailModel'
import InstanceModel from '../../model/InstanceModel'
import SeriesItemModal from '../modals/SeriesItemModal'
import ViewDock from '../ViewDock'
import { ViewMode } from '../../utils/Enums'
import {
  ViewSplit,
  InstanceSplit,
  Panel,
  SearchArea,
  SearchInput,
  InputIconSpan,
  ItemContainer,
  CenteredContainer,
  ItemDiv,
  PaginationArea
} from '../ViewUtils'

const WAIT_INTERVAL = 500
const ENTER_KEY = 13

class InstanceView extends Component {
  state = {
    items: [],
    paging: {
      page: 1,
      pageSize: 10
    },
    search: {
      keyword: this.props.match.params.uuid || ''
      // filters: [{ column: 'active', value: true }]
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
    ThumbnailModel.getThumbnails(search, paging)
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
      Alert.success(`${action} study <b>${uuid}</b> was successful.`, {
        timeout: 4000,
        html: true
      })
    else
      Alert.error(`couldn't ${action} study. An error occurred`, {
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
          <SeriesItemModal
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
            <ViewSplit className="instance">
              <ItemList items={items} self={this} />
              <div style={{ flex: '1', backgroundColor: 'red' }}>Hola</div>
            </ViewSplit>
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

export default InstanceView

const ItemList = ({ items, self }) => (
  <ItemContainer className="instance">
    {items.length > 0 ? (
      items.map(item => <Item data={item} key={item.uuid} self={self} />)
    ) : (
      <NoResultsFound />
    )}
  </ItemContainer>
)

const Item = ({
  data: { uuid, series_uuid, thumbnail_uri, created_at },
  data,
  self
}) => (
  <ItemDiv className="instance">
    <div style={{ flex: 3, textAlign: 'center', paddingTop: '25px' }}>
      <img
        width="170px"
        src={thumbnail_uri}
        onClick={() =>
          self.setState({
            isShowingItemModal: true,
            mode: ViewMode.VIEW,
            activeItem: data
          })
        }
      />
      <p className="uuid">{uuid}</p>
    </div>
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
