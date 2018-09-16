import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import './styles/App.css'

import Dock from './components/Dock'
import ProtectedRoute from './components/ProtectedRoute'
import Settings from './components/Settings'

// const settings = window.require('electron-settings')

const Patient = () => <div>Patient</div>

const Study = () => <div>Study</div>

const Series = () => <div>Series</div>

const Instance = () => <div>Instance</div>

const Region = () => <div>Region</div>

class App extends Component {
  state = {
    //connParameters: settings.get('conn-parameters') || null
  }

  render() {
    //const { connParameters } = this.state
    return (
      <AppWrap className="app">
        <Titlebar>Giraffe Viewer</Titlebar>

        <Split>
          <Dock />

          <Switch>
            <Route exact path="/" render={() => <Redirect to="/patient" />} />
            <ProtectedRoute path="/patient" component={Patient} />
            <ProtectedRoute path="/study" component={Study} />
            <ProtectedRoute path="/series" component={Series} />
            <ProtectedRoute path="/instance" component={Instance} />
            <ProtectedRoute path="/region" component={Region} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </Split>
      </AppWrap>
    )
  }
}

export default App

const AppWrap = styled.div`
  margin-top: 22px;
`

const Split = styled.div`
  display: flex;
  height: calc(100vh - 22px);
  align-items: stretch;
`

const Titlebar = styled.div`
  height: 22px;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  text-align: center;
  vertical-align: middle;
  background-color: rgb(25, 30, 35);
  color: #717171;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  line-height: 22px;
  font-size: 12px;
  z-index: 10;
  -webkit-app-region: drag;
  user-select: none;
`
