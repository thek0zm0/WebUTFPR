import React from 'react'

import App from './App'
import Cadastro from './Cadastro'
import { HashRouter, Switch, Route } from 'react-router-dom'

export default props => (
    <HashRouter>
        <Switch>
            <Route path="/" exact={ true } component={ App }></Route>
            <Route path="/cadastro" exact={ true } component={ Cadastro }></Route>
        </Switch>
    </HashRouter>
)