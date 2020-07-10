import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { remove } from '../redux/cart/cartActions'
import { Link } from 'react-router-dom'

function Cart() {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const removeProduct = (id) => {
        dispatch(remove(id))
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
        </div>
    )
}

export default Cart
