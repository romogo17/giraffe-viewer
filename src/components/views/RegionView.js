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
import RegionModel from '../../model/RegionModel'
// import SeriesItemModal from '../modals/SeriesItemModal'
// import ViewDock from '../ViewDock'
// import { ViewMode } from '../../utils/Enums'
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

class RegionView extends Component {
  state = {
    items: [],
    paging: {
      page: 1,
      pageSize: 10
    },
    search: {
      keyword: this.props.match.params.uuid || '',
      filters: [{ column: 'active', value: true }]
    },
    loading: false,
    // isShowingItemModal: false,
    // isShowingFilterModal: false,
    activeItem: {}
    // mode: ViewMode.VIEW
  }
  timer = null

  componentDidMount = () => this.search()

  search = () => {
    const { search, paging } = this.state
    this.setState({ loading: true })
    RegionModel.getRegions(search, paging)
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

  // itemModalCallback = ({ action, uuid, success }) => {
  //   this.setState({
  //     isShowingItemModal: false,
  //     mode: ViewMode.VIEW,
  //     activeItem: {}
  //   })
  //   if (success)
  //     Alert.success(`${action} study <b>${uuid}</b> was successful.`, {
  //       timeout: 4000,
  //       html: true
  //     })
  //   else
  //     Alert.error(`couldn't ${action} study. An error occurred`, {
  //       timeout: 4000
  //     })
  //   this.search()
  // }

  render() {
    const {
      items,
      search,
      loading,
      paging
      // isShowingItemModal,
      // mode,
      // activeItem
    } = this.state
    return (
      <ViewSplit>
        {/* {isShowingItemModal && (
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
        )} */}
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
        {/* <ViewDock
          onAddClick={() =>
            this.setState({
              isShowingItemModal: true,
              mode: ViewMode.ADD,
              activeItem: {}
            })
          }
          onFilterClick={() => this.setState({ isShowingFilterModal: true })}
        /> */}
      </ViewSplit>
    )
  }
}

export default RegionView

const ItemList = ({ items, self }) => (
  <ItemContainer>
    {items.length > 0 ? (
      items.map((item, index) => <Item data={item} key={index} self={self} />)
    ) : (
      <NoResultsFound />
    )}
  </ItemContainer>
)

const Item = ({
  data: {
    instance_uuid,
    method,
    props,
    category,
    created_at,
    label,
    area,
    centroid,
    perimeter,
    solidity,
    eccentricity,
    convex_area,
    circularity,
    orientation,
    bbox
  },
  data,
  self
}) => (
  <ItemDiv>
    <div style={{ flex: 3 }}>
      <h2>
        {method} {`( label ${label} )`}
      </h2>
      <p className="uuid">Instance: {instance_uuid}</p>
    </div>
    <Meta className="narrow" color="#add1d1" flex="1">
      <div>Area:</div> <div>{area}</div>
    </Meta>
    <Meta className="narrow" color="#adb4d1" flex="1">
      <div>Perimeter:</div> <div>{Math.round(perimeter)}</div>
    </Meta>
    <Meta className="narrow" color="#d1add0" flex="1">
      <div>Solity:</div> <div>{solidity.toFixed(4)}</div>
    </Meta>
    <Meta className="narrow" color="#add1d1" flex="1">
      <div>Centroid:</div>
      <div>
        ({Math.round(centroid[0])}, {Math.round(centroid[1])})
      </div>
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
