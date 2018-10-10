import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import StudyModel from '../../model/StudyModel'
import PatientModel from '../../model/PatientModel'
import { ViewMode } from '../../utils/Enums'
import Modal from 'react-modal'
import { ModalSplit } from '../ViewUtils'

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

class StudyItemModal extends Component {
  state = {
    item:
      Object.keys(this.props.item).length !== 0
        ? StudyModel.pruneStudy(this.props.item)
        : StudyModel.emptyStudy(),
    errors: {
      description: false,
      patient_uuid: false
    }
  }

  componentDidMount() {}

  updateParameters = param => {
    const { item } = this.state
    const updatedItem = { ...item, ...param }
    this.setState(
      {
        item: updatedItem
      },
      () => this.validate(updatedItem)
    )
  }

  validate = item => {
    PatientModel.exists(item.patient_uuid)
      .then(result => {
        this.setState({
          errors: {
            description: !nameRegex.test(item.description),
            patient_uuid: result.length === 0
          }
        })
      })
      .catch(error => console.log({ error }))
  }

  submitItem = e => {
    e.preventDefault()
    const { item } = this.state
    const { mode, callback } = this.props

    const study = { ...item }

    if (mode === ViewMode.ADD)
      StudyModel.insertStudy(study)
        .then(result =>
          callback({ success: true, action: 'insert', uuid: result })
        )
        .catch(err => callback({ success: false, action: 'insert' }))
    else
      StudyModel.updateStudy({ ...study, updated_at: new Date() })
        .then(result =>
          callback({ success: true, action: 'update', uuid: result })
        )
        .catch(err => callback({ success: false, action: 'update' }))
  }

  render() {
    const { item, errors } = this.state
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
          <h2>New study:</h2>
        ) : (
          <React.Fragment>
            <h2>Study:</h2>
            <p className="uuid">{item.uuid}</p>
          </React.Fragment>
        )}
        <form onSubmit={this.submitItem}>
          <ModalSplit>
            <div className="floating-label">
              <input
                placeholder="Description"
                type="text"
                autoComplete="off"
                value={item.description}
                className={errors.description ? 'input-error' : ''}
                onChange={e =>
                  this.updateParameters({ description: e.target.value })
                }
              />
              <label>Description:</label>
            </div>
            <div className="floating-label">
              <input
                placeholder="Patient uuid"
                type="text"
                autoComplete="off"
                value={item.patient_uuid}
                className={errors.patient_uuid ? 'input-error' : ''}
                onChange={e =>
                  this.updateParameters({ patient_uuid: e.target.value })
                }
              />
              <label>Patient uuid:</label>
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
                  pathname: `/series/${item.uuid}`
                }}
                className="see-studies"
                style={{ flex: 2 }}
              >
                See series
              </Link>
            )}
          </ModalSplit>
        </form>
      </Modal>
    )
  }
}

export default StudyItemModal
