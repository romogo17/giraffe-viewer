import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import PatientModel from '../../model/PatientModel'
import { ViewMode } from '../../utils/Enums'
import Modal from 'react-modal'
import { ModalSplit } from '../ViewUtils'
import parse from 'date-fns/parse'
import isValid from 'date-fns/is_valid'

const customStyles = {
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '0.7rem',
    background: '#191e23',
    border: '1px solid #82d8d8'
  }
}

const nameRegex = /^[a-z ,.'-]+$/i
// eslint-disable-next-line
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class PatientItemModal extends Component {
  state = {
    item:
      Object.keys(this.props.item).length !== 0
        ? {
            ...this.props.item,
            birthdate: format(this.props.item.birthdate, 'YYYY-MM-DD')
          }
        : PatientModel.emptyPatient()
  }

  componentDidMount() {}

  updateParameters = param => {
    const { item } = this.state
    this.setState({
      item: { ...item, ...param }
    })
  }

  sexToNum = sex =>
    sex === 'Male'
      ? 1
      : sex === 'Female'
        ? 2
        : sex === 'Not known'
          ? 0
          : sex === 'Not applicable'
            ? 9
            : sex

  numToSex = num =>
    num === 1
      ? 'Male'
      : num === 2
        ? 'Female'
        : num === 0
          ? 'Not known'
          : num === 9
            ? 'Not applicable'
            : num

  validate = item => {
    return {
      given_name: !nameRegex.test(item.given_name),
      family_name: !nameRegex.test(item.family_name),
      email: !emailRegex.test(item.email),
      country: !nameRegex.test(item.address.country),
      state: !nameRegex.test(item.address.state),
      city: !nameRegex.test(item.address.city),
      sex: typeof item.sex !== 'number' || ![0, 1, 2, 9].includes(item.sex),
      birthdate: !isValid(parse(item.birthdate))
    }
  }

  submitItem = e => {
    e.preventDefault()
    const { item } = this.state
    const { mode, callback } = this.props

    // parse the birthdate from string to Date
    const patient = { ...item, birthdate: parse(item.birthdate) }

    if (mode === ViewMode.ADD)
      PatientModel.insertPatient(patient)
        .then(result =>
          callback({ success: true, action: 'insert', uuid: result })
        )
        .catch(err => callback({ success: false, action: 'insert' }))
    else
      PatientModel.updatePatient({ ...patient, updated_at: new Date() })
        .then(result =>
          callback({ success: true, action: 'update', uuid: result })
        )
        .catch(err => callback({ success: false, action: 'update' }))
  }

  render() {
    const { item } = this.state
    const errors = this.validate(item)
    const { showing, onModalClose, mode } = this.props
    const isEnabled = !Object.keys(errors).some(x => errors[x])

    return (
      <Modal
        isOpen={showing}
        onRequestClose={onModalClose}
        style={customStyles}
        contentLabel="Item Modal"
      >
        {mode === ViewMode.ADD ? (
          <h2>New patient:</h2>
        ) : (
          <React.Fragment>
            <h2>Patient:</h2>
            <p className="uuid">{item.uuid}</p>
          </React.Fragment>
        )}
        <form onSubmit={this.submitItem}>
          <ModalSplit>
            <div className="floating-label">
              <input
                placeholder="Given name"
                type="text"
                autoComplete="off"
                value={item.given_name}
                className={errors.given_name ? 'input-error' : ''}
                onChange={e =>
                  this.updateParameters({ given_name: e.target.value })
                }
              />
              <label>Given name:</label>
            </div>
            <div className="floating-label">
              <input
                placeholder="Family name"
                type="text"
                autoComplete="off"
                value={item.family_name}
                className={errors.family_name ? 'input-error' : ''}
                onChange={e =>
                  this.updateParameters({ family_name: e.target.value })
                }
              />
              <label>Family name:</label>
            </div>
            <div className="floating-label">
              <input
                placeholder="Email"
                type="text"
                autoComplete="off"
                value={item.email}
                className={errors.email ? 'input-error' : ''}
                onChange={e => this.updateParameters({ email: e.target.value })}
              />
              <label>Email:</label>
            </div>
          </ModalSplit>
          <ModalSplit>
            <div className="floating-label">
              <input
                placeholder="Country"
                type="text"
                autoComplete="off"
                value={item.address.country}
                className={errors.country ? 'input-error' : ''}
                onChange={e =>
                  this.updateParameters({
                    address: { ...item.address, country: e.target.value }
                  })
                }
              />
              <label>Country:</label>
            </div>
            <div className="floating-label">
              <input
                placeholder="State"
                type="text"
                autoComplete="off"
                value={item.address.state}
                className={errors.state ? 'input-error' : ''}
                onChange={e =>
                  this.updateParameters({
                    address: { ...item.address, state: e.target.value }
                  })
                }
              />
              <label>State:</label>
            </div>
            <div className="floating-label">
              <input
                placeholder="City"
                type="text"
                autoComplete="off"
                value={item.address.city}
                className={errors.city ? 'input-error' : ''}
                onChange={e =>
                  this.updateParameters({
                    address: { ...item.address, city: e.target.value }
                  })
                }
              />
              <label>City:</label>
            </div>
          </ModalSplit>
          <ModalSplit>
            <div className="floating-label">
              <input
                placeholder="Sex"
                type="text"
                autoComplete="off"
                value={this.numToSex(item.sex)}
                className={errors.sex ? 'input-error' : ''}
                onChange={e =>
                  this.updateParameters({ sex: this.sexToNum(e.target.value) })
                }
              />
              <label>Sex:</label>
            </div>
            <div className="floating-label">
              <input
                placeholder="Birthdate"
                type="text"
                autoComplete="off"
                value={item.birthdate}
                className={errors.birthdate ? 'input-error' : ''}
                onChange={e =>
                  this.updateParameters({
                    birthdate: e.target.value
                  })
                }
              />
              <label>Birthdate:</label>
            </div>
          </ModalSplit>

          {mode === ViewMode.VIEW && (
            <React.Fragment>
              <p className="metadata-datetime" style={{ marginTop: '1rem' }}>
                Created at {format(item.created_at, 'YYYY-MM-DD HH:mm:ss')}
              </p>
              <p className="metadata-datetime">
                Updated at {format(item.updated_at, 'YYYY-MM-DD HH:mm:ss')}
              </p>
            </React.Fragment>
          )}
          <ModalSplit>
            <input
              type="submit"
              value={mode === ViewMode.VIEW ? 'Update' : 'Save'}
              style={{ flex: 1, padding: '10px 10px 10px 5px' }}
              disabled={!isEnabled}
            />
            {mode === ViewMode.VIEW && (
              <Link
                to={{
                  pathname: `/study/${item.uuid}`
                }}
                className="see-studies"
                style={{ flex: 2 }}
              >
                See studies
              </Link>
            )}
          </ModalSplit>
        </form>
      </Modal>
    )
  }
}

export default PatientItemModal
