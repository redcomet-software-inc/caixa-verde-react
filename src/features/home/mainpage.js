import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//import CurrencyInput from 'react-currency-input';
import NavBar from '../navbar/NavBar.js';
import Footer from '../footer/footer.js';

/* External Functions */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAuth } from '../../common/get-auth.js';

/* Pages and render components */
import Products from '../pages/products.js';
import Kits from '../pages/kits.js';
import Option from '../pages/option.js';
import Login from '../pages/login.js';
import Registration from '../pages/registration.js';
import ShoppingCart from '../pages/shoppingcart.js';
import ShoppingCartButton from '../components/shoppingcart-button.js';
import Checkout from '../pages/checkout/checkout.js';
import MyAccount from '../pages/my-account/myaccount.js';
import MyOrders from '../pages/my-orders/myorders.js';
import MyBox from '../pages/mybox.js';
import Payment from '../pages/payment/payment.js';
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
      products: []
    };
  }

  componentDidMount() {
    this.auth();
    this.props.actions.getMinQuantityRequest();
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

  render() {
    
    return (
        <React.Fragment>
          <Router>
            <div>
                <div className="header">
                <div className="left-margin" />
                <ShoppingCartButton />
                <NavBar {...this.props} />
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
                              <Route path="/personalizado" exact component={Products} />
                              <Route path="/kits" exact component={Kits} />
                              <Route path="/login" exact component={Login} />
                              <Route path="/cadastro" exact component={Registration} />
                              <Route path="/checkout" exact component={Checkout} />
                              <Route path="/minhaconta" exact component={MyAccount} />
                              <Route path="/pedidos" exact component={MyOrders} />
                              <Route path="/minhacaixa" exact component={MyBox} />
                              <Route path="/pagamento" exact component={Payment} />
                              <Route path="/err" exact component={Err} />
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
              order_price={this.props.home.order_price}
              products={this.props.home.products}
              kits={this.props.home.kits}
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
    ...state,
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