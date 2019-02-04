import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//import CurrencyInput from 'react-currency-input';
import NavBar from '../navbar/navbar.js';
import Footer from '../footer/footer.js';

/* External Functions */
import { destroyShoppingCart } from './set-localstorage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAuth } from '../../common/get-auth.js';
import { getProducts, getKits } from '../../common/get-products.js';

/* Pages and render components */
import Products from '../pages/products.js';
import Kits from '../pages/kits.js';
import Option from '../pages/option.js';
import Login from '../pages/login.js';
import Registration from '../pages/registration.js';
import ShoppingCart from '../pages/shoppingcart.js';
import ShoppingCartButton from '../components/shoppingcart-button.js';
import Checkout from '../pages/checkout.js';
import MyAccount from '../pages/myaccount.js';
import MyOrders from '../pages/MyOrders/myorders.js';
import MyBox from '../pages/mybox.js';
import Payment from '../pages/payment.js';
import Err from '../common/err.js';
import Warning from '../common/warning.js';
import Spinner from '../common/spinner.js';
import NotFound from '../common/not-found.js';
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
    console.log(order_id);
    console.log("checkout");
    this.setState({checkout_order_id: order_id});
    localStorage.setItem("checkout_order_id", order_id);
  }

  /*Check if user is LoggedIn */
  auth = () => {
    getAuth().then(res => {
      if(res) {
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
      });
      getKits().then(res=> {
        this.setState({ kitsList: res });
      });
  }

  /* After Submiting Checkout */
  resetItems = () => {
    destroyShoppingCart();
    this.setState({productsCount: 0});
    this.setState({kitsCount: 0});
    this.setState({selectedProducts: [] });
    this.setState({selectedKits: []});
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

  redirect = (url) => {
    this.props.actions.redirect(url);
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
                <ShoppingCartButton count={this.count()}/>
                <NavBar
                  loggedIn={this.state.loggedIn}
                  count={ this.count() }
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
                              path="/pedidos"
                              render={props => (
                                <MyOrders 
                                  setCheckoutOrderId={this.setCheckoutOrderId}
                                  redirect={this.redirect}
                                  location={window.location}
                                  {...props}
                                />
                              )}
                              />
                            <Route
                              path="/minhacaixa"
                              exact
                              render={props => (
                                <MyBox
                                  count={this.count()}
                                  items={this.props.home.items}
                                  permit={true}
                                 />
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
          
            <ShoppingCart
              setMoneyFormat={this.setMoneyFormat}
              items={this.props.home.items}
              loggedIn={this.state.loggedIn}
              warning={this.warning}
              onRef={ref => (this.custom = ref)}
              redirect={this.redirect}
            />
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