import React from 'react'

import App from './App'
import Cadastro from './Cadastro'
import CadastroResponse from './CadastroResponse'
import CadastroResponseFail from './CadastroResponseFail'
import { HashRouter, Switch, Route } from 'react-router-dom'

export default props => (
    <HashRouter>
        <Switch>
            <Route path="/" exact={ true } component={ App }></Route>
            <Route path="/cadastro" exact={ true } component={ Cadastro }></Route>
            <Route path="/cadastrosuccess" exact={ true } component={ CadastroResponse }></Route>
            <Route path="/cadastrofail" exact={ true } component={ CadastroResponseFail }></Route>
        </Switch>
    </HashRouter>
)