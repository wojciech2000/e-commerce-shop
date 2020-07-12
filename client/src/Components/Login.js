import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from './DataContext'
import axios from 'axios'

function Login() {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const { status } = useContext(DataContext)

    const login = e => {
        e.preventDefault()
       
        if(!username || !password)
        {
            return status('uzupełnij wszystkie pola')
        }
        else 
        {
            axios.post('user/login', { username, password })
            .then(res => {
                status(res.data)
                setUserName('')
                setPassword('')
            })
            .catch(err => console.log(err))
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
