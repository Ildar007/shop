import React, { Component } from 'react'
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'
import Product from "../components/Product"
import { store } from '../redux/store'
import { connect } from "react-redux";
import '../styles/category.css'
import '../styles/cart-overlay.css'

const GET_ALL = gql`
 query getCategoryByName ($title: String!) {
  category(input:{title: $title}){
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        name
        items {
          value
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
}`

class Category extends Component {
    //defining background Class
    defineBackgroundClass = (status) => {
      return status ? "cart-overlay-background" : "cart-overlay-background hide"
    }
    //show category products
    showProducts = (products) => {
        return products.map( (product, index) => {
        return(
          <Product productData = { product } id={index} key={index}
          imgClass={product.inStock ? "product-img" : "product-img out-of-stock"} 
          stockStatus={product.inStock ? "hide" : "stockStatus"}
          filterClass={product.inStock ? "activatedFilter" : ""}
          addClass={product.inStock ? "activatedCart" : "deactivatedCart"}
          link="/PDP"/>
        )
      })
    }

    render() {
    return (
      <Query query={GET_ALL}  variables={{title: this.props.category.toLowerCase()}}>
        {({data, loading, error})=>{
            
          if (error) return <h1 className='error'>An Error Occured.</h1>

          if (loading) return <h1 className='loading'>Loading...</h1>
          
          else {
            return(
              <div className='category-container' onClick={() => this.props.close()}>
                <div className={this.defineBackgroundClass(this.props.cartOverlayStatusOn)}></div>
                <div className='category-name'>{store.getState().category}</div>
                <div className='content'>{this.showProducts(data.category.products)}</div>
              </div>
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
    cartOverlayStatusOn: state.cartOverlayStatusOn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () =>
      dispatch({ type: "CLOSE"})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Category);