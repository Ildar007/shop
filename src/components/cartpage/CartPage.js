import React, { Component } from "react";

import {
  CartWrapper,
  CartProduct,
  CartLeftSection,
  ReturnedProduct,
  CartRightSection,
  PhotoContainer,
  ListOfOptions,
  ButtonOrder,
  ButtonAdd,
  ButtonRemove,
  ImgOne,
  ImgTwo,
  Quantity,
  ListOfColors,
  QuantitySection,
  TitleWrapper,
  PhotoSection,
  Summary,
  ImgBtnLeft,
  ImgBtnRight,
} from "./Styles";

// assets
import SLIDERLEFT from "../assets/slider-left.png";
import SLIDERRIGHT from "../assets/slider-right.png";
import horizontalVector from "../assets/VectorHorizontal.jpg";

export default class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenOptions: [],
    };
  }
  componentDidMount() {
    if (this.props.storageOfProducts.products.length !== 0) {
      const listOfProducts = this.props.storageOfProducts;
      const chosenOptions = listOfProducts.products[0].newProduct.chosenOptions;
      this.setState({
        ...this.state,
        chosenOptions: [chosenOptions],
      });
    } else return;
  }
  currencySwitcher = (param) => {
    switch (this.props.currentCurrency) {
      case "$":
        return <>{param.prices[0].amount}</>;
      case "£":
        return <>{param.prices[1].amount}</>;
      case "A$":
        return <>{param.prices[2].amount}</>;
      case "¥":
        return <>{param.prices[3].amount}</>;
      case "₽":
        return <>{param.prices[4].amount}</>;
    }
  };
  currencyNumber = () => {
    switch (this.props.currentCurrency) {
      case "$":
        return 0;
      case "£":
        return 1;
      case "A$":
        return 2;
      case "¥":
        return 3;
      case "₽":
        return 4;
    }
  };
  render() {
    const totalQuantity = this.props.storageOfProducts.products.reduce(
      (total, currentItem) => (total = total + currentItem.newProduct.quantity),
      0
    );
    const totalAmount = this.props.storageOfProducts.products.reduce(
      (total, currentItem) =>
        (total =
          total +
          currentItem.newProduct.productData.prices[this.currencyNumber()]
            .amount *
            currentItem.newProduct.quantity),
      0
    );
    const tax = totalAmount * 0.21;
    const totalAmountWthTax = totalAmount + tax;
    const roundedTax = tax.toFixed(2);
    const roundedSum = totalAmountWthTax.toFixed(2);
    const product = this.props.storageOfProducts;
    return (
      <section>
        <CartWrapper>
          <TitleWrapper>
            <h1>cart</h1>
          </TitleWrapper>
          <CartProduct>
            {this.props.storageOfProducts.products.length === 0
              ? null
              : product.products.map((item, index) => {
                  const option1 = item.newProduct.chosenOptions[0]
                    ? item.newProduct.chosenOptions[0][1]
                    : null;
                  const option2 = item.newProduct.chosenOptions[1]
                    ? item.newProduct.chosenOptions[1][1]
                    : null;
                  const option3 = item.newProduct.chosenOptions[2]
                    ? item.newProduct.chosenOptions[2][1]
                    : null;
                  const number = item.newProduct.slideHandler;
                  const productId = item.newProduct.id;
                  const productUniqueId = item.newProduct.uniqueId
                  return (
                    <ReturnedProduct key={index}>
                      <CartLeftSection>
                        <h1>{item.newProduct.productData.brand}</h1>
                        <h2>{item.newProduct.productData.id}</h2>
                        <h3>
                          {this.props.currentCurrency}
                          {this.currencySwitcher(item.newProduct.productData)}
                        </h3>
                        {item.newProduct.productData.attributes.map(
                          (item, index) => {
                            return (
                              <div key={index}>
                                <p>{item.id}:</p>
                                {item.items.map((a, i) => {
                                  return item.id !== "Color" ? (
                                    <ListOfOptions
                                      key={i}
                                      propsOption1={
                                        option1 === null ? null : option1
                                      }
                                      propsOption2={
                                        option2 === null ? null : option2
                                      }
                                      propsOption3={
                                        option3 === null ? null : option3
                                      }
                                      paramId={a.id}
                                      paramName={item.id}
                                      onClick={() =>
                                        this.props.handleCartChange(
                                          productId,
                                          a.id,
                                          item.id,
                                          productUniqueId
                                        )
                                      }
                                    >
                                      {item.id !== "Color" ? a.id : null}
                                    </ListOfOptions>
                                  ) : (
                                    <ListOfColors
                                      key={i}
                                      color={a.value}
                                      propsOption1={
                                        option1 === null ? null : option1
                                      }
                                      propsOption2={
                                        option2 === null ? null : option2
                                      }
                                      propsOption3={
                                        option3 === null ? null : option3
                                      }
                                      paramId={a.id}
                                      paramName={item.id}
                                      onClick={() =>
                                        this.props.handleCartChange(
                                          productId,
                                          a.id,
                                          item.id,
                                          productUniqueId
                                        )
                                      }
                                    >
                                      {item.id !== "Color" ? a.id : null}
                                    </ListOfColors>
                                  );
                                })}
                              </div>
                            );
                          }
                        )}
                      </CartLeftSection>
                      <CartRightSection>
                        <QuantitySection>
                          <ButtonAdd
                            onClick={() => this.props.quantityAdd(productUniqueId)}
                          >
                            <ImgOne>
                              <img
                                src={horizontalVector}
                                alt="Horizontal vector"
                              />
                            </ImgOne>
                            <ImgTwo>
                              <img
                                src={horizontalVector}
                                alt="Vertical vector"
                              />
                            </ImgTwo>
                          </ButtonAdd>
                          <Quantity>
                            <p>{item.newProduct.quantity}</p>
                          </Quantity>
                          <ButtonRemove
                            onClick={() =>
                              this.props.quantitySubtract(productUniqueId)
                            }
                          >
                            <ImgOne>
                              <img
                                src={horizontalVector}
                                alt="Horizontal vector"
                              />
                            </ImgOne>
                          </ButtonRemove>
                        </QuantitySection>
                        <PhotoSection>
                          <PhotoContainer>
                            <img
                              src={item.newProduct.productData.gallery[number]}
                              alt="First view of the product"
                            />
                          </PhotoContainer>

                          {item.newProduct.productData.gallery.length > 1 ? (
                            <ImgBtnLeft
                              onClick={() =>
                                this.props.handlePhotoDecreament(productUniqueId)
                              }
                            >
                              <img src={SLIDERLEFT} alt="left arrow" />
                            </ImgBtnLeft>
                          ) : null}
                          {item.newProduct.productData.gallery.length > 1 ? (
                            <ImgBtnRight
                              onClick={() =>
                                this.props.handlePhotoIncreament(productUniqueId)
                              }
                            >
                              <img src={SLIDERRIGHT} alt="right arrow" />
                            </ImgBtnRight>
                          ) : null}
                        </PhotoSection>
                      </CartRightSection>
                    </ReturnedProduct>
                  );
                })}
          </CartProduct>

          <Summary>
            <p>Tax 21%: </p>
            <h2>
              {this.props.currentCurrency}
              {roundedTax}
            </h2>
            <br />
            <p>Quantity: </p>
            <h2>{totalQuantity}</h2>
            <br />
            <p>Total: </p>
            <h2>
              {this.props.currentCurrency}
              {roundedSum}
            </h2>
            <br />
            <ButtonOrder>order</ButtonOrder>
          </Summary>
        </CartWrapper>
      </section>
    );
  }
}
