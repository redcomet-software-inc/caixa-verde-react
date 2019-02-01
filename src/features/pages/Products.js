import React, { Component } from 'react';
import Card from '../pages/Card.js';
import Categories from '../components/Categories.js';
import LoaderHOC from '../../HOC/LoaderHOC.js';

class Products extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hide_products: 'hide-products',
      products_by_category:[],
      products_length:0,
      products_mounted:0,
      localLoading:false,
      itemData:[]
    }
  }

  refProducts = (products) => {
    this.setState({ products_by_category: products});
    this.setState({ products_length: products.length});
  }

  refItem = (itemData) => {
    this.setState({itemData: itemData});
    console.log("item data");
    console.log(itemData);
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

  turnOnLocalLoading = () => {
    this.setState({localLoading: true});
    this.setState({hide_products: 'hide-products'});
  }

  turnOffLocalLoading = () => {
    this.setState({localLoading: false});
    this.setState({hide_products: 'unhide-products'});
  }

  getQuantity = (id) => {
    let items = this.props.items;
    let quantity = 0;
    if (items["product" + id] !== undefined ) {
      quantity = items["product" + id].quantity;
    }
    return quantity;
  }

  renderCard = (item, index) => {
   return(
    <React.Fragment>
            {' '}
            <Card
              key={"card" + item.id}
              id={item.id}
              refItem={this.refItem}
              cardMounted={this.cardMounted}
              name={item.name}
              description={item.description}
              kind={item.kind}
              price={item.price}
              image={item.thumb}
              setMoneyFormat={this.props.setMoneyFormat}
              quantity={this.getQuantity(item.id)}
              productPlus={this.props.actions.productPlus}
              productMinus={this.props.actions.productMinus}
            />
      
    </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <h3 className="text-left title">Personalizado</h3>
       
        <div className="ml-auto">
          <Categories refProducts={this.refProducts} 
          localLoading={this.state.localLocalLoading} 
          turnOnLocalLoading={this.turnOnLocalLoading} 
          turnOffLocalLoading={this.turnOffLocalLoading}
          resetImgCount={this.resetImgCount} />
        </div>
        <div className={"card-columns mx-auto pb-5 " + this.state.hide_products} >
            {this.state.products_by_category.map((item, index) => (
                this.renderCard(item, index)
            ))}
        </div>
      </div>
    );
  }
}


export default LoaderHOC(Products);