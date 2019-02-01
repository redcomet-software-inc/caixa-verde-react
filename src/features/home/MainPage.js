import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//import CurrencyInput from 'react-currency-input';
import NavBar from '../navbar/NavBar.js';
import Footer from '../footer/Footer.js';

/* External Functions */
import { destroyShoppingCart } from './SetLocalStorage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAuth } from '../../common/getAuth.js';
import { getProducts, getKits } from '../../common/getProducts.js';

/* Pages and render components */
import Products from '../pages/Products.js';
import Kits from '../pages/Kits.js';
import Option from '../pages/Option.js';
import Login from '../pages/Login.js';
import Registration from '../pages/Registration.js';
import ShoppingCart from '../pages/ShoppingCart.js';
import ShoppingCartButton from '../components/ShoppingCartButton.js';
import Checkout from '../pages/Checkout.js';
import MyAccount from '../pages/MyAccount.js';
import MyOrders from '../pages/MyOrders.js';
import MyBox from '../pages/MyBox.js';
import Payment from '../pages/Payment.js';
import Err from '../common/Err.js';
import Warning from '../common/Warning.js';
import Spinner from '../common/Spinner.js';
import NotFound from '../common/NotFound.js';
import * as actions from '../../features/home/redux/actions.js';


export class MainPage extends Component {
  constructor(props) {
    super(props);

    /* GetItems from LocalStorage */
    let authentication_token = localStorage.getItem('token');
    let clientEmail = localStorage.getItem('email');

    this.state = {
      productsList:[],
      clientName:'',
      clientEmail: clientEmail || '',
      authentication_token: authentication_token || '',
      clientId: '',
      loggedIn: false,
      changeStateTest:'state1',
      err_message:'',
      avatar:'',
      warningMessage:'A sua caixa está vazia.',
      checkout_order_id:0,
      items: []
    };
  }

  componentDidMount() {
    this.auth();
    this.getProducts();
  }

  setCheckoutOrderId = (order_id) => {
    this.setState({checkout_order_id: order_id});
  }

  /*Check if user is LoggedIn */
  auth = () => {
    getAuth().then(res => {
       console.log("get Auth");
       console.log(res);
      if(res) {
        console.log("response");
        console.log(res);
        this.setState({loggedIn: true});
        this.setState({avatar: res.thumb});
        this.setState({clientId: res.client.id});
        this.setState({clientName: res.client.name});
        this.props.turnOffMainLoading();
        setTimeout(()=>{this.props.turnOffMainLoading()}, 500);
      }
    }).catch(err=>{
        this.setState({loggedIn: false});
        setTimeout(()=>{this.props.turnOffMainLoading()}, 500);
    });
  };

  getProducts = () => {
      getProducts().then(res=> {
          this.setState({ productsList: res });
          localStorage.setItem("productsList", JSON.stringify(res));
      });
      getKits().then(res=> {
        this.setState({ kitsList: res });
        console.log("Kits List");
        console.log(res);
        localStorage.setItem("kitsList", JSON.stringify(res));
      });
  }

  /* After Submiting Checkout */
  resetItems = () => {
    destroyShoppingCart();
    this.setState({productsCount: 0});
    this.setState({kitsCount: 0});
    this.setState({selectedProducts: [] });
    this.setState({selectedKits: []});
    this.setState({shoppingCartCount: 0});
    this.setState({productsCount: 0});
    this.setState({kitsCount: 0});
  }

  /* Reset all data and states */
  changeToLoggedOut = () => {
    /* Change all the states to the initial value.        */
    /* Probably this is not the best way to do it. Thanks */
    this.setState({products: [] });
    this.setState({selectedProducts: [] });
    this.setState({kits: [] });
    this.setState({clientName:''});
    this.setState({clientEmail: ''});
    this.setState({authentication_token: ''});
    this.setState({signInMessage: ''});
    this.setState({clientId: ''});
    this.setState({loggedIn: false});
    this.setState({redirect: false});
    this.setState({redirectTo:''});
    this.setState({err_message:''});
    this.setState({avatar:''});
    this.setState({isError:false});
    this.setState({warningMessage:'A sua caixa está vazia.'});
    this.setState({checkout_order_id:0});
    /* Remove everything from Local Storage */
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    /* Redirect to the MainPage */
    /* Reload to Make Sure Everything is cleaned up */
    window.location.reload();
  }

  renderRedirect = () => {
      if(this.props.home.redirect === true) {
        this.props.actions.resetRedirect();
        return <Redirect exact to={this.props.home.redirectTo} />;
      }
  };
  
