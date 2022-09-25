import React, { Component } from 'react'
import { store } from '../redux/store'
import left from "../img/left.png"
import right from "../img/right.png"

export default class CartItem extends Component {
    state = {
        checkedIMG: store.getState().productIMG,
        imageID : 0
    }
    //showing previous page
    previousImage = () => {
      if(this.state.imageID === 0){
        this.setState({
          imageID: this.props.img.length - 1
        })
      } else {
        this.setState({
          imageID: this.state.imageID - 1
        })
      }
    }    
    //showing next page
    nextImage = () => {
      if(this.state.imageID === this.props.img.length-1){
        this.setState({
          imageID: 0
        })
      } else {
        this.setState({
          imageID: this.state.imageID + 1
        })
      }
    }
    //defining attribute class to show off checked attributes
    defineAttributeClass = ( checkedValue, value ) => {
      return checkedValue === value ? "size checked-size" : "size" 
    }
    //defining image switcher class
    defineImageSwitcherClass = (length) => {
      return length > 1 ? "nav" : "nav-hidden"
    }
    //defining color class
    defineColorClass = (checkedValue, value) =>{
      return checkedValue === value ? "color checked-clr" : "color"
    }
    //map attributes
    mapAttributes = (attributes) => {
      return attributes.map( data => {
        return(
          <div key={data.attributeName} className='attribute-container'>
            <div className='txt'>{data.attributeName.toUpperCase()}:</div>
            <div className="choices">{this.showAttributes(data)}</div>
          </div>
       )                                
      })
    }
    //showing attributes
    showAttributes = (data) => {
      return data.items.map( item  => {
        if(data.type === "swatch"){
          return(
            <div key={item.value} id={item.value} type={data.attributeName} className={this.defineColorClass(data.checkedValue, item.value)} 
            onClick={this.changeAttribute} style={{backgroundColor: item.value}}></div>
          )
        } else {
          return(
            <div key={item.value} id={item.value} type={data.attributeName} className={ this.defineAttributeClass(data.checkedValue, item.value) } 
              >{item.value}</div>
          )
        }
      })
    }
    //showing product price
    showPrice = (prices) => {
      return prices.filter( price => 
        price.currency.label===store.getState().currency
      )[0].amount + " " + this.props.prices.filter( price => 
        price.currency.label===store.getState().currency
      )[0].currency.symbol
    }

  render() {
    return (
      <div className='cart-container'>
          <div className='single-product'>
                <div className='info-container'>
                  <div className='brand'>{this.props.brand}</div>
                  <div className='name'>{this.props.name}</div>
                  <div className='product-price'>{this.showPrice(this.props.prices)}</div>
                  {this.mapAttributes(this.props.productAttributes)}
                </div>
                <div className='quantity'>
                    <button id={this.props.id} onClick={() => this.props.increase(this.props.id)}>+</button>
                    <p>{this.props.quantity}</p>
                    <button id={this.props.id} onClick={() => this.props.decrease(this.props.id)}>-</button>
                </div>
                <div className='product-images'>
                    <img src={this.props.img[this.state.imageID]} alt="glasses"/>
                    <div className={this.defineImageSwitcherClass(this.props.img.length)}>
                        <button><img src={left} alt="vector" onClick={this.previousImage}></img></button>
                        <button><img src={right} alt="vector" onClick={this.nextImage}></img></button>
                    </div>
                </div>
          </div>
      </div>
    )
  }
}