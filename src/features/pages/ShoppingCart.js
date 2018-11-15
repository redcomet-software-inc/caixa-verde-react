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

  clickHandle (){
    console.log("Click handle");
    
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
                Meu Carrinho
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="table table-responsive">
                <thead>
                  <tr className="text-center">
                    <th />
                    <th>Item</th>
                    <th>Quantidade</th>
                    <th>Valor Unidade</th>
                    <th>Valor Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.shoppingCart.map(item => (
                    <tr>
                      <td />
                      <td className="text-right">{item.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">{this.props.setMoneyFormat(item.price)}</td>
                      <td className="text-center">
                        {this.props.setMoneyFormat(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </div>
            </div>
            <div class="modal-footer">
              <span>Total: {this.props.setMoneyFormat(this.props.totalPrice)} </span>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Fechar
              </button>
              <HashRouter>
              <NavLink className="btn btn-primary" onClick={this.clickHandle} to='/finalizar1' type="button">Finalizar Compra</NavLink>
              </HashRouter>
              <NavLink className="nav-link" to="/login">Login</NavLink>
            

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ShoppingCart)
