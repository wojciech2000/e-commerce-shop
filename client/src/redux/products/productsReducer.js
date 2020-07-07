import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from './productsType'

const productsReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true }
    
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: true }

        default:
            return state;
    }

}

export default productsReducer