import React, { useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { getAllData } from '../redux/products/productsOperations'
import { DataContext } from './DataContext'

function Admin(props) {

    const { status, username, setLogin } = useContext(DataContext)

    const productsState = useSelector(state => state.products)
    const { loading, products, error } = productsState

    const dispatch = useDispatch()

    const logOut = () => {
        axios.get('/user/logout')
        .then(res => {
            status(res.data)
            setLogin(false)
            props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    const deleteProduct = (id, image) => {

        axios.delete(`product/delete/${id}/${image}`)
        .then(res => {
            dispatch(getAllData())
            status(res.data)
        })
        .catch(err => console.log(err))

    }

    const updateProduct = (id) => {
        props.history.push(`update/${id}`)
    }

    return (
        <div className="admin">

            {username !== 'admin' && <Redirect to='/' />}

            <div className="admin__panel">
                
                <h2 className="admin__title">
                    Panel admina
                </h2>

                <div className="admin__buttons">

                    <Link to='add-product' className="admin__add-product">
                        Dodaj produkt
                    </Link>

                    <button className="admin__logout" onClick={logOut}>
                        Wyloguj
                    </button>

                </div>

            </div>
            
            <div className="admin__products-list">

            {loading ? <div style={{fontSize: '40px'}}>loading</div> : error ? <div>error</div> : products &&

            products.map(({ _id, brand, name, price, size, quantity, image}, id) => (
                
                <div className="admin__product" key={id}>

                <div className="admin__description">

                    <img src={`${document.location.origin}/uploads/${image}`} width="100px" className="admin__image" alt="zdjęcie produkty"/>

                    <div className="admin__info">

                        <div className="admin__price">
                            Cena: <span>{price + 'zł'}</span>
                        </div>

                        <div className="admin__brand">
                            Marka: <span>{brand}</span>
                        </div>

                        <div className="admin__name">
                            Nazwa: <span>{name}</span>
                        </div>

                        <div className="admin__size">
                            Rozmiary: <span>{size + ' '}</span>
                        </div>

                        <div className="admin__quantity">
                            Ilość: <span>{quantity}</span>
                        </div>

                    </div>

                </div>

                <div className="admin__product-buttons">
                    <button className="admin__product-delete" onClick={() => deleteProduct(_id, image)}>
                        Usuń
                    </button>

                    <button className="admin__product-update" onClick={() => updateProduct(_id)}>
                        Zmień
                    </button>
                </div>

                </div>
            ))}


            </div>

        </div>
    )
}

export default Admin
