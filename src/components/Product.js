import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import add from "../img/add.png"

class Product extends Component {
  //adding item to the cart with default attributes and quantity of 1
  addToCart = () => {
    this.props.updateBagItems({
      brand: this.props.productData.brand,
      gallery: this.props.productData.gallery,
      name: this.props.productData.name,
      prices: this.props.productData.prices,
      quantity: 1,
      attributes: this.props.productData.attributes.map( attribute => ({
          attributeName: attribute.name,
          type: attribute.type,
          items: attribute.items.map ( item => ({
            value: item.value
          })
          ),
          checkedValue: attribute.items[0].value
      })) 
    });
    this.props.updateAlertStatus(!this.props.alertStatus);
    setTimeout(() => {
      this.props.updateAlertStatus(!this.props.alertStatus);
    }, 2000);
  }
  //saving product data to show again in case of page refreshing
  saveData = (image) => {
    this.props.changeProductId(this.props.productData.id)
    this.props.changeProductImg(image[0])
    this.props.changeProductBrand(this.props.productData.brand)
  }
  //defininig Stock Class
  defineStockClass = (inStock) => {
    return inStock ? 'product' : 'product out-of-stock'
  }
  //defining Price Class
  definePriceClass = (inStock) => {
    return inStock ? 'price' : 'price out-of-stock'
  }

  render() {
    //declairing default image and product price
    let price = this.props.productData.prices.filter( price => price.currency.label===this.props.currency)[0].amount
    + this.props.productData.prices.filter( price => price.currency.label===this.props.currency)[0].currency.symbol;
    let image = this.props.productData.gallery;

    return (
      <div id="product" className={this.props.filterClass}>
          <div className='product-view' onClick={() => {this.saveData(image)}}>
            <Link to={this.props.link}>
              <img className={this.props.imgClass} src={image[0]} alt="Product" />
            </Link>
            <p className={this.props.stockStatus}>Out of Stock</p>
          </div>
          <p className={this.defineStockClass(this.props.productData.inStock)}>{this.props.productData.name} - {this.props.productData.brand}</p>
          <img className={this.props.addClass} src={add} alt="add" onClick={ () => this.addToCart()}/>
          <p className={this.definePriceClass(this.props.productData.inStock)}>{price}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    alertStatus: state.alertStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProductId: (id) =>
      dispatch({ type: "PRODUCTID_UPDATE", productID: id }),
    changeProductImg: (image) =>
      dispatch({ type: "PRODUCTIMG_UPDATE", productIMG: image }),
    changeProductBrand: (brand) =>
      dispatch({ type: "PRODUCTBRAND_UPDATE", productBrand: brand }),
    updateBagItems: (bag) =>
      dispatch({ type: "ADD_TO_CART", bag: bag }),
    updateAlertStatus: (status) =>
      dispatch({ type: "CHANGE_ALERT_STATUS", alertStatus: status })
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Product);
