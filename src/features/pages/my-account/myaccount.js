import React, { Component } from 'react';
import userImage from '../../../images/userImage.jpg';
import request from '../../../common/config-api.js';
import LoaderHOC from '../../../HOC/loader-hoc';
import { PersonalDataClient, PersonalAddressDelivery, PersonalAddressBilling } from './personal-data.js';

class MyAccount extends Component {
   constructor(props) {
      super(props);
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');
      this.state = {
        clientId: 0,
        client_data: [],
        freight: '',
        adm_region_id: '',
        adm_regions: [],
        adm_region_name: '',
        token: token || '',
        email: email || '',
        image: '',
        selectedFile: null,
        loadedImage:false
    };
  }
  
  handleError = () => {
    this.setState({loadedImage: true});
  }

  componentDidMount() {
   
  }

  loadedImage = () => {
    this.setState({loadedImage:true});
  }

  submitAdmRegion = (e) => {
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
      }).then(res => {
          this.setState({isAdmRegionLoading: false});
          this.setState({adm_region_id: res.adm_region_id});
          this.setState({edit_adm_region: false});
          this.setState({adm_region_name: res.address_adm_region_name});
      }).catch(error => {
          this.setState({isAdmRegionLoading: false});
          throw new Error("Failed to Update Administrative Region: " + error);
      });
  }

  editAdmRegion = () => {
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

  render() {
    return (
      <div className="pages-my-account">
        <h2 className="text-center title">Minha Conta</h2>
          <div className="row p-2 mb-4 mx-auto">
            <div className="col-md-6 p-2 mx-auto text-center">
              <div className="custom-file mx-auto">
                 <img className="img-fluid" alt="Foto do Usuário (Vazia)" onError={this.handleError.bind(this)} onLoad={this.loadedImage.bind(this)} src={userImage} />
                 <div className="custom-file text-left">
                  <input id="logo" type="file" className="custom-file-input" onChange={(e) => this.fileChangedHandler(e)} />
                  <label htmlFor="logo" className="custom-file-label text-truncate">Alterar Imagem...</label>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md p-md-5 p-0">
              <PersonalDataClient {...this.props}  />
              <PersonalAddressDelivery {...this.props} /> 
              <PersonalAddressBilling {...this.props} /> 
            </div>
          </div>
      </div>
    );
  }
}

export default LoaderHOC(MyAccount);
