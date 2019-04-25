import React, { Component } from 'react';
import Card from '../pages/card.js';
import Categories from '../components/categories.js';
import LoaderHOC from '../../HOC/loader-hoc';
import { setMoneyFormat } from '../home/local-actions';
import { getProducts } from '../../common/get-products.js';

class Products extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hide_products: 'hide-products',
      products_by_category:[],
      products_length:0,
      productData:[],
      myBox:[],
    }
  }

  componentDidMount () {
    this.props.actions.turnOffLoading();
    this.getProducts();
  }

  getProducts = () => {
    getProducts().then(res => {
     this.setState({productData: res});
     this.props.actions.products(res);
   }); 
 }

  refProducts = (products) => {
    this.setState({ products_by_category: products});
    this.setState({ products_length: products.length});
  }

  refFilter = (filter) => {
    this.setState({filter});
  }

  resetImgCount = () => {
    this.setState({products_mounted: 0});
    this.setState({ localLoading: false});
  }

  getQuantity = (id) => {
    let products = this.props.home.selected_products; // this comes from Redux Store
    let quantity = 0;
    if (products["product" + id] !== undefined ) {
      quantity = products["product" + id].quantity;
    }
    return quantity;
  }

  renderCard = () => {
    let table = [];
    const filter = this.props.pages.products_category_filter;

    let products = this.props.home.products;
    if(typeof products !== "undefined") {
      for(let product in products) {
        if(products[product].categories.includes(filter) || this.props.pages.products_category_filter === "Tudo") {
          table.push(
            <Card
              key={"card" + products[product].id}
              id={products[product].id}
              refProduct={() => this.refProduct}
              name={products[product].name}
              description={products[product].description}
              kind={products[product].kind}
              price={products[product].price}
              thumb={products[product].thumb}
              setMoneyFormat={setMoneyFormat()}
              quantity={this.getQuantity(products[product].id)}
              productPlus={this.props.actions.productPlus}
              productMinus={this.props.actions.productMinus}
              getOrderPrice={this.props.actions.getOrderPrice}
            />
          );
        }
      }
    }
    return table;
  }

  render() {
    return (
      <div>
        <h3 className="text-left title">Personalizado</h3>
          <div className="ml-auto">
            <Categories refFilter={this.refFilter}
            resetImgCount={this.resetImgCount} {...this.props} />
          </div>
          <div className={"card-columns mx-auto pb-5 "} >
            { this.renderCard() }
          </div>
      </div>
    );
  }
}


export default LoaderHOC(Products);