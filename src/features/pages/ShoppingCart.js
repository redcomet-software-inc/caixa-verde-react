import React, { Component } from 'react';

import {
  NavLink,
  Link,
  Route,
  HashRouter
} from "react-router-dom";

import {withRouter} from 'react-router-dom';


class ShoppingCart extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
        dialog:'',
        modal:'',
        accepted:false,
    }

    this.clickHandle = this.clickHandle.bind(this)
  }

  checkQuantity = () => {
  
    if((this.props.productsCount < this.props.minQuantity) && this.props.kitsCount==0) {
      this.setState({dialog:'warningDialog'});
      this.setState({modal: 'modal'});

 
    } else {

      this.setState({dialog: ''});
      this.setState({modal: ''});
      this.setState({accepted: true});
    }

  }

  componentDidUpdate(prevProps, prevState) {
  
  if ((prevProps.productsCount !== this.props.productsCount) || (prevProps.kitsCount !== this.props.kitsCount) ) {
    this.setState({accepted:false});
    this.setState({quantity: this.props.productsCount});
    this.checkQuantity();
  }
}
  //t.integer "client_id"
  //t.integer "address_id"

  clickHandle = (e) => {

    e.preventDefault();
    /* Check if number of products is at the minimal accepted */
    if(this.state.accepted === true) {
      var targetUrl="cadastro";
      if (this.props.loggedIn===false) {
        this.props.redirect(targetUrl);
      } else {
        targetUrl = "checkout";
        this.props.redirect(targetUrl);
      }
    } else {
      this.props.warning("Você precisa adicionar no mínimo " + this.props.minQuantity + " produtos.");
    }
  }

  


  render() {
    return (
      <div
        class="modal fade"
        id="shoppingCartDialog"
        tabindex="-1"
        role="dialog"
        aria-labelledby="shoppingCartDialogTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Minha Caixa
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qtd.</th>
                    <th>Valor Unidade</th>
                    <th>Valor Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                 {this.props.shoppingCartKits.map(item => (
                    <tr>
                      <td className="text-right">{item.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">{this.props.setMoneyFormat(item.price)}</td>
                      <td className="text-center">
                        {this.props.setMoneyFormat(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                  {this.props.shoppingCartProducts.map(item => (
                    <tr>
                      <td className="text-right">{item.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">{this.props.setMoneyFormat(item.price)}</td>
                      <td className="text-center">
                        {this.props.setMoneyFormat(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                
            </div>
            <div class="modal-footer">
              <span>Total: {this.props.setMoneyFormat( this.props.totalPriceProducts + this.props.totalPriceKits)} </span>
              <HashRouter>
              <button className="btn btn-primary" data-dismiss="modal" data-toggle={this.state.modal} data-target={"#"+this.state.dialog } onClick={this.clickHandle} type="button">Finalizar Compra</button>
              </HashRouter>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ShoppingCart)
