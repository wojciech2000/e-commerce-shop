import React, { useContext, useEffect } from 'react'
import { DataContext } from './DataContext'
import axios from 'axios'

function User(props) {

    const { status, setLogin } = useContext(DataContext)

    useEffect(() => {
        axios.get('/user/purchased-products')
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }, [])

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
        <div className="user">
            User Data
            <div onClick={logOut}>wyloguj</div>
        </div>
    )
}

export default User
