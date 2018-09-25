import React, { Component } from 'react'
import styled from 'styled-components'
import '../styles/Dock.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilter } from '@fortawesome/free-solid-svg-icons'

const add = {
  title: 'add',
  icon: faPlus,
  handler: () => console.log('Not implemented handler for add option')
}

const filter = {
  title: 'filter',
  icon: faFilter,
  handler: () => console.log('Not implemented handler for filter option')
}

class ViewDock extends Component {
  render() {
    return (
      <Div>
        <MenuButton
          key={add.title}
          title={add.title}
          onClick={this.props.onAddClick || add.handler}
        >
          <FontAwesomeIcon icon={add.icon} size="2x" />
        </MenuButton>
        <MenuButton
          key={filter.title}
          title={filter.title}
          onClick={this.props.onFilterClick || filter.handler}
        >
          <FontAwesomeIcon icon={filter.icon} size="2x" />
        </MenuButton>
      </Div>
    )
  }
}

export default ViewDock

const Div = styled.div`
  width: 50px;
  height: 100%;
  background-color: #0f1419
  text-align: center;
`

const MenuButton = styled.button`
  width: 100%;
  height: 50px;

  background: #0f1419;
  opacity: 0.2;
  color: white;
  outline: 0;

  border: none;
  border-bottom: solid 1px #4e5966;
  text-align: center;

  transition: 0.3s ease all;
  &:hover {
    opacity: 1;
    border-right: solid 4px #82d8d8;
  }
`
