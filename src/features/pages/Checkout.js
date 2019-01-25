import React, { Component } from 'react';
import axios from 'axios';
import request from '../../common/configApi.js';
import { getClientInfo } from '../../common/getClientInfo.js';
import LoaderHOC from '../../HOC/LoaderHOC.js';
import PropTypes from 'prop-types';


class Checkout extends Component 
{
  static propTypes = {
    pages: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequfired,
  };

  constructor(props) {
    super(props);
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    this.props.updateShoppingCart("kit");
    this.props.updateShoppingCart("product");
    this.state = {
      adm_regions: [],
      adm_region_name: '',
      adm_region_id: '',
      checkout_order_id:0,
      order_price: 0,
      client_id: 0,
      client_data: [],
      address_data: [],
      email: email || '',
      token: token || '',
    };

    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
      this.getClientInformations();
      this.getAdmRegions();
      this.getPermission();
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
      setTimeout(()=>{ this.props.actions.turnOffLoading()}, 5000);
  }

  turnOffLoading = () => {
    this.props.actions.turnOffLoading();
  }

  getPermission = () => {
    this.props.actions.turnOffLoading();
  }

  /*Get all the new Data and decide what to submit to the server*/
  checkOut = e => {
    e.preventDefault();
    const name = e.currentTarget.name.value;
    const lastname = e.currentTarget.lastname.value;
    const cellphone = e.currentTarget.cellphone.value;
    const address_street = e.currentTarget.address_street.value;
    const address_number = e.currentTarget.address_number.value;
    const address_complement = e.currentTarget.address_complement.value;
    const address_neighbourhood = e.currentTarget.address_neighbourhood.value;
    const address_adm_region_id = e.currentTarget.adm_region_id.value;
    const address_zipcode = e.currentTarget.address_zipcode.value;
    const client_id = e.currentTarget.client_id.value;
    const cpf = e.currentTarget.cpf.value;
    const products = this.props.shoppingCartProducts;
    const kits = this.props.shoppingCartKits;
    //const kits = JSON.stringify(this.props.shoppingCartKits);
    /* Data structure to Create Order */
    var data = {
      client_token: this.state.token,
      client_email: this.state.email,
      order: {
        client_id: client_id,
        order_price: this.state.order_price,
        price_table_id: 1,
        orders_products_attributes: [],
        orders_kits_attributes:[],
        client_attributes: 
        {
          name: name,
          lastname: lastname,
          email: this.state.email,
          cellphone: cellphone,
          cpf: cpf,
        },
        address_attributes: 
          {
            id: this.state.address_id,
            number: address_number,
            street: address_street,
            zipcode: address_zipcode,
            adm_region_id: address_adm_region_id,
            complement: address_complement,
            neighbourhood: address_neighbourhood,
            kind: this.state.address_kind
          }
      }
    }
    products.forEach((product) => {
      data.order.orders_products_attributes.push({
        product_id: product.id,
        quantity: product.quantity
      });
    });

    kits.forEach((kit) =>{
      data.order.orders_kits_attributes.push({
        kit_id: kit.id,
        quantity: kit.quantity
      });
    });

    request({
      method:'post',
      url: 'api/v1/orders.json',
      header: {
        'X-Client-Email': this.state.email,
        'X-Client-Token': this.state.token,
      },
      data: data
    }).then(res => 
    {
      this.setState({checkout_order_id: res.order.id});
      localStorage.setItem("checkout_order_id", res.order.id);
      this.props.setCheckoutOrderId(res.order.id);
      this.props.redirect('pagamento');
      this.getPermission();
    }).catch(error => {
      
    });
  }

  getClientInformations = () => {
      /* Get Data from current user based on email and token */
      getClientInfo().then(res => {
          this.setState({client_data: res});
          this.setState({address_data: res.address_delivery});
        }).catch(error => {
          throw new Error("Failed to Get Client Informations: " + error);
      });
  }

  getAdmRegions = () => {
    axios.get('http://localhost:3000/api/v1/adm_regions.json').then(res => 
    {
      const adm_regions = res.data;
      this.setState({ adm_regions: adm_regions });
    });
  };

  redirect() {
    return this.props.redirect('login');
  }

  renderQuantity = quantity => {
    if (quantity > 1) {
      return '(' + quantity + ')';
    }
  };

  componentDidUpdate(prevProps) {
    if(prevProps.productsCount !== this.props.productsCount) {
    }
  }

  change = (e) => {
    this.setState({adm_region_id: e.currentTarget})
  }

