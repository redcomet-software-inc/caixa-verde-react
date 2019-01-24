import React, { Component } from 'react';
import PropTypes from 'prop-types';
import userImage from '../../images/userImage.jpg';
import Loading from '../common/Loading.js';
import { getClientInfo } from '../../common/getClientInfo.js';
import request from '../../common/configApi.js';
import { NavLink } from 'react-router-dom';
import LoaderHOC from '../../HOC/LoaderHOC.js';
import * as actions from '../../features/home/redux/actions.js';

class MyAccount extends Component {
  static propTypes = {
    pages: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequfired,
  };
   constructor(props) {
    super(props);
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    this.state = {
      clientId: 0,
      client_data: [],
      address_delivery: [],
      address_billing: [],
      freight: '',
      adm_region_id: '',
      adm_regions: [],
      adm_region_name: '',
      token: token || '',
      email: email || '',
      image: '',
      address_billing_null:true,
      address_delivery_null:true,
      adm_region_null:false,
      edit_address_delivery:false,
      edit_address_billing:false,
      edit_contact:false,
      edit_name:false,
      edit_adm_region:false,
      isAddressLoading:false,
      isContactLoading:false,
      isNameLoading:false,
      isAdmRegionLoading:false,
      selectedFile: null,
      loadedData:false,
      loadedImage:false
    };
    this.getClientInformations = this.getClientInformations.bind(this);
    this.editContact = this.editContact.bind(this);
  }

  handleEditAdmRegion = (e) =>{
    e.preventDefault();
    this.setState({edit_adm_region: !this.state.edit_adm_region});
  }

  handleEditName = (e) => {
    e.preventDefault();
    this.setState({edit_name: !this.state.edit_name});
  }

  handleEditAddressDelivery = (e) => {
    e.preventDefault();
    this.setState({edit_address_delivery: !this.state.edit_address_delivery});
  }

  handleEditAddressBilling = (e) => {
    e.preventDefault();
    this.setState({edit_address_billing: !this.state.edit_address_billing});
  }

  handleEditContact = (e) => {
    e.preventDefault();
    this.setState({edit_contact: !this.state.edit_contact});
  }

  handleError = () => {
    this.setState({loadedImage: true});
  }

  renderNameLoading = () => {
    if(this.state.isNameLoading) {
      return <Loading />
    }
  }

   renderContactLoading = () => {
    if(this.state.isContactLoading) {
      return <Loading />
    }
  }

  renderAddressLoading = () => {
    if(this.state.isAddressLoading) {
      return <Loading />
    }
  }

  renderAdmRegionLoading = () => {
    if(this.state.isAdmRegionLoading) {
      return <Loading />
    }
  }

  getAdmRegions = () => {
    request({
      method:'get',
      url: 'api/v1/adm_regions.json',
      params: {
        client_email: this.state.email,
        client_token: this.state.token
      }
    }).then(res => {
        this.setState({adm_regions: res});
    });
  }

  getClientInformations = () => {
    /* Get Data from current user based on email and token */
    getClientInfo().then(res => 
    {
      console.log("CLIENT INFO");
      console.log(res);
      this.setState({ address_delivery: res.address_delivery});
      this.setState({ address_billing: res.address_billing});
      this.setState({ client_data: res});
      this.setState({ clientId: res.id});

      if( res.address_delivery !== null) {
        this.setState({address_delivery_null: false});
      }
      if( res.address_billing !== null) {
        this.setState({address_billing_null: false});
      }

      /* Administrative Region can be Null */
      if(res.adm_region !== null) {
        this.setState({ freight: res.freight });
        this.setState({ adm_region_id: res.adm_region.id });
        this.setState({ adm_region_name: res.adm_region.name});
      } else {
        this.setState({ adm_region_null: true});
      }
      /* Image can be Null */
      if(res.image !== null) {
        this.setState({ image: res.large});
      }
      this.loadedData();
     });
  };

  componentDidMount() {
    this.getClientInformations();
    this.getAdmRegions();
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
  }

   loadedData = () => {
    this.setState({loadedData:true});
    console.log("LOADED DATA");
    if(this.state.loadedImage === true) {
      this.props.actions.turnOffLoading();
    }
  }

  loadedImage = () => {
    this.setState({loadedImage:true});
    console.log("LOADED IMAGE");
    if(this.state.loadedData === true) {
      this.props.actions.turnOffLoading();
    }
  }

