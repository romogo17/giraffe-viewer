import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

const settings = window.require('electron-settings')

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props
    const connParameters = settings.get('conn-parameters', null)
    if (!connParameters) {
      const notification = {
        title: 'Action Required',
        body:
          'You must configure the database connection parameters to access this page',
        silent: false
      }
      new window.Notification(notification.title, notification)
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
