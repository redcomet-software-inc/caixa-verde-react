import React, { Component } from 'react';

export default class YourBox extends Component {

    constructor (props) {
        super(props);
        this.state = {
            freight: '',
        }
    }

    renderKits = () => {
        let table = []
        let kits = this.props.kits;
        if(kits !== undefined) {
          for(let item in kits) {
            if(kits[item].quantity > 0) {
              table.push(
              <li key={"checkout-kit" + kits[item].kit_id} className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">
                    {kits[item].name} {this.renderQuantity(kits[item].quantity)}
                  </h6>
                  <small className="text-muted">{kits[item].description}</small>
                </div>
                <span className="text-muted">
                  {this.props.setMoneyFormat(kits[item].price * kits[item].quantity)}
                </span>
              </li>)
            }
          }
        }
        return table;
      }

    renderProducts = () => {
        let table = []
        let products = this.props.products;
        if(products !== undefined) {
          for(let item in products) {
            if(products[item].quantity > 0) {
              table.push(
              <li key={"checkout-item" + products[item].product_id} className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">
                    {products[item].name} {this.renderQuantity(products[item].quantity)}
                  </h6>
                  <small className="text-muted">{products[item].description}</small>
                </div>
                <span className="text-muted">
                  {this.props.setMoneyFormat(products[item].price * products[item].quantity)}
                </span>
              </li>)
            }
          } 
        }
        return table;
      }

      renderQuantity = quantity => {
        if (quantity > 1) {
          return '(' + quantity + ')';
        }
      };

    render(){
        return(
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-products-center mb-3">
                <span className="text-muted">Sua Caixa</span>
                <span className="badge badge-secondary badge-pill badge-pill-number">
                  {this.props.count}
                </span>
              </h4>
            <ul className="list-group mb-3">
              {this.renderProducts()}
              {this.renderKits()}
              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-info">
                  <h6 className="my-0">Valor do Frete</h6>
                </div>
                <span className="text-success">
                  {this.props.setMoneyFormat(this.state.freight)}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total</span>
                <strong>
                  {this.props.setMoneyFormat(
                    this.props.order_price
                  )}
                </strong>
              </li>
            </ul>
            <form className="card p-2">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Código Promocional" />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">
                    Obter
                  </button>
                </div>
              </div>
            </form>
          </div>
        );
    }

}