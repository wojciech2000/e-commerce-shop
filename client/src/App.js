import React, { useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllData } from './redux/products/productsOperations'

import Header from './Components/Header'
import Products from './Components/Products'
import Product from './Components/Product'
import Footer from './Components/Footer'

function App() {

  const dispatch = useDispatch()
  useEffect(() => { dispatch(getAllData()) }, [])

  return (
      <Router>
      
        <Header />
      
        <Route path="/" exact component={Products}/>
        <Route path="/product/:id" exact component={Product}/>

        <Footer />

      </Router>
  );
}

export default App;
