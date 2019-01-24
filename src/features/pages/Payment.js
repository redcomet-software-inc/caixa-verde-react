import React, { Component } from 'react';
import Loading from '../common/Loading.js';
import { setLocalStorage, checkLocalStorage } from '../home/SetLocalStorage';
import Cards from 'react-credit-cards';
import request from '../../common/configApi.js';
import Ps from 'pagseguro';
import node_rsa from 'node-rsa';
import qs from 'qs';
import { getClientInfo } from '../../common/getClientInfo.js';
import { getOrders } from '../../common/getOrders.js';
import { getCardToken, getSession, setSession, sendToApi } from '../../common/getSession.js';
import 'react-credit-cards/es/styles-compiled.css';
import * as actions from '../../features/home/redux/actions.js';
import LoaderHOC from '../../HOC/LoaderHOC.js';
import PropTypes from 'prop-types';

export class PagSeguro extends Component
{
  static propTypes = {
    pages: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequfired,
  };
  constructor (props) {
    super(props);
    /* Autenticação SandBox */
    const credentials = { 
      email: 'guilhermewnunes@gmail.com' ,
      token: '3774B1301F034CDAA8900429ACCB394B',
      app_key: '8CAA79B12020B98EE4827F8090434CBC',
      app_id: 'app2667430172',
      /* Vendedor SandBox */
      ps_email: 'v22492077527287296117@sandbox.pagseguro.com.br',
      ps_password: '7t5407KU61545154',
      ps_public_key: 'PUB777351BC15E041148CF3AF37411487C8',
      config: {
        currency: 'BRL',
        reference: '12345'
      }
    }
    this.ps = new Ps({
        email: credentials.email,
        token: credentials.token,
        mode: 'sandbox'
    });
  }

  config = function() 
  {
    this.ps.currency('BRL');
    this.ps.reference('12345');
    return this.ps
  }

  send = function ()
  {
    /*this.ps.send(function(err, res) {
      if (err) {
          console.log(err);
      }
      console.log(res);
    }); */
  }

  setShipping = function(shipping)
  {
    let address_delivery  = shipping.address_delivery
    let adm_region = shipping.adm_region
    this.ps.shipping({
      type: 1,
      street: address_delivery.street,
      complement: address_delivery.complement,
      district: adm_region.name,
      postalCode: '',
      city: address_delivery.city,
      state: address_delivery.state,
      country: 'BRA'
    });
    return this.ps
  }

  setClient = function(buyer)
  {
    this.ps.buyer({
      name: buyer.name,
      email: buyer.email,
      phoneAreaCode: '61',
      phoneNumber: buyer.cellphone
    });
    return this.ps
  }

  setItem = function(item)
  {
    let item_result = this.ps.addItem(item);
    if(item_result) {
      return true;
    } else {
      return false;
    }
  }
}

class Payment extends Component {
  static propTypes = {

  };
   constructor(props) {
    super(props);
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    let order_id = 0;
    if (checkLocalStorage() !== false) {
      order_id = localStorage.getItem("checkout_order_id");
    }
    this.state = { 
      client_token: token || '',
      client_email: email || '',
      active_money: '',
      active_card: '',
      active_ticket: '',
      active_home: 'active',
      current_tab: 'home',
      card_number:'',
      card_name:'',
      card_expiry:'',
      card_expiry_month:'',
      card_expiry_year:'',
      card_brand:'',
      cvc:'',
      encryption_key:'ek_test_2bravIrMyJOPSlHj6x2vm9HLrYmzMF',
      url_request:'',
      public_key:'',
      pagarme_id:'',
      focused:'',
      isLoadingSend: false,
      order_id: order_id || 0,
      ps_session:'',
      orders_products:[],
      orders_kits:[],
      client_info:[],
    };
  }

  componentDidMount() {
    
  }

  /* Get Order from API and Set to pagSeguro instance */
  getOrder = (pagSeguro) => {
    getOrders(this.state.order_id).then(order => {
      this.setState({ orders_products: order });
      if(order.orders_products.length > 0) {
        this.setItems(pagSeguro, order.orders_products);
      }
      if(order.orders_kits.length > 0) {
        this.setItems(pagSeguro, order.orders_kits);
      }
      pagSeguro.send();
    });
  }

