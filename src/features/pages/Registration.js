import React, { Component } from 'react';
import Loading from '../common/Loading.js';
import axios from 'axios';


export default class Registration extends Component {
  static propTypes = {

  };


  constructor(props){
    super(props);
    this.state = {
      neighbourhoods: [],
      street:'',
      complement:'',
      neighborhood:'',
    }
  }

  getNeighbourhoods = () => {
    axios.get('http://localhost:3000/api/v1/neighbourhoods.json')
    .then(res => {
      const neighbourhoods = res.data;
      this.setState({neighbourhoods: neighbourhoods});
    });
  }

  /* Get Address and Neighborhood from Correios API*/
  getAddressAPI = (value) => {
     axios.get('https://viacep.com.br/ws/'+value+'/json/')
    .then(res => {
      console.log(res.data);
      this.setState({street: res.data.logradouro});
      this.setState({complement: res.data.complemento});
      this.setState({neighborhood: res.data.bairro});
      if(res.data.localidade==="Brasília") {
       
        console.log("Redirect ---- ");
      }
    });
  }

  componentDidMount() {
    this.getNeighbourhoods();
    this.getAddressAPI();
  }
  renderCepLoading = () => {
    return <Loading />
  }

  render(props) {
    return (
      <div className="pages-registration form-spacing">
          <a href="">Já tenho uma conta</a>
      
        <h2 className="text-center title">Cadastro</h2>
        <form onSubmit={this.props.register}>
          <div className="form-row">
              <div className="col-md-6 mb-3">
                <label for="inp" className="inp mb-2">
                  <input type="text" id="name" name="name" placeholder="&nbsp;" />
                  <span class="label">Nome</span>
                  <span class="border"></span>
                </label>
              
              </div>
               <div className="col-md-6 mb-3">
                <label for="inp" className="inp mb-2">
                  <input type="text" id="lastname" name="lastname" placeholder="&nbsp;" />
                  <span class="label">Sobrenome</span>
                  <span class="border"></span>
                </label>
              </div>
            </div>
           
            <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label for="inp" className="inp mb-2">
                    <input type="email" id="email" name="email" placeholder="&nbsp;" />
                    <span class="label">E-mail</span>
                    <span class="border"></span>
                  </label>
                
                </div>
                <div className="col-md-6 mb-3">
                  <label for="inp" className="inp mb-2">
                    <input type="password" id="password" name="password" placeholder="&nbsp;" />
                    <span class="label">Senha</span>
                    <span class="border"></span>
                  </label>
                
                </div>
            </div>
          <div className="p-4">
            
          </div>

          <div className="form-row">
      
            <div className="col-md-3 mb-12">
              <label for="inp" className="inp mb-3">
              
                  <input onBlur={(e) => this.getAddressAPI(e.currentTarget.value)} type="text" id="zipcode" name="zipcode" placeholder="&nbsp;" /> 
                  <span class="label">CEP</span> 
                  <span class="border"></span>
                </label>
               
            </div><span className="mb-5 pl-3 mr-5">{this.renderCepLoading()}</span>
            <div className="col-md-6 mb-12 float-right">
              <label for="inp" className="inp mb-3">
                  <select type="text" id="neighbourhood_id" name="neighbourhood_id" placeholder="&nbsp;" >
                    <option disabled selected value> -- Escolha uma região -- </option>
                    {this.state.neighbourhoods.map((item, index) => (
                    <option value={item.id}> {item.name}</option>              
                ))}
                  </select> 
                  <span class="label">Região Administrativa</span> 
                  <span class="border"></span>
                </label>
            </div>


          </div>

          <div class="form-row">
            <div className="col-md-9 mb-3">
              <label for="inp" className="inp mb-2">
                  <input type="text" id="address" name="address" placeholder="&nbsp;" defaultValue={this.state.street} />
                  <span class="label">Endereço</span>
                  <span class="border"></span>
                </label>
                
            </div>
            <div className="col-md-3 mb-3">
              <label for="inp" className="inp mb-2">
                    <input type="text" id="addressnumber" name="addressnumber" placeholder="&nbsp;" />
                      <span class="label">Número</span>
                      <span class="border"></span>
                  </label>
            </div>

          </div>

          <div class="form-row">
            <div className="col-md-7 mb-3">
              <label for="inp" className="inp mb-2">
              <input type="text" id="neighbourhood" name="neighbourhood" placeholder="&nbsp;" defaultValue={this.state.neighborhood} />
                  <span class="label">Bairro</span>
                  <span class="border"></span>
              </label>
            </div>
            
            <div className="col-md-5 mb-3">
              <label for="inp" className="inp mb-2">
              <input type="text" id="complement" name="complement" placeholder="&nbsp;" defaultValue={this.state.complement} />
                  <span class="label">Complemento</span>
                  <span class="border"></span>
              </label>
            </div>
          </div>

          <div class="form-row">
            <div className="col-md-6 mb-3">
              <label for="inp" className="inp mb-2">
              <input type="text" id="cellphone" name="cellphone" placeholder="&nbsp;" />
                  <span class="label">Celular</span>
                  <span class="border"></span>
              </label>
            </div>
            
          </div>

          <br /><br />

          <div className="form-group">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" />
              <label className="form-check-label" for="invalidCheck2">
                Ao me cadastrar, concordo com os termos de serviço e políticas de privacidade desta página.
              </label>
            </div>
          </div>
  
            <div class="row">
              <div class="col-xs-6 mx-auto">
                <button className="btn btn-primary" type="submit">Cadastrar </button> 
              </div>
              <div class="col-xs-6 text-center">
                {this.renderCepLoading()}
              </div>
            </div>
 
        </form>
      </div>
    );
  }
}

/*
    t.string "name"
    t.string "phone_1"
    t.string "phone_2"
    t.string "cellphone"
    t.string "cpf"
    t.string "rg"
    t.string "cnpj"
    t.string "ie"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.index ["email"], name: "index_clients_on_email", unique: true
    t.index ["reset_password_token"], name: "index_clients_on_reset_password_token", unique: true
*/