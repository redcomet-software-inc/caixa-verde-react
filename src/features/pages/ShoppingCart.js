import React, { Component } from 'react';

import {
  NavLink,
  HashRouter
} from "react-router-dom";

import {withRouter} from 'react-router-dom';

class ShoppingCart extends Component 
{
  static propTypes = {};
  constructor(props) 
  {
    super(props);
    this.state = {
        dialog:'',
        modal:'',
        accepted:false,
    }
    this.clickHandle = this.clickHandle.bind(this)
  }

  checkQuantity = () =>
  {
    if((this.props.productsCount < this.props.minQuantity) && this.props.kitsCount===0)
    {
      this.setState({dialog:'warningDialog'});
      this.setState({modal: 'modal'});
    } else 
    {
      this.setState({dialog: ''});
      this.setState({modal: ''});
      this.setState({accepted: true});
    }
  }

  componentDidUpdate(prevProps, prevState) 
  {
  if ((prevProps.productsCount !== this.props.productsCount) || (prevProps.kitsCount !== this.props.kitsCount))
  {
    this.setState({accepted:false});
    this.setState({quantity: this.props.productsCount});
    this.checkQuantity();
  }
}
  //t.integer "client_id"
  //t.integer "address_id"

  clickHandle = (e) =>
  {
    e.preventDefault();
    /* Check if number of products is at the minimal accepted */
    if(this.state.accepted === true) 
    {
      var targetUrl="cadastro";
      if (this.props.loggedIn===false) 
      {
        this.props.redirect(targetUrl);
      } else 
      {
        targetUrl = "checkout";
        this.props.redirect(targetUrl);
      }
    } else 
    {
      this.props.warning("Você precisa adicionar no mínimo " + this.props.minQuantity + " produtos.");
    }
  }

  render() 
  {
    return (
      <div
        className="modal fade"
        id="shoppingCartDialog"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="shoppingCartDialogTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Minha Caixa
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th className="text-left">Item</th>
                    <th className="text-center">Preço</th>
                  </tr>
                </thead>
                <tbody>
                 {this.props.shoppingCartKits.map(item => (
                    <tr key={item.id}>
                      <td className="text-left">{item.name} { '(' } {item.quantity}') </td>
                      <td className="text-center">
                        {this.props.setMoneyFormat(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                  {this.props.shoppingCartProducts.map(item => (
                    <tr key={item.id}>
                      <td className="text-left">{item.name} <small className="text-danger">x{item.quantity}</small> </td>
                      <td className="text-center">
                        {this.props.setMoneyFormat(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                      <td className="text-left">
                        <NavLink exact to={`/minhacaixa`} data-dismiss="modal" className="nav-link btn btn-success">Ver Detalhes</NavLink>
                      </td>
                      <td className="text-center"></td>
                    </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <div className="row w-100">
                <div className="col my-auto text-center mx-auto">
                  Total: {this.props.setMoneyFormat( this.props.totalPriceProducts + this.props.totalPriceKits)}
                </div>
                <div className="col text-right pr-0">
                  <HashRouter>
                    <button className="btn btn-primary" data-dismiss="modal" data-toggle={this.state.modal} data-target={"#"+this.state.dialog } onClick={this.clickHandle} type="button">Finalizar Compra</button>
                  </HashRouter>
                </div>
              </div>
              <div className="text-left"> </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ShoppingCart)
