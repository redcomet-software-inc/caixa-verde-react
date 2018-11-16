import React, { Component } from 'react';
import appLogo from '../../images/caixaverde-finalizacao-weblogo.png'
import {
  NavLink
} from "react-router-dom";
import UserProfile from './UserProfile.js'
class NavBar extends Component {
  static propTypes = {

  };



  render() {
    return (
      <div>
        <nav className="navbar navbar-primary navbar-expand-lg navbar-light shadow-sm">
          <NavLink className="navbar-brand" exact to="/"><img src={appLogo} width={200} /></NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">Home</NavLink>
              </li>
             
              <li className="nav-item">
               
                <NavLink className="nav-link" to="/ajuda">Ajuda</NavLink>
              </li>
              
            </ul>
            <form className="form-inline mx-auto">
              <input className="form-control mr-sm-2" type="search" placeholder="Procurar" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Ir</button>
            </form>

            <ul className="navbar-nav my-2 my-lg-0">
            { this.props.loggedIn ? <UserProfile redirect={this.props.redirect} changeToLoggedOut={this.props.changeToLoggedOut} clientName={this.props.clientName} /> : <div> 
              <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink> </li>

            </div>}
              
            </ul> 
           
          </div>
        </nav>

        <nav className="navbar navbar-secondary navbar-expand-lg navbar-light bg-light">

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" data-toggle="modal" onClick={this.props.getSelectedProductsInfo} data-target="#shoppingCartDialog" exact to="/">Carrinho de Compras</NavLink>
                
                </li>
                <li>
                   <div className="badge badge-danger float-right">{ this.props.shoppingCartCount }</div>
                </li>
              </ul>
            </div>
          </nav>
       
        
      </div>

    );
  }
}

export default NavBar;
