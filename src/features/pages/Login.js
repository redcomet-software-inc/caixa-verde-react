import React, { Component } from 'react';
import { Redirect } from 'react-router';

import {
  NavLink
} from "react-router-dom";

export default class Login extends Component {
  static propTypes = {

  };

  componentDidMount()  {
    if (this.props.loggedIn) {
      console.log("redirecionar");
      return (<Redirect to="/kits" />);
    }
  }

  render(props) {
    return (
      
      <div className="pages-login">
      
        <h2 className="text-center title">Login</h2>
        <div className="content">
    
          <div className="row col-md-6 mx-auto text-center">
              <form className="form-group" onSubmit={this.props.signIn}>
                <label style={{textAlign:'left'}}>
                  E-mail:
                  <input className="form-control" type="email" name="email" placeholder="meuemail@email.com" />
                </label>
                <label style={{textAlign:'left'}}>
                  Senha:
                  <input className="form-control" type="password" name="password" placeholder="Senha" />
                </label>
                <p>
                  <input className="btn btn-primary" type="submit" value="Entrar" />
                  </p>
                   <span className="text-danger">{ this.props.signInMessage }</span>
                
              </form>
              <span className="text-center mx-auto">Novo aqui? <NavLink to="/cadastro">Cadastre-se</NavLink></span>

                            
            </div>
      
        </div>

      </div>
    );
  }
}
