import React, { Component } from 'react';
import Loading from '../common/loading.js';
import axios from 'axios';
import {
  NavLink
} from "react-router-dom";
import LoaderHOC from '../../HOC/loader-hoc';

class Registration extends Component {
  constructor(props){
    super(props);
    this.state = {
      adm_regions: [],
      street:'',
      complement:'',
      neighbourhood:'',
      isCepLoading:true,
      isLoading:true,
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
      this.setState({street: res.data.logradouro});
      this.setState({complement: res.data.complement});
      this.setState({neighbourhood: res.data.bairro});
      this.setState({invalidCep: 'invisible'});
      if(res.data.localidade==="Brasília") {
        console.log("Redirect ---- ");
      }
    }).catch(error => {
      this.setState({invalidCep: 'visible'});
      this.setState({isCepLoading: false});
      console.log(error);
      //throw new Error("Error getting Zipcode:" + error)
    });
  }

  componentDidMount() {
    this.getAdmRegions();
   
  }
  renderCepLoading = () => {
    
  }

  renderLoading = () => {
    if(this.state.isLoading) {
      return <Loading />
    }
  }

   /* Submit Data to the API */
  register = e => {
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
    const cpf = e.target.elements.cpf.value;
     axios({ method: 'POST', url: 'http://localhost:3000/api/v1/clients.json',
        data: { 
          client: {
            name: name,
            lastname: lastname,
            email: email,
            cellphone: cellphone,
            cpf: cpf,
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
            this.props.actions.redirect('login');
          } else if(res.status===422) {
            console.log("Unauthorized, sorry :(")
          }
        }).catch( error => {
          this.setState({invalidEmail:true});
          this.setState({isLoading:false});
          console.log(error);
          //throw new Error("Erro when trying to Register: " + error);
        });
  }

  render() {
    return (
      <div className="pages-registration form-spacing p-md-5 mb-5 pb-4">
          <NavLink className="nav-link p-4 text-center" to="/login" >Já tenho uma conta</NavLink>

        <h2 className="text-center title">Cadastro</h2>
        <form onSubmit={this.register}>
          <div className="form-row">
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

          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label for="inp" className="inp mb-2">
                <input onBlur={(e) => this.getAddressAPI(e.currentTarget.value)} type="text" id="zipcode" name="zipcode" placeholder="&nbsp;" required/> 
                <span className="label">CEP</span> 
              </label>
            </div>
            <div className="col-md-6 mb-3 float-right">
              <label for="inp" className="inp mb-2">
                  <select type="text" id="adm_region_id" name="adm_region_id" placeholder="&nbsp;">
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
            <div className="col-md-6 mb-3">
              <label for="inp" className="inp mb-2">
              <input type="text" id="cpf" name="cpf" placeholder="&nbsp;" required/>
                  <span className="label">CPF</span>
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="col mb-12">

              <div class="d-flex pb-3 pt-3">
                <div class="p-2 my-auto">
                  <div className="scaled text-center mx-auto align-middle align-center">
                    <div class="switch_box box_4">
                      <div class="input_wrapper">
                        <input type="checkbox" class="switch_4" required/>
                          <svg class="is_checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.67 426.67">
                            <path d="M153.504 366.84c-8.657 0-17.323-3.303-23.927-9.912L9.914 237.265c-13.218-13.218-13.218-34.645 0-47.863 13.218-13.218 34.645-13.218 47.863 0l95.727 95.727 215.39-215.387c13.218-13.214 34.65-13.218 47.86 0 13.22 13.218 13.22 34.65 0 47.863L177.435 356.928c-6.61 6.605-15.27 9.91-23.932 9.91z"/>
                          </svg>
                          <svg class="is_unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982">
                            <path d="M131.804 106.49l75.936-75.935c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.49 81.18 30.555 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.99 6.99-6.99 18.323 0 25.312L81.18 106.49 5.24 182.427c-6.99 6.99-6.99 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0L106.49 131.8l75.938 75.937c6.99 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.323 0-25.313l-75.936-75.936z" fill-rule="evenodd" clip-rule="evenodd"/>
                          </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-2 flex-grow-1 align-middle my-auto">
                  <span>
                    Ao me cadastrar, concordo com os termos de serviço e políticas de privacidade desta página.
                  </span>
                </div>
              </div>
            </div>

              

          </div>
          <div className="text-center mx-auto w-100">
            <div className="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" disabled={this.props.disable} >Cadastrar</button></div>
            <div className="d-inline p-1 text-white position-absolute">{this.renderLoading()}</div>
          </div>  
        </form>
      </div>
    );
  }
}

export default LoaderHOC(Registration); 