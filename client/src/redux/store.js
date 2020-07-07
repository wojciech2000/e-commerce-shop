import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import productsReducer from './products/productsReducer'
import cartReducer from './cart/cartReducer'

const rootStore = combineReducers({
    products: productsReducer,
    cart: cartReducer
})

const store = createStore(rootStore, (composeWithDevTools(applyMiddleware(thunk))))

export default store