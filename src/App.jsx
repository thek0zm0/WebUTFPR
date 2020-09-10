import React, {Component} from 'react'
import './app.css'
import API from './Api'
import SearchIcon from './search.png'

export default class App extends Component {

    state = {
        username: "",
        password: "",
        loggedIn: false
    }

    constructor(props) {
        super(props)
        this.state.loggedIn = (localStorage.getItem('onLogin') === 'true')
        if(this.state.loggedIn)
            this.state.username = localStorage.getItem('myUsername')
    }

    onChangeUsername (event) {
        this.setState({ username: event.target.value })
    }

    onChangePassword (event) {
        this.setState({ password: event.target.value })
    }

    setLoggedin = (value) => {
        this.setState({loggedIn: value})
    }

    render() {
        return(
            <div>
                <header>
                <div className="header">
                    <h2>Using Jikan API</h2>
                    <div className={this.state.loggedIn ? 'loggedin' : 'loggedin-off'}>
                        <h3>Logged as {this.state.username}</h3>
                        <button onClick={() => {
                            this.refs.child.onLogout()
                        }}>Logout</button>
                    </div>
                    <div className={this.state.loggedIn ? 'login-off' : 'login'}>
                        <h3>Login: </h3>
                        <input type="text" onChange={e => this.onChangeUsername(e) }></input>
                        <h3>Password: </h3>
                        <input type="password" onChange={e => this.onChangePassword(e)}></input>
                        <div className="login-submit">
                            <input type="submit" value="Login" 
                                onClick={() => {
                                    this.refs.child.onLogin()
                                }
                            }></input>
                            <button 
                                onClick={() => {
                                    this.refs.child.onCreateAccount()
                                }
                            }>Sign up</button>
                        </div>
                    </div>
                </div>
                </header>

                <div className="topo">
                    <h1>Wikipedia</h1>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Wikipedia_wordmark_Candidate.svg" alt="logo" className="letreiro"/>
                    <p>The Free Encyclopedia</p>
                    <img src="https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png" alt="wikipedia" className="imagem"/>
                </div>

                <div className="centro">
                    <div className="idioma">
                        <a className="link" href="//en.wikipedia.org/" title="English — Wikipedia — The Free Encyclopedia">
                            <h2>English</h2>
                            <p className="artigos">1 612 000+ artículos</p>
                        </a>
                    </div>
                    <div className="idioma">
                        <a className="link" href="//es.wikipedia.org/" title="Español — Wikipedia — La enciclopedia libre">
                            <h2>Español</h2>
                            <p className="artigos">1 612 000+ artículos</p>
                        </a>
                    </div>
                    <div className="idioma">
                        <a className="link" href="//ru.wikipedia.org/" title="Russkiy — Википедия — Свободная энциклопедия">
                            <h2>Русский</h2>
                            <p className="artigos">1 644 000+ статей</p>
                        </a>
                    </div>
                    <div className="idioma">
                        <a className="link" href="//it.wikipedia.org/" title="Italiano — Wikipedia — L&#x27;enciclopedia libera">
                            <h2>Italiano</h2>
                            <p className="artigos">1 623 000+ voci</p>
                        </a>
                    </div>
                    <div className="idioma">
                        <a className="link" href="//pt.wikipedia.org/" title="Português — Wikipédia — A enciclopédia livre">
                            <h2>Português</h2>
                            <p className="artigos">1 039 000+ artigos</p>
                        </a>
                    </div>

                    <div className="idioma">
                        <a className="link" href="//ja.wikipedia.org/" title="Nihongo — ウィキペディア — フリー百科事典">
                            <h2>日本語</h2>
                            <p className="artigos">1 128 000+ 記事</p>
                        </a>
                    </div>
                    <div className="idioma">
                        <a className="link" href="//de.wikipedia.org/" title="Deutsch — Wikipedia — Die freie Enzyklopädie">
                            <h2>Deutsch</h2>
                            <p className="artigos">2 458 000+ Artikel</p>
                        </a>
                    </div>
                    <div className="idioma">
                        <a className="link" href="//fr.wikipedia.org/" title="Français — Wikipédia — L’encyclopédie libre">
                            <h2>Français</h2>
                            <p className="artigos">2 236 000+ articles</p>
                        </a>
                    </div>
                    <div className="idioma">
                        <a className="link" href="//zh.wikipedia.org/" title="Zhōngwén — 維基百科 — 自由的百科全書">
                            <h2>中文</h2>
                            <p className="artigos">1 130 000+ 條目</p>
                        </a>
                    </div>
                    <div className="idioma">
                        <a className="link" href="//pl.wikipedia.org/" title="Polski — Wikipedia — Wolna encyklopedia">
                            <h2>Polski</h2>
                            <p className="artigos">1 420 000+ hasel</p>
                        </a>
                    </div>
                </div>

                <div className="abaixo">
                    <div className="busca">
                        <div className="busca_bg">
                            <input type="text" className="inputText"/>
                            <select className="selectIdioma"> 
                                <option>EN</option>
                            </select>
                        </div>
                    </div>
                    <div className="botaoSearch">
                        <img src={SearchIcon} alt="Search Icon" className="searchIcon"/>
                    </div>
                </div>
                <API ref="child" username={this.state.username} password={this.state.password} setLoggedin={this.setLoggedin} loggedIn={this.state.loggedIn}></API>
            </div>
        );
    }
}
    