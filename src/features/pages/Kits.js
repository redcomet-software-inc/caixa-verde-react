import React, { Component } from 'react';
import CardKits from '../pages/CardKits.js';
import LoaderHOC from '../../HOC/LoaderHOC.js';

class Kits extends Component {

  componentDidMount() {
    setTimeout(()=>{this.props.actions.turnOffLoading()}, 50);
  }

  /* Get the Product ID and return the quantity from Selected Products */
  getIndexReturnQtd = index => {
    var selectedKits = this.props.selectedKits;
    var checkExistingElement = 0;
    for (var i = 0; i <= selectedKits.length - 1; i++) {
      if (parseInt(selectedKits[i].id,10) === index) {
        checkExistingElement += 1;
        return selectedKits[i].quantity;
      }
    }
    if (checkExistingElement === 0) {
      return 0;
    }
  };

  render() {
    return (
        <div className="card-deck mx-auto">
          {this.props.kits.map((item, index) => (
              <div className="m-2">
                {' '}
                <CardKits
                  id={item.id}
                  setMoneyFormat={this.props.setMoneyFormat}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  products={item.products}
                  quantity={this.getIndexReturnQtd(item.id)}
                  addCardCount={this.props.addCardCount}
                  subtractCardCountKit={this.props.subtractCardCountKit}
                  ref={instance => {
                    this.card = instance;
                  }}
                />
              </div>
            ))}
          </div>
      );
  }
}

export default LoaderHOC(Kits);