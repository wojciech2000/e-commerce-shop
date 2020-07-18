import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loading from './Loading'
import Error from './Error'

function Products() {

    const productState = useSelector(state => state.products)
    const { loading, products, error } = productState

    const [search, setSearch] = useState("")
    
    const filterProducts = () => (
        products.filter(product => (
            product.name.toLowerCase().includes(search.toLowerCase())
        ))
    )

    return (
        <div className="products">
            <input type="text" className="products__search" placeholder="Szukaj..." onChange={e => setSearch(e.target.value)}/>

            <div className="products__products-list">
                {loading ? <Loading /> : error ? <Error /> : products &&

                    filterProducts().map(({_id, name, price, image}) => (

                        <Link to={`/product/${_id}`} key={_id}  className="product">
                            <img src={document.location.origin + '/uploads/' + image} className="product__image" alt="zdjęcie_produktu"/>
                            <span className="product__price">{price}zł</span>
                            <span className="product__name">{name}</span>
                        </Link>

                    ))

                }
            </div>

        </div>
    )
}

export default Products
