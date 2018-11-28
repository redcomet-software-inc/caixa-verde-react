import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route, HashRouter } from 'react-router-dom';
import userImage from '../../images/userImage.jpg';

export default class UserProfile extends Component {
  static propTypes = {

  };
     /* Sign In Client and Register new Token */
    signOut = e => {
      e.preventDefault();

      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');
      const deleteUrl = "http://localhost:3000/api/v1/sessions.json?client_email="+email+"&client_token="+token;
      const httpReqHeaders = {
        'Content-Type': 'application/json'
      };

      // check the structure here: https://github.com/axios/axios#request-config
      const axiosConfigObject = {headers: httpReqHeaders}; 

      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('selectedProducts');
      localStorage.removeItem('selectedKits');

      axios.delete(deleteUrl, axiosConfigObject).then(res=> {
         if (res.status === 200) {
             console.log("Session deleted");
             var targetUrl='';
             this.props.changeToLoggedOut();
             this.props.redirect('/');
             
          } else {
            // throw error and go to catch block
            throw new Error('Error');
          }

      }).catch(error => {
        console.log('Error', error);
      })
    };

    render() {
        return (
            <div>
            
            <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={userImage} class="image profile-image mr-2" width={50} />
                    {this.props.clientName}
                    </a>
                <div className="dropdown-menu dropdown-menu-right text-center" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/">Minha Conta</a>
                <a className="dropdown-item" href="/">Opções</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/">Histórico</a>
                <a className="dropdown-item" onClick={this.signOut} href="/">Sair</a>
                </div>
            </li>
            </div>
        );
    }
}