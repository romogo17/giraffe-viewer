import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import '../styles/Dock.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUsers,
  faFileInvoice,
  faCopy,
  faImage,
  faTable,
  faCog
} from '@fortawesome/free-solid-svg-icons'

const routes = [
  { title: 'patient', icon: faUsers, route: '/patient' },
  { title: 'study', icon: faFileInvoice, route: '/study' },
  { title: 'series', icon: faCopy, route: '/series' },
  { title: 'instance', icon: faImage, route: '/instance' },
  { title: 'region', icon: faTable, route: '/region' },
  { title: 'settings', icon: faCog, route: '/settings' }
]

class Dock extends Component {
  render() {
    return (
      <Div>
        <BrandButton />
        {routes.map((r, index) => (
          <NavLink to={r.route} key={r.title}>
            <MenuButton key={r.title} title={r.title}>
              <FontAwesomeIcon icon={r.icon} size="2x" key={r.title} />
            </MenuButton>
          </NavLink>
        ))}
      </Div>
    )
  }
}

export default Dock

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
    border-left: solid 4px #82d8d8;
  }
`

const BrandButton = styled.button`
  width: 100%;
  height: 50px;

  background: #0f1419;
  background-image: url('./unapacs.png');
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center center;
  /* opacity: 0.2; */
  color: white;
  outline: 0;

  border: none;
  border-bottom: solid 1px #4e5966;
  text-align: center;
`
