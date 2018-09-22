import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-roboto'
import 'typeface-roboto-mono'
import './styles/index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { MemoryRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
