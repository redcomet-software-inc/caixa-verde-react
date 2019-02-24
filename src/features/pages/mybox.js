import React, { Component } from 'react';
import LoaderHOC from '../../HOC/loader-hoc';
import { getProduct } from '../../common/get-products.js';
import userImage from '../../images/caixaverde-finalizacao-WHITE-BOX.png';

class MyBox extends Component {

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

  componentWillUpdate(prevProps) {
    if(this.props.myBoxProducts !== prevProps.myBoxProducts) {
        if(this.state.myProducts.length === 0 && this.state.myKits.length === 0) {
          this.props.actions.turnOffLoading();
        }
      }
    }

  renderKitProducts = (products) => {
    let table = [];
    console.log('>>>>>>>>>>>>>>>>>>>>>')
    console.log(products);
    for (let item in products) {

        table.push(
          <img alt={"Image Logo Caixa Verde " + products[item].name} className="img-fluid" src={userImage} />  
        );

    }
    return table;
  }

  renderKits () {
    let myBox = this.props.myBoxKits;
    let table = [];
    for(let item in myBox) {        
      if(parseInt(myBox[item].quantity) > 0) {
        let products = myBox[item].products;
        console.log(myBox);
        let product_table = "";
        let count = 1;
        /* Display Products Name */
        for(let product in products) {
          product_table += count;
          if(products.length > count) {
            product_table += ", ";
          }
          count++;
        }
        table.push(
            <div className="card mb-3" style={{minWidth: 180, backgroundColor: '#fff'}}>
              <div className="card-header">{ myBox[item].name }</div>
              <div className="card-body text-center">

                { this.renderKitProducts(myBox[item].products) }               

                <p className="card-text"></p>
              </div>
              <div className="card-footer text-center">
                <ul className="list-group">
                  <li className="list-group-item">{ product_table }</li>
                  <li className="list-group-item text-success">{ this.props.setMoneyFormat(myBox[item].price) }</li>
                  <li className="list-group-item">Quantidade: { myBox[item].quantity }</li>
                </ul>
              </div>
          </div>
        );
      }
    }
    return table;
  }

  handleError (e, id) {
    e.persist();
    getProduct(id).then(res => {
      e.target.src = res.thumb;
      if(typeof res.thumb === 'undefined') {
        e.target.src = userImage;
      }
    });
  }

  renderProducts ()  {
    let myBox = this.props.myBoxProducts;
    let table = [];
    for(let item in myBox) {  
      if(parseInt(myBox[item].quantity) > 0) {
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
  clickHandle = (e) => {
    e.preventDefault();
    e.persist();

    if (this.props.loggedIn===false) {
      this.props.actions.redirect('cadastro');
    } else {
      this.props.actions.redirect('checkout');
    }
  }

  render() {
    return (
      <div className="pages-my-box ">
        <h2 className="text-center title">Minha Caixa
              <h4><span className="badge badge-secondary badge-pill">
                {this.props.count}
                </span>
              </h4>
        </h2>
        <div className="card-columns">
          { this.renderKits() }
          { this.renderProducts() }
        </div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={this.clickHandle} type="button">Finalizar Compra</button>
        </div>
      </div>
    );
  }
}

export default LoaderHOC(MyBox);