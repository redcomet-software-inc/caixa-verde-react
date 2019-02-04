import React, { Component } from 'react';
import * as actions from '../../features/home/redux/actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
    /* Check if number of products is at the minimal accepted */
    if (this.props.loggedIn===false) {
      this.props.actions.redirect('cadastro');
    } else {
      this.props.actions.redirect('checkout');
    }
  }

  clickHandleDetails = (e) => {
    e.preventDefault();
    e.persist();
    this.props.redirect('minhacaixa');
  }

  renderProducts = () => {
    let items = this.props.items;
    let table = [];
    if(items !== undefined) {
      for(let product in this.props.items) {
        if(items[product].quantity > 0) {
        table.push(
        <tr key={product + "ShoppingCart"}>
          <td className="text-left">{items[product].name} {items[product].quantity > 1 ? <small className="text-danger">x{items[product].quantity}</small> : ' ' }  </td>
          <td className="text-center">
            {this.props.setMoneyFormat(items[product].quantity * items[product].price)}
          </td>
        </tr>
        )
        }
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
                  Total: {this.props.setMoneyFormat( this.props.totalPrice)}
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

