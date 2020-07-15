import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from './DataContext'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const { status, login } = useContext(DataContext)

    const register = e => {
        e.preventDefault()
       
        if(password !== password2)
        {
            return status('Hasła muszą być takie same')
        }
        else 
        {
            axios.post('user/register', { username, password })
            .then(res => {
                status(res.data)

                if(res.data === 'Dodano użytkownika')
                {
                    setUserName('')
                    setPassword('')
                    setPassword2('')
                }
            })
            .catch(err => console.log(err))
        }

    }

    return (
        <div className="register">
            
            {login && <Redirect to='/' />}

            <form onSubmit={register} className="register__form">

                <h2 className="register__title">Zarejestruj się</h2>

                <div>
                    <label htmlFor="username">Login</label>
                    <input type="text" id="username" value={username} onChange={e => setUserName(e.target.value)} required/>
                </div>

                <div>
                    <label htmlFor="password">Hasło</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>

                <div>
                    <label htmlFor="password2">Powtórz hasło</label>
                    <input type="password" id="password2" value={password2} onChange={e => setPassword2(e.target.value)} required/>
                </div>

                <div className="register__buttons">
                    <input type="submit" value="Zarejestruj" className="register__submit"/>
                    <Link to="/login" className="register__login">Zaloguj</Link>
                </div>
                
            </form>

        </div>
    )
}

export default Register
