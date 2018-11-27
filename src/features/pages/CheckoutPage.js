import React, { Component } from 'react';

export default class CheckoutPage extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pages-checkout-page">
          <div className="row">
              <div className="col-md-4 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Seu Carrinho</span>
                  <span className="badge badge-secondary badge-pill">{this.props.shoppingCartCount}</span>
                </h4>
              
                <ul className="list-group mb-3">
                {this.props.shoppingCartKits.map((item, index)=><div> 
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">{ item.name } {this.props.renderQuantity(item.quantity)}</h6>
                      <small className="text-muted">{ item.description }</small>
                    </div>
                    <span className="text-muted">{this.props.setMoneyFormat(item.price * item.quantity) }</span>
                  </li>
                </div>)}

                {this.props.shoppingCartProducts.map((item, index)=><div> 
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">{ item.name } {this.props.renderQuantity(item.quantity)}</h6>
                      <small className="text-muted">{ item.description }</small>
                    </div>
                    <span className="text-muted">{ this.props.setMoneyFormat(item.price * item.quantity) }</span>
                  </li>
                  </div>)}

                  <li className="list-group-item d-flex justify-content-between bg-light">
                    <div className="text-info">
                      <h6 className="my-0">Valor do Frete</h6>
                    </div>
                    <span className="text-success">{this.props.setMoneyFormat(this.props.freight)}</span>
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
                    <strong>{this.props.setMoneyFormat(this.props.totalPrice + this.props.freight) }</strong>
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

                <form onSubmit={ (e) => this.props.checkOut(e) } className="needs-validation mt-3" novalidate>
                  <input id="clientId" name="clientId" type="hidden" value={this.props.clientId} />
                  <input id="clientAddressId" name="clientAddressId" type="hidden" value={this.props.clientAddressId} />
                  <input id="orderPrice" name="orderPrice" type="hidden" value={this.props.totalPrice + this.props.freight} />
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label for="firstName">Nome</label>
                      <input type="text" className="form-control" id="name" name="name" placeholder="" onChange={this.handleChange} value={this.props.clientName} required />
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label for="lastName">Sobrenome</label>
                      <input type="text" className="form-control" id="lastame"  name="lastname" placeholder="" value={this.props.clientLastname} required />
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>
                  </div>

            

                  <div className="mb-3">
                    <label for="email">Email <span className="text-muted"></span></label>
                    <input type="email" className="form-control" id="email"  name="email" placeholder="you@example.com" value={this.props.clientEmail} />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label for="address">Endereço</label>
                    <input type="text" className="form-control" id="address" name="address" placeholder="Rua, Avenina, 99" value={this.props.clientAddress} required />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                  <div className="row">
                  <div className="col-md-3 mb-3">
                      <label for="zip">Complemento</label>
                      <input type="text" className="form-control" id="complement"  name="complement" placeholder="(opcional)" value={this.props.clientComplement} />
                      <div className="invalid-feedback">
                      
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label for="state">Região Administrativa</label>
                      <select className="custom-select d-block w-100" id="administrative_region"  name="administrative_region">
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
                      <input type="text" className="form-control" id="zipcode"  name="zipcode"  placeholder="" value={this.props.clientZipcode} required />
                      <div className="invalid-feedback">
                        Zip code required.
                      </div>
                    </div>
                  </div>
                  <hr className="mb-4" />
                  
        
                

                  <h4 className="mb-3">Pagamento</h4>

                  <div className="d-block my-3">
                    <div className="custom-control custom-radio">
                      <input id="money" name="paymentMethod" type="radio" className="custom-control-input" value="money" />
                      <label className="custom-control-label" >Dinheiro</label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input id="credit" name="paymentMethod" value="credit" type="radio" className="custom-control-input"/>
                      <label className="custom-control-label" >Cartão de Crédito</label>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label for="cc-name">Deseja colocar seu CPF na nota?</label>
                      <input type="text" className="form-control" id="cpf" name="cpf" placeholder="000.000.000-00" />
                      
                      <div className="invalid-feedback">
                        Name on card is required
                      </div>
                    </div>
                  
                  </div>
                  
                  <hr className="mb-4" />
                  <button className="btn btn-primary btn-lg btn-block">Continuar Compra</button>
                </form>
              </div>
            </div>
      </div>
    );
  }
}
