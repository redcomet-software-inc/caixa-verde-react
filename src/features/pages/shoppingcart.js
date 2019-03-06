import React, { Component } from 'react';
import * as actions from '../../features/home/redux/actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setMoneyFormat } from '../home/local-actions';

export class ShoppingCart extends Component {
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
    if(this.props.home.productsCount < this.props.minQuantity) {
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
    this.props.actions.redirect('checkout');
  }

  clickHandleDetails = (e) => {
    e.preventDefault();
    e.persist();

    this.props.redirect('minhacaixa');
  }

  renderProducts = () => {
    let products = this.props.home.selected_products;
    let table = [];
    for(let product in products) {
      if(products[product].quantity > 0) {
      table.push(
      <tr key={product + "ShoppingCart"}>
        <td className="text-left">{products[product].name} {products[product].quantity > 1 ? <small className="text-danger">x{products[product].quantity}</small> : ' ' }  </td>
        <td className="text-center">
          {setMoneyFormat(products[product].price * products[product].quantity)}
        </td>
      </tr>
      )
      }
    }
    return table;
  }
  
  renderKits = () => {
    let kits = this.props.home.selected_kits;
    let table = [];
    for(let kit in kits) {
      if(kits[kit].quantity > 0) {
      table.push(
      <tr key={kit + "ShoppingCart"}>
        <td className="text-left">{kits[kit].name} {kits[kit].quantity > 1 ? <small className="text-danger">x{kits[kit].quantity}</small> : ' ' }  </td>
        <td className="text-center">
          {setMoneyFormat(kits[kit].price * kits[kit].quantity)}
        </td>
      </tr>
      )
      }
    }
    return table;
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
                {this.renderProducts()}
                {this.renderKits()}
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
                  Total: {setMoneyFormat( this.props.home.order_price)}
                </div>
                <div className="col text-right pr-0">
                    <button className="btn btn-primary" data-dismiss="modal" onClick={this.clickHandle} type="button">Finalizar Compra</button>
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

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);

