import React from 'react'
import loading from '../messages/loading.gif'

function Loading() {

    const loadingStyle = {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        width: '100px'
    }

    return (
        <div>
            <img src={loading} alt="Ładowanie" style={loadingStyle}/>
        </div>
    )
}

export default Loading
