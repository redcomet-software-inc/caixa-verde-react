import React, { Component } from 'react';
import Loading from '../common/Loading.js';
import { checkLocalStorage } from '../home/SetLocalStorage';
import Cards from 'react-credit-cards';
import { getClientInfo } from '../../common/getClientInfo.js';
import { getCardToken, sendToApi } from '../../common/getSession.js';
import { getAuth } from '../../common/getAuth.js';
import 'react-credit-cards/es/styles-compiled.css';
import LoaderHOC from '../../HOC/LoaderHOC.js';
import PropTypes from 'prop-types';


class Payment extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
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
    this.props.actions.turnOffLoading();
    getAuth().then(res => {
      if(res === true) {
        if(this.state.order_id > 0) {
          this.props.actions.turnOffLoading();
        } else {
          this.props.redirect('/');
        } 
      }
    }).catch(error => {
      this.props.actions.turnOnError('Algo de Errado Não está Certo: ' + error);
    });
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
    if(name === "expiry_month") {
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
  }

  handleChange = (e) => {
    e.preventDefault();
    e.persist();
    const card_name = e.currentTarget.name;
    const card_string = e.currentTarget.value;
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
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
    /* Set Items and Client Infos */
    getClientInfo.then(buyer => {
      this.setState({ client_info: buyer});
    });
    /* Client Side Payment Process */
    getCardToken(card).then(response => {
      this.setState({isLoadingSend: false});
      sendToApi(this.state.order_id).then(res => {
      }).catch(error => {
        throw new Error("Something went wrong: " + error);
      });
    });
  }

  renderYearSelect = () => {
    let year = (new Date().getFullYear());
    let method = [];
    for(let i=0; i<=11; i++) { 
      method.push(<option key={year+i} value={year +i}>{ year + i }</option>);
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
              <label htmlFor="inp" className="inp mb-2">
                <input type="text" maxLength="16" id="card_number" value={this.state.card_number} onClick={e => this.handleClick_card(e)} onChange={e => this.handleChange(e)} name="card_number" placeholder="&nbsp;" autoComplete="off" required/>
                <span className="label">Número do Cartão</span>
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="col-3 mb-3">
              <label htmlFor="inp" className="inp mb-3">
                <select type="text" onChange={e => this.handleChangeExpiry(e)} defaultValue={this.state.card_expiry_month} id="expiry_month" name="expiry_month" placeholder="&nbsp;" required>
                  <option disabled value=""> - Mês - </option>
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
              <label htmlFor="inp" className="inp mb-3">
                <select type="text" onChange={e => this.handleChangeExpiry(e)} defaultValue={this.state.card_expiry_year} id="expiry_year" name="expiry_year" placeholder="&nbsp;" required>
                  <option disabled value="" > - Ano - </option>
                  { this.renderYearSelect() }       
                </select> 
                <span className="label"></span> 
              </label>
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="inp" className="inp mb-2">
                <input type="text"  maxLength="3" id="cvc" onClick={e => this.handleClick_card(e)}  onChange={e => this.handleChange(e)}  name="cvc" placeholder="&nbsp;" required/>
                <span className="label">Código</span>
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="col mb-3">
              <label htmlFor="inp" className="inp mb-2">
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
    }
  }

  renderLoadingSend = () => {
    if(this.state.isLoadingSend) {
      return <Loading />
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