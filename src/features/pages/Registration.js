import React, { Component } from 'react';
import Loading from '../common/Loading.js';
import axios from 'axios';
import {
  NavLink
} from "react-router-dom";

export default class Registration extends Component {
  static propTypes = {

  };

  constructor(props){
    super(props);
    this.state = {
      adm_regions: [],
      street:'',
      complement:'',
      neighbourhood:'',
      isCepLoading:false,
      isLoading:false,
      invalidCep:'invisible',
      invalidEmail:'invisible',
    }
  }

  getAdmRegions = () => {
    axios.get('http://localhost:3000/api/v1/adm_regions.json')
    .then(res => {
      const adm_regions = res.data;
      this.setState({adm_regions: adm_regions});
    });
  }

  /* Get Address and Neighborhood from Correios API*/
  getAddressAPI = (value) => {
     this.setState({isCepLoading: true});
     axios.get('https://viacep.com.br/ws/'+value+'/json/')
    .then(res => {
      this.setState({isCepLoading: false});
      console.log(res.status);
      this.setState({street: res.data.logradouro});
      this.setState({complement: res.data.complement});
      this.setState({neighbourhood: res.data.bairro});
      this.setState({invalidCep: 'invisible'});
      if(res.data.localidade==="Brasília") {
        console.log("Redirect ---- ");
      }
    }).catch(error => {
      console.log("Errrrr");
      this.setState({invalidCep: 'visible'});
      this.setState({isCepLoading: false});
    }
    );
  }

  componentDidMount() {
    this.getAdmRegions();
   
  }
  renderCepLoading = () => {
    if(this.state.isCepLoading) {
      return <Loading />
    }
  }

  renderLoading = () => {
    if(this.state.isLoading) {
      return <Loading />
    }
  }

   /* Submit Data to the API */
  register = e => {
    //name, lastname, email, password, city, state, zipcode, address, number, neighbourhood, complement, phone1, phone2, rg, cpf
    console.log("Register");
    e.preventDefault();
    this.setState({isLoading: true});
    const name = e.target.elements.name.value;
    const lastname = e.target.elements.lastname.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const zipcode = e.target.elements.zipcode.value;
    const street = e.target.elements.street.value;
    const addressnumber = e.target.elements.addressnumber.value;
    const neighbourhood = e.target.elements.neighbourhood.value;
    const adm_region_id = e.target.elements.adm_region_id.value;
    const complement = e.target.elements.complement.value;
    const cellphone = e.target.elements.cellphone.value;
    console.log("Zipcode:");
    console.log(zipcode);

     axios({ method: 'POST', url: 'http://localhost:3000/api/v1/clients.json',
        data: { 
          client: {
            name: name,
            lastname: lastname,
            email: email,
            cellphone: cellphone,
            password: password,
            password_confirmation: password,
            addresses_attributes: [{
              number: addressnumber,
              street: street,
              zipcode: zipcode,
              complement: complement,
              adm_region_id: adm_region_id,
              neighbourhood: neighbourhood
            }]
            
          }
        },
        }).then(res => {
          if(res.status===200) {
            this.setState({isLoading:false});
            this.props.redirect('login');
          } else if(res.status===422) {
            
          }
        }).catch( error => {
          console.log(error);
          this.setState({invalidEmail:true});
          this.setState({isLoading:false});
        });
  }


