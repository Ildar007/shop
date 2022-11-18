import styled from "styled-components";

export const CartWrapper = styled.div`
  position: relative;
  padding: 32px 16px 32px 16px;
  text-align: left;
  min-height: 400px;
`;
export const TitleWrapper = styled.div``;
export const CartProduct = styled.div``;
export const ReturnedProduct = styled.div`
  display: grid;
  grid-template-columns: 50% 10% 40%;
  gap: 2rem;
  max-height: 400px;
  padding-bottom: 50px;
  :last-child {
    padding-bottom: 100px;
  }
`;
export const CartLeftSection = styled.div`
  transform: none !important;
  h1,
  h2 {
    font-size: 16px;
    font-weight: 300;
  }
  h3 {
    font-size: 16px;
    font-weight: 600;
  }
  p {
    font-weight: 400;
  }
`;
export const ListOfOptions = styled.button`
  padding-left: 5px !important;
  transform: none !important;
  min-width: 24px !important;
  width: auto !important;
  height: 24px !important;
  text-align: center;
  margin-right: 5px !important;
  margin-bottom: 10px;
  background: var(--bg-primary) !important;
  color: var(--text-dark);
  ${({ propsOption1, paramName, paramId }) =>
    propsOption1 === paramName + paramId
      ? "background: var(--text-dark) !important"
      : null};
  ${({ propsOption2, paramName, paramId }) =>
    propsOption2 === paramName + paramId
      ? "background: var(--text-dark) !important"
      : null};
  ${({ propsOption3, paramName, paramId }) =>
    propsOption3 === paramName + paramId
      ? "background: var(--text-dark) !important"
      : null};
  ${({ propsOption1, paramName, paramId }) =>
    propsOption1 === paramName + paramId ? "color: var(--bg-primary)" : null};
  ${({ propsOption2, paramName, paramId }) =>
    propsOption2 === paramName + paramId ? "color: var(--bg-primary)" : null};
  ${({ propsOption3, paramName, paramId }) =>
    propsOption3 === paramName + paramId ? "color: var(--bg-primary)" : null};
  font-size: 14px;
  border: 1px solid var(--text-dark) !important;
  font-family: "Source Sans Pro", sans-serif;
  cursor: pointer;
  transform: none;
`;
export const ListOfColors = styled.button`
  width: 16px !important;
  height: 16px !important;
  padding-left: 5px !important;
  transform: none !important;
  background: ${(props) => props.color} !important;
  ${({ propsOption1, paramName, paramId }) =>
    propsOption1 === paramName + paramId
      ? "outline: 2px solid var(--light-green) !important"
      : null};
  ${({ propsOption2, paramName, paramId }) =>
    propsOption2 === paramName + paramId
      ? "outline: 2px solid var(--light-green) !important"
      : null};
  ${({ propsOption3, paramName, paramId }) =>
    propsOption3 === paramName + paramId
      ? "outline: 2px solid var(--light-green) !important"
      : null};
  border: 1px solid var(--bg-primary) !important;
  margin: 0 5px 0 0 !important;
  cursor: pointer;
`;
export const CartRightSection = styled.div`
  height: 190px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;
export const QuantitySection = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: auto 60% auto;
  gap: 0.6rem;
`;
export const ButtonAdd = styled.div`
  width: 24px;
  height: 24px;
  background: transparent;
  border: 1px solid #1d1f22;
  position: relative;
  transition: all 0.4s ease;
  cursor: pointer;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  :hover {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid transparent;
  }
`;
export const ImgOne = styled.div`
  width: 24px;
  height: 24px;
  margin: auto;
  text-align: center;
  padding-top: 2px;
`;
export const ImgTwo = styled.div`
    position: relative;
    width: 24px;
    height: 24px;
    text-align: center;
    margin-left: -6px;
    img {
        position: absolute
        top: 50px;
    }
`;
export const Quantity = styled.div`
    height: auto
    text-align: center;
        p {
            margin: auto;
            position: relative;
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 16px;
            line-height: 38.4px;
            font-weight: 500;
        }
`;
export const ButtonRemove = styled.button`
  width: 24px;
  height: 24px;
  background: transparent;
  border: 1px solid #1d1f22;
  position: relative;
  transition: all 0.4s ease;
  cursor: pointer;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  :hover {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid transparent;
  }
`;
export const PhotoSection = styled.div``;
export const PhotoContainer = styled.div`
  padding-top: 0;
  img {
    width: 121px;
    height: 190px;
    object-fit: cover;
    filter: brightness(0.95);
  }
`;
export const Summary = styled.div`
  display: flex;
  bottom: 70px;
  position: absolute;
  width: 380px;
  justify-content: space-between;
  p {
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
  }
  p:nth-child(2) {
    font-weight: 700;
  }
`;

export const Buttons = styled.div`
  display: flex;
  bottom: 0;
  position: absolute;
  width: 380px;
  justify-content: space-between;
  gap: 0.5rem;
  padding-bottom: 15px;
`;
export const ButtonOne = styled.div`
  button {
    width: 190px;
    height: 43px;
    border: 1px solid var(--text-dark);
    color: var(--text-dark);
    font-size: 14px;
    font-weight: 600;
    background: var(--bg-primary);
    text-transform: uppercase;
    cursor: pointer;
    :hover {
      background: var(--light-green);
      border: none;
      color: var(--bg-primary);
      -webkit-transition: background-color 500ms esse-in-out;
      -ms-transition: background-color 500ms esse-in-out;
      transition: background-color 500ms ease-in-out;
    }
  }
`;
export const ButtonTwo = styled.div`
  button {
    width: 190px;
    height: 43px;
    border: none;
    color: var(--bg-primary);
    font-size: 14px;
    font-weight: 600;
    background: var(--light-green);
    text-transform: uppercase;
    cursor: pointer;
    :hover {
      border: 1px solid var(--text-dark);
      color: var(--text-dark);
      background: var(--bg-primary);
      -webkit-transition: background-color 500ms esse-in-out;
      -ms-transition: background-color 500ms esse-in-out;
      transition: background-color 500ms ease-in-out;
    }
  }
`;
