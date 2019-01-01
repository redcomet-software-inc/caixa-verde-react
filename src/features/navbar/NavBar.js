import React, { Component } from 'react';
import appLogo from '../../images/caixaverde-finalizacao-weblogo.png';
import userImage from '../../images/userImage.jpg';
import { NavLink } from 'react-router-dom';
import UserProfile from './UserProfile.js';
class NavBar extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      dialog: 'warningDialog',
      fixedTop: '',
    };
  }

  addCardCount = (e, b, c) => {
    console.log('confere');
  };

  changeDialog = () => {
    if (this.props.shoppingCartCount > 0) {
      this.setState({ dialog: 'shoppingCartDialog' });
    } else {
      this.props.warning('Sua caixa está vazia');
      this.setState({ dialog: 'warningDialog' });
    }
  };

  componentDidMount() {
    this.changeDialog();
    this.props.updateShoppingCart("kit");
    this.props.updateShoppingCart("product");
    document.addEventListener('scroll', this.handleScroll, {passive: true} );
  }

  componentDidUpdate(prevProps) {
    if (this.props.shoppingCartCount !== prevProps.shoppingCartCount) {
      this.changeDialog();
      
    }
  }

  handleScroll = () => {
    if(window.scrollY > 90) {
      this.setState({ fixedTop: 'fixed-top'});
    } else {
      this.setState({ fixedTop: ''});
    }
    //return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <div id="caixa-verde-header">
      
        <nav className="navbar navbar-primary navbar-expand-lg navbar-light shadow">
          <NavLink className="navbar-brand" exact to="/">
            <img src={appLogo} width={200} />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ajuda">
                  Ajuda
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav my-2 my-lg-0">
              {this.props.loggedIn ? (
                <UserProfile
                  redirect={this.props.redirect}
                  changeToLoggedOut={this.props.changeToLoggedOut}
                  clientName={this.props.clientName}
                  image={this.props.image}
                />
              ) : (
                <div>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>{' '}
                  </li>
                </div>
              )}
            </ul>
          </div>
        </nav>

        <nav className={"navbar-options bg-dark shadow " + this.state.fixedTop}>
          <div className="w-100">
            <div className="d-flex justify-content-lg-end justify-content-center bd-highlight mb-0">
             <div class="p-0 bd-highlight"></div>
              <div class="p-0 bd-highlight">
                <span className="nav-item">
                  {this.props.loggedIn ? (<NavLink className="nav-link nav-item" exact to="/pedidos">Meus Pedidos</NavLink>) : null }
                </span>
              </div>
              <div class="p-0 bd-highlight">
                <span className="nav-item">
                  <NavLink  className="nav-link" exact to="/minhacaixa" > Minha Caixa{' '} 
                  {this.props.shoppingCartCount > 0 ? ( <div className="badge badge-success ">{this.props.shoppingCartCount}</div>  ) : null} 
                  </NavLink>
                </span>
              </div>
            </div>
          </div>
        </nav>

      </div>

    );
  }
}

export default NavBar;
