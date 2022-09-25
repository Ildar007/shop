import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import CartOverlayItem from './CartOverlayItem'

class CartOverlay extends Component {
  //show items
  showItems = (items) => {
    return items.length > 0 ?
    items.map( (product,index) => {
      return (
        <CartOverlayItem img={product.gallery[0]} id={index} key={index}
        productName={product.name} brand={product.brand} prices={product.prices}
        attributes={product.attributes}
        quantity={product.quantity} increase={this.props.increaseQuantity} 
        decrease={this.props.decreaseQuantity}/>
      )
      })
   : ""
  }

  render() {
    let total = 0;
    let tax = 0.21;
    // filtering bag item prices by current chosen currency and multiplying it by product quantity
    let prices = this.props.bagItems.length > 0 ? 
      this.props.bagItems.map( product => 
        product.prices.filter( price => 
            price.currency.label === this.props.currency
      )[0].amount * product.quantity )
     : 0;
     // total price of the cart without TAX
     prices.length > 0 ? prices.map( price => {
      return total += price
     }) : total += 0;
    // finding total price including 21% tax
    let totalWithTax = total + total * tax;

    return (
      <div className='cart-overlay-container'>
         <div className='cart-overlay'>
                      <div className='product-overlay'>
                        <div className='my-bag'>
                          <div className='my-bag-txt'>My Bag, &nbsp;</div>
                          <div className='my-bag-items'>{this.props.items}</div>
                          <div className='my-bag-items'>&nbsp; items</div> 
                        </div>
                        <div className='products-container'>{this.showItems(this.props.bagItems)}</div>
                        <div className='checkout'>
                            <div className='total-price'>
                              <div className='total-price-txt'>Total:</div>
                              <div className='total-price-cost'>{this.props.currencySymbol} {(totalWithTax).toFixed(2)}</div>
                            </div>
                            <div className='checkout-btns'>
                              <button onClick={() =>
                                this.props.changeCartOverlayStatus()
                              }>
                                <Link to="/Cart" className='button-name'>VIEW BAG</Link>
                              </button>
                              <button id="checkout" className='button-name'>CHECKOUT</button>
                            </div>
                          </div>
                      </div>
         </div> 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cartOverlayStatusOn: state.cartOverlayStatusOn,
    bagItems: state.bag,
    currency: state.currency,
    currencySymbol: state.currencySymbol,
    items: state.items
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCartOverlayStatus: () => 
      dispatch({
        type: "CARTOVERLAYSTATUS_UPDATE"
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
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);