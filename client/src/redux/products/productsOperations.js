import { request, success, fail } from './productsActions'
import axios from 'axios'

export const getAllData = () => async dispatch => {
    try {
        dispatch(request())

        const response = await axios.get('product/datas')
        const datas = await response.data

        //if number is integer change it to floationg point f.e 32 => 32.00
        await datas.forEach(data => data.price = data.price.toFixed(2))

        await dispatch(success(datas))

    } catch (err) {
        dispatch(fail(err))
    }

}