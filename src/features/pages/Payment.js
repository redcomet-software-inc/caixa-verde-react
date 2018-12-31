import React, { Component } from 'react';
import Loading from '../common/Loading.js';
import Cards from 'react-credit-cards';
import request from '../../common/configApi.js';
import node_rsa from 'node-rsa';
import qs from 'qs';

import 'react-credit-cards/es/styles-compiled.css';

export default class Payment extends Component {
  static propTypes = {

  };
   constructor(props) {
    super(props);
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    const checkout_order_id = this.props.checkout_order_id; 
    this.state = {
      client_token: token || '',
      client_email: email || '',
      active_money: '',
      active_card: '',
      active_ticket: '',
      active_home: 'active',
      current_tab: 'home',
      credit_card_number:'',
      credit_card_name:'',
      credit_card_expiry:'',
      credit_card_cvc:'',
      encryption_key:'ek_test_2bravIrMyJOPSlHj6x2vm9HLrYmzMF',
      url_request:'',
      public_key:'',
      pagarme_id:'',
      focused:'',
      isLoading: true,
      checkout_order_id: checkout_order_id || 0
    };
  }

  componentDidMount() {
      console.log("NODE RSA");
      console.log(node_rsa);

     
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

  handleChange = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    e.persist();
    this.setState({ [e.target.name]: e.target.value});

    

    let url = 'card_number=' + this.state.credit_card_number + '&card_holder_name=' + encodeURIComponent(this.state.credit_card_name) + '&card_expiration_date=' +  this.state.credit_card_expiry +  '&card_cvv=' + this.state.credit_card_cvc;


    this.setState({ url_request: url });
    console.log(url);
     //card_number=4901720080344448&card_holder_name=
     //AardvarK%20Silva&card_expiration_date=1213&card_cvv=314
    
  }

  handleClick_credit_card = (e) => {
    e.preventDefault();
    e.persist();
    this.setState({ focused: e.target.id})
    console.log(this.state.focused);
  
    if(e.target.id==="cvc") {
      //this.setState({ credit_card_cvc: ''});
      //e.target.value = '';
    }
  }

  card_tab = () => {

    const placeholders = {name: 'SEU NOME AQUI'}
    const locale = { valid: 'vencimento'}

    return(
      <div className="mx-auto">
        Order Id: {this.state.checkout_order_id}
        <div className="form-row mb-4">
 
           <Cards
              number={this.state.credit_card_number}
              name={this.state.credit_card_name}
              expiry={this.state.credit_card_expiry}
              cvc={this.state.credit_card_cvc}
              focused={this.state.focused}
              placeholders={placeholders}
              locale={locale}
              
            />
        </div>
        <div className="form-row">
          <div className="col mb-3">
            <label for="inp" className="inp mb-2">
              <input type="text" maxLength="16" id="number" value={this.state.credit_card_number} onClick={e => this.handleClick_credit_card(e)} onChange={e => this.handleChange(e)} name="credit_card_number" placeholder="&nbsp;" autocomplete="off" required/>
              <span className="label">Número do Cartão</span>
              <span className="border"></span>
            </label>
          </div>
        </div>
        <div className="form-row">
          <div className="col mb-3">
            <label for="inp" className="inp mb-2">
              <input type="text" maxLength="5" id="expiry" value={this.state.credit_card_expiry}  onClick={e => this.handleClick_credit_card(e)}  onChange={e => this.handleChange(e)}  name="credit_card_expiry" required/>
              <span className="label">Data de Vencimento</span>
              <span className="border"></span>
            </label>
          </div>
          <div className="col mb-3">
             <label for="inp" className="inp mb-2">
              <input type="text"  maxLength="3" id="cvc" onClick={e => this.handleClick_credit_card(e)}  onChange={e => this.handleChange(e)}  name="credit_card_cvc" placeholder="&nbsp;" required/>
              <span className="label">Código</span>
              <span className="border"></span>
            </label>
          </div>
        </div>
        <div className="form-row">
          <div className="col mb-3">
            <label for="inp" className="inp mb-2">
              <input type="text" id="name"  value={this.state.credit_card_name}  onClick={e => this.handleClick_credit_card(e)} onChange={e => this.handleChange(e)} name="credit_card_name" placeholder="&nbsp;" required/>
              <span className="label">Nome do Proprietário</span>
              <span className="border"></span>
            </label>
          </div>
        </div>
      </div>
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


  card_hash_generate = (public_key) => {

      const cardString = qs.stringify({
            card_number: this.state.credit_card_number,
            card_holder_name: this.state.credit_card_name,
            card_expiration_date: this.state.credit_card_expiry,
            card_cvv: this.state.credit_card_cvc,
          })

      const url = this.state.url_request;
      console.log("URL");
      console.log(cardString);
      const key = new node_rsa(public_key);
      key.setOptions({'encryptionScheme': 'pkcs1'});
      const encrypted = key.encrypt(cardString, 'base64');
      console.log("Convert to Base 64");
      console.log(encrypted);
      const cardHash = this.state.pagarme_id + '_' + encrypted;
      console.log("card Hash");
      console.log(cardHash)

      request({
      method:'post',
      url: '/api/v1/payments.json',
      params: {
        client_token: this.state.client_token,
        client_email: this.state.client_email,
        card_hash: cardHash,
        pagarme_id: this.state.pagarme_id,
        order_id: this.state.checkout_order_id
      }
      }).then(res => { 


      });
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

  

    if(e.target.name === "card") {
      this.setState({ credit_card_cvc:''});
      this.setState({ focused:''});

      console.log("encryption key");
      console.log(this.state.encryption_key);

      console.log("Pagar me");


      
      
      request({
      method:'get',
      url: 'https://api.pagar.me/1/transactions/card_hash_key',
      params: {
        encryption_key: this.state.encryption_key
      }
      }).then(res => {
        this.setState({ public_key: res.public_key});
        this.setState({ pagarme_id: res.id});
        console.log("PAGARME ID");
        console.log(res.id);
        this.card_hash_generate(res.public_key);
     
      });
    } 
  }

  renderLoading = () => {
    if(this.state.isLoading) {
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
              <div class="btn-group btn-group-lg" role="group" aria-label="...">
                <button type="button" class={"btn btn-secondary " +  this.state.active_money } name="money" onClick={(e) => this.handleClick(e)} >Dinheiro</button>
                <button type="button" class={"btn btn-secondary " +  this.state.active_card } name="card" onClick={(e) => this.handleClick(e)} >Cartão</button>
                <button type="button" class={"btn btn-secondary " +  this.state.active_ticket } name="ticket" onClick={(e) => this.handleClick(e)} >Boleto</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="content-payment w-80 p-3 pt-4 mx-auto">

              {this.current_page()}
              
            </div>
          </div>
          <div className="row text-center mx-auto p-2">
            <div className="text-center mx-auto w-100">
              <div className="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" disabled={this.props.disable} >Finalizar Compra</button></div>
              <div className="d-inline p-1 text-white position-absolute">{this.renderLoading()}</div>
            </div> 
          </div>
      </div>
    );
  }
}
