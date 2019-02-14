import React, { Component } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import LoaderHOC from '../../HOC/LoaderHOC.js';
import PropTypes from 'prop-types';
import { getClientInfo } from '../../common/get-clientinfo.js';

import CreditCardForm from '../pages/PaymentComponents/CreditCardForm.js';
import TicketForm from '../pages/PaymentComponents/TicketForm';
import MoneyForm from '../pages/PaymentComponents/MoneyForm';

class Payment extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };
   constructor(props) {
    super(props);
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    let order_id = 0;
   
    order_id = localStorage.getItem("checkout_order_id");
   
    this.state = { 
      client_token: token || '',
      client_email: email || '',
      encryption_key:'ek_test_2bravIrMyJOPSlHj6x2vm9HLrYmzMF',
      url_request:'',
      public_key:'',
      focused:'',
      order_id: order_id || 0,
      ps_session:'',
      orders_products:[],
      orders_kits:[],
      client_info:[],
      current_tab:'home',
      successMessage: "Pagamento Realizado!",
      errorMessage: "Não foi possível efetuar a compra."
    };
  }

  clientData = () => {
    getClientInfo().then(buyer => {
        this.setState({ client_info: buyer});
    });
  }

  componentDidMount() {
    /* Must Choose an Order to Pay */
    const o_id = this.state.order_id;
    if(o_id===0 || o_id===undefined || o_id==="undefined") {
      this.props.actions.redirect('');
    }
    this.props.actions.turnOffLoading();
  }

  handleChange = (e) => {
    e.preventDefault();
    e.persist();
    const card_name = e.currentTarget.name;
    const card_string = e.currentTarget.value;
    this.setState({ [card_name]: card_string });
  }

  

  cardCallback = (callback) => {
    this.setState({card_brand: callback.issuer});
  }

  home_tab = () => {
    return(
      <div>
      </div>
    )
  }

  handleFail = () => {
    this.setState({current_tab: "failed"});
  }

  handleSuccess = () => {
    this.setState({current_tab: "success"});
  }

  card_tab = () => {
    return (
      <CreditCardForm
        client_info={this.state.client_info}
        order_id={this.state.order_id}
        handleSuccess={this.handleSuccess}
        handleFail={this.handleFail}
      />
    );
  }

  money_tab = () => {
    return(
      <MoneyForm />
    )
  }

  ticket_tab = () => {
    return(
      <TicketForm />
    )
  }

  success_tab = (status) => {
    return(
      <div></div>
    )
  }

  fail_tab = (status) => {
    return(
      <div></div>
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
    } else if(this.state.current_tab==="success") {
      return this.success_tab("success");
    } else if(this.state.current_tab==="failed") {
      return this.fail_tab("failed");
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

  renderOptions = () => {
    return(
      <div>
        {(this.state.current_tab!=="success" && this.state.current_tab!=="failed") && (
          <div>
            <p>Escolha a sua forma de pagamento </p>
            <div className="p-4 mb-3">
                  <button type="button" onClick={(e) => this.handleClick(e)} className={"btn btn-secondary m-2 " +  this.state.active_money } name="money">Dinheiro</button>
                  <button type="button" onClick={(e) => this.handleClick(e)} className={"btn btn-secondary m-2 " +  this.state.active_card } name="card">Cartão</button>
                  <button type="button" onClick={(e) => this.handleClick(e)} className={"btn btn-secondary m-2 " +  this.state.active_ticket } name="ticket">Boleto</button>
            </div>
          </div>  
        )}
      </div>
    );
  }

  render() {
    return (
      <div className="pages-payment">

        <h2 className="text-center title">Pagamento</h2>
          <div className="row">
            <div className="col text-center">
              
                 { this.renderOptions() }
              
              
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