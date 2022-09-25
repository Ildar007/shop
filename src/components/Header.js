import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'
import logo from "../img/a-logo.png"
import cart from "../img/cart.png"
import vector from "../img/Vector.png"
import CartOverlay from './CartOverlay'
import { connect } from "react-redux"
import "../styles/fonts.css"

const GET_CURRENCIES_AND_CATEGORIES = gql`{
  currencies {
     symbol
     label
  }  
  categories{
    name
  }
}`

class Header extends Component {
      state = {
        currencyStatusOn: false
        };
      //setting currency
      setCurrency = (e) => {
        this.setState ({
          currencyStatusOn:!this.state.currencyStatusOn
        });
        this.props.changeCurrency(e.target.id, e.target.innerHTML[0]+e.target.innerHTML[1]);
      };
      //show categories in header
      showCategories = (categories) => {
        return categories.map( category => {
          return(
            <div key={category.name} className={this.props.category === category.name.toUpperCase() ? "category clicked" : "category"} onClick={() => {
              this.props.close();
              this.props.changeCategory(category.name.toUpperCase())
            }}><Link className='text' to={`/${category.name.toUpperCase()}`}>{category.name.toUpperCase()}</Link></div>
          )
        })
      }
      //defining currency switcher class
      defineCurrencySwitcherClass = (status) => {
        return status ? "convert" : "hide"
      }
      //defining currency class
      defineCurrencyClass = (label) => {
        return this.props.currency === label ? "valute checked" : "valute"
      }
      //showing currencies
      showCurrencies = (currencies) => {
        return currencies.map( currency => {
          return(
            <div key={currency.label} id={currency.label} className={this.defineCurrencyClass(currency.label)} 
            onClick={this.setCurrency}>{currency.symbol} {currency.label}</div>
          )
        })
      }
      //defining cart Items class
      defineCartItemsClass = (items) => {
        return items > 0 ? "item-number shown" : "item-number"
      }
      //defining cart overlay class
      defineCartoverlayClass = (status) => {
        return status ? "show" : "hide"
      }
      //defining alert class
      defineAlertClass = (status) => {
        return status ? 'cart-alert' : 'hide'
      }

      render() {

          return (
            <Query query={GET_CURRENCIES_AND_CATEGORIES}>
              {({data, loading, error})=>{
                  
                if (error) return <h1 className='error'>An Error Occured.</h1>

                if (loading) return <h1 className='loading'>Loading...</h1>
                
                else {
                  return(
                    <header>
                        <div className="left">{this.showCategories(data.categories)}</div>
                        <div className="center" onClick={this.props.clearBag}>
                            <img src={logo} alt="logo"/>
                        </div>
                        <div className="right">
                            <div className='currency-selector' onClick={() => this.props.changeCurrencyStatus()}>
                                <p  className='valute'>{this.props.currencySymbol}</p>
                                <img id="vector" src={vector} alt="vector"/>
                            </div> 
                            <div className={this.defineCurrencySwitcherClass(this.props.currencyStatusOn)}>{this.showCurrencies(data.currencies)}</div>
                            <div className='mini-cart'>
                                <div className='cart-icon-container' onClick={() => this.props.changeCartOverlayStatus()}>
                                  <span className={this.defineCartItemsClass(this.props.items)}>{this.props.items}</span>
                                  <img id="cart" className="cart-icon" src={cart} alt="cart"/>
                                </div>
                                <div className={this.defineCartoverlayClass(this.props.cartOverlayStatusOn)}>
                                  <CartOverlay items={this.state.items}/>
                                </div>
                            </div>
                            {/* showing message about item being added to the ca */}
                            <div className={this.defineAlertClass(this.props.alertStatus)}>
                              <p>Item added to Cart</p>
                            </div>
                        </div>
                    </header>
                  )
                }
              }
            }
            </Query>
          )
        }
      }

const mapStateToProps = (state) => {
  return {
    category: state.category,
    currency: state.currency,
    currencyStatusOn: state.currencyStatusOn,
    currencySymbol: state.currencySymbol,
    cartOverlayStatusOn: state.cartOverlayStatusOn,
    alertStatus: state.alertStatus,
    items: state.items
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (category) =>
      dispatch({ type: "CATEGORY_UPDATE", category: category }),
    changeCartOverlayStatus: () =>
      dispatch({ type: "CARTOVERLAYSTATUS_UPDATE"}),
    changeCurrencyStatus: () =>
      dispatch({ type: "CURRENCYSTATUS_UPDATE"}),
    changeCurrency: (currency, currencySymbol) =>
      dispatch({ type: "CURRENCY_UPDATE", currency: currency, currencySymbol: currencySymbol }),
    clearBag: () =>
      dispatch({ type: "CLEAR_BAG"}),
    close: () =>
      dispatch({ type: "CLOSE"})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);