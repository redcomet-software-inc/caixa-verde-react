import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import LoaderHOC from '../../HOC/LoaderHOC.js';
import { getProduct, getKit } from '../../common/get-products.js';
import { BreedingRhombusSpinner } from 'react-epic-spinners';


class MyBox extends Component {
  static propTypes = {
    pages: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequfired,
  };
  constructor (props) {
    super(props);
    /* Load Props from MainPage */
    let count = this.props.count;
    let box_empty = false;
    if(count>0) {
      box_empty = false;
    }
    this.state = {
        box_empty: box_empty || 0,
        images: [],
        myProducts:[],
        myKits:[],
    }
  }

   /* Check if a Giving Object is Empty */
   isEmpty = function (obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
          console.log("FALSE");
          return false;
        }
            
      }
      console.log("TRUE");
      return true;
  }

  componentWillUnmount () {
    this.setState({myProducts:[]});
    this.setState({myKits:[]});
  }

  componentWillUpdate(prevProps, props) {
    console.log("here");
    console.log(this.state.myProducts.length);
    if(props.myBoxProducts !== prevProps.myBoxProducts) {
        if(this.state.myProducts.length === 0 && this.state.myKits.length === 0) {
          this.props.actions.turnOffLoading();
        }
      }
    }

  renderKitProducts = (products) => {
    let table = [];
    for (let item in products) {
      table.push(
        <img onError={e => this.handleError(e, products[item].id)} alt={"Image do Produto " + products[item].name} className="img-fluid" src={products[item].thumb} />  
      );
    }
    return table;
  }

  renderKits () {
    let myBox = this.props.myBoxKits;
    let table = [];
    console.log("My Box");
    console.log(myBox);
    for(let item in myBox) {        
    
      table.push(
          <div className="card mb-3" style={{minWidth: 180, backgroundColor: '#fff'}}>
            <div className="card-header">{ myBox[item].name }</div>
            <div className="card-body text-center">

              { this.renderKitProducts(myBox[item].products) }               

              <p className="card-text"></p>
            </div>
            <div className="card-footer text-center">
              <ul className="list-group">
                <li className="list-group-item">{ myBox[item].kind }</li>
                <li className="list-group-item text-success">{ this.props.setMoneyFormat(myBox[item].price) }</li>
                <li className="list-group-item">Quantidade: { myBox[item].quantity }</li>
              </ul>
            </div>
        </div>
      );
    }

    return table;

  }

  handleError (e, id) {
    e.persist();
    getProduct(id).then(res => {
      e.target.src = res.thumb;
    });
  }

  renderProducts ()  {
    let myBox = this.props.myBoxProducts;
    let table = [];
    console.log("My Box");
    console.log(myBox);
    for(let item in myBox) {        
      table.push(
          <div className="card mb-3" style={{minWidth: 180, backgroundColor: '#fff'}}>
            <div className="card-header">{ myBox[item].name }</div>
            <div className="card-body text-center">
              <img onError={e => this.handleError(e, myBox[item].id)} alt={"Image do Produto " + myBox[item].name} className="img-fluid" src={myBox[item].thumb} />  
              <p className="card-text"></p>
            </div>
            <div className="card-footer text-center">
              <ul className="list-group">
                <li className="list-group-item">{ myBox[item].kind }</li>
                <li className="list-group-item text-success">{ this.props.setMoneyFormat(myBox[item].price) }</li>
                <li className="list-group-item">Quantidade: { myBox[item].quantity }</li>
              </ul>
            </div>
        </div>
      );
    }
      
    return table;
  }


  /*
      <React.Fragment>
          <h4 className="warning-muted text-center">A sua caixa está vazia.</h4>
          <div className="row">
              <div className="col-sm-12 text-center">
                  <NavLink exact to="/kits">Clique aqui</NavLink> para escolher seus produtos.
              </div>
          </div>
      </React.Fragment>

    */
   
  render() {
    return (
      <div className="pages-my-box">
        <h2 className="text-center title">Minha Caixa
              <h4><span className="badge badge-secondary badge-pill">
                {this.props.count}
              </span>
              </h4>
        </h2>
        <div className="card-deck">
          { this.renderKits() }
          { this.renderProducts() }
 
        </div>
      </div>
    );
  }
}

export default LoaderHOC(MyBox);