  render(props) {
    return (
      <div className="pages-registration form-spacing p-lg-2 mb-5 pb-5">
          <NavLink className="nav-link p-4 text-center" to="/login" >Já tenho uma conta</NavLink>
          <p></p>
        <h2 className="text-center title">Cadastro</h2>
        <form onSubmit={this.register}>
          <div className="row">
              <div className="col-md-6 mb-3">
                <label for="inp" className="inp mb-2">
                  <input type="text" id="name" name="name" placeholder="&nbsp;" required/>
                  <span className="label">Nome</span>
                   
                </label>
              
              </div>
               <div className="col-md-6 mb-3">
                <label for="inp" className="inp mb-2">
                  <input type="text" id="lastname" name="lastname" placeholder="&nbsp;" required />
                  <span className="label">Sobrenome</span>
                   
                </label>
              </div>
            </div>
           
            <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label for="inp" className="inp mb-2">
                    <input type="email" id="email" name="email" placeholder="&nbsp;" required/>
                    <span className="label">E-mail</span>
                     
                    <small id="passwordHelp" className={"text-danger " + this.state.invalidEmail}>
                      Este E-mail já está cadastrado.
                    </small>  
                  </label>
                  
                </div>
                <div className="col-md-6 mb-3">
                  <label for="inp" className="inp mb-2">
                    <input type="password" id="password" name="password" placeholder="&nbsp;" required/>
                    <span className="label">Senha</span>
                     
                  </label>
                
                </div>
            </div>
          <div className="p-4">
            
          </div>

          <div className="form-row">
      
            <div className="col-md-3 mb-12">
              <label for="inp" className="inp mb-3">
              
                  <input onBlur={(e) => this.getAddressAPI(e.currentTarget.value)} type="text" id="zipcode" name="zipcode" placeholder="&nbsp;" required/> 
                  <span className="label">CEP</span> 
                   
                </label>
                
            </div>
            <div className="col-md-3 pb-5">
                <small id="passwordHelp" className={"text-danger " + this.state.invalidCep}>
                CEP inválido
              </small>  
              <span className="mb-5 pl-3 mr-5">{this.renderCepLoading()}</span>
            </div>
            
            
            <div className="col-md-6 mb-12 float-right">
              <label for="inp" className="inp mb-3">
                  <select type="text" id="adm_region_id" name="adm_region_id" placeholder="&nbsp;" required>
                    <option disabled selected value=""> -- Escolha uma região -- </option>
                    {this.state.adm_regions.map((item, index) => (
                    <option value={item.id}> {item.name}</option>              
                ))}
                  </select> 
                  <span className="label">Região Administrativa</span> 
                   
                </label>
            </div>


          </div>

          <div className="form-row">
            <div className="col-md-9 mb-3">
              <label for="inp" className="inp mb-2">
                  <input type="text" id="street" name="street" placeholder="&nbsp;" defaultValue={this.state.street} required/>
                  <span className="label">Endereço</span>
                   
                </label>
                
            </div>
            <div className="col-md-3 mb-3">
              <label for="inp" className="inp mb-2">
                    <input type="text" id="addressnumber" name="addressnumber" placeholder="&nbsp;" required/>
                      <span className="label">Número</span>
                       
                  </label>
            </div>

          </div>

          <div className="form-row">
            <div className="col-md-7 mb-3">
              <label for="inp" className="inp mb-2">
              <input type="text" id="neighbourhood" name="neighbourhood" placeholder="&nbsp;" defaultValue={this.state.neighbourhood} required/>
                  <span className="label">Bairro</span>
                   
              </label>
            </div>
            
            <div className="col-md-5 mb-3">
              <label for="inp" className="inp mb-2">
              <input type="text" id="complement" name="complement" placeholder="&nbsp;" defaultValue={this.state.complement} />
                  <span className="label">Complemento</span>
                   
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label for="inp" className="inp mb-2">
              <input type="text" id="cellphone" name="cellphone" placeholder="&nbsp;" required/>
                  <span className="label">Celular</span>
                   
              </label>
            </div>
          </div>

          <div className="form-check form-check-inline p-4">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" required/>
            <label className="form-check-label" for="inlineCheckbox1"> Ao me cadastrar, concordo com os termos de serviço e políticas de privacidade desta página.</label>
          </div>

          
          <div class="text-center mx-auto w-100">
          <div class="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" disabled={this.props.disable} >Cadastrar</button></div>
          <div class="d-inline p-1 text-white position-absolute">{this.renderLoading()}</div>
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