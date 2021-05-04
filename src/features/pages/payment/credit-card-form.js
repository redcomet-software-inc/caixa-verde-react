    
import React, {Component} from 'react';
import Cards from 'react-credit-cards';
import Loading from '../../common/loading.js';
import { startPaymentProcess } from '../../../common/get-session.js';

export default class CreditCardForm extends Component {
    constructor (props) {
        super(props);
        const order_id = this.props.order_id;
        this.state = {
            isLoadingSend: false,
            card_number:'',
            card_name:'',
            card_expiry:'',
            card_expiry_month:'',
            card_expiry_year:'',
            card_brand:'',
            cvc:'',
            encryption_key:'ek_test_2bravIrMyJOPSlHj6x2vm9HLrYmzMF',
            focused:'',
            order_id: order_id || 0,
            ps_session:'',
            orders_products:[],
            orders_kits:[],
            client_info:[],
            successMessage: "Pagamento Realizado!",
            errorMessage: "Não foi possível efetuar a compra."
        }
    }

    handleClick_card = (e) => {
        e.preventDefault();
        e.persist();
        this.setState({ focused: e.target.id})
      }

    onSubmitCard = (e) => {
        e.preventDefault();
        e.persist();
        /* Avoiding Multiple Requests */
        if(this.state.isLoadingSend === true) {
            return false;
        }
        this.setState({isLoadingSend: true});
        
        let card = e.currentTarget;
        /* Client Side Payment Process */
        startPaymentProcess(card, this.state.order_id)
        .then(res => {
            this.props.handleSuccess();
        }).catch(error => {
            this.props.handleFail();
        });
    }

    handleChange = (e) => {
        e.preventDefault();
        e.persist();
        const card_name = e.currentTarget.name;
        const card_string = e.currentTarget.value;
        this.setState({ [card_name]: card_string });
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

    renderLoadingSend = () => {
        if(this.state.isLoadingSend) {
          return <Loading />
        }
      }

    renderYearSelect = () => {
        let year = (new Date().getFullYear());
        let method = [];
        for(let i=0; i<=11; i++) { 
            method.push(<option key={year+i} value={year +i}>{ year + i }</option>);
        }
        return method;
    }
    
    render() {
        const placeholders = {name: 'SEU NOME AQUI'}
        const locale = { valid: 'vencimento'}
        return (
        <form onSubmit={(e) => this.onSubmitCard(e)}>
            <input type="hidden" name="card_brand" value={this.state.card_brand} />
            <div className="mx-auto">
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
                    <input defaultValue="4111111111111111" type="text" maxLength="16" id="card_number" onClick={e => this.handleClick_card(e)} onChange={e => this.handleChange(e)} name="card_number" placeholder="&nbsp;" autoComplete="off" required/>
                    <span className="label">Número do Cartão</span>
                </label>
                </div>
            </div>
            <div className="form-row">
                <div className="col-3 mb-3">
                <label htmlFor="inp" className="inp mb-3">
                    <select defaultValue="12" type="text" onChange={e => this.handleChangeExpiry(e)} id="expiry_month" name="expiry_month" placeholder="&nbsp;" required>
                    <option disabled> - Mês - </option>
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
                    <select defaultValue="2030" type="text"  onChange={e => this.handleChangeExpiry(e)} id="expiry_year" name="expiry_year" placeholder="&nbsp;" required>
                    <option disabled value="" > - Ano - </option>
                    { this.renderYearSelect() }       
                    </select> 
                    <span className="label"></span> 
                </label>
                </div>
                <div className="col-6 mb-3">
                <label htmlFor="inp" className="inp mb-2">
                    <input defaultValue="123" type="text"  maxLength="3" id="cvc" onClick={e => this.handleClick_card(e)}  onChange={e => this.handleChange(e)}  name="cvc" placeholder="&nbsp;" required/>
                    <span className="label">Código</span>
                </label>
                </div>
            </div>
            <div className="form-row">
                <div className="col mb-3">
                <label htmlFor="inp" className="inp mb-2">
                    <input defaultValue="Guilherme da Silva" type="text" id="card_name" onClick={e => this.handleClick_card(e)} onChange={e => this.handleChange(e)} name="card_name" placeholder="&nbsp;" required/>
                    <span className="label">Nome do Proprietário</span>
                </label>
                </div>
            </div>
            <div className="row text-center mx-auto p-2">
                <div className="text-center mx-auto w-100">
                <div className="d-inline p-2 text-white"><button className="btn btn-primary" type="submit">Finalizar Compra</button></div>
                <div className="d-inline p-1 text-white position-absolute">{this.renderLoadingSend()}</div>
                </div>
            </div>
            </div>
        </form>
        );
    }
}