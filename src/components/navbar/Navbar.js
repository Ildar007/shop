import React, { Component } from "react";
import { Link } from "react-router-dom";
// components
import Dropdown from "./Dropdown";
// style
import "./Navbar.css";
// assets
import LOGO from "../assets/logo.png";
import CART from "../assets/empty-cart.png";
import vector_up from "../assets/vector-up.png";
import vector__down from "../assets/vector-down.png";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      scrolled: false,
      isSelected: false,
    };
    this.wrapperRef = React.createRef();
    this.selectorRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  currencySymbolOptions = [
    { value: this.props.data[0].symbol[0], text: "$" },
    { value: this.props.data[0].symbol[1], text: "£" },
    { value: this.props.data[0].symbol[2], text: "A$" },
    { value: this.props.data[0].symbol[3], text: "¥" },
    { value: this.props.data[0].symbol[4], text: "₽" },
  ];
  dropdownToggler = () => {
    this.setState((prevState) => ({
      ...this.state,
      toggler: !prevState.toggler,
    }));
  };
  handleClickOutside(event) {
    if (
      this.state.toggler === true &&
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.setState((prevState) => ({
        toggler: !prevState.toggler,
      }));
    } else if (
      this.state.isSelected === true &&
      this.selectorRef &&
      !this.selectorRef.current.contains(event.target)
    ) {
      this.setState((prevState) => ({
        isSelected: !prevState.isSelected,
      }));
    }
  }
  handleScroll = () => {
    const offset = window.scrollY;
    if (offset >= 0.1) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  };
  handleSelect = () => {
    this.setState((prevState) => ({
      isSelected: !prevState.isSelected,
    }));
  };
  render() {
    return (
      <nav className={this.state.scrolled === false ? null : "nav nav__active"}>
        <div className="nav__wrapper">
          <div className="category__section">
            <ul>
              <li>
                <Link
                  to="/"
                  onClick={() => this.props.toggleClicked("tech")}
                  className={
                    this.props.currentCateg === "tech" ? "selected" : null
                  }
                >
                  tech
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => this.props.toggleClicked("clothes")}
                  className={
                    this.props.currentCateg === "clothes" ? "selected" : null
                  }
                >
                  clothes
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => this.props.toggleClicked("all")}
                  className={
                    this.props.currentCateg === "all" ? "selected" : null
                  }
                >
                  all
                </Link>
              </li>
            </ul>
          </div>
          <div className="logo__section">
            <Link to="/">
              <img src={LOGO} alt="logo" />
            </Link>
          </div>
          <div className="buttons__section">
            <div
              className={
                this.state.isSelected === true
                  ? "custom__select bttns__disabled"
                  : "custom__select"
              }
              onClick={this.handleSelect}
            >
              <div className="select__el__container">
                <div className="select__el1">{this.props.currentCurrency}</div>
                <div className="select__el2">
                  {this.state.isSelected === false ? (
                    <img src={vector__down} alt='down arrow'/>
                  ) : (
                    <img src={vector_up} alt='up arrow'/>
                  )}
                </div>
              </div>
              <ul
                ref={this.selectorRef}
                className={
                  this.state.isSelected === false
                    ? "ul__select"
                    : "ul__select ul__visible"
                }
              >
                {this.currencySymbolOptions.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => this.props.handleOnChange(item.text)}
                      value={"123"}
                      className={
                        item.text === this.props.currentCurrency
                          ? "l__select l__selected"
                          : "l__select"
                      }
                    >
                      {item.text}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              className={
                this.state.toggler === true
                  ? "nav__bttns bttns__disabled"
                  : "nav__bttns"
              }
            >
              <button onClick={() => this.dropdownToggler()}>
                <img src={CART} alt="shopping cart button" />
              </button>
            </div>
            <div
              className={
                this.props.quantityOfProducts > 0
                  ? "floating__btn active__btn"
                  : "floating__btn"
              }
            >
              {this.props.quantityOfProducts}
            </div>

            <div
              className={
                this.state.toggler
                  ? "dropdown__wrapper dropdown__wrapper__active"
                  : "dropdown__wrapper"
              }
            >
              <div
                ref={this.wrapperRef}
                className={
                  this.state.toggler
                    ? "dropdown__menu dropdown__visible"
                    : "dropdown__menu"
                }
              >
                <Dropdown
                  storageOfProducts={this.props.storageOfProducts}
                  dropdownToggler={this.dropdownToggler}
                  currentCurrency={this.props.currentCurrency}
                  handleCartChange={this.props.handleCartChange}
                  handlePhotoIncreament={this.props.handlePhotoIncreament}
                  handlePhotoDecreament={this.props.handlePhotoDecreament}
                  quantityAdd={this.props.quantityAdd}
                  quantitySubtract={this.props.quantitySubtract}
                  // totalQuantity={this.props.totalQuantity}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
