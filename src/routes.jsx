import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import App from './App'
import Cadastro from './Cadastro'
import CadastroResponse from './CadastroResponse'
import CadastroResponseFail from './CadastroResponseFail'

export default props => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={ true } component={ App }></Route>
            <Route path="/cadastro" exact={ true } component={ Cadastro }></Route>
            <Route path="/cadastrosuccess" exact={ true } component={ CadastroResponse }></Route>
            <Route path="/cadastrofail" exact={ true } component={ CadastroResponseFail }></Route>
        </Switch>
    </BrowserRouter>
)