import React, { Component } from 'react';
import axios from 'axios';
import request from '../../common/configApi.js';

export default class Checkout extends Component 
{
  static propTypes = {};

  constructor(props) 
  {
    super(props);
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    //this.props.turnOnLoading();
    this.props.updateShoppingCart("kit");
    this.props.updateShoppingCart("product");
    this.state = 
    {
      client_id: 0,
      name: '',
      lastname: '',
      cellphone: '',
      cpf: '',
      address_id: '',
      address_street: '',
      address_complement: '',
      address_zipcode: '',
      address_number:'',
      address_neighbourhood:'',
      address_kind:'delivery',
      freight: '',
      order_price: 0,
      adm_region_id: '',
      adm_regions: [],
      adm_region_name: '',
      email: email || '',
      token: token || '',
      clientInformationsLoaded: false,
      admRegionsLoaded: false,
      productsLoaded: false,
      kitsLoaded: false,
      permit: false,
      checkout_order_id:0,
    };

    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() 
  {
      this.getClientInformations();
      this.getAdmRegions();
      window.scroll({top: 0, left: 0, behavior: 'smooth' })
  }

  getPermission = () => 
  {
    if((this.props.productsCount < this.props.minQuantity) && this.props.kitsCount===0) 
    {
      this.setState({permit: false});
    } else 
    {
      this.setState({permit: true});
    }
  }

  turnOffLoading = () => 
  {
    this.getPermission();
    if (
      this.state.clientInformationsLoaded === true &&
      this.state.admRegionsLoaded === true
    ) 
    {
      if(this.state.permit === false ) 
      {
        this.props.redirect('personalizado');
      } else 
      {
        this.setState({order_price: this.props.totalPriceProducts + this.props.totalPriceKits + this.state.freight });
        this.props.turnOffLoading();
      }
    }
  };

  /*Get all the new Data and decide what to submit to the server*/
  checkOut = e => 
  {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const lastname = e.target.elements.lastname.value;
    this.setState({ lastname: lastname });
    const email = e.target.elements.email.value;
    this.setState({ clientEmail: email });
    const cellphone = e.target.elements.cellphone.value;
    this.setState({ cellphone: cellphone });
    const address_street = e.target.elements.address_street.value;
    this.setState({ address_street: address_street });
    const address_number = e.target.elements.address_number.value;
    this.setState({ address_number: address_number });
    const address_complement = e.target.elements.address_complement.value;
    this.setState({ address_complement: address_complement });
    const address_neighbourhood = e.target.elements.address_neighbourhood.value;
    this.setState({address_neighbourhood: address_neighbourhood});
    const address_adm_region_id = e.target.elements.adm_region_id.value;
    this.setState({ adm_region_id: address_adm_region_id});
    const address_zipcode = e.target.elements.address_zipcode.value;
    this.setState({ address_zipcode: address_zipcode });
    const token = this.state.token;
    const client_id = e.target.elements.client_id.value;
    this.setState({ client_id: client_id });
    const address_id = e.target.elements.address_id.value;
    this.setState({ address_id: address_id });
    const cpf = e.target.elements.cpf.value;
    
    const products = this.props.shoppingCartProducts;
    const kits = this.props.shoppingCartKits;
    //const kits = JSON.stringify(this.props.shoppingCartKits);
    /* Data structure to Create Order */
    console.log("creating order");
    console.log(this.state.address_complement)

    var data = {
      client_token: this.state.token,
      client_email: this.state.email,
      order: {
        client_id: client_id,
        order_price: this.state.order_price,
        orders_products_attributes: [],
        kits_orders_attributes:[],
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
    products.map((product) =>
    {
      data.order.orders_products_attributes.push({
        product_id: product.id,
        quantity: product.quantity
      });
    });

    kits.map((kit) =>
    {
      data.order.kits_orders_attributes.push({
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
      console.log("Response Data");
      console.log(res.order.id);
      this.setState({checkout_order_id: res.order.id});
      this.props.setCheckoutOrderId(res.order.id);
      //this.props.redirect('pagamento');
      //this.props.redirect('personalizado');
    });
  }

  getClientInformations = () => 
  {
    /* Get Data from current user based on email and token */
    axios.get('http://localhost:3000/api/v1/clients/1.json', 
    {
      params: 
      {
        client_email: this.state.email,
        client_token: this.state.token,
      },
    })
    .then(res => 
    {
      if (res.status === 200) 
      {
        this.setState({ client_id: res.data.id });
        this.setState({ name: res.data.name });
        this.setState({ lastname: res.data.lastname });
        this.setState({ cellphone: res.data.cellphone });
        this.setState({ email: res.data.email });
        this.setState({ cpf: res.data.cpf})
        if(res.data.address_delivery !== null) 
        {
          this.setState({ address_street: res.data.address_delivery.street });
          this.setState({ address_id: res.data.address_delivery.id });
          this.setState({ address_complement: res.data.address_delivery.complement });
          this.setState({ address_zipcode: res.data.address_delivery.zipcode });
          this.setState({ address_kind: res.data.address_delivery.kind });
          this.setState({ address_number: res.data.address_delivery.number})
          this.setState({ address_neighbourhood: res.data.address_delivery.neighbourhood})
        }
        this.setState({ freight: res.data.freight });
        this.setState({ adm_region_id: res.data.address_delivery.adm_region_id });
        this.setState({ adm_region_name: res.data.adm_region.id });
        this.setState({ clientInformationsLoaded: true });
        this.turnOffLoading();
      }
    });
  };

  getAdmRegions = () => 
  {
    axios.get('http://localhost:3000/api/v1/adm_regions.json').then(res => 
    {
      const adm_regions = res.data;
      console.log(adm_regions);
      this.setState({ adm_regions: adm_regions });
      this.setState({ admRegionsLoaded: true });
      this.turnOffLoading();
    });
  };

  redirect() 
  {
    return this.props.redirect('login');
  }

  renderQuantity = quantity => 
  {
    if (quantity > 1) {
      return '(' + quantity + ')';
    }
  };


  componentDidUpdate(prevProps) 
  {
    if(prevProps.shoppingCartKits !== this.props.shoppingCartKits) 
    {
      if(this.props.shoppingCartKits.length > 0) 
      {
          this.setState({ kitsLoaded: true });
          this.turnOffLoading();
        }
    }
    if(prevProps.shoppingCartProducts !== this.props.shoppingCartProducts) 
    {
        if(this.props.shoppingCartProducts.length > 0) 
        {
          this.setState({ productsLoaded: true });
          this.turnOffLoading();
        }
    }
    if(prevProps.productsCount !== this.props.productsCount) 
    {
      console.log("Produtos:"+this.props.productsCount);
    }
  }

  change = (e) => 
  {
    this.setState({adm_region_id: e.target.value});
  }

  render() 
  {
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
                  <label for="firstName">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder=""
                    onChange={this.handleChange}
                    defaultValue={this.state.name}
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
                    defaultValue={this.state.lastname}
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
                    defaultValue={this.state.email}
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
                    defaultValue={this.state.cellphone}
                    required
                  />
                </div>
              </div>
              <div className="row">
              <div className="col-md-3 mb-3">
                  <label for="zip">CEP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address_zipcode"
                    name="address_zipcode"
                    placeholder=""
                    defaultValue={this.state.address_zipcode}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-9 mb-3">
                    <label for="address">Endereço</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address_street"
                      name="address_street"
                      placeholder="Rua, Avenina, 99"
                      defaultValue={this.state.address_street}
                      required
                    />
                    <div className="invalid-feedback"></div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="mb-3">
                      <label for="address">Número</label>
                      <input
                        type="number"
                        className="form-control"
                        id="address_number"
                        name="address_number"
                        placeholder=""
                        defaultValue={this.state.address_number}
                        required
                      />
                    <div className="invalid-feedback"></div>
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col-md-4 mb-3">
                  <label for="zip">Bairro</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address_neighbourhood"
                    name="address_neighbourhood"
                    placeholder=""
                    defaultValue={this.state.address_neighbourhood}
                  />
                  </div>
                <div className="col-md-4 mb-3">
                  <label for="zip">Complemento</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address_complement"
                    name="address_complement"
                    placeholder="(opcional)"
                    defaultValue={this.state.address_complement}
                  />
                  <div className="invalid-feedback" />
                </div>
                <div className="col-md-4 mb-3">
                  <label for="state">Região Administrativa</label>
                  <select
                    className="form-control"
                    type="text"
                    id="adm_region_id"
                    name="adm_region_id"
                    onChange={e => this.change(e)}
                    value={this.state.adm_region_id}
                    placeholder="&nbsp;"
                    required
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
                  <label for="cc-name">Deseja colocar seu CPF na nota?</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cpf"
                    name="cpf"
                    defaultValue={this.state.cpf}
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

const renderError = () => 
{
  return <p>Erro</p>;
};
