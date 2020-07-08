import React from 'react'
import { useSelector } from 'react-redux'
import { GrBasket } from 'react-icons/gr'

function Product(props) {

    const id = props.match.params.id
    const { loading, products, error } = useSelector(state => state.products)
    const product = products && products.find(({_id}) => _id === id)

    return (
        <div>
            {loading ? <div>loading</div> : error ? <div>error</div> : product && 
            <div className="details">
                <img src={document.location.origin + '/uploads/' + product.image} className="details__image" alt="zdjęcie produktu"/>

                <div className="details__info">

                    <div className="details__price">
                        {product.price}zł
                    </div>

                    <div className="details__description">
                        <div className="details__brand">
                            {product.brand}
                        </div>

                        <div className="details__name">
                            {product.name}
                        </div>
                    </div>

                    <div className="details__sizes">
                        <span>Rozmiar</span>

                        <div className="sizes-container">
                            <div className="sizes-container__size">{product.size}</div>
                            <div className="sizes-container__size">S</div>
                            <div className="sizes-container__size">M</div>
                            <div className="sizes-container__size">L</div>
                        </div>
                    </div>

                    <div className="details__quantity">
                        <span>Ilość (max.{product.quantity})</span>

                        <div className="quantity-container">
                            <input type="number" className="quantity-container__input"/>
                            
                            <div className="quantity-container__buttons">
                                <button className="quantity-container__add">
                                    +
                                </button>
                                <button className="quantity-container__truncate">
                                    -
                                </button>
                            </div>
                        </div>
                        
                    </div>

                    <div className="details__add">
                        <GrBasket />
                        <span>Do koszyka</span>
                    </div>

                </div>

            </div>
            }
        </div>
    )
}

export default Product