  setMoneyFormat = price => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    // => "R$100,000,000.00"
  };

  /* Sign In Client and Register new Token */
  setSignIn = (client_id, client_name, client_email, token) => {
      this.setState({ authentication_token: token });
      this.setState({ email: client_email });
      this.setState({ signInMessage: 'Você está logado.' });
      this.setState({ clientName: client_name });
      this.setState({ clientId: client_id });
      this.setState({ loggedIn: true });
      localStorage.setItem('token', token);
      localStorage.setItem('email', client_email);
  };

  warning = (text) => {
    this.setState({warningMessage: text});
  }

  turnOffError = () => {
    this.setState({isError: false});
    this.props.actions.turnOffError();
  }

  /* Error Also Turn Off Loading */
  turnOnError = (err_message) => {
    this.props.actions.turnOffLoading();
    this.props.actions.turnOnError();
    this.props.actions.redirect('');
    this.setState({ err_message: err_message});
  }

  renderError = () => {
    if(this.props.home.isError===true) {
      return <Err err_message={this.state.err_message} />
    } else {
      return null;
    }
  }

  renderSpinner = () => {
    if(this.props.home.isLoading===true) {
      return <Spinner />
    }
  }

  visible = () => {
    if(this.props.home.isLoading===true || this.props.home.isError===true) {
      return 'invisible';
    } else {
      return 'visible';
    }
  }

  count = () => {
    let count = 0;
    let myObject = this.props.home.items
    for (var key in this.props.home.items) {
      count += myObject[key].quantity;
    }
    return count;
  }

  render() {
    
    return (
        <React.Fragment>
          <Router>
            <div>
                <div className="header">
                <div className="left-margin" />
                <ShoppingCartButton shoppingCartCount={this.state.shoppingCartCount}/>
                <NavBar
                  loggedIn={this.state.loggedIn}
                  productsCount={ this.count() }
                  clientName={this.state.clientName}
                  warning={this.warning}
                  changeToLoggedOut={this.changeToLoggedOut}
                  image={this.state.avatar}
                />
                <div className="row" >
                    <div className="container-fluid pb-3">
                      <div className="mb-5 mx-auto content">
                        {this.renderError()}
                        {this.renderSpinner()}
                        <div className="row my-auto mx-0">
                          <div className={"col-lg-12 pt-md-5 mx-auto my-auto pl-0 pr-0 "+ this.visible()}>
                            {this.renderRedirect(this.props.home.redirectTo)}
                            <Switch>
                            <Route path="/" exact component={Option} />
                            <Route
                              path="/Personalizado"
                              exact
                              render={props => (
                                <Products
                                  permit={true}
                                  setMoneyFormat={this.setMoneyFormat}
                                  items={this.props.home.items}
                                />
                              )}
                            />
                            <Route
                              path="/Kits"
                              exact
                              render={props => (
                                <Kits
                                  kits={this.state.kitsList}
                                  items={this.props.home.items}
                                  permit={true}
                                  onRef={ref => (this.custom = ref)}
                                  setMoneyFormat={this.setMoneyFormat}
                                />
                              )}
                            />
                            <Route
                              path="/login"
                              exact
                              render={props => (
                                <Login
                                  setSignIn={this.setSignIn}
                                  loggedIn={this.state.loggedIn}
                                  permit={true}
                                />
                              )}
                            />
                            <Route
                              path="/cadastro"
                              exact
                              render={props => (
                                <Registration 
                                  register={this.register} 
                                  component={Registration}
                                  permit={true} 
                                />
                              )}
                            />
                            <Route
                              path="/checkout"
                              exact
                              render={props => (
                                <Checkout
                                  setMoneyFormat={this.setMoneyFormat}
                                  clientId={this.state.clientId}
                                  clientEmail={this.state.clientEmail}
                                  resetItems={this.resetItems}
                                  setCheckoutOrderId={this.setCheckoutOrderId}
                                  redirectTo={'login'}
                                />
                              )}
                            />
                            <Route
                              exact
                              path="/minhaconta"
                              render={props => (
                                <MyAccount />
                              )}
                            />
                            <Route
                              exact
                              path="/pedidos"
                              render={props => (
                                <MyOrders />
                              )}
                              />
                            <Route
                              path="/minhacaixa"
                              exact
                              render={props => (
                                <MyBox permit={true} />
                              )}
                            />
                            <Route
                              path="/pagamento"
                              exact
                              render={props => (
                                <Payment 
                                checkout_order_id={this.state.checkout_order_id} 
                                />
                              )}
                            />
                            <Route
                              path="/err"
                              exact
                              render={props => (
                                <Err errMessage={this.state.errMessage} />
                              )}
                            />
                            <Route component={NotFound} />
                            </Switch>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                <Footer />
              </div>
               
            <Warning warningMessage={this.state.warningMessage} />
            {this.state.shoppingCartCount > 0 && (
            <ShoppingCart
              setMoneyFormat={this.setMoneyFormat}
              loggedIn={this.state.loggedIn}
              warning={this.warning}
              onRef={ref => (this.custom = ref)}
            />)}
          </div>
        </Router>  
      </React.Fragment>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);