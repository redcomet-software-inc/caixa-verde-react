import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class ShoppingCart extends Component {
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

  componentWillUnmount() {
    this.setState({dialog:''});
    this.setState({modal:''});
    this.setState({accepted:false});
  }

  checkQuantity = () =>{
    if((this.props.productsCount < this.props.minQuantity) && this.props.kitsCount===0)
    {
      this.setState({dialog:'warningDialog'});
      this.setState({modal: 'modal'});
    } else {
      this.setState({dialog: ''});
      this.setState({modal: ''});
      this.setState({accepted: true});
    }
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.productsCount !== this.props.productsCount) ||
        (prevProps.kitsCount !== this.props.kitsCount)) {
      this.setState({accepted:false});
      this.setState({quantity: this.props.productsCount});
      this.checkQuantity();
    }
  }

  clickHandle = (e) => {
    e.preventDefault();
    e.persist();
    /* Check if number of products is at the minimal accepted */
    if (this.props.loggedIn===false) {
      this.props.redirect('cadastro');
    } else {
      this.props.redirect('checkout');
    }
  }

  clickHandleDetails = (e) => {
    e.preventDefault();
    e.persist();
    this.props.redirect('minhacaixa');
  }

  render() {
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
                 {this.props.shoppingCartKits.map((item, index) => (
                    <tr key={index + "ShoppingCart"}>
                      <td className="text-left">{item.name} {item.quantity > 1 ? <small className="text-danger">x{item.quantity}</small> : ' ' }  </td>
                      <td className="text-center">
                        {this.props.setMoneyFormat(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                  {this.props.shoppingCartProducts.map((item, index) => (
                    <tr key={index + "ShoppingCart_2"}>
                      <td className="text-left">{item.name} {item.quantity > 1 ? <small className="text-danger">x{item.quantity}</small> : ' ' } </td>
                      <td className="text-center">
                        {this.props.setMoneyFormat(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="2">
                        <button onClick={(e) => this.clickHandleDetails(e)} data-dismiss="modal" className="btn btn-outline-primary mx-auto">Ver Detalhes</button>
                    </td>
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
                    <button className="btn btn-primary" data-dismiss="modal" data-toggle={this.state.modal} data-target={"#"+this.state.dialog } onClick={this.clickHandle} type="button">Finalizar Compra</button>
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

export default withRouter(ShoppingCart);
