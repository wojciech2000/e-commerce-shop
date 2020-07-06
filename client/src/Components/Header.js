import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { GrBasket } from 'react-icons/gr'

function Header() {
    return (
        <header className="header">
            <h1 className="header__h1">e-comerce</h1>

            <nav className="header__nav">
                <a href=""><GrBasket /> Koszyk</a>
                <a href=""><FaUserAlt /> Zaloguj</a>
            </nav>

        </header>
    )
}

export default Header
