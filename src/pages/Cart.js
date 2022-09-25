import React, { Component } from 'react'
import { store } from '../redux/store'
import { connect } from 'react-redux'
import CartItem from '../components/CartItem'
import "../styles/cart.css"

class Cart extends Component {    
  //defining background Class
  defineBackgroundClass = (status) => {
    return status ? "cart-overlay-background" : "cart-overlay-background hide"
  }
  //show products
  showProducts = (bag) => {
    return bag.map( (product, index) => {
      return(
          <CartItem key={index} id={index} img={product.gallery} productAttributes={product.attributes} 
          quantity={product.quantity} brand={product.brand} name={product.name}
          prices={product.prices} increase={this.props.increaseQuantity} 
          decrease={this.props.decreaseQuantity}/>
      )
    })
  }

  render() {
    // declaring total price and tax variables
    let total = 0;
    let tax = 0.21;
    // filtering bag item prices by current chosen currency and multiplying it by product quantity
    let prices = this.props.bagItems.length > 0 ? 
      this.props.bagItems.map( product => 
        product.prices.filter( price => 
            price.currency.label === this.props.currency
      )[0].amount * product.quantity)
     : 0;
     // total price of the cart without TAX
     prices.length > 0 ? prices.map( price => {
      return total += price
     }) : total += 0;
    // finding total price including 21% tax
    let totalWithTax = total + total * tax;

    return (
      <div className='cart-page' onClick={() => this.props.close()}>
        <div className={this.defineBackgroundClass(this.props.cartOverlayStatusOn)}></div>
        <div className='cart'>Cart</div>
        <div className='products'>{this.showProducts(store.getState().bag)}</div>
        <div className='place-order'>
                <div className='order-detail'>
                    <p>Tax 21%:</p>
                    <p className='total-number'>{this.props.currencySymbol} {(totalWithTax-total).toFixed(2)}</p>
                </div>
                <div className='order-detail'>
                    <p>Quantity:</p>
                    <p className='total-number'>{this.props.items}</p>
                </div>
                <div className='order-detail'>
                    <p className='total'>Total:</p>
                    <p className='total-number'>{this.props.currencySymbol} {(totalWithTax).toFixed(2)}</p>
                </div>
                <button className='order-btn'>ORDER</button>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      bagItems: state.bag,
      currency: state.currency,
      currencySymbol: state.currencySymbol,
      cartOverlayStatusOn: state.cartOverlayStatusOn,
      items: state.items
    };
  };
  
const mapDispatchToProps = (dispatch) => {
    return {
      changeProductOptions: (productOption) =>
        dispatch({
          type: "PRODUCT_OPTIONS_UPDATE",
          productOptions: productOption,
        }),
      increaseQuantity: (productKey) =>
        dispatch({
          type: "INCREASE",
          productKey: productKey
        }),
      decreaseQuantity: (productKey) =>
        dispatch({
          type: "DECREASE",
          productKey: productKey
        }),
      close: () =>
        dispatch({ type: "CLOSE"})
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Cart);