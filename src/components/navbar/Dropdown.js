import { Component } from "react";
import { Link } from "react-router-dom";
// styles
import {
  CartWrapper,
  TitleWrapper,
  CartProduct,
  ReturnedProduct,
  Buttons,
  ButtonOne,
  ButtonTwo,
  CartLeftSection,
  ListOfOptions,
  ListOfColors,
  CartRightSection,
  QuantitySection,
  ButtonAdd,
  ImgOne,
  ImgTwo,
  Quantity,
  ButtonRemove,
  PhotoSection,
  PhotoContainer,
  Summary,
} from "./DropdownStyles";
// assets
import PLUS from "../assets/plus.png";
import MINUS from "../assets/minus.png";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const totalAmount = this.props.storageOfProducts.products.reduce(
        (total, currentItem) =>
          (total =
            total +
            currentItem.newProduct.productData.prices[this.currencyNumber()]
              .amount *
              currentItem.newProduct.quantity),
        0
      ),
      roundedSum = totalAmount.toFixed(2),
      product = this.props.storageOfProducts;
    return (
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
                            <img src={PLUS} alt="Horizontal vector" />
                          </ImgOne>
                        </ButtonAdd>
                        <Quantity>
                          <p>{item.newProduct.quantity}</p>
                        </Quantity>
                        <ButtonRemove
                          onClick={() => this.props.quantitySubtract(productUniqueId)}
                        >
                          <ImgTwo>
                            <img src={MINUS} alt="Horizontal vector" />
                          </ImgTwo>
                        </ButtonRemove>
                      </QuantitySection>
                      <PhotoSection>
                        <PhotoContainer>
                          <img
                            src={item.newProduct.productData.gallery[0]}
                            alt="View of the product"
                          />
                        </PhotoContainer>
                      </PhotoSection>
                    </CartRightSection>
                  </ReturnedProduct>
                );
              })}
        </CartProduct>
        <Summary>
          <p>Total</p>{" "}
          <p>
            {this.props.currentCurrency}
            {roundedSum}
          </p>
        </Summary>
        <Buttons>
          <ButtonOne onClick={this.props.dropdownToggler}>
            <Link to="/cart">
              <button>view bag</button>
            </Link>
          </ButtonOne>
          <ButtonTwo>
            <button>checkout</button>
          </ButtonTwo>
        </Buttons>
      </CartWrapper>
    );
  }
}
