import React, { Component } from 'react'
import '../styles/Settings.css'
import Alert from 'react-s-alert'

const settings = window.require('electron-settings')
const { Pool } = window.require('pg')

class SettingsView extends Component {
  state = {
    connParameters: settings.get('conn-parameters') || {
      user: '',
      host: '',
      database: '',
      password: '',
      port: ''
    }
  }

  updateParameters = param => {
    const { connParameters } = this.state
    this.setState({
      connParameters: { ...connParameters, ...param }
    })
  }

  deleteParameters = () => {
    settings.delete('conn-parameters')
    this.setState({
      connParameters: {
        user: '',
        host: '',
        database: '',
        password: '',
        port: ''
      }
    })
  }

  redirectToHome = () => {
    const { history } = this.props
    history.push('/')
  }

  testConnection = () => {
    const { connParameters } = this.state
    const pool = new Pool(connParameters)
    pool.query(
      `SELECT table_name AS tables
      FROM information_schema.tables
      WHERE table_schema = 'med_img'`,
      (err, res) => {
        // if there's an error
        if (err) Alert.error(err.message)
        else {
          const tables = res.rows
            .map(e => e.tables)
            .sort()
            .join(',')
          // if the database has the required tables
          if (tables === 'instance,patient,region,series,study') {
            Alert.success(
              'connection with the medical imaging database successful',
              {
                onClose: this.redirectToHome
              }
            )
            settings.set('conn-parameters', connParameters)
            // if the database is not valid
          } else Alert.error('the database does not have the correct schema')
        }
        pool.end()
      }
    )
  }

  render() {
    const { connParameters } = this.state
    return (
      <div className="container">
        <h2>Database Connection Parameters</h2>
        <form
          onSubmit={e => {
            e.preventDefault()
            this.testConnection()
          }}
        >
          <input
            type="text"
            placeholder="User"
            value={connParameters.user}
            onChange={e => this.updateParameters({ user: e.target.value })}
          />
          <input
            type="text"
            placeholder="Host"
            value={connParameters.host}
            onChange={e => this.updateParameters({ host: e.target.value })}
          />
          <input
            type="text"
            placeholder="Database"
            value={connParameters.database}
            onChange={e => this.updateParameters({ database: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={connParameters.password}
            onChange={e => this.updateParameters({ password: e.target.value })}
          />
          <input
            type="text"
            placeholder="Port"
            value={connParameters.port}
            onChange={e => this.updateParameters({ port: e.target.value })}
          />
          <input type="submit" value="Save" />
        </form>
        <input
          type="button"
          value="Delete Settings"
          onClick={this.deleteParameters}
        />
      </div>
    )
  }
}

export default SettingsView
