import React, { Component } from 'react';
import axios from 'axios';
import userImage from '../../images/userImage.jpg';
import Loading from '../common/Loading.js';

export default class MyAccount extends Component {
  static propTypes = {

  };

   constructor(props) {
    super(props);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    this.props.turnOnLoading();
    this.state = {
      clientId: 0,
      name: '',
      lastname: '',
      cellphone: '',
      email: '',
      address_id: '',
      street: '',
      number:'',
      neighbourhood: '',
      complement: '',
      zipcode: '',
      freight: '',
      adm_region_id: '',
      adm_regions: [],
      email: email || '',
      token: token || '',
      image:'',
      edit_address:false,
      edit_contact:false,
      edit_name:false,
      isAddressLoading:false,
      isContactLoading:false,
      isNameLoading:false,
      selectedFile: null,
      loadedData:false,
      loadedImage:false
    };

    this.getClientInformations = this.getClientInformations.bind(this);
    this.editContact = this.editContact.bind(this);
  }

  getClientInformations = () => {
    /* Get Data from current user based on email and token */
    axios
      .get('http://localhost:3000/api/v1/clients/1.json', {
        params: {
          client_email: this.state.email,
          client_token: this.state.token,
        },
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ clientId: res.data.id });
          this.setState({ name: res.data.name });
          this.setState({ lastname: res.data.lastname });
          this.setState({ cellphone: res.data.cellphone });
          this.setState({ email: res.data.email });
          this.setState({ address_id: res.data.address.id });
          this.setState({ street: res.data.address.street });
          this.setState({ number: res.data.address.number });
          this.setState({ neighbourhood: res.data.address.neighbourhood });
          this.setState( {complement: res.data.address.complement})
          this.setState({ zipcode: res.data.address.zipcode });
          this.setState({ freight: res.data.freight });
          this.setState({ adm_region_id: res.data.address.adm_region_id });
          this.setState({ image: res.data.large});
          this.loadedData();
        }
      });
  };

  componentDidMount() {
    this.getClientInformations();
  }

   loadedData = () => {
    this.setState({loadedData:true});
    console.log("LOADED DATA");
    if(this.state.loadedImage === true) {
      
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
            <label for="inp" className="inp mb-2">
              <input type="text" id="cellphone" name="cellphone" placeholder="&nbsp;" defaultValue={this.state.cellphone} />
              <span className="label">Celular</span>
              <span className="border"></span>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label for="inp" className="inp mb-2">
              <input type="email" id="email" name="email" placeholder="&nbsp;" defaultValue={this.state.email} />
              <span className="label">E-mail</span>
              <span className="border"></span>
            </label>
          </div>
        </div>
        <div class="text-center mx-auto w-100">
            <div class="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" >Salvar</button></div>
            <div class="d-inline p-1 text-white position-absolute">{this.renderContactLoading()}</div>
          </div>  

      </form>
    );
    } else {
      return(
        <div>
          <ul class="list-group">
            <li class="list-group-item">{this.state.cellphone}</li>
            <li class="list-group-item">{this.state.email}</li>
          </ul>
          <br/>
        </div>
      );
    }
  }

  submitName = e => {
    e.preventDefault();
    console.log("SUBMIT NAME");
    if(this.state.isNameLoading===false) {
      this.setState({isNameLoading: true});
      let name = e.currentTarget.name.value;
      let lastname = e.currentTarget.lastname.value;

      axios({ method: 'PUT', url: "http://localhost:3000/api/v1/clients/"+this.state.clientId+".json", 
        data: {
          client_email:this.state.email,
          client_token:this.state.token,
            client: {
              name: name,
              lastname: lastname,
            }
        }}).then(res=>{
          if(res.status===200) {
            console.log("contact");
            console.log(res);
            this.setState({name: res.data.client.name});
            this.setState({lastname: res.data.client.lastname});
            this.setState({isNameLoading: false});
            this.setState({edit_name:false});
          }
        }).catch(error =>{
          console.log(error);
          this.setState({isNameLoading: false});
          this.setState({edit_name:false});
        });
    }
  }

  submitContact = e => {
    console.log("Submit Contact");
    e.preventDefault();
    if(this.state.isContactLoading===false) {
      this.setState({isContactLoading: true});
      let cellphone = e.currentTarget.cellphone.value;
      let email = e.currentTarget.email.value;

      axios({ method: 'PUT', url: "http://localhost:3000/api/v1/clients/"+this.state.clientId+".json", 
        data: {
          client_email:this.state.email,
          client_token:this.state.token,
            client: {
              email: email,
              cellphone: cellphone,
            }
        }}).then(res=>{
          if(res.status===200) {
            console.log("contact");
            console.log(res);
            this.setState({email: res.data.client.email});
            this.setState({cellphone: res.data.client.cellphone});
            this.setState({isContactLoading: false});
            this.setState({edit_contact:false});
          }
        }).catch(error =>{
          console.log(error);
          this.setState({isContactLoading: false});
          this.setState({edit_contact:false});
        });
    }
  }

  submitAddress = e => {
    e.preventDefault();
    /*Avoid multiple Clicks on Submit*/
    if(this.state.isAddressLoading===false) {
      console.log("SUBMITING");
      this.setState({isAddressLoading: true});
      let address_id = e.currentTarget.address_id.value;
      let street = e.currentTarget.street.value;
      let neighbourhood = e.currentTarget.neighbourhood.value;
      let zipcode = e.currentTarget.zipcode.value;
      let number = e.currentTarget.number.value;
      let complement = e.currentTarget.complement.value;

        axios({ method: 'PUT', url: "http://localhost:3000/api/v1/clients/"+this.state.clientId+"/addresses.json", 
          data: { 
            client_email:this.state.email,
            client_token:this.state.token,
            address: {
              street: street,
              neighbourhood: neighbourhood,
              zipcode: zipcode,
              number: number,
              complement: complement
            }
          }
        }).then(res=>{
          if(res.status===200) {
            console.log(res.data);
            this.setState({edit_address:false});
            this.setState({street:res.data.address.street});
            this.setState({neighbourhood:res.data.address.neighbourhood});
            this.setState({zipcode:res.data.address.zipcode});
            this.setState({number:res.data.address.number});
            this.setState({complement:res.data.address.complement});
            this.setState({isAddressLoading: false});
          }
        }).catch(error => {
          console.log(error);
          this.setState({isAddressLoading: false});
        });
    }

   
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

  editAddress = () => {
    if(this.state.edit_address===true) {
      return(
        <div>
        <form onSubmit={(e) => this.submitAddress(e)}>
          <div className="row">
            <div className="col-md-8">
              <input type="hidden" id="address_id" value={this.state.address_id} />
              <label for="inp" className="inp mb-2">
                <input type="text" id="street" name="street" placeholder="&nbsp;" defaultValue={this.state.street}/>
                <span className="label">Endereço</span>
                <span className="border"></span>
              </label>
            </div>
            <div className="col-md-4">
              <label for="inp" className="inp mb-2">
                <input type="text" id="number" name="number" placeholder="&nbsp;" defaultValue={this.state.number} />
                <span className="label">Nº</span>
                <span className="border"></span>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label for="inp" className="inp mb-2">
                <input type="text" id="neighbourhood" name="neighbourhood" placeholder="&nbsp;" defaultValue={this.state.neighbourhood} />
                <span className="label">Bairro</span>
                <span className="border"></span>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label for="inp" className="inp mb-2">
                <input type="text" id="zipcode" name="zipcode" placeholder="&nbsp;" defaultValue={this.state.zipcode} />
                <span className="label">CEP</span>
                <span className="border"></span>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label for="inp" className="inp mb-2">
                <input type="text" id="complement" name="complement" placeholder="&nbsp;" defaultValue={this.state.complement} />
                <span className="label">Complemento</span>
                <span className="border"></span>
              </label>
            </div>
          </div>

          <div class="text-center mx-auto w-100">
            <div class="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" >Salvar</button></div>
            <div class="d-inline p-1 text-white position-absolute">{this.renderAddressLoading()}</div>
          </div>  

          </form>
        </div>
      );
    } else {
      return(
         <div>
          <ul class="list-group">
            <li class="list-group-item">{this.state.street}, {this.state.number}</li>
            <li class="list-group-item">{this.state.neighbourhood}</li>
            <li class="list-group-item">{this.state.zipcode}</li>
            <li class="list-group-item">{this.state.complement}</li>
          </ul>
         </div> 
      );
    }
  }

  editName = () => {

    if(this.state.edit_name===true){
    return (
      <div>
        <form onSubmit={(e) => this.submitName(e)}>
            <div className="row">
              <div className="col-md-12">
                <label for="inp" className="inp mb-2">
                  <input type="text" id="name" name="name" placeholder="&nbsp;" defaultValue={this.state.name} />
                  <span className="label">Nome</span>
                  <span className="border"></span>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label for="inp" className="inp mb-2">
                  <input type="text" id="lastname" name="lastname" placeholder="&nbsp;" defaultValue={this.state.lastname} />
                  <span className="label">Sobrenome</span>
                  <span className="border"></span>
                </label>
              </div>
            </div>
            <div class="text-center mx-auto w-100">
              <div class="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" >Salvar</button></div>
              <div class="d-inline p-1 text-white position-absolute">{this.renderNameLoading()}</div>
            </div>
          </form>  
        </div>
      );
    } else {
        return (
          <div>
            {this.state.name + " " + this.state.lastname}
          </div>
        );
      } 
  }
  handleEditName = () => {
    this.setState({edit_name: !this.state.edit_name});
  }

  handleEditAddress = () => {
    this.setState({edit_address: !this.state.edit_address});
  }

  handleEditContact = () => {
    this.setState({edit_contact: !this.state.edit_contact});
  }


 fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]})
    let selectedFile = event.target.files[0];
    
    const formData = new FormData()
    formData.append('client[image]', selectedFile, selectedFile.name);
    formData.append('client_email', this.state.email);
    formData.append('client_token', this.state.token);
    axios.put('http://localhost:3000/api/v1/clients/'+this.state.clientId+'.json', formData).then(res=>{
        this.setState({image: res.data.large});
    });
    
  }

 

  render() {
    return (
      <div className="pages-my-account">
        <h2 className="text-center title">Minha Conta</h2>

            
        
          <div class="row">
            <div class="col-sm text-center">
              <img className="img-fluid" onLoad={this.loadedImage.bind(this)} src={this.state.image} />
              
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Escolha uma foto</span>
                </div>
                    <div class="custom-file">
                      <input type="file" onChange={(e) => this.fileChangedHandler(e)}  class="custom-file-input" id="inputGroupFile01" />
                      <label class="custom-file-label" for="inputGroupFile01">{ this.state.selectedFile} </label>
                    </div>
              </div>
              
            </div>
          </div>

          <div className="row">
            <div className="col p-2">
               <div className="card card-my-account float-left">
                  <div className="card-header">Nome<a href="javascript: void(0)" className="float-right" onClick={this.handleEditName}>Editar</a></div>
                  <div className="card-body">
                      
                      {this.editName()}
                  </div>
                </div>
            </div>
            
          </div>

          
          <div className="row">
            <div className="col-md p-2">
               <div className="card float-left card-my-account">
                  <div className="card-header">Endereço<a href="javascript: void(0)" className="float-right" onClick={this.handleEditAddress}>Editar</a></div>
                  <div className="card-body">
                      {this.editAddress()}
                  </div>
                </div>
            </div>
            
            <div className="col-md p-2">
               
               <div className="card float-left card-my-account">
                  <div className="card-header">Contato<a  href="javascript: void(0)" className="float-right" onClick={this.handleEditContact}>Editar</a></div>
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
