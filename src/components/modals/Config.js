import React, { Component } from "react";
import styled from "styled-components";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  width: 400px;
  height: 100px;
  background: var(--bg-primary);
  z-index: 98;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid var(--text-dark);
  align-items: center;
  justify-content: center;
  animation: movingTopToBottom 1s normal forwards ease-in-out;
  @keyframes movingTopToBottom {
    0% {
      top: 30px;
    }
    100% {
      top: 90px;
    }
  }
`;
const Content = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
`;
const Border = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  animation: 1.4s in-out forwards;
  height: 5px;
  background: var(--light-green);
  @keyframes in-out {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;
export default class Config extends Component {
  render() {
    return (
      <Wrapper ref={this.wrapperRef}>
        <Content>
          {this.props.modalText === "Succes! Product added to cart" ? (
            <AiFillCheckCircle
              style={{
                fontSize: "24px",
                color: "var(--light-green)",
                transform: "translateY(5px)",
                paddingRight: "5px",
              }}
            />
          ) : (
            <AiFillExclamationCircle
              style={{
                fontSize: "24px",
                color: "var(--light-green)",
                transform: "translateY(5px)",
                paddingRight: "5px",
              }}
            />
          )}
          {this.props.modalText}
        </Content>
        <Border />
      </Wrapper>
    );
  }
}