import React, { useEffect, useContext } from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllData } from './redux/products/productsOperations'
import { DataContext } from './Components/DataContext'
import cookie from 'js-cookie'

import Header from './Components/Header'
import Products from './Components/Products'
import Product from './Components/Product'
import Cart from './Components/Cart'
import Login from './Components/Login'
import Register from './Components/Register'
import User from './Components/User'
import Footer from './Components/Footer'


function App() {

  const { setLogin } = useContext(DataContext)

  const dispatch = useDispatch()
  useEffect(() => {
    if(cookie.get('access_token'))
      setLogin(true) 
      
    dispatch(getAllData()) 
  }, [])


  return (
      <Router>
      
        <Header />
      
        <Route path="/" exact component={Products}/>
        <Route path="/product/:id" exact component={Product}/>
        <Route path="/cart" exact component={Cart}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/user" exact component={User}/>

        <Footer />

      </Router>
  );
}

export default App;