  editContact = () => {
    if(this.state.edit_contact===true) {
    return(
       <form onSubmit={(e) => this.submitContact(e)}>
      <div className="row">
          <div className="col-md-12">
            <label htmlFor="inp" className="inp mb-2">
              <input type="text" id="cellphone" name="cellphone" placeholder="&nbsp;" defaultValue={this.state.client_data.cellphone} />
              <span className="label">Celular</span>
               
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label htmlFor="inp" className="inp mb-2">
              <input type="email" id="email" name="email" placeholder="&nbsp;" defaultValue={this.state.client_data.email} />
              <span className="label">E-mail</span>
               
            </label>
          </div>
        </div>
        <div className="text-center mx-auto w-100">
            <div className="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" >Salvar</button></div>
            <div className="d-inline p-1 text-white position-absolute">{this.renderContactLoading()}</div>
          </div>  

      </form>
    );
    } else {
      return(
        <div>
          <ul className="list-group">
            <li className="list-group-item list-group-item-custom">{this.state.client_data.cellphone}</li>
            <li className="list-group-item list-group-item-custom">{this.state.client_data.email}</li>
          </ul>
          <br/>
        </div>
      );
    }
  }

  submitName = e => {
    e.preventDefault();
    e.persist();
    if(this.state.isNameLoading===false) {
      this.setState({isNameLoading: true});
      let name = e.currentTarget.name.value;
      let lastname = e.currentTarget.lastname.value;
      request({
        method:'put',
        url: '/api/v1/clients/'+this.state.clientId+'.json',
        data: {
          client_email:this.state.email,
          client_token:this.state.token,
          client: {
            name: name,
            lastname: lastname,
          }
        }
      }).then(res => { 
          this.setState({client_data: res.client});
          this.setState({isNameLoading: false});
          this.setState({edit_name:false});
      }).catch(error =>{
        this.setState({isNameLoading: false});
        this.setState({edit_name:false});
      });

    }
  }

  submitContact = e => {
    e.preventDefault();
    e.persist();
    if(this.state.isContactLoading===false) {
      this.setState({isContactLoading: true});
      let cellphone = e.currentTarget.cellphone.value;
      let email = e.currentTarget.email.value;
      request({
        method:'put',
        url: 'api/v1/clients/' + this.state.clientId + '.json',
        data: {
          client_email:this.state.email,
          client_token:this.state.token,
          client: {
            email: email,
            cellphone: cellphone,
          }
        }
      }).then(res => { 
        this.setState({email: res.client_data});
        this.setState({isContactLoading: false});
        this.setState({edit_contact:false});
      }).catch(error =>{
        this.setState({isContactLoading: false});
        this.setState({edit_contact:false});
      });

    }
  }

  submitAddress = e => {
    e.preventDefault();
    e.persist();
    /*Avoid multiple Clicks on Submit*/
    if(this.state.isAddressLoading===false) {
      this.setState({isAddressLoading: true});
      let address_id = e.currentTarget.address_id.value;
      let street = e.currentTarget.street.value;
      let neighbourhood = e.currentTarget.neighbourhood.value;
      let zipcode = e.currentTarget.zipcode.value;
      let number = e.currentTarget.number.value;
      let complement = e.currentTarget.complement.value;
      let kind = e.currentTarget.address_kind.value;
      request({
        method:'put',
        url: 'api/v1/clients/' + this.state.clientId + '/addresses.json',
        data: {
            client_email:this.state.email,
            client_token:this.state.token,
            address: {
              street: street,
              neighbourhood: neighbourhood,
              zipcode: zipcode,
              number: number,
              complement: complement,
              kind: kind,
            }
        }
      }).then(res => 
      {
        this.setState({isAddressLoading: false});
        this.setState({["edit_address_" + kind]: false });
        this.setState({["address_" + kind]: res.address });
      }).catch(error => {
        this.setState({isAddressLoading: false});
        this.setState({["edit_address_" + kind]: false  });
      });
    }
  }

  submitAdmRegion = (e) => 
  {
      e.preventDefault();
      e.persist();
      this.setState({isAdmRegionLoading: true});
      const adm_region_id = e.currentTarget.adm_region_id.value;
      const url = 'api/v1/clients/'+this.state.clientId+'/addresses.json'
      request({
        method:'put',
        url: url,
        data: {
          client_email: this.state.email,
          client_token: this.state.token,
          address: {
            kind: "delivery",
            adm_region_id: adm_region_id
          },
        }
      }).then(res =>
      {
          this.setState({isAdmRegionLoading: false});
          console.log("adm region id");
          console.log(res);
          this.setState({adm_region_id: res.adm_region_id});
          this.setState({edit_adm_region: false});
          this.setState({adm_region_name: res.address_adm_region_name});
          console.log("ADM REGION");
          console.log(res.address_adm_region_name);
          console.log("AMD_REGION IN");
          console.log(res.adm_region_id);
      }).catch(error => {
          this.setState({isAdmRegionLoading: false});
      });
  }

