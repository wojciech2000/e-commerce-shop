import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from './productsType'

const request = () => ({ type: PRODUCT_LIST_REQUEST })
const success = data => ({ type: PRODUCT_LIST_SUCCESS, payload: data })
const fail = () => ({ type: PRODUCT_LIST_FAIL })

export {
    request,
    success,
    fail
}