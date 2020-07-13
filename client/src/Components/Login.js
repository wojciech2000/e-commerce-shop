import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from './DataContext'
import axios from 'axios'

function Login(props) {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const { status, setLogin } = useContext(DataContext)

    const login = e => {
        e.preventDefault()
       
        if(!username || !password)
        {
            return status('Uzupełnij wszystkie pola')
        }
        else 
        {
            axios.post('user/login', { username, password })
            .then(res => {
                status(res.data)
                setLogin(true)
                props.history.push('/')
            })
            .catch(err => err.response.status === 401 && status('Błędne hasło lub login'))
        }

    }

    return (
        <div className="login">
            
            <form onSubmit={login} className="login__form">

                <h2 className="login__title">Zaloguj się</h2>

                <div>
                    <label htmlFor="username">Login</label>
                    <input type="text" id="username" value={username} onChange={e => setUserName(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="password">Hasło</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
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
