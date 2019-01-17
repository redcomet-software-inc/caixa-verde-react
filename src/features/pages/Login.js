import React, { Component } from 'react';
import Loading from '../common/Loading.js';

import { NavLink } from 'react-router-dom';

export default class Login extends Component {
  static propTypes = {};

  constructor(props) 
  {
    super(props);
    this.state = {
      isLoading: false,
      disable: false,
    }
  }

  componentDidMount() 
  {
    if (this.props.loggedIn) {
      console.log('redirecionar');
      this.props.redirect('/');
    }
  }

  handleClick = (e) => 
  {
    e.preventDefault();
    if(!this.state.isLoading) 
    {
      this.setState({ isLoading: true});
      this.setState({ disable: true});
      this.props.signIn(e);
      console.log("Is PREVENTING DEFAULT WORKING?");
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
                <input type="text" id="inp" name="email" placeholder="&nbsp;" />
                <span class="label">Email</span>
              </label>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 mb-3 form-group text-center">
              <label for="inp" className="inp">
                <input type="password" id="inp" name="password" placeholder="&nbsp;" />
                <span class="label">Senha</span>
              </label>
            </div>
          </div>
          <div class="text-center mx-auto w-100">
          <div class="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" disabled={this.props.disable} >Entrar</button></div>
          <div class="d-inline p-1 text-white position-absolute">{this.renderLoading()}</div>
          </div>  
            <div className="text-center p-4">
             <p className="text-danger">{this.props.signInMessage}</p>
                Novo aqui? <NavLink to="/cadastro">Cadastre-se</NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
