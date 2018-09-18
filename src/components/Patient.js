import React, { Component } from 'react'
import styled from 'styled-components'
import PatientModel from '../model/PatientModel'

class Patient extends Component {
  state = {
    items: [],
    page: 1,
    itemsByPage: 7
  }

  componentDidMount() {
    PatientModel.getAllPatients()
      .then(result => this.setState({ items: result }))
      .catch(err => console.error(err))
  }
  render() {
    const { items } = this.state
    return (
      <div>
        <h1>Patients page</h1>
        {items.map(item => (
          <div key={item.uuid}>
            UUID: {item.uuid}, Name: {item.given_name}, Sex {item.sex}
          </div>
        ))}
      </div>
    )
  }
}

export default Patient
