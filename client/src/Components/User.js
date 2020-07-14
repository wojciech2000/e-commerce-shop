import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from './DataContext'
import axios from 'axios'

function User(props) {

    const { status, setLogin } = useContext(DataContext)
    const [purchasedProducts, setPurchasedProducts] = useState()


    useEffect(() => {
        axios.get('/user/purchased-products')
        .then(res => setPurchasedProducts(res.data))
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

            <div className="user__panel">
                
                <h2 className="user__title">
                    Historia zakupów
                </h2>

                <button className="user__logout" onClick={logOut}>
                    Wyloguj
                </button>

            </div>

            {
                !purchasedProducts ? 

                <div>loading</div>

                :

                purchasedProducts.length > 0 ?

                <section className="user__history">

                    {purchasedProducts.map(({ date, totalPrice, totalQuantity, products }, id) => (

                    <div key={id} className="shopping">

                        <div className="shopping__header">

                            <span className="shopping__date">{date}</span>

                            <div className="shopping__price">
                                Łączna suma: <span>{totalPrice}zł</span>
                            </div>

                            <div className="shopping__quantity">
                                Łączna ilość: <span>{totalQuantity}</span>
                            </div>

                        </div>

                        <div className="shopping__products">

                            {products.map(({ brand, name, price, size, quantity, image}, id) => (

                            <div className="shopping__product" key={id}>
                                                        
                                <img src={`${document.location.origin}/uploads/${image}`} width="100px" className="shopping__image" alt="zdjęcie produkty"/>

                                <div className="shopping__info">

                                    <div className="shopping__price">
                                        Cena: <span>{price}</span>zł
                                    </div>

                                    <div className="shopping__brand">
                                        Marka: <span>{brand}</span>
                                    </div>

                                    <div className="shopping__name">
                                        Nazwa: <span>{name}</span>
                                    </div>

                                    <div className="shopping__size">
                                        Rozmiar: <span>{size}</span>
                                    </div>

                                    <div className="shopping__quantity">
                                        Ilość: <span>{quantity}</span>
                                    </div>

                                </div>
                            </div>

                        ))}

                        </div>

                    </div>
                    ))}

                </section>

                :

                <div>brak dokonanych zakupów</div>

            }

        </div>
    )
}

export default User
