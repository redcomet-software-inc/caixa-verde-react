import React, { Component } from 'react';
import appLogo from '../../images/caixaverde-finalizacao-weblogo.png'
import userImage from '../../images/userImage.jpg';
import {
  NavLink
} from "react-router-dom";
import UserProfile from './UserProfile.js';
class NavBar extends Component {
    static propTypes = {

    };
    constructor(props) {
      super(props);
      this.state = {
        dialog: 'warningDialog',
      }
    }

 

    addCardCount = (e, b, c) => {
        console.log("confere");
    }

    changeDialog = () => {
      if(this.props.shoppingCartCount > 0){
        this.setState({dialog: 'shoppingCartDialog'});
      } else {
        this.setState({dialog: 'warningDialog'});
      }
    }

    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.shoppingCartCount !== prevProps.shoppingCartCount) {
        this.changeDialog();
      }
    }

  render() {
    return (
      <div>
        <nav className="navbar navbar-primary navbar-expand-lg navbar-light shadow-sm">
          <NavLink className="navbar-brand" exact to="/"><img src={appLogo} width={200} /></NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">Home</NavLink>
              </li>
             
              <li className="nav-item">
               
                <NavLink className="nav-link" to="/ajuda">Ajuda</NavLink>
              </li>
              
            </ul>

            <ul className="navbar-nav my-2 my-lg-0">
            { this.props.loggedIn ?   <UserProfile redirect={this.props.redirect} changeToLoggedOut={this.props.changeToLoggedOut} clientName={this.props.clientName} /> : <div> 
              <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink> </li>

            </div>}
              
            </ul> 
           
          </div>
        </nav>

        <nav className="navbar navbar-secondary navbar-expand-lg navbar-light bg-light text-right">

            
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" data-toggle="modal" data-target={"#"+this.state.dialog } exact to="/">Minha Caixa</NavLink>
                
                </li>
                <li><div className="badge badge-success float-right">
                  
                  { this.props.shoppingCartCount > 0  ?  <div>{this.props.shoppingCartCount}</div> : null}</div>
                
                </li>
              </ul>
            
          </nav>
       
        
      </div>

    );
  }
}

export default NavBar;
