import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import userImage from '../../images/userImage.jpg';

export default class UserProfile extends Component 
{
    /* Sign In Client and Register new Token */
    signOut = e => {
      e.preventDefault();

      console.log(this.props);
     
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');
      const deleteUrl = process.env.REACT_APP_SERVER_ADDRESS + "/api/v1/sessions.json?client_email="+email+"&client_token="+token;
      const httpReqHeaders = 
      {
        'Content-Type': 'application/json'
      };

      // check the structure here: https://github.com/axios/axios#request-config
      const axiosConfigObject = {headers: httpReqHeaders}; 
      axios.delete(deleteUrl, axiosConfigObject).then(res=> {
        console.log(res);
      }).catch(error => {
        console.log("Delete Error")
        console.log(error);
      });
      this.props.actions.reset();
    };

    componentDidMount() {
      $('.dropdown').on('show.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(50);
      });
      $('.dropdown').on('hide.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(50);
      });
    }

    render() {
      return (
        <div>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-target="navbarDropdown" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              
              {typeof this.props.home.client_data.length > 0 !== 'undefined' && (
                this.props.home.client_data.thumb && (
                  <img alt={"Foto do Usuário"} src={this.props.home.client_data.thumb} className="image profile-image mr-2 rounded-circle" width={50} />
                ),
                !this.props.home.client_data.thumb && (
                  <img alt={"Foto do Usuário"} src={userImage} className="image profile-image mr-2 rounded-circle" width={50} />
                )
              )}

              {typeof this.props.home.client_data !== 'undefined' &&typeof this.props.home.client_data.client !== 'undefined' && (
                  this.props.home.client_data.client.name
              )}
              

            </a>
            <div className="dropdown-menu dropdown-menu-right m-2 shadow text-center" aria-labelledby="navbarDropdown">
              <NavLink className="dropdown-item" exact to="/minhaconta">Minha Conta</NavLink>
              <div className="dropdown-divider"></div>
              <NavLink className="dropdown-item" exact to="/pedidos">Meus Pedidos</NavLink>
              <div className="dropdown-divider"></div>
              <NavLink className="dropdown-item" exact to="/minhacaixa">Minha Caixa</NavLink>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={this.signOut} href="/">Sair</a>
            </div>
          </li>
        </div>
      );
    }
}