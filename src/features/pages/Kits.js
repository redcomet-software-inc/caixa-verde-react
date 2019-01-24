import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardKits from '../pages/CardKits.js';
import LoaderHOC from '../../HOC/LoaderHOC.js';
import * as actions from '../../features/home/redux/actions.js';

class Kits extends Component {
  static propTypes = {
    pages: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequfired,
  };

  constructor (props) {
    super(props);
  }

   componentDidMount() {
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
    console.log("KITS PROPS");
    console.log(this.props);
    setTimeout(()=>{this.props.actions.turnOffLoading()}, 5000);
  }
  componentWillUnmount() {
    
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

export default LoaderHOC(Kits);