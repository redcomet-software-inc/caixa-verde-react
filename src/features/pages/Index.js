import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Card from '../pages/Card.js';

export class Index extends Component {
  static propTypes = {
    pages: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.myClass = 'card-active';

    this.state = {
      shoppingCart: [],
    };
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
      if (selectedProducts[i].id === index) {
        checkExistingElement += 1;
        return selectedProducts[i].quantity;
      }
    }
    if (checkExistingElement === 0) {
      return 0;
    }
  };

  //created_at: "2018-11-06T10:47:32.310Z"
  //description: "Description of Product 1"
  //id: 21
  //name: "Product 1"
  //updated_at: "2018-11-06T10:47:32.310Z"
  //weight_per_unit: null

  render() {
    return (
      <div className="pages-index">
        <div className="card-deck">
          {this.props.products.map((item, index) => (
            <div>
              {' '}
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
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
)(Index);
