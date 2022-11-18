import React, { Component } from "react";

// styled components
import {
  SectionsWrapper,
  LeftSection,
  MiddleSection,
  RightSection,
  Button,
  ListOfOptions,
  Loader,
  // LoaderSVG,
} from "./Styles";

// modals
import Config from "../modals/Config";

// assets
// import loaderSvg from "../assets/loader.svg";

export default class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhoto: "",
      photoKey: 0,
      currency: "",
      current1Option: "",
      current2Option: "",
      current3Option: "",
      // add product data to cart
    };
  }
  componentDidMount() {
    const currentCurrency = this.props.currentCurrency;
    this.setState({
      ...this.state,
      currency: currentCurrency,
    });
    window.scrollTo(0, 0);
  }

  // functions

  // change bigger picture
  changePhoto = (name, index) => {
    this.setState({
      ...this.state,
      currentPhoto: [name],
      photoKey: index,
    });
  };
  // change currency
  currencySwitcher = (param) => {
    if (param !== null) {
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
    }
  };
  // change product options
  changeFirstOption = (param1, param2) => {
    this.setState({
      ...this.state,
      current1Option: param1 + param2,
      nameOf1Option: param1,
      option1Details: param2,
    });
  };
  changeSecondOption = (param1, param2) => {
    this.setState({
      ...this.state,
      current2Option: param1 + param2,
      nameOf2Option: param1,
      option2Details: param2,
    });
  };
  changeThirdOption = (param1, param2) => {
    this.setState({
      ...this.state,
      current3Option: param1 + param2,
      nameOf3Option: param1,
      option3Details: param2,
    });
  };
  render() {
    // get product data directly from local storage (to persist page refreshing)
    const localProductData = JSON.parse(
      localStorage.getItem("currentProductId")
    );
    const describtion = localProductData ? localProductData.description : "";
    return (
      <section>
        <SectionsWrapper
          inStock={localProductData ? localProductData.inStock : "true"}
        >
          {this.props.configComponent === true ? (
            <Config
              modalText={this.props.modalText}
              configComponent={this.props.configComponent}
            />
          ) : null}
          {this.props.loader === true ? <Loader>Loading...</Loader> : null}
          <LeftSection>
            {localProductData && this.props.loader !== true ? (
              localProductData.gallery.map((item, index) => {
                return (
                  <ul key={index}>
                    <li>
                      <img
                        key={index}
                        src={item}
                        alt="View of the product"
                        style={{
                          width: "64px",
                          height: "54px",
                          cursor: "pointer",
                          filter:
                            this.state.photoKey === index
                              ? "brightness(0.89)"
                              : "none",
                        }}
                        onClick={() => this.changePhoto(item, index)}
                      ></img>
                    </li>
                  </ul>
                );
              })
            ) : (
              <Loader>Loading...</Loader>
            )}
          </LeftSection>
          <MiddleSection>
            {this.state.currentPhoto !== "" ? (
              <img
                src={this.state.currentPhoto}
                alt="View of the product in the bigger format"
                style={{ width: "500px", height: "500px" }}
              ></img>
            ) : (
              <img
                src={localProductData && this.props.loader !== true ? localProductData.gallery[0] : <></>}
                alt="View of the product in the bigger format"
                style={{ width: "500px", height: "500px" }}
              ></img>
            )}
          </MiddleSection>
          <RightSection>
            <h2>{localProductData && localProductData.brand}</h2>
            <h3>{localProductData && localProductData.name}</h3>

            {/* FIRST OPTION */}

            {localProductData &&
              localProductData.attributes.slice(0, 1) &&
              localProductData.attributes.slice(0, 1).map((item, index) => {
                return (
                  <div key={index}>
                    <h4>{item.id}:</h4>
                    {item.items.map((i, c) => {
                      return (
                        <ListOfOptions
                          key={c}
                          onClick={() => this.changeFirstOption(item.id, i.id)}
                          param1={item.id}
                          param2={i.id}
                          currentOption={this.state.current1Option}
                          color={i.value}
                        >
                          {item.id !== "Color" ? i.id : null}
                        </ListOfOptions>
                      );
                    })}
                  </div>
                );
              })}

            {/* SECOND OPTION */}

            {localProductData &&
              localProductData.attributes.slice(1, 2) &&
              localProductData.attributes.slice(1, 2).map((item, index) => {
                return (
                  <div key={index}>
                    <h4>{item.id}:</h4>
                    {item.items.map((i, c) => {
                      return (
                        <ListOfOptions
                          key={c}
                          onClick={() => this.changeSecondOption(item.id, i.id)}
                          param1={item.id}
                          param2={i.id}
                          currentOption={this.state.current2Option}
                          color={i.value}
                        >
                          {item.id !== "Color" ? i.id : null}
                        </ListOfOptions>
                      );
                    })}
                  </div>
                );
              })}

            {/* THIRD OPTION */}

            {localProductData &&
              localProductData.attributes.slice(2, 3) &&
              localProductData.attributes.slice(2, 3).map((item, index) => {
                return (
                  <div key={index}>
                    <h4>{item.id}:</h4>
                    {item.items.map((i, c) => {
                      return (
                        <ListOfOptions
                          key={c}
                          onClick={() => this.changeThirdOption(item.id, i.id)}
                          param1={item.id}
                          param2={i.id}
                          currentOption={this.state.current3Option}
                          color={i.value}
                        >
                          {item.id !== "Color" ? i.id : null}
                        </ListOfOptions>
                      );
                    })}
                  </div>
                );
              })}

            <h4>price:</h4>
            <p
              style={{
                fontSize: "24px",
                lineHeight: "18px",
                fontWeight: "700",
              }}
            >
              {this.props.currentCurrency}
              {this.currencySwitcher(
                localProductData ? localProductData : null
              )}
            </p>
            <Button
              onClick={() =>
                this.props.handleProductAdd(
                  localProductData,
                  [
                    [this.state.nameOf1Option, this.state.current1Option],
                    [this.state.nameOf2Option, this.state.current2Option],
                    [this.state.nameOf3Option, this.state.current3Option],
                  ],
                  localProductData.id,
                  localProductData.inStock
                )
              }
              configComponent={this.props.configComponent}
            >
              add to cart
            </Button>
            {/*
            I'm aware that 'dangerouslySetInnerHTML' is making my app vulnerable to XSS 
            but it's just becouse I am not sure if I can use other libraries as e.g. 'dompurify' 
            */}
            <div
              dangerouslySetInnerHTML={{ __html: describtion }}
              style={{ marginTop: "30px", marginBottom: "30px" }}
            ></div>
          </RightSection>
        </SectionsWrapper>
      </section>
    );
  }
}
