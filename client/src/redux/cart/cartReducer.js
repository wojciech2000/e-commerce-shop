import { ADD_PRODUCT_CART, REMOVE_PRODUCT_CART } from './cartType'

const datas = []

const cartReducer = (state = datas, action) => {

    switch (action.type) {
        case ADD_PRODUCT_CART:

            const addProduct = action.payload
            let checkIfExists = state.find(cart => cart.name === addProduct.name)

            if(checkIfExists)
            {
                //add new data to existing product
                return state.map(cart => cart.name === addProduct.name ? addProduct : cart)
            }
            else
            {
                //add new product
                return [...state, addProduct]
            }
            
        case REMOVE_PRODUCT_CART:

            const removeRroduct = action.payload

            return state.filter(cart => cart._id !== removeRroduct)

        default:
            return state;
    }

}

export default cartReducer