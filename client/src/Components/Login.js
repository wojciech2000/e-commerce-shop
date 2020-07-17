import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import { DataContext } from './DataContext'

function Login(props) {

    const { status, setLogin,login,  setUsername } = useContext(DataContext)

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const logIn = e => {
        e.preventDefault()
       
        axios.post('user/login', { username, password })
        .then(res => {
            status(res.data)
            setLogin(true)
            setUsername(username)
            props.history.push('/')
        })
        .catch(err => err.response.status === 401 && status('Błędne hasło lub login'))

    }

    return (
        <div className="login">
            
            {login && <Redirect to='/' />}

            <form onSubmit={logIn} className="login__form">

                <h2 className="login__title">Zaloguj się</h2>

                <div>
                    <label htmlFor="username">Login</label>
                    <input type="text" id="username" value={username} onChange={e => setUserName(e.target.value)} required/>
                </div>

                <div>
                    <label htmlFor="password">Hasło</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>

                <div className="login__buttons">
                    <input type="submit" value="Zaloguj" className="login__submit"/>
                    <Link to="/register" className="login__register">Zarejestruj</Link>
                </div>
                
            </form>

        </div>
    )
}

export default Login
