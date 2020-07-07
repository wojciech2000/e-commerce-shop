import { ADD_PRODUCT_CART, REMOVE_PRODUCT_CART } from './dataTypes'

const add = value => ({ type: ADD_PRODUCT_CART, payload: value })
const remove = id => ({ type: REMOVE_PRODUCT_CART, payload: id })

export default {
    add,
    remove
}