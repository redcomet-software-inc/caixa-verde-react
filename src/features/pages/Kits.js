import React, { Component } from 'react';
import CardKits from '../pages/CardKits.js'

export default class Kits extends Component {
  static propTypes = {

  };

   componentDidMount() {
    this.props.showComponent(true);
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
  }
  componentWillUnmount() {
    this.props.showComponent(false);
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
     
    );
  }
}
