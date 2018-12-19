import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import AuthOrApp from './authOrApp'
import Dashboard from '../dashboard/dashboard' /*../dashboard2/dashboard2*/
import Analyze from '../analyze/analyze'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={AuthOrApp}>
        <IndexRoute component={Analyze} /> 
            <Route path='/analyze' component={Analyze} />
        </Route>
        <Redirect from ='*' to='/' />
    </Router>
)