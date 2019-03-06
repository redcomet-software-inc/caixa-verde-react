import React, { Component } from 'react';
import Loading from '../common/loading.js';
import { signIn } from '../../common/signin.js';
import { NavLink } from 'react-router-dom';
import LoaderHOC from '../../HOC/loader-hoc';

class Login extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.component = "login";
    this.state = {
      isLoading: false,
      disabled: false,
      message: '',
    }
  }

  /* Sign In Client and Register new Token */
  setSignIn = (client_id, client_name, client_email, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', client_email);
  };
  
  handleClick = (e) => {
    e.preventDefault();
    e.persist();
    if(!this.state.isLoading) {
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
      this.setState({ message: ''});
      this.setState({ isLoading: true});
      this.setState({ disabled: true});
      signIn(email, password).then(response => {
        this.setState({ isLoading: false});
        const client_id = response.id;
        const client_name = response.name;
        const client_email = response.email;
        const token = response.authentication_token;
        this.setSignIn(client_id, client_name, client_email, token);
        this.props.actions.setSignIn();
        this.props.actions.redirect('/');
      }).catch(error => {
        this.setState({ isLoading: false});
        if(error === "Network Error") {
          this.setState({ message: 'Falha na conexão com o servidor.' });
          return;
        } else {
          this.setState({ message: 'E-mail e/ou Senha não correspondem.' });
          return;
        }
      });
    }
  }

   renderLoading = () => {
     if(this.state.isLoading) {
      return <Loading />;
     }
  }

  
  render(props) {
    return (
      <div className="pages-login">
        <h2 className="text-center title">Login</h2>
        <div className="content">
        <form className="form-group" onSubmit={this.handleClick}>
          <div className="row justify-content-center">
            <div className="col-md-6 mb-3 form-group  text-center">
              <label htmlFor="inp" className="inp">
                <input type="text" id="inp_name" name="email" placeholder="&nbsp;" required />
                <span className="label">Email</span>
              </label>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 mb-3 form-group text-center">
              <label htmlFor="inp" className="inp">
                <input type="password" id="inp_password" name="password" placeholder="&nbsp;" required />
                <span className="label">Senha</span>
              </label>
            </div>
          </div>
          <div className="text-center mx-auto w-100">
          <div className="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" disabled={this.props.disable} >Entrar</button></div>
          <div className="d-inline p-1 text-white position-absolute">{this.renderLoading()}</div>
          </div>  
            <div className="text-center p-4">
             <p className="text-danger">{this.state.message}</p>
                Novo aqui? <NavLink to="/cadastro">Cadastre-se</NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default LoaderHOC(Login);