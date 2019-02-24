import React, { Component } from 'react';
import Loading from '../common/loading.js';
import { signIn } from '../../common/signin.js';
import { NavLink } from 'react-router-dom';
import LoaderHOC from '../../HOC/loader-hoc';

class Login extends Component {
  static propTypes = {};

  constructor(props) 
  {
    super(props);
    this.state = {
      isLoading: false,
      disabled: false,
      message: '',
    }
  }
  
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
        console.log("this here");
        this.setState({ isLoading: false});
        const client_id = response.id;
        const client_name = response.name;
        const client_email = response.email;
        const token = response.authentication_token;
        this.props.setSignIn(client_id, client_name, client_email, token);
        this.props.actions.redirect('/');
        this.setState({ message: 'Você está logado' });
      }).catch(error => {
        this.setState({ isLoading: false});
        if(error === "Network Error") {
          this.setState({ message: 'Falha na conexão com o servidor.' });
        } else {
          this.setState({ message: 'E-mail e/ou Senha não correspondem.' });
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