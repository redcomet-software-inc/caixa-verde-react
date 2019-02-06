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
    let count = this.props.count;
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
      if(props.count === 0) {
        this.setState({ box_empty: true});
      }
    }
  }

  renderBox = () => {
    console.log("render box");
    if(this.state.box_empty===false) {
      let products = this.props.products;
      let table = [];
      if(products !== undefined) {
        for(let product in this.props.products) {
          table.push(
            <div key={"key" + products[product].id + products[product].name} className="card-columns">
              <div className="card mb-3" style={{width: 180, backgroundColor: '#fff'}}>
                <div className="card-header">{ products[product].name }</div>
                <div className="card-body">
                  <img alt={"Image do Produto " + products[product].name} className="img-fluid" src={ products[product].thumb } />
                  <p className="card-text"></p>
                </div>
              </div>
            </div>
          );
        }
      }

      return table;
        
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