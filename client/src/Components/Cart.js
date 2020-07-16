import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { remove, clear } from '../redux/cart/cartActions'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { DataContext } from './DataContext'

function Cart(props) {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const { login, status, username } = useContext(DataContext)

    const totalPrice = cart.reduce((acc, { price, quantity }) => acc + ( price * quantity ) , 0).toFixed(2)
    const totalQuantity = cart.reduce((acc, { quantity }) => acc + quantity , 0)

    const removeProduct = (id) => {
        dispatch(remove(id))
    }

    const buy = () => {
        
        if(cart.length === 0)
        {
            status('Nie wybrano żadnych produktów')
        }
        else if(login && username === 'admin')
        {
            status('Jako admin nie możesz kupować')
        }
        else if(login)
        {
            axios.post('/user/purchase', {totalPrice, totalQuantity, products: cart} )
            .then(res => {
                dispatch(clear())
                status('Produkt został dodany do historii zakupów')
            } )
            .catch(err => console.log(err))
        }
        else
        {
            props.history.push('/login')
            status('Aby kupować produkty zaloguj się')
        }


    }

    return (
        <div className="cart">
            <div className="cart__products">

                { cart.map(({image, price, brand, name, size, quantity, _id}, id) => (
                    <div className="cart__product" key={id}>
                        
                        <img src={`${document.location.origin}/uploads/${image}`} className="cart__image" alt="zdjęcie produkty"/>

                        <div className="cart__info">

                            <div className="cart__price">
                                {price}zł
                            </div>

                            <div className="cart__description">
                                <div className="cart__brand">
                                    {brand}
                                </div>

                                <div className="cart__name">
                                    {name}
                                </div>
                            </div>

                            <div className="cart__size">
                                {size}
                            </div>

                            <div className="cart__quantity">
                                Ilość: <span>{quantity}</span>
                            </div>

                            <div className="cart__buttons">
                                <Link className="cart__add" to={`/product/${_id}`}>
                                    Zmień
                                </Link>

                                <div className="cart__remove" onClick={() => removeProduct(_id)}>
                                    Usuń
                                </div>
                            </div>

                        </div>
                    </div>
                ))}

           </div>

            <div className="cart__summary">

                <div className="cart__numbers">
                    <div className="cart__total-sum">
                        Łączna suma

                        <span>{totalPrice}zł</span>
                    </div>

                    <div className="cart__total-quantity">
                        Łączna ilość

                        <span>{totalQuantity}</span>
                    </div>
                </div>

                <div className="cart__buy" onClick={buy}>
                    Kup
                </div>
                
            </div>

        </div>
    )
}

export default Cart
