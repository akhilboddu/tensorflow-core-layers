import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import ScrollToTop from './components/util/ScrollTop'
import Regression from './pages/ML/Regression'
import NeuralNetwork from './pages/ML/NeuralNetwork'

export default props => (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/core' component={ Regression } />
          <Route exact path='/layers' component={ NeuralNetwork } />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  )