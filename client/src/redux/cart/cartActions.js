import { ADD_PRODUCT_CART, REMOVE_PRODUCT_CART, CLEAR_PRODUCT_CART } from './cartType'

const add = value => {
    return { type: ADD_PRODUCT_CART, payload: value }
} 
const remove = id => {
    return { type: REMOVE_PRODUCT_CART, payload: id }
}

const clear = () => {
    return { type: CLEAR_PRODUCT_CART }
}

export {
    add,
    remove,
    clear
}