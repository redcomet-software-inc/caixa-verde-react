import React, { Component } from 'react';
import CardKits from '../pages/CardKits.js'

export default class Kits extends Component {
  static propTypes = {

  };

   componentDidMount() {
    this.props.showComponent(true);
  }
  componentWillUnmount() {
    this.props.showComponent(false);
  }


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
                setMoneyFormat={this.props.setMoneyFormat}
                products={item.products}
                addCardCount={this.props.addCardCount}
                subtractCardCount={this.props.subtractCardCount}
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
