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
    super(props)

    this.clickHandle = this.clickHandle.bind(this)
  }




  //t.integer "client_id"
  //t.integer "address_id"

  clickHandle = (e) => {
    e.preventDefault();
    var targetUrl="cadastro";
    console.log("ClickHandle");
    if (this.props.loggedIn===false) {
      this.props.redirect(targetUrl);
    } else {
      targetUrl = "checkout";
      this.props.redirect(targetUrl);
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
              <span>Total: {this.props.setMoneyFormat(this.props.totalPriceKits + this.props.totalPriceProducts)} </span>
              <HashRouter>
              <button className="btn btn-primary" data-dismiss="modal" onClick={this.clickHandle} type="button">Finalizar Compra</button>
              </HashRouter>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ShoppingCart)
