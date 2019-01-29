import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import LoaderHOC from '../../HOC/LoaderHOC.js';

class MyBox extends Component {
  static propTypes = {
    pages: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequfired,
  };
  constructor (props) {
    super(props);
    /* Load Props from MainPage */
    this.props.updateShoppingCart("product");
    this.props.updateShoppingCart("kit");
    let count = this.props.shoppingCartCount;
    let box_empty = true;
    if(count>0) {
      box_empty = false;
    }
    this.state = {
        box_empty: box_empty
    }
  }

  componentWillUpdate(prevProps, props) {
    if(prevProps !== props) {
      this.props.actions.turnOffLoading();
      if(props.shoppingCartCount === 0) {
        this.setState({ box_empty: true});
      }
    }
  }

  renderBox = () => {
    if(this.state.box_empty===false) {
      return(
        <div className="card-columns">
          { this.props.shoppingCartProducts.map((product, index) => (

              <div className="card mb-3" style={{width: 180, backgroundColor: '#fff'}}>
                <div className="card-header">{ product.name }</div>
                <div className="card-body">
                  <img alt={"Image do Produto " + product.name} className="img-fluid" src={ product.thumb } />
                  <p className="card-text"></p>
                </div>
              </div>
          ))}

          { this.props.shoppingCartKits.map((kit, index) => (
            <div>
              <div className="card bg-light mb-3" style={{width: 180}}>
                 { kit.products.map((product, index) => (
                <div className="card-header">{ product.name }</div>
                 ))}
                <div className="card-body">
                  <h5 className="card-title">Kits</h5>
                  <p className="card-text"></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return(
        <React.Fragment>
           <h4 className="warning-muted text-center">A sua caixa está vazia.</h4>
            <div className="row">
                <div className="col-sm-12 text-center">
                    <NavLink exact to="/kits">Clique aqui</NavLink> para escolher seus produtos.
                </div>
            </div>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div className="pages-my-box">
        <h2 className="text-center title">Minha Caixa</h2>
        { this.renderBox() }
      </div>
    );
  }
}

export default LoaderHOC(MyBox);