import React, { Component } from 'react';
import axios from 'axios';
import Loads from 'react-loads';

import appLogo from '../../images/caixaverde-finalizacao-weblogo.png';

export default class Checkout extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    this.state = {
      clientId: 0,
      clientName: '',
      clientLastname: '',
      clientCellphone: '',
      clientEmail: '',
      clientAddressId: '',
      clientAddress: '',
      clientComplement: '',
      clientZipCode: '',
      freight: '',
      neighbourhoodId: '',
      neighbourhoods: [],
      neighbourhoodName: '',
      email: email || '',
      token: token || '',
      mercadoPagoAccessToken: '',
      mercadoPagoShoppingCart: [],
    };

    this.redirect = this.redirect.bind(this);
    this.mercadoPagoPay = this.mercadoPagoPay.bind(this);
  }

  checkOut = e => {
    e.preventDefault();

    const token = this.state.token;
    const clientId = e.target.elements.clientId.value;
    const products = JSON.stringify(this.props.shoppingCartProducts);
    const kits = JSON.stringify(this.props.shoppingCartKits);
    const orderPrice = parseFloat(e.target.elements.orderPrice.value).toFixed(2);
    const name = e.target.elements.name.value;
    const lastname = e.target.elements.lastname.value;
    const email = e.target.elements.email.value;
    const address = e.target.elements.address.value;
    const addressId = e.target.elements.clientAddressId.value;

    const complement = e.target.elements.complement.value;
    const neighbourhood_id = e.target.elements.neighbourhood_id.value;
    const zipcode = e.target.elements.zipcode.value;

    const paymentMethod = e.target.elements.paymentMethod.value;
    const cpf = e.target.elements.cpf.value;

    return axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/orders.json"',
      headers: {
        'X-Client-Email': this.state.email,
        'X-Client-Token': this.state.token,
      },
      data: {
        client_id: clientId,
        price_table_id: '1',
        address_id: addressId,
        products_json: products,
        kits_json: kits,
        client_email: this.state.email,
        order_price: orderPrice,
      },
    })
      .then(res => {
        if (res.status === 200) {
          this.mercadoPagoPay();
        } else {
          this.props.changeErrMessage(
            'Desculpe, estamos com um problema no servidor. Estamos trabalhando para corrigir.',
          );
          this.props.redirect('err');
        }
      })
      .catch(error => {
        this.props.changeErrMessage(
          'Desculpe, estamos com um problema no servidor. Estamos trabalhando para corrigir.',
        );
        this.props.redirect('err');
      });
  };

  getClientInformations = () => {
    /* Get Data from current user based on email and token */
    axios
      .get('http://localhost:3000/api/v1/clients/1.json', {
        params: {
          client_email: this.state.email,
          client_token: this.state.token,
        },
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ clientId: res.data.id });
          this.setState({ clientName: res.data.name });
          this.setState({ clientLastname: res.data.lastname });
          this.setState({ clientCellphone: res.data.cellphone });
          this.setState({ clientEmail: res.data.email });
          this.setState({ clientAddress: res.data.address.street });
          this.setState({ clientAddressId: res.data.id });
          this.setState({ clientComplement: res.data.id });
          this.setState({ clientZipcode: res.data.id });
          this.setState({ freight: res.data.id });
          this.setState({ neighbourhoodId: res.data.id });
          this.setState({ neighbourhoodName: res.data.id });
        }
      });
  };

  /*Init payment Process with Mercado Pago */
  mercadoPagoPay = () => {
    const mercadoPagoAccessToken = this.state.mercadoPagoAccessToken;

    var apiRequest = {
      items: [],
      payer: {},
      payment_methods: {},
    };

    apiRequest.payment_methods = {
      excluded_payment_types: [{ id: 'ticket' }, { id: 'atm' }],
    };

    apiRequest.items = [{
      title: "frete",
      quantity: 1,
      unit_price: this.state.freight,
    }];

    apiRequest.payer = {
      name: 'Guilherme',
      surname: 'Nunes',
      email: 'guilhermewn@gmail.com',
      phone: {
        area_code: 61,
        number: 998698660,
      },
      address: {
        street_name: 'Rua Yollanda Ferreira Penzo',
        street_number: 60,
        zip_code: '79826-175',
      },
    };

    var productsList = this.props.shoppingCartProducts;
    var kitsList = this.props.shoppingCartKits;
    /* Mercado Pago Data Format */

    productsList.map(function(item) {
      apiRequest.items.push({
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      });
    });

    kitsList.map(function(item) {
      apiRequest.items.push({
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      });
    });

    apiRequest = JSON.stringify(apiRequest);

    console.log('PRODUCTS');
    console.log(apiRequest);

    const url =
      'https://api.mercadopago.com/checkout/preferences/?attributes=id,client_id,sandbox_init_point&access_token=' +
      mercadoPagoAccessToken;

    var request = axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: apiRequest,
    })
      .then(response => {
        if (response.status === 201) {
          window.location = response.data['sandbox_init_point'];
          console.log(response.data);
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  /*Get Auth Token from Mercado Pago */
  mercadoPago = () => {
    axios({
      method: 'POST',
      url: 'https://api.mercadopago.com/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      data: {
        grant_type: 'client_credentials',
        client_id: '2818049652001946',
        client_secret: 'HtIm5hoTD2cMwRPTr2Nv2dEaGkhPZ1YL',
      },
    }).then(response => {
      if (response.status === 200) {
        this.setState({ mercadoPagoAccessToken: response.data['access_token'] });
        console.log(response.data['access_token']);
      }
    });
  };

  convertShoppingCartToMercadoPago = () => {
    console.log('Converting JSON SHOPPING CART TO MERCADO PAGO');
    console.log(this.props.addressIdshoppingCart);
    return null;
  };

   getNeighbourhoods = () => {
    axios.get('http://localhost:3000/api/v1/neighbourhoods.json')
    .then(res => {
      const neighbourhoods = res.data;
      console.log(neighbourhoods);
      this.setState({neighbourhoods: neighbourhoods});
    });
  }

  componentDidMount() {
    this.mercadoPago();
    this.getClientInformations();
    this.getNeighbourhoods();
  }

  redirect() {
    return this.props.redirect('login');
  }

  renderQuantity = quantity => {
    if (quantity > 1) {
      return '(' + quantity + ')';
    }
  };

  render() {
    return (
      <div className="pages-checkout">
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Sua Caixa</span>
                <span className="badge badge-secondary badge-pill">
                  {this.props.shoppingCartCount}
                </span>
              </h4>

              <ul className="list-group mb-3">
                {this.props.shoppingCartKits.map((item, index) => (
                  <div>
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
                  </div>
                ))}

                {this.props.shoppingCartProducts.map((item, index) => (
                  <div>
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
                  </div>
                ))}

                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-info">
                    <h6 className="my-0">Valor do Frete</h6>
                  </div>
                  <span className="text-success">
                    {this.props.setMoneyFormat(this.state.freight)}
                  </span>
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
                  <strong>
                    {this.props.setMoneyFormat(
                      this.props.totalPriceKits +
                        this.props.totalPriceProducts +
                        this.state.freight,
                    )}
                  </strong>
                </li>
              </ul>

              <form className="card p-2">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Promo code" />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-secondary">
                      Redeem
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Endereço para Entrega</h4>

              <form onSubmit={e => this.checkOut(e)} className="needs-validation mt-3" novalidate>
                <input id="clientId" name="clientId" type="hidden" value={this.state.clientId} />
                <input
                  id="clientAddressId"
                  name="clientAddressId"
                  type="hidden"
                  value={this.state.clientAddressId}
                />
                <input
                  id="orderPrice"
                  name="orderPrice"
                  type="hidden"
                  value={this.props.totalPriceProducts + this.props.totalPriceKits + this.state.freight}
                />
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label for="firstName">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder=""
                      onChange={this.handleChange}
                      defaultValue={this.state.clientName}
                      required
                    />
                    <div className="invalid-feedback">Valid first name is required.</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label for="lastName">Sobrenome</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastame"
                      name="lastname"
                      placeholder=""
                      defaultValue={this.state.clientLastname}
                      required
                    />
                    <div className="invalid-feedback">Valid last name is required.</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label for="email">
                      Email <span className="text-muted" />
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      defaultValue={this.state.clientEmail}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label for="email">
                      Celular <span className="text-muted" />
                    </label>
                    <input
                      type="input"
                      className="form-control"
                      id="cellphone"
                      name="cellphone"
                      placeholder="9999-9999"
                      defaultValue={this.state.clientCellphone}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label for="address">Endereço</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="Rua, Avenina, 99"
                    defaultValue={this.state.clientAddress}
                    required
                  />
                  <div className="invalid-feedback">Please enter your shipping address.</div>
                </div>

                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label for="zip">Complemento</label>
                    <input
                      type="text"
                      className="form-control"
                      id="complement"
                      name="complement"
                      placeholder="(opcional)"
                      defaultValue={this.state.clientComplement}
                    />
                    <div className="invalid-feedback" />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label for="state">Região Administrativa</label>
                    <select className="form-control" type="text" id="neighbourhood_id" name="neighbourhood_id" defaultValue={this.state.neighbourhoodId} placeholder="&nbsp;" required>
                        <option value=""> -- Escolha uma região -- </option>
                        {this.state.neighbourhoods.map((item, index) => (
                        <option value={item.id}> {item.name}</option>              
                        ))}
                    </select> 
                  </div>
                  <div className="col-md-3 mb-3">
                    <label for="zip">CEP</label>
                    <input
                      type="text"
                      className="form-control"
                      id="zipcode"
                      name="zipcode"
                      placeholder=""
                      defaultValue={this.state.clientZipcode}
                      required
                    />
                  </div>
                </div>
                <hr className="mb-4" />

                <h4 className="mb-3">Pagamento</h4>

                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input
                      id="money"
                      name="paymentMethod"
                      type="radio"
                      className="custom-control-input"
                      value="money"
                    />
                    <label className="custom-control-label">Dinheiro</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="credit"
                      name="paymentMethod"
                      value="credit"
                      type="radio"
                      className="custom-control-input"
                    />
                    <label className="custom-control-label">Cartão de Crédito</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label for="cc-name">Deseja colocar seu CPF na nota?</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cpf"
                      name="cpf"
                      placeholder="000.000.000-00"
                    />

                    <div className="invalid-feedback">Name on card is required</div>
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

const renderError = () => {
  return <p>Erro</p>;
};
