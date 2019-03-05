import React, { Component } from 'react';
import Loading from '../../common/loading';
import { setMoneyFormat, count } from '../../home/local-actions';

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
                  {setMoneyFormat(kits[item].price * kits[item].quantity)}
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
                  {setMoneyFormat(products[item].price * products[item].quantity)}
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
                  
                  { count(this.props.products, this.props.kits) && (
                    count(this.props.products, this.props.kits) 
                  )}

                </span>
              </h4>
            <ul className="list-group mb-3 card-custom-box">
              {this.renderProducts()}
              {this.renderKits()}

              <li className="yourbox-freight list-group-item d-flex justify-content-between">
                <span>Valor do Frete</span>
                  {!this.props.freight && (
                    <div className="total-price-loading">
                      <Loading size={15} />
                    </div>
                  )}
                  {setMoneyFormat(
                    this.props.freight
                  )}
              </li>

              { this.props.total_price > 0 && (
                <li className="yourbox-total list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">
                    </h6>
                    <span>Total</span>
                  </div>
                  <span className="text-success-price">
                    {this.props.total_price && (
                      <React.Fragment>
                        { setMoneyFormat(this.props.total_price) }
                      </React.Fragment>
                    )}
                    {!this.props.total_price && (
                      <div className="total-price-loading">
                        <Loading size={15} />
                      </div>
                    )}
                  </span>
                </li>
              )}
              
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