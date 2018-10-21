import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import SeriesModel from '../../model/SeriesModel'
import StudyModel from '../../model/StudyModel'
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
const lateralityRegex = /^L|R$/i

class SeriesItemModal extends Component {
  state = {
    item:
      Object.keys(this.props.item).length !== 0
        ? SeriesModel.pruneSeries(this.props.item)
        : SeriesModel.emptySeries(),
    errors: {
      description: false,
      laterality: false,
      body_part: false,
      study_uuid: false
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
    StudyModel.exists(item.study_uuid)
      .then(result => {
        this.setState({
          errors: {
            description: !nameRegex.test(item.description),
            laterality: !lateralityRegex.test(item.laterality),
            body_part: !nameRegex.test(item.body_part),
            study_uuid: result.length === 0
          }
        })
      })
      .catch(error => console.log({ error }))
  }

  submitItem = e => {
    e.preventDefault()
    const { item } = this.state
    const { mode, callback } = this.props

    const series = {
      ...item,
      body_part: item.body_part.toUpperCase(),
      laterality: item.laterality.toUpperCase()
    }

    if (mode === ViewMode.ADD)
      SeriesModel.insertSeries(series)
        .then(result =>
          callback({ success: true, action: 'insert', uuid: result })
        )
        .catch(err => callback({ success: false, action: 'insert' }))
    else
      SeriesModel.updateSeries({ ...series, updated_at: new Date() })
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
          <h2>New series:</h2>
        ) : (
          <React.Fragment>
            <h2>Series:</h2>
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
                placeholder="Body part"
                type="text"
                autoComplete="off"
                value={item.body_part}
                className={errors.body_part ? 'input-error' : ''}
                onChange={e =>
                  this.updateParameters({ body_part: e.target.value })
                }
              />
              <label>Body part:</label>
            </div>
          </ModalSplit>
          <ModalSplit>
            <div className="floating-label">
              <input
                placeholder="Laterality"
                type="text"
                autoComplete="off"
                value={item.laterality}
                className={errors.laterality ? 'input-error' : ''}
                onChange={e =>
                  this.updateParameters({ laterality: e.target.value })
                }
              />
              <label>Laterality:</label>
            </div>
            <div className="floating-label">
              <input
                placeholder="Study uuid"
                type="text"
                autoComplete="off"
                value={item.study_uuid}
                className={errors.study_uuid ? 'input-error' : ''}
                onChange={e =>
                  this.updateParameters({ study_uuid: e.target.value })
                }
              />
              <label>Study uuid:</label>
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
                  pathname: `/instance/${item.uuid}`
                }}
                className="see-studies"
                style={{ flex: 2 }}
              >
                See instances
              </Link>
            )}
          </ModalSplit>
        </form>
      </Modal>
    )
  }
}

export default SeriesItemModal
