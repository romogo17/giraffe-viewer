import React, { Component } from 'react'
import * as cornerstone from 'cornerstone-core'
import * as cornerstoneMath from 'cornerstone-math'
import * as cornerstoneTools from 'cornerstone-tools'
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader'
import InstanceModel from '../model/InstanceModel'

cornerstoneTools.external.cornerstone = cornerstone
cornerstoneTools.external.cornerstoneMath = cornerstoneMath
cornerstoneWebImageLoader.external.cornerstone = cornerstone
cornerstone.registerImageLoader('pgcv', InstanceModel.loadImage)

const containerStyle = {
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const divStyle = {
  width: '95%',
  height: '95%',
  position: 'relative',
  color: 'white'
}

const zoomStyle = {
  bottom: '35px',
  right: '15px',
  position: 'absolute',
  color: '#82d8d8',
  fontFamily: 'Roboto Mono',
  fontSize: '0.89rem',
  fontWeight: 400
}

const wlStyle = {
  bottom: '15px',
  right: '15px',
  position: 'absolute',
  color: '#82d8d8',
  fontFamily: 'Roboto Mono',
  fontSize: '0.89rem',
  fontWeight: 400
}

class CornerstoneElement extends Component {
  constructor(props) {
    super(props)

    this.element = null

    this.state = {
      stack: props.stack,
      viewport: cornerstone.getDefaultViewport(null, undefined),
      imageId: props.stack.imageIds[0]
    }

    this.onImageRendered = this.onImageRendered.bind(this)
    this.onNewImage = this.onNewImage.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
  }

  render() {
    return (
      <div style={containerStyle}>
        <div
          className="viewportElement"
          style={divStyle}
          ref={input => {
            this.element = input
          }}
        >
          <canvas className="cornerstone-canvas" />
          <div style={zoomStyle}>
            Zoom: {Math.round(this.state.viewport.scale * 100)}%
          </div>
          <div style={wlStyle}>
            W {Math.round(this.state.viewport.voi.windowWidth)} L{' '}
            {Math.round(this.state.viewport.voi.windowCenter)}
          </div>
        </div>
      </div>
    )
  }

  onWindowResize() {
    if (!this.element) return

    console.log('onWindowResize')
    cornerstone.resize(this.element)
  }

  onImageRendered() {
    if (!this.element) return

    const viewport = cornerstone.getViewport(this.element)
    // console.log(viewport)
    this.setState({
      viewport
    })
    // console.log(this.state.viewport)
  }

  onNewImage() {
    if (!this.element) return
    const enabledElement = cornerstone.getEnabledElement(this.element)
    this.setState({
      imageId: enabledElement.image.imageId
    })
  }

  componentDidMount() {
    if (!this.element) return

    const element = this.element
    // console.log({ element })

    // Load the first image in the stack
    cornerstone.loadImage(this.state.imageId).then(image => {
      // Enable the DOM Element for use with Cornerstone
      cornerstone.enable(element)

      // Display the first image
      cornerstone.displayImage(element, image)

      // Add the stack tool state to the enabled element
      const stack = this.props.stack
      cornerstoneTools.addStackStateManager(element, ['stack'])
      cornerstoneTools.addToolState(element, 'stack', stack)

      cornerstoneTools.mouseInput.enable(element)
      cornerstoneTools.mouseWheelInput.enable(element)
      cornerstoneTools.wwwc.activate(element, 1) // ww/wc is the default tool for left mouse button
      cornerstoneTools.pan.activate(element, 2) // pan is the default tool for middle mouse button
      cornerstoneTools.zoom.activate(element, 4) // zoom is the default tool for right mouse button
      cornerstoneTools.zoomWheel.activate(element) // zoom is the default tool for middle mouse wheel

      element.addEventListener('cornerstoneimagerendered', this.onImageRendered)
      element.addEventListener('cornerstonenewimage', this.onNewImage)
      window.addEventListener('resize', this.onWindowResize)
    })
  }

  componentWillUnmount() {
    if (!this.element) return

    const element = this.element
    element.removeEventListener(
      'cornerstoneimagerendered',
      this.onImageRendered
    )

    element.removeEventListener('cornerstonenewimage', this.onNewImage)

    window.removeEventListener('resize', this.onWindowResize)

    cornerstone.disable(element)
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.element) return

    const stackData = cornerstoneTools.getToolState(this.element, 'stack')
    const stack = stackData.data[0]
    stack.currentImageIdIndex = this.state.stack.currentImageIdIndex
    stack.imageIds = this.state.stack.imageIds
    cornerstoneTools.addToolState(this.element, 'stack', stack)

    //const imageId = stack.imageIds[stack.currentImageIdIndex];
    //cornerstoneTools.scrollToIndex(this.element, stack.currentImageIdIndex);
  }
}

export default CornerstoneElement
