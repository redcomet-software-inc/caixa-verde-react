import React, { Component } from 'react';
import CardKits from '../pages/CardKits.js';
import LoaderHOC from '../../HOC/LoaderHOC.js';

class Kits extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemData:[],
    }
  }

  refItem = (itemData) => {
    this.setState({itemData: itemData});
    console.log("item data");
    console.log(itemData);
  }

  getQuantity = (id) => {
    let items = this.props.items;
    let quantity = 0;
    if (items["kit" + id] !== undefined ) {
      quantity = items["kit" + id].quantity;
    }
    return quantity;
  }

  render() {
    return (
        <div className="card-deck mx-auto">
        { this.props.kits === undefined || (
          this.props.kits.map((item, index) => (
              <div className="m-2">
                {' '}
                <CardKits
                  key={"cardkit" + item.id}
                  id={item.id}
                  setMoneyFormat={this.props.setMoneyFormat}
                  name={item.name}
                  description={item.description}
                  price={item.price_kit}
                  products={item.products}
                  quantity={this.getQuantity(item.id)}
                  refItem={this.refItem}
                  addCardCount={this.props.addCardCount}
                  productPlus={this.props.actions.productPlus}
                  productMinus={this.props.actions.productMinus}
                  ref={instance => {this.card = instance; }} />
                </div>
            )))}
            </div>
      );
  }
}

export default LoaderHOC(Kits);