import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Products() {

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        axios.get('/product/datas')
        .then((data) => setProducts(data.data.message.msgBody))
    }, [])

    const filterProducts = () => (
        products.filter(product => (
            product.name.toLowerCase().includes(search.toLowerCase())
        ))
    )

    return (
        <div className="products">
            <input type="text" className="products__search" placeholder="Szukaj..." onChange={e => setSearch(e.target.value)}/>

            <div className="products__products-list">
                {products &&

                    filterProducts().map(({name, price, image}, id) => (

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
