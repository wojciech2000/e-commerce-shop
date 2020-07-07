import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { GrBasket } from 'react-icons/gr'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="header">
            <Link to="/"><h1 className="header__h1">e-comerce</h1></Link>

            <nav className="header__nav">
                <a href="#koszyk"><GrBasket /> Koszyk</a>
                <a href="#zaloguj"><FaUserAlt /> Zaloguj</a>
            </nav>

        </header>
    )
}

export default Header
