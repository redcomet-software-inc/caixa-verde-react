import React, { Component } from 'react';
import axios from 'axios';

export default class Checkout1 extends Component {
  static propTypes = {

  };
  constructor(props) {
    super(props);
    this.state = {
      shoppingCart: [],
    }
    
  }
  componentDidMount(){
    this.props.getSelectedProductsInfo();
    console.log("CLIENT INFORMATION");
    console.log(this.props.clientId);
  }

  getClientInformations = (props) =>  {
    const clientId = this.props.clientId;
    axios.get(`http://localhost:3000/api/v1/client.json`, {
      params:{
        clientId: clientId,
        //email: email,
        //token: token
      }
    }).then(res => {
      const kits = res.data;

      console.log(res.data);
    });
  }
 
  render() {
    return (
      <div className="pages-checkout-1">
     
          <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Seu Carrinho</span>
            <span className="badge badge-secondary badge-pill">{this.props.shoppingCartCount}</span>
          </h4>
         
          <ul className="list-group mb-3">

           {this.props.shoppingCart.map((item, index)=><div> 

           

            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">{ item.name }</h6>
                <small className="text-muted">{ item.description }</small>
              </div>
              <span className="text-muted">{ this.props.setMoneyFormat(item.price) }</span>
            </li>

            </div>)}

            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Valor do Frete</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span className="text-success">R$ 5,00</span>
            </li>


            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Promo code</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span className="text-success">-$5</span>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>{this.props.setMoneyFormat(this.props.totalPrice) }</strong>
            </li>
          </ul>

          <form className="card p-2">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Promo code" />
              <div className="input-group-append">
                <button type="submit" className="btn btn-secondary">Redeem</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Endereço para Entrega</h4>

          <form className="needs-validation mt-3" novalidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="firstName">Nome</label>
                <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="lastName">Sobrenome</label>
                <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

      

            <div className="mb-3">
              <label for="email">Email <span className="text-muted"></span></label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label for="address">Endereço</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label for="state">Região Administrativa</label>
                <select className="custom-select d-block w-100" id="state" required>
                  <option value="">Escolha...</option>
                  <option>Águas Claras</option>
                  <option>Asa Norte</option>
                  <option>Asa Sul</option>
                  <option>Lago Sul</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label for="zip">CEP</label>
                <input type="text" className="form-control" id="zip" placeholder="" required />
                <div className="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>
            <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="same-address" />
              <label className="custom-control-label" for="same-address"></label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="save-info" />
              <label className="custom-control-label" for="save-info">Salvar estas informações para as próximas compras</label>
            </div>
            <hr className="mb-4" />

            <h4 className="mb-3">Pagamento</h4>

            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked required />
                <label className="custom-control-label" for="credit">Dinheiro</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                <label className="custom-control-label" for="debit">Cartão de Crédito</label>
              </div>
              
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="cc-name">Deseja colocar seu CPF na nota?</label>
                <input type="text" className="form-control" id="cc-name" placeholder="000.000.000-00" required />
                
                <div className="invalid-feedback">
                  Name on card is required
                </div>
              </div>
             
            </div>
            
            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" type="submit">Continuar Compra</button>
          </form>
        </div>
      </div>

      
      </div>
    );
  }
}
