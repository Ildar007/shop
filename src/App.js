import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Category from './pages/Category';
import Header from './components/Header';
import PDP from './pages/PDP';
import Cart from "./pages/Cart";

export default class App extends Component {
  render() {
    return (
      <div className='app'>
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Category />}/>
          <Route exact path="/:category" element={<Category />}/>
          <Route exact path="/CART" element={<Cart />}/>
          <Route exact path="/PDP" element={<PDP />}/>
        </Routes>
      </Router>
      </div>
    )
  }
}
