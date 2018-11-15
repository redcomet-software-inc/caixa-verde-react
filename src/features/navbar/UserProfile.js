import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route, HashRouter } from 'react-router-dom';

export default class UserProfile extends Component {
  static propTypes = {

  };

    componentDidMount(){
    
        
    }

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

      axios.delete(deleteUrl, axiosConfigObject).then(res=> {
         if (res['status'] === 200) {
             
             console.log("Session deleted");
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

            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Usuário
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/">Minha Conta</a>
                <a className="dropdown-item" href="/">Opções</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/">Histórico</a>
                <a className="dropdown-item" onClick={this.signOut} href="/">Sair</a>
                </div>
            </li>
        );
    }
}