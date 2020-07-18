import React from 'react'
import error from '../messages/error.png'

function Loading() {

    const errorStyle = {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        width: '100px'
    }

    return (
        <div>
            <img src={error} alt="błąd" style={errorStyle}/>
        </div>
    )
}

export default Loading
