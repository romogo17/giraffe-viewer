import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Alert from 'react-s-alert'

const settings = window.require('electron-settings')

class ProtectedRoute extends Component {
  render() {
    const { component: Component, title, ...props } = this.props
    const connParameters = settings.get('conn-parameters', null)
    if (!connParameters) {
      Alert.warning(
        'configure the database connection parameters to access this page'
      )
    }
    return (
      <Route
        {...props}
        render={props =>
          connParameters ? (
            <Component {...props} />
          ) : (
            <Redirect to="/settings" />
          )
        }
      />
    )
  }
}

export default ProtectedRoute
