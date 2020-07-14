import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { DataContext } from './DataContext'

function Admin() {

    const { username } = useContext(DataContext)

    return (
        <div>

            {username !== 'admin' && <Redirect to='/' />}

            admin
        </div>
    )
}

export default Admin
