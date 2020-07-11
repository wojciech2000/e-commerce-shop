import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const register = e => {
        e.preventDefault()
       

        if(!username || !password || !password2)
        {
            return alert('uzupełnij wszystkie pola')
        }
        else if(password !== password2)
        {
            return alert('hasła muszą być takie same')
        }
        else 
        {
            axios.post('user/register', { username, password })
            .then(res => alert(res.data))
            .catch(err => console.log(err))
        }

    }

    return (
        <div>
            
            <form onSubmit={register}>

                <div>
                    <label htmlFor="username">Login</label>
                    <input type="text" id="username" value={username} onChange={e => setUserName(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="password">Hasło</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="password2">Powtórz hasło</label>
                    <input type="password" id="password2" value={password2} onChange={e => setPassword2(e.target.value)}/>
                </div>

                <input type="submit" value="Zarejestruj"/>
                
            </form>

            <Link to="/login">Zaloguj</Link>
        </div>
    )
}

export default Register