  render() {
    return (
      <div className="pages-checkout pb-5 mb-5">
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Sua Caixa</span>
              <span className="badge badge-secondary badge-pill">
                {this.props.shoppingCartCount}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {this.props.shoppingCartProducts.map((item, index) => (
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">
                        {item.name} {this.renderQuantity(item.quantity)}
                      </h6>
                      <small className="text-muted">{item.description}</small>
                    </div>
                    <span className="text-muted">
                      {this.props.setMoneyFormat(item.price * item.quantity)}
                    </span>
                  </li>
              ))}
              { this.props.shoppingCartKits.map((item, index) => (
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">
                        {item.name} {this.renderQuantity(item.quantity)}
                      </h6>
                      <small className="text-muted">{item.description}</small>
                    </div>
                    <span className="text-muted">
                      {this.props.setMoneyFormat(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
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
                    this.state.order_price
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
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Endereço para Entrega</h4>
            <form onSubmit={e => this.checkOut(e)} className="needs-validation mt-3" novalidate>
              <input id="client_id" name="client_id" type="hidden" value={this.state.client_id} />
              <input id="address_kind" name="address_kind" type="hidden" value={ this.state.address_kind } />
              <input
                id="address_id"
                name="address_id"
                type="hidden"
                value={this.state.address_id}
              />
              <input
                id="order_price"
                name="order_price"
                type="hidden"
                value={this.state.order_price }
              />
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder=""
                    onChange={this.handleChange}
                    defaultValue={this.state.client_data ? this.state.client_data.name : null}
                    required
                  />
                  <div className="invalid-feedback">Valid first name is required.</div>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Sobrenome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastame"
                    name="lastname"
                    placeholder=""
                    defaultValue={this.state.client_data ? this.state.client_data.lastname : null}
                    required
                  />
                  <div className="invalid-feedback">Valid last name is required.</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>
                    Email <span className="text-muted" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    defaultValue={this.state.client_data ? this.state.client_data.email : null}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>
                    Celular <span className="text-muted" />
                  </label>
                  <input
                    type="input"
                    className="form-control"
                    id="cellphone"
                    name="cellphone"
                    placeholder="9999-9999"
                    defaultValue={this.state.client_data ? this.state.client_data.cellphone : null}
                    required
                  />
                </div>
              </div>
              <div className="row">
              <div className="col-md-3 mb-3">
                  <label>CEP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address_zipcode"
                    name="address_zipcode"
                    placeholder=""
                    defaultValue={this.state.address_data ? this.state.address_data.zipcode : null}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-9 mb-3">
                    <label>Endereço</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address_street"
                      name="address_street"
                      placeholder="Rua, Avenina, 99"
                      defaultValue={this.state.address_data ? this.state.address_data.street : null}
                      required
                    />
                    <div className="invalid-feedback"></div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="mb-3">
                      <label>Número</label>
                      <input
                        type="number"
                        className="form-control"
                        id="address_number"
                        name="address_number"
                        placeholder=""
                        defaultValue={this.state.address_data ? this.state.address_data.number : null}
                        required
                      />
                    <div className="invalid-feedback"></div>
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col-md-4 mb-3">
                  <label>Bairro</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address_neighbourhood"
                    name="address_neighbourhood"
                    placeholder=""
                    defaultValue={this.state.address_data ? this.state.address_data.neighbourhood : null}
                  />
                  </div>
                <div className="col-md-4 mb-3">
                  <label>Complemento</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address_complement"
                    name="address_complement"
                    placeholder="(opcional)"
                    defaultValue={this.state.address_data ? this.state.address_data.complement : null}
                  />
                  <div className="invalid-feedback" />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Região Administrativa</label>
                  <select
                    className="form-control"
                    type="text"
                    id="adm_region_id"
                    name="adm_region_id"
                    onChange={e => this.change(e)}
                    value={this.state.address_data ? this.state.address_data.adm_region_id : null}
                    placeholder="&nbsp;"
                  >
                    <option value=""> -- Escolha uma região -- </option>
                    {this.state.adm_regions.map((item, index) => (
                      <option value={item.id}> {item.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <hr className="mb-4" />
              <br/><br />
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Deseja colocar seu CPF na nota?</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cpf"
                    name="cpf"
                    defaultValue={this.state.client_data ? this.state.client_data.cpf : null}
                    placeholder="000.000.000-00"
                  />
                  <div className="invalid-feedback">Name on card is required</div>
                </div>
              </div>
              <hr className="mb-4 pb-5" />
              <button className="btn btn-primary btn-lg btn-block">Continuar Compra</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoaderHOC(Checkout); 