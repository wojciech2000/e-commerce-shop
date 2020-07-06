import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Products() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/product/datas')
        .then((data) => setProducts(data.data.message.msgBody))
    }, [])

    return (
        <div className="products">
            <input type="text" className="products__search" placeholder="Szukaj..."/>

            <div className="products__products-list">
                {products &&

                    products.map(({name, price, image}, id) => (

                        <div key={id}  className="product">
                            <img src={document.location.origin + '/uploads/' + image} className="product__image" alt="zdjęcie_produktu"/>
                            <span className="product__price">{price}zł</span>
                            <span className="product__name">{name}</span>
                        </div>

                    ))

                }
            </div>

        </div>
    )
}

export default Products
