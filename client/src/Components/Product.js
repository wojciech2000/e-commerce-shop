import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { GrBasket } from 'react-icons/gr'

function Product(props) {

    const id = props.match.params.id
    const { loading, products, error } = useSelector(state => state.products)
    const product = products && products.find(({_id}) => _id === id)


    const [quantity, setQuantity] = useState(1)

    const incrementQuantity = () => {
        (quantity >= 1 && quantity < product.quantity) && setQuantity(prevQty => prevQty + 1)
    }
    const decrementQuantity = () => {
        (quantity > 1 && quantity <= product.quantity) && setQuantity(prevQty => prevQty - 1)
    }

    const changeQuantity = e => {
        (e.target.value > 0 && e.target.value <= product.quantity && e.target.value) && setQuantity(parseInt(e.target.value))
    }


    const [size, setSize] = useState(product && product.size[0])

    const chooseSize = e => {
        const sizeDivs = document.querySelectorAll('.sizes-container__size')
        const choosenDiv = e.target

        sizeDivs.forEach(div => div.classList.remove('sizes-container__size--active'))

        choosenDiv.classList.add('sizes-container__size--active')
        setSize(choosenDiv.textContent)
    }

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
                            {product.size.map((size, id) => (
                                 <div key={id} className={id === 0 ? "sizes-container__size sizes-container__size--active" : "sizes-container__size"} onClick={chooseSize}>{size}</div>
                            ))}
                        </div>
                    </div>

                    <div className="details__quantity">
                        <span>Ilość (max.{product.quantity})</span>

                        <div className="quantity-container">
                            <input type="number" className="quantity-container__input" value={quantity} onChange={changeQuantity}/>
                            
                            <div className="quantity-container__buttons">
                                <button className="quantity-container__add" onClick={incrementQuantity}>
                                    +
                                </button>
                                <button className="quantity-container__truncate" onClick={decrementQuantity}>
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
