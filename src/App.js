import React, { Component } from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'
import Alert from 'react-s-alert'

import './styles/App.css'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/flip.css'

import Dock from './components/Dock'
import Patient from './components/Patient'
import ProtectedRoute from './components/ProtectedRoute'
import Settings from './components/Settings'

// const settings = window.require('electron-settings')

const Study = ({ match }) => <div>Study {match.params.uuid}</div>

const Series = props => (
  <div>
    Series{' '}
    <Link
      to={{
        pathname: '/study/13'
      }}
    >
      GOTO Study 13
    </Link>
  </div>
)

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
          <Routes />
        </Split>
        <Alert
          stack={{ limit: 3 }}
          position="top-right"
          effect="flip"
          offset={20}
          timeout={1500}
        />
      </AppWrap>
    )
  }
}

export default App

const Routes = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/patient" />} />
    <ProtectedRoute path="/patient" component={Patient} title="Patient" />
    <ProtectedRoute path="/study/:uuid?" component={Study} title="Study" />
    <ProtectedRoute path="/series" component={Series} title="Series" />
    <ProtectedRoute path="/instance" component={Instance} title="Instance" />
    <ProtectedRoute path="/region" component={Region} title="Region" />
    <Route path="/settings" component={Settings} />
  </Switch>
)

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