  editAddress = (kind) => 
  {
      return(
        <div>
        <form onSubmit={(e) => this.submitAddress(e)}>
        <input id="address_kind" name="address_kind" type="hidden" value={ kind } />
          <div className="row">
            <div className="col-md-8">
              <input type="hidden" id="address_id" value={this.state["address_" + kind] ? this.state["address_" + kind].id : null } />
              <label htmlFor="inp" className="inp mb-2">
                <input type="text" id="street" name="street" placeholder="&nbsp;" defaultValue={this.state["address_" + kind] ? this.state["address_" + kind].street : null }/>
                <span className="label">Endereço</span>
                 
              </label>
            </div>
            <div className="col-md-4">
              <label htmlFor="inp" className="inp mb-2">
                <input type="text" id="number" name="number" placeholder="&nbsp;" defaultValue={this.state["address_" + kind] ? this.state["address_" + kind].number : null } />
                <span className="label">Nº</span>
                 
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label htmlFor="inp" className="inp mb-2">
                <input type="text" id="neighbourhood" name="neighbourhood" placeholder="&nbsp;" defaultValue={this.state["address_" + kind] ? this.state["address_" + kind].neighbourhood : null } />
                <span className="label">Bairro</span>
                 
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="inp" className="inp mb-2">
                <input type="text" id="zipcode" name="zipcode" placeholder="&nbsp;" defaultValue={this.state["address_" + kind] ? this.state["address_" + kind].zipcode : null } />
                <span className="label">CEP</span>
                 
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="inp" className="inp mb-2">
                <input type="text" id="complement" name="complement" placeholder="&nbsp;" defaultValue={this.state["address_" + kind] ? this.state["address_" + kind].complement : null } />
                <span className="label">Complemento</span>
                 
              </label>
            </div>
          </div>
          <div className="text-center mx-auto w-100">
            <div className="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" >Salvar</button></div>
            <div className="d-inline p-1 text-white position-absolute">{this.renderAddressLoading()}</div>
          </div>  
          </form>
        </div>
      );
    }
  
   addressInfo = (kind) => 
   {
     let address = this.state['address_' + kind]
     if(this.state['edit_address_' + kind] === true) 
     {
       return this.editAddress(kind);
     } else 
     {
       if(this.state['address_' + kind + '_null'] === false) {
          return(
                <div>
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-custom">
                    {address ? address.street : null}, 
                    {address ? address.number : null}</li>
                    <li className="list-group-item list-group-item-custom">
                    {address ? address.neighbourhood : null}</li>
                    <li className="list-group-item list-group-item-custom">
                    {address ? address.zipcode : null}</li>
                    <li className="list-group-item list-group-item-custom">
                    {address ? address.complement : null}</li>
                  </ul>
                </div> 
              );
       } else 
       {
          return (
            <div>
              ( Clique em Editar para alterar seu Endereço )
            </div>
            );
       }
     }
   }
  
  editName = () => 
  {
    let client_data = this.state.client_data;
    if(this.state.edit_name===true)
    {
    return (
      <div>
        <form onSubmit={(e) => this.submitName(e)}>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="inp" className="inp mb-2">
                  <input type="text" id="name" name="name" placeholder="&nbsp;" defaultValue={client_data ? client_data.name : null} />
                  <span className="label">Nome</span>
                   
                </label>
              </div>
              <div className="col-md-6">
                <label htmlFor="inp" className="inp mb-2">
                  <input type="text" id="lastname" name="lastname" placeholder="&nbsp;" defaultValue={client_data ? client_data.lastname : null} />
                  <span className="label">Sobrenome</span>
                   
                </label>
              </div>
            </div>
            <div className="text-center mx-auto w-100">
              <div className="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" >Salvar</button></div>
              <div className="d-inline p-1 text-white position-absolute">{this.renderNameLoading()}</div>
            </div>
          </form>  
        </div>
      );
    } else 
    {
        return (
          <div>
            {client_data.name + " " + client_data.lastname}
          </div>
        );
      } 
  }

  change = (e) => 
  {
    this.setState({adm_region_id: e.target.value});
  }

