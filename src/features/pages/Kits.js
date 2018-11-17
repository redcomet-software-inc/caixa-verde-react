import React, { Component } from 'react';
import CardKits from '../pages/CardKits.js'

export default class Kits extends Component {
  static propTypes = {

  };

   componentDidMount() {
    this.props.showComponent(true);
    console.log("Kit Log");
    console.log(this.props);
  }
  componentWillUnmount() {
    this.props.showComponent(false);
  }

  /* Get the Product ID and return the quantity from Selected Products */
  getIndexReturnQtd = index => {
    console.log("Get Quantity");
    console.log(index);
    var selectedKits = this.props.selectedKits;
    console.log(selectedKits);
    var checkExistingElement = 0;

    for (var i = 0; i <= selectedKits.length - 1; i++) {
      if (parseInt(selectedKits[i].id,10) === index) {
        checkExistingElement += 1;
        console.log("quantity:"+ selectedKits[i].quantity);
        return selectedKits[i].quantity;
      }
    }

    if (checkExistingElement === 0) {
      return 0;
    }
  };


  render() {
    return (
      <div className="pages-kits">
        <div className="card-deck">
          <div className="row">
      {this.props.kits.map((item, index) => (
            <div>
              {' '}
              <CardKits
                key={item.id}
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
        </div>
      </div>
    );
  }
}
