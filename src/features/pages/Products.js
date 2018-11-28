import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Card from '../pages/Card.js';

export class Products extends Component {
  static propTypes = {
    pages: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.myClass = 'card-active';
  }

  componentDidMount() {
    this.props.onRef(this);
    this.props.showComponent(true);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
    this.props.showComponent(false);
  }

  /* Get the Product ID and return the quantity from Selected Products */
  getIndexReturnQtd = index => {
    var selectedProducts = this.props.selectedProducts;
    var checkExistingElement = 0;
    for (var i = 0; i <= selectedProducts.length - 1; i++) {
      if (parseInt(selectedProducts[i].id, 10) === index) {
        checkExistingElement += 1;
        return selectedProducts[i].quantity;
      }
    }
    if (checkExistingElement === 0) {
      return 0;
    }
  };

  render() {
    return (
      <div className="card-deck mx-auto">
          {this.props.products.map((item, index) => (
            <div className="m-2">
              {' '}
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                setMoneyFormat={this.props.setMoneyFormat}
                quantity={this.getIndexReturnQtd(item.id)}
                addCardCount={this.props.addCardCount}
                subtractCardCount={this.props.subtractCardCount}
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

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    pages: state.pages,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);