  setItems = (pagSeguro, items) => {
    let item = {}
    let count = 0;
    items.map((item) => {
        item = {id: item.id,
                  name: item.name,
                  description: item.description,
                  amount: item.price,
                  quantity: item.quantity }
      let psClass = pagSeguro.setItem(item);
      if(!psClass) {
        count++;
      }
    });
    if(count===0) {
      return true;
    } else {
      return false;
    }
  }

  home_tab = () => {
    return(
      <div>
      </div>
    )
  }

  money_tab = () => {
    return(
      <div>
        This is the Money Tab
      </div>
    )
  }

  handleChangeExpiry = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    let value_expiry = "";
    console.log("Expiry");
    if(name === "expiry_month") {
      console.log("month");
      this.setState({card_expiry_month: value});
      let txt_month = value
      let txt_year = this.state.card_expiry_year.substring(this.state.card_expiry_year.length-2).toString(2);
      let txt = txt_month + txt_year;
      this.setState({card_expiry: txt});
    }
    if(name === "expiry_year") {
      let txt_month = "";
      this.setState({card_expiry_year: value});
      if(this.state.card_expiry_month.length === 0) {
        txt_month = "--";
      } else {
        txt_month = this.state.card_expiry_month.toString(2);
      }
      let txt_year = value.substring(value.length-2).toString(2);
      let txt = txt_month + txt_year;
      this.setState({card_expiry: txt});
    }
    console.log("Year");
    console.log(e.currentTarget.value);
  }

  handleChange = (e) => {
    e.preventDefault();
    e.persist();
    const card_name = e.currentTarget.name;
    const card_string = e.currentTarget.value;
    console.log(e.currentTarget.name);
    this.setState({ [card_name]: card_string });
  }

  handleClick_card = (e) => {
    e.preventDefault();
    e.persist();
    this.setState({ focused: e.target.id})
  }

  cardCallback = (callback) => {
    this.setState({card_brand: callback.issuer});
  }

  onSubmitCard = (e) => {
    this.setState({isLoadingSend: true});
    e.preventDefault();
    e.persist();
    let card = e.currentTarget;

    /* Set Items and Client Infos */
    let pagSeguro = new PagSeguro();
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
    let data = [];
    getClientInfo.then(buyer => {
      pagSeguro.setClient(buyer);
      pagSeguro.config(buyer);
      pagSeguro.setShipping(buyer)
      this.setState({ client_info: buyer});
      this.getOrder(pagSeguro);
    });

    /* Client Side Payment Process */
    getCardToken(card).then(response => {
      this.setState({isLoadingSend: false});

      sendToApi(this.state.order_id).then(res => {
        console.log("SENT TO API");
      }).catch(err => {
        console.log(err);
      });

    });


    console.log("Submit Card");
    e.target.elements.card_number
  }

  renderYearSelect = () => {
    let year = (new Date().getFullYear());
    let method = [];
    for(let i=0; i<=11; i++) { 
      method.push(<option value={year +i}>{ year + i }</option>);
    }
    return method;
  }

  card_tab = () => {
    const placeholders = {name: 'SEU NOME AQUI'}
    const locale = { valid: 'vencimento'}
    return (
      <form onSubmit={(e) => this.onSubmitCard(e)}>
        <input type="hidden" name="card_brand" value={this.state.card_brand} />

        <div className="mx-auto">
          Order Id: {this.state.order_id}
          <div className="form-row mb-4">
            <Cards
                number={this.state.card_number}
                name={this.state.card_name}
                expiry={this.state.card_expiry}
                cvc={this.state.cvc}
                focused={this.state.focused}
                placeholders={placeholders}
                locale={locale}
                callback={this.cardCallback}
              />
          </div>
          <div className="form-row">
            <div className="col mb-3">
              <label for="inp" className="inp mb-2">
                <input type="text" maxLength="16" id="card_number" value={this.state.card_number} onClick={e => this.handleClick_card(e)} onChange={e => this.handleChange(e)} name="card_number" placeholder="&nbsp;" autocomplete="off" required/>
                <span className="label">Número do Cartão</span>
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="col-3 mb-3">
              <label for="inp" className="inp mb-3">
                <select type="text" onChange={e => this.handleChangeExpiry(e)} defaultValue={this.state.card_expiry_month} id="expiry_month" name="expiry_month" placeholder="&nbsp;" required>
                  <option disabled selected value=""> - Mês - </option>
                  <option value="01">01</option>
                  <option value="02">02</option>  
                  <option value="03">03</option>  
                  <option value="04">04</option>  
                  <option value="05">05</option>  
                  <option value="06">06</option>  
                  <option value="07">07</option>  
                  <option value="08">08</option>  
                  <option value="09">09</option>  
                  <option value="10">10</option>  
                  <option value="11">11</option>  
                  <option value="12">12</option>                
                </select> 
                <span className="label">Data de Vencimento</span>
              </label>
            </div>
            <div className="col-3 mb-3">
              <label for="inp" className="inp mb-3">
                <select type="text" onChange={e => this.handleChangeExpiry(e)} defaultValue={this.state.card_expiry_year} id="expiry_year" name="expiry_year" placeholder="&nbsp;" required>
                  <option disabled selected value="" > - Ano - </option>
                  { this.renderYearSelect() }
                              
                </select> 
                <span className="label"></span> 
              </label>
            </div>
            <div className="col-6 mb-3">
              <label for="inp" className="inp mb-2">
                <input type="text"  maxLength="3" id="cvc" onClick={e => this.handleClick_card(e)}  onChange={e => this.handleChange(e)}  name="cvc" placeholder="&nbsp;" required/>
                <span className="label">Código</span>
              </label>
            </div>
          </div>
          
          <div className="form-row">
            <div className="col mb-3">
              <label for="inp" className="inp mb-2">
                <input type="text" id="card_name"  value={this.state.card_name}  onClick={e => this.handleClick_card(e)} onChange={e => this.handleChange(e)} name="card_name" placeholder="&nbsp;" required/>
                <span className="label">Nome do Proprietário</span>
                 
              </label>
            </div>
          </div>
          <div className="row text-center mx-auto p-2">
            <div className="text-center mx-auto w-100">
              <div className="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" disabled={this.props.disable} >Finalizar Compra</button></div>
              <div className="d-inline p-1 text-white position-absolute">{this.renderLoadingSend()}</div>
            </div>
          </div>
        </div>
      </form>
    )
  }
  ticket_tab = () => {
    return(
      <div>
        This is the Ticket Tab
      </div>
    )
  }

  current_page = () => {
    if(this.state.current_tab==="home") {
      return this.home_tab();
    } else if (this.state.current_tab==="money") {
      return this.money_tab();
    } else if (this.state.current_tab==="card") {
      return this.card_tab();
    } else if (this.state.current_tab==="ticket") {
      return this.ticket_tab();
    } else {

    }
  }

  handleClick = (e) => {
    e.preventDefault();
    e.persist();
    let name = e.target.name;
    this.setState({ current_tab: name});
    this.setState({ active_card: ''});
    this.setState({ active_home: ''});
    this.setState({ active_money: ''});
    this.setState({ active_ticket: ''});
    this.setState({ ['active_' + name]: 'active' });
  }

  renderLoadingSend = () => {
    if(this.state.isLoadingSend) {
      return <Loading />
    }
  }

  render() {
    return (
      <div className="pages-payment">
        <h2 className="text-center title">Pagamento</h2>
          <div className="row">
            <div className="col text-center">
              <p>Escolha a sua forma de pagamento </p>
              <div className="btn-group btn-group-lg pb-4 mb-3" role="group" aria-label="...">
                <button type="button" className={"btn btn-secondary " +  this.state.active_money } name="money" onClick={(e) => this.handleClick(e)} >Dinheiro</button>
                <button type="button" className={"btn btn-secondary " +  this.state.active_card } name="card" onClick={(e) => this.handleClick(e)} >Cartão</button>
                <button type="button" className={"btn btn-secondary " +  this.state.active_ticket } name="ticket" onClick={(e) => this.handleClick(e)} >Boleto</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="content-payment w-80 p-3 pt-4 mx-auto">
              {this.current_page()}
            </div>
          </div>
      </div>
    );
  }
}
export default LoaderHOC(Payment);