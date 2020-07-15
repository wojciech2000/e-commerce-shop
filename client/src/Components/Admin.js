import React, { useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { DataContext } from './DataContext'
import axios from 'axios'

function Admin(props) {

    const { status, username, setLogin } = useContext(DataContext)

    const logOut = () => {
        axios.get('/user/logout')
        .then(res => {
            status(res.data)
            setLogin(false)
            props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="admin">

            {username !== 'admin' && <Redirect to='/' />}

            <div className="user__panel">
                
                <h2 className="user__title">
                    Panel admina
                </h2>

                <Link to='add-product'>
                    Dodaj produkt
                </Link>

                <button className="user__logout" onClick={logOut}>
                    Wyloguj
                </button>

            </div>
            
            

        </div>
    )
}

export default Admin
