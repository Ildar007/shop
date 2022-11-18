import React, { Component } from "react";

// components
import AllCateg from "./AllCateg";
import TechCateg from "./TechCateg";
import ClothesCateg from "./ClothesCateg";

export default class StartPage extends Component {
  constructor(props) {
    super(props);
  }
  renderSwitch = () => {
    switch (this.props.currentCategory) {
      case "all":
        return (
          <AllCateg
            currentPathname={this.props.currentPathname}
            handleProductAdd={this.props.handleProductAdd}
            inStock={this.props.inStock}
            allCateg={this.props.allCateg}
            currencyData={this.props.currencyData}
            currencySwitcher={this.props.currencySwitcher}
            productIdCallback={this.props.productIdCallback}
            loader={this.props.loader}
          />
        );
      case "tech":
        return (
          <TechCateg
            currentPathname={this.props.currentPathname}
            handleProductAdd={this.props.handleProductAdd}
            inStock={this.props.inStock}
            techCateg={this.props.techCateg}
            currencyData={this.props.currencyData}
            currencySwitcher={this.props.currencySwitcher}
            productIdCallback={this.props.productIdCallback}
            loader={this.props.loader}
          />
        );
      case "clothes":
        return (
          <ClothesCateg
            currentPathname={this.props.currentPathname}
            handleProductAdd={this.props.handleProductAdd}
            inStock={this.props.inStock}
            clothesCateg={this.props.clothesCateg}
            currencyData={this.props.currencyData}
            currencySwitcher={this.props.currencySwitcher}
            productIdCallback={this.props.productIdCallback}
            loader={this.props.loader}
          />
        );
    }
  };
  render() {
    return <section>{this.renderSwitch()}</section>;
  }
}
