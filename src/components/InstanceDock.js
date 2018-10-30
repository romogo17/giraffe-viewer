import React, { Component } from 'react'
import styled from 'styled-components'
import '../styles/Dock.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisH,
  faEllipsisV,
  faRedo,
  faUndo,
  faAdjust,
  faShapes,
  faList
} from '@fortawesome/free-solid-svg-icons'

const vFlip = {
  title: 'Vertical Flip',
  icon: faEllipsisV,
  handler: () => console.log('Not implemented handler for add option')
}

const hFlip = {
  title: 'Horizontal Flip',
  icon: faEllipsisH,
  handler: () => console.log('Not implemented handler for filter option')
}

const lRotate = {
  title: 'Left Rotate',
  icon: faUndo,
  handler: () => console.log('Not implemented handler for filter option')
}

const rRotate = {
  title: 'Right Rotate',
  icon: faRedo,
  handler: () => console.log('Not implemented handler for filter option')
}

const invert = {
  title: 'Invert',
  icon: faAdjust,
  handler: () => console.log('Not implemented handler for filter option')
}

const regions = {
  title: 'Regions',
  icon: faShapes,
  handler: () => console.log('Not implemented handler for filter option')
}

const list = {
  title: 'List of Objects',
  icon: faList,
  handler: () => console.log('Not implemented handler for filter option')
}

class ViewDock extends Component {
  render() {
    return (
      <Div>
        <MenuButton
          key={vFlip.title}
          title={vFlip.title}
          onClick={this.props.onVFlipHandler || vFlip.handler}
        >
          <FontAwesomeIcon icon={vFlip.icon} size="2x" />
        </MenuButton>
        <MenuButton
          key={hFlip.title}
          title={hFlip.title}
          onClick={this.props.onHFlipHandler || hFlip.handler}
        >
          <FontAwesomeIcon icon={hFlip.icon} size="2x" />
        </MenuButton>
        <MenuButton
          key={lRotate.title}
          title={lRotate.title}
          onClick={this.props.onLRotateHandler || lRotate.handler}
        >
          <FontAwesomeIcon icon={lRotate.icon} size="2x" />
        </MenuButton>
        <MenuButton
          key={rRotate.title}
          title={rRotate.title}
          onClick={this.props.onRRotateHandler || rRotate.handler}
        >
          <FontAwesomeIcon icon={rRotate.icon} size="2x" />
        </MenuButton>
        <MenuButton
          key={invert.title}
          title={invert.title}
          onClick={this.props.onInvertHandler || invert.handler}
        >
          <FontAwesomeIcon icon={invert.icon} size="2x" />
        </MenuButton>
        <MenuButton
          key={regions.title}
          title={regions.title}
          onClick={this.props.onRegionsHandler || regions.handler}
        >
          <FontAwesomeIcon icon={regions.icon} size="2x" />
        </MenuButton>
        <MenuButton
          key={list.title}
          title={list.title}
          onClick={this.props.onListHandler || list.handler}
        >
          <FontAwesomeIcon icon={list.icon} size="2x" />
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
