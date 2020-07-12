import React, { createContext } from 'react'
import gsap from 'gsap'

export const DataContext = createContext()

export const DataProvider = ({children}) => {

    const status = message => {

        const existingMessage = document.querySelector('.status')
        existingMessage && existingMessage.remove()

        const messageDiv = document.createElement('div')
        messageDiv.classList.add('status')
        messageDiv.textContent = message

        document.getElementById('root').appendChild(messageDiv)

        const tl = gsap.timeline()
        tl.fromTo(messageDiv, {duration: .5,x: "70", opacity: 0}, {duration: .5,x: "0", opacity: 1})
            .to(messageDiv, {duration: .5, delay: 2,x: "-70", opacity: 0})  

        messageDiv.addEventListener('click', () => messageDiv.remove())

    }

    return (
        <DataContext.Provider value={{ status }}>
            {children}
        </DataContext.Provider>
    )
}
