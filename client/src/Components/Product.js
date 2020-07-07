import React from 'react'
import { useSelector } from 'react-redux'

function Product(props) {

    const id = props.match.params.id
    const productState = useSelector(state => state.products)
    const { loading, products, error } = productState
    const product = products && products.find(({_id}) => _id === id)

    return (
        <div>
            {loading ? <div style={{fontSize: '40px'}}>loading</div> : error ? <div>error</div> : 
            product && <div>{product.name}</div>}
        </div>
    )
}

export default Product