  editAdmRegion = () => 
  {
  if(this.state.edit_adm_region===true)
  {
  return (
    <div>
      <form onSubmit={(e) => this.submitAdmRegion(e)}>
        <label htmlFor="inp" className="inp mb-3">
            <select type="text" id="adm_region_id" name="adm_region_id" placeholder="&nbsp;" onChange={e => this.change(e)} value={this.state.adm_region_id} required>
              <option > -- Escolha uma região -- </option>
              {this.state.adm_regions.map((item, index) => (
              <option key={"adm-region" + item.id} value={item.id}> {item.name}</option>              
          ))}
            </select> 
            <span className="label">Região Administrativa</span> 
             
          </label>
          <div className="text-center mx-auto w-100">
            <div className="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" >Salvar</button></div>
            <div className="d-inline p-1 text-white position-absolute">{this.renderAdmRegionLoading()}</div>
          </div>
        </form>  
      </div>
    );
  } else 
  {
    if(this.state.adm_region_null === false) 
    {
      return (
        <div>
          {this.state.adm_region_name}
        </div>
      );
      } else 
      {
        return (
        <div>
          ( Clique em Editar para alterar sua região )
        </div>
        );
      }
    } 
  }

 fileChangedHandler = (event) => {
    event.preventDefault();
    event.persist();
    this.setState({selectedFile: event.target.files[0]})
    let selectedFile = event.target.files[0];
    const formData = new FormData()
    formData.append('client[image]', selectedFile, selectedFile.name);
    formData.append('client_email', this.state.email);
    formData.append('client_token', this.state.token);
    request({
      method:'put',
      url: 'api/v1/clients/' + this.state.clientId + '.json',
      data: formData
    }).then(res => {
      this.setState({image: res.large});
    });
  }

  renderImage = () => {
    if(this.state.image==null) {
        return(
        <img className="img-fluid" alt="Foto do Usuário (Vazia)" onError={this.handleError.bind(this)} onLoad={this.loadedImage.bind(this)} src={userImage} />
      );
    } else {
      return(
        <img  className="img-fluid" alt="Foto do Usuário" onError={this.handleError.bind(this)} onLoad={this.loadedImage.bind(this)} src={this.state.image} />
      );
    }
  }
  render() {
    return (
      <div className="pages-my-account">
        <h2 className="text-center title">Minha Conta</h2>
          <div className="row p-2 mb-4 mx-auto">
            <div className="col-md-6 p-2 mx-auto text-center">
              <div className="custom-file mx-auto">
                 { this.renderImage() }
                 <div className="custom-file text-left">
                  <input id="logo" type="file" className="custom-file-input" onChange={(e) => this.fileChangedHandler(e)} />
                  <label htmlFor="logo" className="custom-file-label text-truncate">Alterar Imagem...</label>
                </div>
              </div>
            </div>
            <div className="col-md-6 p-2 mx-auto text-center">
              <div className="row">
                <div className="col-12 p-2">
                  <div className="card card-my-account float-left">
                      <div className="card-header">Nome<NavLink to="" className="float-right" onClick={e => this.handleEditName(e)}>Editar</NavLink></div>
                      <div className="card-body">
                          {this.editName()}
                      </div>
                    </div>
                </div>
                <div className="col-12 p-2">
                  <div className="card card-my-account float-left">
                      <div className="card-header">Região Administrativa<NavLink to="" className="float-right" onClick={e => this.handleEditAdmRegion(e)}>Editar</NavLink></div>
                      <div className="card-body">
                          {this.editAdmRegion()}
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md p-2">
               <div className="card float-left card-my-account">
                  <div className="card-header">Endereço de Entrega<NavLink to="" className="float-right" onClick={e => this.handleEditAddressDelivery(e)}>Editar</NavLink></div>
                  <div className="card-body">
                      {this.addressInfo('delivery')}
                  </div>
                </div>
            </div>
            <div className="col-md p-2">
               <div className="card float-left card-my-account">
                  <div className="card-header">Endereço de Cobrança<NavLink to="" className="float-right" onClick={e => this.handleEditAddressBilling(e)}>Editar</NavLink></div>
                  <div className="card-body">
                  {this.addressInfo('billing')}
                  </div>
                </div>
            </div>
            <div className="col-md p-2">
               <div className="card float-left card-my-account">
                  <div className="card-header">Contato<NavLink to="" className="float-right" onClick={e => this.handleEditContact(e)}>Editar</NavLink></div>
                  <div className="card-body">
                    { this.editContact() }
                  </div>
                </div>
            </div>
          </div>
      </div>
    );
  }
}

export default LoaderHOC(MyAccount);
