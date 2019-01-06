import React, { Component } from 'react';
import userImage from '../../images/userImage.jpg';
import Loading from '../common/Loading.js';
import request from '../../common/configApi.js';
import { NavLink } from 'react-router-dom';

export default class MyAccount extends Component {
  static propTypes = {

  };
   constructor(props) {
    super(props);
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    this.props.turnOnLoading();
    this.props.turnOffError();
    this.state = {
      clientId: 0,
      name: '',
      lastname: '',
      cellphone: '',
      email: email || '',
      address_delivery_id: '',
      address_delivery_street: '',
      address_delivery_number:'',
      address_delivery_neighbourhood: '',
      address_delivery_complement: '',
      address_delivery_zipcode: '',
      address_billing_id: '',
      address_billing_street: '',
      address_billing_number:'',
      address_billing_neighbourhood: '',
      address_billing_complement: '',
      address_billing_zipcode: '',
      freight: '',
      adm_region_id: '',
      adm_regions: [],
      adm_region_name: '',
      token: token || '',
      image: '',
      address_null_delivery:false,
      address_billing_null:false,
      address_delivery_null:false,
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
    request({
      method:'get',
      url: 'api/v1/clients/1.json',
      params: {
        client_email: this.state.email,
        client_token: this.state.token
      }
    }).then(res => 
    {
      this.setState({ clientId: res.id });
      this.setState({ name: res.name });
      this.setState({ lastname: res.lastname });
      this.setState({ cellphone: res.cellphone });
      this.setState({ email: res.email });
      /* Billing Delivery can be Null */
      if(res.address_delivery !== null && res.address_delivery.street !=="") {
        this.setState({ address_delivery_id: res.address_delivery.id });
        this.setState({ address_delivery_street: res.address_delivery.street });
        this.setState({ address_delivery_number: res.address_delivery.number });
        this.setState({ address_delivery_neighbourhood: res.address_delivery.neighbourhood });
        this.setState( {address_delivery_complement: res.address_delivery.complement})
        this.setState({ address_delivery_zipcode: res.address_delivery.zipcode });
      } else {
        this.setState({ address_delivery_null: true});
      }
      /* Billing Address can be Null */
      if(res.address_billing !== null) {
        this.setState({ address_billing_id: res.address_billing.id });
        this.setState({ address_billing_street: res.address_billing.street });
        this.setState({ address_billing_number: res.address_billing.number });
        this.setState({ address_billing_neighbourhood: res.address_billing.neighbourhood });
        this.setState( {address_billing_complement: res.address_billing.complement})
        this.setState({ address_billing_zipcode: res.address_billing.zipcode });
      } else {
        this.setState({ address_billing_null: true});
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

  componentDidMount() 
  {
    this.getClientInformations();
    this.getAdmRegions();
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
  }

   loadedData = () => 
   {
    this.setState({loadedData:true});
    console.log("LOADED DATA");
    if(this.state.loadedImage === true) 
    {
      this.props.turnOffLoading();
    }
  }

  loadedImage = () => {
    this.setState({loadedImage:true});
    console.log("LOADED IMAGE");
    if(this.state.loadedData === true) {
      this.props.turnOffLoading();
    }
  }

  editContact = () => {
    if(this.state.edit_contact===true) {
    return(
       <form onSubmit={(e) => this.submitContact(e)}>
      <div className="row">
          <div className="col-md-12">
            <label htmlFor="inp" className="inp mb-2">
              <input type="text" id="cellphone" name="cellphone" placeholder="&nbsp;" defaultValue={this.state.cellphone} />
              <span className="label">Celular</span>
              <span className="border"></span>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label htmlFor="inp" className="inp mb-2">
              <input type="email" id="email" name="email" placeholder="&nbsp;" defaultValue={this.state.email} />
              <span className="label">E-mail</span>
              <span className="border"></span>
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
            <li className="list-group-item list-group-item-custom">{this.state.cellphone}</li>
            <li className="list-group-item list-group-item-custom">{this.state.email}</li>
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
          this.setState({name: res.client.name});
          this.setState({lastname: res.client.lastname});
          this.setState({isNameLoading: false});
          this.setState({edit_name:false});
      }).catch(error =>{
        this.setState({isNameLoading: false});
        this.setState({edit_name:false});
      });

    }
  }

  submitContact = e => 
  {
    e.preventDefault();
    e.persist();
    if(this.state.isContactLoading===false) 
    {
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
        this.setState({email: res.client.email});
        this.setState({cellphone: res.client.cellphone});
        this.setState({isContactLoading: false});
        this.setState({edit_contact:false});
      }).catch(error =>{
        this.setState({isContactLoading: false});
        this.setState({edit_contact:false});
      });

    }
  }

  submitAddress = e => 
  {
    e.preventDefault();
    e.persist();
    /*Avoid multiple Clicks on Submit*/
    if(this.state.isAddressLoading===false) 
    {
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
        /* Two types of Addresses: Delivery and Billing */
        this.setState({["edit_address_" + kind]: false  });
        this.setState({["address_" + kind + "_id"]: res.address.id});
        this.setState({["address_" + kind + "_street"]: res.address.street});
        this.setState({["address_" + kind + "_neighbourhood"]: res.address.neighbourhood});
        this.setState({["address_" + kind + "_zipcode"]:res.address.zipcode});
        this.setState({["address_" + kind + "_number"]:res.address.zipcode});
        this.setState({["address_" + kind + "_complement"]:res.address.zipcode});
        this.setState({isAddressLoading: false});
      }).catch(error => 
      {
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

  renderNameLoading = () => 
  {
    if(this.state.isNameLoading) 
    {
      return <Loading />
    }
  }

   renderContactLoading = () => 
   {
    if(this.state.isContactLoading) 
    {
      return <Loading />
    }
  }

  renderAddressLoading = () => 

  {
    if(this.state.isAddressLoading) {
      return <Loading />
    }
  }

  renderAdmRegionLoading = () => 
  {
    if(this.state.isAdmRegionLoading) 
    {
      return <Loading />
    }
  }


  editAddress = (kind) => 
  {
      return(
        <div>
        <form onSubmit={(e) => this.submitAddress(e)}>
        <input id="address_kind" name="address_kind" type="hidden" value={ kind } />
          <div className="row">
            <div className="col-md-8">
              <input type="hidden" id="address_id" value={this.state["address_" + kind + "_id"] } />
              <label htmlFor="inp" className="inp mb-2">
                <input type="text" id="street" name="street" placeholder="&nbsp;" defaultValue={this.state["address_" + kind + "_street"] }/>
                <span className="label">Endereço</span>
                <span className="border"></span>
              </label>
            </div>
            <div className="col-md-4">
              <label htmlFor="inp" className="inp mb-2">
                <input type="text" id="number" name="number" placeholder="&nbsp;" defaultValue={this.state["address_" + kind + "_number"]} />
                <span className="label">Nº</span>
                <span className="border"></span>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label htmlFor="inp" className="inp mb-2">
                <input type="text" id="neighbourhood" name="neighbourhood" placeholder="&nbsp;" defaultValue={this.state["address_" + kind + "_neighbourhood"]} />
                <span className="label">Bairro</span>
                <span className="border"></span>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="inp" className="inp mb-2">
                <input type="text" id="zipcode" name="zipcode" placeholder="&nbsp;" defaultValue={this.state["address_" + kind + "_zipcode"]} />
                <span className="label">CEP</span>
                <span className="border"></span>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="inp" className="inp mb-2">
                <input type="text" id="complement" name="complement" placeholder="&nbsp;" defaultValue={this.state["address_" + kind + "_complement"]} />
                <span className="label">Complemento</span>
                <span className="border"></span>
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
  
   editAddressDelivery = () => 
   {
     if(this.state.edit_address_delivery===true) 
     {
       return this.editAddress("delivery");
     } else 
     {
       if(this.state.address_delivery_null === false) 
       {
          return(
                <div>
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-custom">{this.state.address_delivery_street}, {this.state.address_delivery_number}</li>
                    <li className="list-group-item list-group-item-custom">{this.state.address_delivery_neighbourhood}</li>
                    <li className="list-group-item list-group-item-custom">{this.state.address_delivery_zipcode}</li>
                    <li className="list-group-item list-group-item-custom">{this.state.address_delivery_complement}</li>
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
  
  editAddressBilling = () => 
  {
    if(this.state.edit_address_billing===true) 
    {
      return this.editAddress("billing");
    } else 
    {
      if(this.state.address_billing_null === false) 
      {
        return(
            <div>
              <ul className="list-group">
                <li className="list-group-item list-group-item-custom">{this.state.address_billing_street}, {this.state.address_billing_number}</li>
                <li className="list-group-item list-group-item-custom">{this.state.address_billing_neighbourhood}</li>
                <li className="list-group-item list-group-item-custom">{this.state.address_billing_zipcode}</li>
                <li className="list-group-item list-group-item-custom">{this.state.address_billing_complement}</li>
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
    if(this.state.edit_name===true)
    {
    return (
      <div>
        <form onSubmit={(e) => this.submitName(e)}>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="inp" className="inp mb-2">
                  <input type="text" id="name" name="name" placeholder="&nbsp;" defaultValue={this.state.name} />
                  <span className="label">Nome</span>
                  <span className="border"></span>
                </label>
              </div>
              <div className="col-md-6">
                <label htmlFor="inp" className="inp mb-2">
                  <input type="text" id="lastname" name="lastname" placeholder="&nbsp;" defaultValue={this.state.lastname} />
                  <span className="label">Sobrenome</span>
                  <span className="border"></span>
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
            {this.state.name + " " + this.state.lastname}
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
            <span className="border"></span>
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

  handleEditAdmRegion = (e) =>
  {
    e.preventDefault();
    this.setState({edit_adm_region: !this.state.edit_adm_region});
  }

  handleEditName = (e) => 
  {
    e.preventDefault();
    this.setState({edit_name: !this.state.edit_name});
  }

  handleEditAddressDelivery = (e) => 
  {
    e.preventDefault();
    this.setState({edit_address_delivery: !this.state.edit_address_delivery});
  }

  handleEditAddressBilling = (e) => 
  {
    e.preventDefault();
    this.setState({edit_address_billing: !this.state.edit_address_billing});
  }

  handleEditContact = (e) => 
  {
    e.preventDefault();
    this.setState({edit_contact: !this.state.edit_contact});
  }

  handleError = () => 
  {
    this.setState({loadedImage: true});
  }


 fileChangedHandler = (event) => 
 {
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

  renderImage = () => 
  {
    if(this.state.image==null) 
    {
        return(
        <img className="img-fluid" alt="Foto do Usuário (Vazia)" onError={this.handleError.bind(this)} onLoad={this.loadedImage.bind(this)} src={userImage} />
      );
    } else {
      return(
        <img  className="img-fluid" alt="Foto do Usuário" onError={this.handleError.bind(this)} onLoad={this.loadedImage.bind(this)} src={this.state.image} />
      );
    }
  }
  render() 
  {
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
                      {this.editAddressDelivery()}
                  </div>
                </div>
            </div>
            <div className="col-md p-2">
               <div className="card float-left card-my-account">
                  <div className="card-header">Endereço de Cobrança<NavLink to="" className="float-right" onClick={e => this.handleEditAddressBilling(e)}>Editar</NavLink></div>
                  <div className="card-body">
                      {this.editAddressBilling()}
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
