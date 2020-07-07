import { ADD_PRODUCT_CART, REMOVE_PRODUCT_CART } from './cartType'

const datas = []

const cartReducer = (state = datas, action) => {

    switch (action.type) {
        case ADD_PRODUCT_CART:
            return [...state, action.payload]
    
        case REMOVE_PRODUCT_CART:
            return state

        default:
            return state;
    }

}

export default cartReducer