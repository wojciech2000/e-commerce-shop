import React, { Fragment } from 'react'
import { FaKey } from 'react-icons/fa'

function Key() {

    const toggleKeySection = () => {
        const section = document.querySelector('.key__section')
        section.classList.toggle('key__section--toggle')
    }

    return (
        <Fragment>
            <FaKey className="key__icon" onClick={toggleKeySection}/>

            <section className="key__section">
                
                
                <div className="key__admin">
                    <span>Admin</span>

                    <span>Login: admin</span>
                    <span>Hasło: admin</span>
                </div>

                <div className="key__user">
                    <span>Użytkownik</span>

                    <span>Login: user</span>
                    <span>Hasło: user</span>
                </div>

            </section>

        </Fragment>
    )
}

export default Key
