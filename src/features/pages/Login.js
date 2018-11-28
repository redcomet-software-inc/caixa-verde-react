import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { NavLink } from 'react-router-dom';

export default class Login extends Component {
  static propTypes = {};

  componentDidMount() {
    if (this.props.loggedIn) {
      console.log('redirecionar');
      this.props.redirect('/');
    }
  }

  render(props) {
    return (
      <div className="pages-login">
        <h2 className="text-center title">Login</h2>
        <div className="content">
        <form className="form-group" onSubmit={this.props.signIn}>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-3 form-group  text-center">

              <label for="inp" className="inp">
                <input type="text" id="inp" name="email" placeholder="&nbsp;" />
                <span class="label">Email</span>
                <span class="border"></span>
              </label>
              
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-3 form-group text-center">
              <label for="inp" className="inp">
                <input type="password" id="inp" name="password" placeholder="&nbsp;" />
                <span class="label">Senha</span>
                <span class="border"></span>
              </label>

            </div>
          </div>

          <div className="closing text-center">  
            <p><input className="btn btn-primary" type="submit" value="Entrar" /></p>
            <p className="text-danger">{this.props.signInMessage}</p>
            <span className="text-center mx-auto">
              Novo aqui? <NavLink to="/cadastro">Cadastre-se</NavLink>
            </span>
          </div>
          </form>
        </div>
      </div>
    );
  }
}
