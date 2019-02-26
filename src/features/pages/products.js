import React, { Component } from 'react';
import Card from '../pages/card.js';
import Categories from '../components/categories.js';
import LoaderHOC from '../../HOC/loader-hoc';

class Products extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hide_products: 'hide-products',
      products_by_category:[],
      products_length:0,
      products_mounted:0,
      productData:[],
      myBox:[],
    }
  }

  refProducts = (products) => {
    this.setState({ products_by_category: products});
    this.setState({ products_length: products.length});
  }

  refProduct = (productData) => {
    this.setState({productData: productData});
  }

  cardMounted = () => {
    let products_mounted = this.state.products_mounted + 1;
    this.setState({ products_mounted: products_mounted});
    if(products_mounted === this.state.products_length) {
      this.props.actions.turnOffLoading();
    }
  }

  resetImgCount = () => {
    this.setState({products_mounted: 0});
    this.setState({ localLoading: false});
  }

  getQuantity = (id) => {
    let products = this.props.products; // this comes from Redux Store
    let quantity = 0;
    if (products["product" + id] !== undefined ) {
      quantity = products["product" + id].quantity;
    }
    return quantity;
  }

  renderCard = (item, index) => {
   return(
    <React.Fragment>
      {this.state.products_by_category.map((item, index) => (
            <Card
              key={"card" + item.id}
              id={item.id}
              refProduct={() => this.refProduct}
              cardMounted={this.cardMounted}
              name={item.name}
              description={item.description}
              kind={item.kind}
              price={item.price}
              thumb={item.thumb}
              setMoneyFormat={this.props.setMoneyFormat}
              quantity={this.getQuantity(item.id)}
              productPlus={this.props.actions.productPlus}
              productMinus={this.props.actions.productMinus}
              getOrderPrice={this.props.actions.getOrderPrice}
            />
      ))}
    </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <h3 className="text-left title">Personalizado</h3>
          <div className="ml-auto">
            <Categories refProducts={this.refProducts} 
            resetImgCount={this.resetImgCount} />
          </div>
          <div className={"card-columns mx-auto pb-5 "} >
            { this.renderCard() }
          </div>
      </div>
    );
  }
}


export default LoaderHOC(Products);