import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllData } from '../redux/products/productsOperations'
import { useSelector } from 'react-redux'

function Products() {

    const [search, setSearch] = useState("")
    const productState = useSelector(state => state.products)

    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getAllData()) 
    }, [])

    const { loading, products, error } = productState

    const filterProducts = () => (
        products.filter(product => (
            product.name.toLowerCase().includes(search.toLowerCase())
        ))
    )

    return (
        <div className="products">
            <input type="text" className="products__search" placeholder="Szukaj..." onChange={e => setSearch(e.target.value)}/>

            <div className="products__products-list">
                {loading ? <div style={{fontSize: '40px'}}>loading</div> : error ? <div>error</div> : products &&

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
