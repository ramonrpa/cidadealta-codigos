import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'

import Auth from './views/Auth'
import Codes from './views/Codes'

const App = props => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Auth} />
            <PrivateRoute exact path='/codigos' component={Codes} />
        </Switch>
    </BrowserRouter>)

export default App