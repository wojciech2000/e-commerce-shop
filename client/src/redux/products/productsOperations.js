import { request, success, fail } from './productsActions'
import axios from 'axios'

export const getAllData = () => async dispatch => {
    try {
        dispatch(request())

        const response = await axios.get(document.location.origin + '/product/datas')
        const datas = await response.data
        await dispatch(success(datas))

    } catch (err) {
        dispatch(fail(err))
    }

}