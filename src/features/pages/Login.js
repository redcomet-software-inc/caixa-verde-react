import React, { Component } from 'react';
import Loading from '../common/Loading.js';
import { signIn } from '../../common/signIn.js';
import { NavLink } from 'react-router-dom';

export default class Login extends Component {
  static propTypes = {};

  constructor(props) 
  {
    super(props);
    this.state = {
      isLoading: false,
      disable: false,
      message: '',
    }
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.redirect('/');
    }
  }
  
  handleClick = (e) => {
    e.preventDefault();
    if(!this.state.isLoading) {
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
      this.setState({ message: ''});
      this.setState({ isLoading: true});
      this.setState({ disable: true});
      signIn(email, password).then(response => {
        this.setState({ isLoading: false});
        const client_id = response['id'];
        const client_name = response['name'];
        const client_email = response['email'];
        const token = response['authentication_token'];
        this.props.setSignIn(client_id, client_name, client_email, token);
        this.props.redirect('/');
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

   renderLoading = () => 
   {
     if(this.state.isLoading) {
      return <Loading />;
     }
  }

  componentDidUpdate(prevProps) 
  {
    // Typical usage (don't forget to compare props):
    if (this.props.signInMessage !== prevProps.signInMessage) 
    {
      if(this.props.signInMessage==='') 
      {
        this.setState({ isLoading: true});
      } else 
      {
        this.setState({ isLoading: false});
      }
    }
  }

  render(props) 
  {
    return (
      <div className="pages-login">
        <h2 className="text-center title">Login</h2>
        <div className="content">
        <form className="form-group" onSubmit={this.handleClick} disabled={this.props.disable}>
          <div className="row justify-content-center">
            <div className="col-md-6 mb-3 form-group  text-center">
              <label for="inp" className="inp">
                <input type="text" id="inp" name="email" placeholder="&nbsp;" required />
                <span class="label">Email</span>
              </label>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 mb-3 form-group text-center">
              <label for="inp" className="inp">
                <input type="password" id="inp" name="password" placeholder="&nbsp;" required />
                <span class="label">Senha</span>
              </label>
            </div>
          </div>
          <div class="text-center mx-auto w-100">
          <div class="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" disabled={this.props.disable} >Entrar</button></div>
          <div class="d-inline p-1 text-white position-absolute">{this.renderLoading()}</div>
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
