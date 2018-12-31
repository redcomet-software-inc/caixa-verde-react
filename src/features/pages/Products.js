import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Card from '../pages/Card.js';
import Categories from '../components/Categories.js';

export class Products extends Component {
  static propTypes = {
    pages: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.myClass = 'card-active';
    this.state = {
      hide_products: 'hide-products',
      products_by_category:[],
      products_view:[],
      products_length:0,
      products_mounted:0,
      isLoading:false,
    }
  }

  componentDidMount() {
    this.props.onRef(this);
    this.props.showComponent(true);
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
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

  refProducts = (products) => {
    console.log("receive from child");
    console.log(products);
    this.setState({ products_by_category: products});
    this.setState({ products_length: products.length});
    console.log("tamanho do produtos:");
    console.log(products.length);
  }

  cardMounted = () => {
    console.log("Products mounted:");
    let products_mounted = this.state.products_mounted + 1;
    this.setState({ products_mounted: products_mounted});
    console.log(products_mounted);
    if(products_mounted == this.state.products_length) {
      this.turnOffLoading();
    }
  }

  resetImgCount = () => {
    this.setState({products_mounted: 0});
    //this.setState({ isLoading: false});
  }

  turnOnLoading = () => {
    console.log("TURN ON LOADING");
    this.setState({isLoading: true});
    this.setState({hide_products: 'hide-products'});
  }

  turnOffLoading = () => {
    this.setState({isLoading: false});
    this.setState({hide_products: 'unhide-products'});
  }

  render() {
    return (
      <div>
        <h3 className="text-left title">Personalizado</h3>
        <div className="ml-auto">
          <Categories refProducts={this.refProducts} 
          isLoading={this.state.isLoading} 
          turnOnLoading={this.turnOnLoading} 
          turnOffLoading={this.turnOffLoading}
          resetImgCount={this.resetImgCount} />
        </div>
        <div className={"card-deck mx-auto pb-5 " + this.state.hide_products} >
            {this.state.products_by_category.map((item, index) => (
              <div className="m-2 mx-auto">
                {' '}
                <Card
                  key={item.id}
                  id={item.id}
                  cardMounted={this.cardMounted}
                  name={item.name}
                  description={item.description}
                  kind={item.kind}
                  price={item.price}
                  image={item.thumb}
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
)(Products);
