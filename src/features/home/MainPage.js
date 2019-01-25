import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//import CurrencyInput from 'react-currency-input';
import request from '../../common/configApi.js';
import NavBar from '../navbar/NavBar.js';
import Footer from '../footer/Footer.js';

/* External Functions */
import { setLocalStorage, checkLocalStorage } from './SetLocalStorage';
import { countProductsAndKits } from './CountProducts';
import { countProducts } from './CountProducts';
import { countKits } from './CountProducts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
    if (checkLocalStorage() !== false) {
      var selectedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
      var selectedKits = JSON.parse(localStorage.getItem('selectedKits')) ;
      var authentication_token = localStorage.getItem('token');
      var clientEmail = localStorage.getItem('email');
      var shoppingCartCount = countProductsAndKits(selectedProducts,selectedKits); //Updates NavBar
      var productsCount = countProducts(selectedProducts);
      var kitsCount = countKits(selectedKits);
    }
    
    this.state = {
      products: [],
      selectedProducts: selectedProducts || [],
      kits: [],
      selectedKits: selectedKits ||  [],
      shoppingCartCount: shoppingCartCount || 0,
      productsCount: productsCount || 0,
      kitsCount: kitsCount || 0,
      shoppingCartProducts: [],
      shoppingCartKits:[],
      totalPriceKits: 0,
      totalPriceProducts: 0,
      clientName:'',
      clientEmail: clientEmail || '',
      authentication_token: authentication_token || '',
      clientId: '',
      loggedIn: false,
      redirect: false,
      redirectTo:'',
      changeStateTest:'state1',
      err_message:'',
      serviceAvailability:true,
      avatar:'',
      minQuantity:2,
      warningMessage:'A sua caixa está vazia.',
      checkout_order_id:0,
    };
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.auth();
    this.getMinQuantity();
    this.getProducts();
    this.getKits();
  }

  setCheckoutOrderId = (order_id) => {
    this.setState({checkout_order_id: order_id});
  }

  getMinQuantity = () => {
    request({
      method: 'get',
      url: 'api/v1/minquantity.json'
    }).then((res) => {
      this.setState({minQuantity: res.minquantity});
    })
  }

  /*Check if user is LoggedIn */
  auth = () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    request({
      method:'get',
      url: 'api/v1/sessions/check.json',
      params: {
        client_email: email,
        client_token: token,
      },
    }).then(res => {
        this.setState({loggedIn: true});
        this.setState({avatar: res.thumb});
        this.setState({clientId: res.client.id});
        this.setState({clientName: res.client.name});
        this.props.turnOffMainLoading();
        setTimeout(()=>{this.props.turnOffMainLoading()}, 500);
    }).catch(err => {
      this.setState({loggedIn: false});
      setTimeout(()=>{this.props.turnOffMainLoading()}, 500);
    });
  };

  getProducts = () => {
    request({
      method:'get',
      url: 'api/v1/products.json'
    }).then(res => {
        this.setState({ products: res });
        localStorage.setItem("productsList", JSON.stringify(res));
        this.updateShoppingCart("product");
      }
    )
  }

  getKits() {
    request({
      method:'get',
      url: 'api/v1/kits.json'
    }).then(res => {
        this.setState({ kits: res });
        localStorage.setItem("kitsList", JSON.stringify(res));
        this.updateShoppingCart("kit");
      }
    )
  }

  /* Reset all data and states */
  changeToLoggedOut = () => {
    /* Change all the states to the initial value.        */
    /* Probably this is not the best way to do it. Thanks */
    this.setState({products: [] });
    this.setState({selectedProducts: [] });
    this.setState({kits: [] });
    this.setState({selectedKits: []});
    this.setState({shoppingCartCount: 0});
    this.setState({productsCount: 0});
    this.setState({kitsCount: 0});
    this.setState({shoppingCartProducts: []});
    this.setState({shoppingCartKits: []});
    this.setState({totalPriceKits: 0});
    this.setState({totalPriceProducts: 0});
    this.setState({clientName:''});
    this.setState({clientEmail: ''});
    this.setState({authentication_token: ''});
    this.setState({signInMessage: ''});
    this.setState({clientId: ''});
    this.setState({loggedIn: false});
    this.setState({redirect: false});
    this.setState({redirectTo:''});
    this.setState({changeStateTest:'state1'});
    this.setState({err_message:''});
    this.setState({serviceAvailability:true});
    this.setState({avatar:''});
    this.setState({minQuantity:2});
    this.setState({isError:false});
    this.setState({warningMessage:'A sua caixa está vazia.'});
    this.setState({checkout_order_id:0});
    
    /* Remove everything from Local Storage */
    localStorage.removeItem("kitsList");
    localStorage.removeItem("productsList");
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('selectedProducts');
    localStorage.removeItem('selectedKits');
    /* Redirect to the MainPage */
    this.redirect('/');
    /* Reload to Make Sure Everything is cleaned up */
    window.location.reload();
  }

  /* Redirect and Render */
  redirect = (targetUrl) => {
    this.setState({redirectTo:targetUrl});
    this.setState({redirect: true});
  }
  renderRedirect = () => {
      if(this.state.redirect === true) {
        this.setState({redirect: false});
        return <Redirect exact to={this.state.redirectTo} />;
      }
  };
  
  /* Process All Selected Products and Kits, count, and put price on it */
  /* This is also the last preparation for Checkout */
  updateShoppingCart = (name) => 
  {
      let selectedItemsInfo = [];
      let totalPriceItems = 0;
      let items = [];
      let selectedItems = [];
    if (name==="kit") 
    {
      items = this.state.kits;
      selectedItems = this.state.selectedKits;
    } else if (name==="product") 
    {
      items = this.state.products;
      selectedItems = this.state.selectedProducts;
    }
    for (let i = 0; i <= items.length - 1; i++) 
    {
      for (let j = 0; j <= selectedItems.length - 1; j++) 
      {
        if (parseInt(items[i].id, 10) === parseInt(selectedItems[j].id, 10)) 
        {
          var selectedItem = items[i];
          var quantity = selectedItems[j].quantity;
          var price_table_id = selectedItems[j].price_table_id;
          selectedItem['quantity'] = quantity;
          selectedItem['price_table_id'] = price_table_id;
          selectedItem['unit_price'] = selectedItem['price']; //Mercado Pago Format
          totalPriceItems += selectedItem['price'] * quantity;
          selectedItemsInfo.push(selectedItem);
        }
      }
    }

    if (name==="kit") 
    {
      this.setState({ shoppingCartKits: selectedItemsInfo });
      this.setState({totalPriceKits: totalPriceItems});
    } else if (name==="product") 
    {
      this.setState({shoppingCartProducts: selectedItemsInfo });
      this.setState({totalPriceProducts: totalPriceItems});
    }
  };

  setMoneyFormat = price => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    // => "R$100,000,000.00"
  };

  /* Add Item to the Shopping List */
  addCardCount = (id, name, delta) => {
    /* name variable can be either kit or product */
    /* delta defines if the value increase or decrease */
    /* this serves to differenciate list of kits and products */
    let priceTableId = "";
    let selectedItems = [];
    let items = [];
    if (name==="kit") {
      priceTableId = '';
      selectedItems = this.state.selectedKits;
      items = this.state.kits;
    } else if (name==="product") {
      priceTableId = '';
      selectedItems = this.state.selectedProducts;
      items = this.state.products;
    }

    /* Get Price_table_id from clicked element */
    for (let i = 0; i <= items.length - 1; i++) {
      if (items[i].id === id) {
        priceTableId = items[i].price_table_id;
      }
    }

    /* Get Element from Array State and Update the data in a temporary Variable */
    var checkExistingElement = 0;
    for (var x = 0; x <= selectedItems.length - 1; x++) {
      if (selectedItems[x].id === id) {
        checkExistingElement += 1;
        if(selectedItems[x].quantity + delta === 0) {
            selectedItems.splice(x,1);
        } else { 
          
          var newItem = {
            id: id,
            quantity: selectedItems[x].quantity + delta,
            price_table_id: selectedItems[x].price_table_id,
          };
          selectedItems.splice(x, 1, newItem);
        }
      }
    }
    /* If the Element does not exist inside SelectedProducts, just push it */
    if (checkExistingElement === 0) {
      var newItemZero = {
        id: id,
        quantity: 1,
        price_table_id: priceTableId,
      };
      selectedItems.push(newItemZero);
    }

    /* UpdateState */
    if (name==="kit") 
    {
      this.setState({ selectedKits: selectedItems });
      this.updateShoppingCart("kit");
    } else if (name==="product") 
    {
      this.setState({ selectedProducts: selectedItems });
      this.updateShoppingCart("product");
    }
    let shoppingCartCount = countProductsAndKits(this.state.selectedProducts, this.state.selectedKits);
    let productsCount = countProducts(this.state.selectedProducts);
    let kitsCount = countKits(this.state.selectedKits);
    this.setState({ shoppingCartCount: shoppingCartCount });
    this.setState({ productsCount: productsCount});
    this.setState({ kitsCount: kitsCount });
    setLocalStorage(this.state.selectedProducts, this.state.selectedKits);
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

  turnOnError = (err_message) => {
    /* Error Also Turn Off Loading */
    this.props.actions.turnOffLoading();
    this.props.actions.turnOnError();
    this.redirect('');
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
    if(this.props.home.isLoading===true) 
    {
      return <Spinner redirect={this.redirect} />
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
                
                <NavBar
                  loggedIn={this.state.loggedIn}
                  shoppingCartCount={this.state.shoppingCartCount}
                  clientName={this.state.clientName}
                  warning={this.warning}
                  redirect={this.redirect}
                  changeToLoggedOut={this.changeToLoggedOut}
                  updateShoppingCart={this.updateShoppingCart}
                  image={this.state.avatar}
                />
                <div className="row" >
                    <div className="container-fluid pb-3">
                      <div className="mb-5 mx-auto content">
                        {this.renderError()}
                        {this.renderSpinner()}
                        <div className="row my-auto mx-0">
                          <div className={"col-lg-12 pt-md-5 mx-auto my-auto pl-0 pr-0 "+ this.visible()}>
                            {this.renderRedirect(this.state.redirectTo)}
                            <Switch>
                            <Route path="/" exact component={Option} />
                            <Route
                              path="/Personalizado"
                              exact
                              render={props => (
                                <Products
                                  addCardCount={this.addCardCount}
                                  setMoneyFormat={this.setMoneyFormat}
                                  subtractCardCount={this.subtractCardCount}
                                  selectedProducts={this.state.selectedProducts}
                                  products={this.state.products}
                                  onRef={ref => (this.custom = ref)}
                                />
                              )}
                            />
                            <Route
                              path="/Kits"
                              exact
                              render={props => (
                                <Kits
                                  addCardCount={this.addCardCount}
                                  subtractCardCountKit={this.subtractCardCountKit}
                                  selectedKits={this.state.selectedKits}
                                  kits={this.state.kits}
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
                                  redirect={this.redirect}
                                />
                              )}
                            />
                            <Route
                              path="/cadastro"
                              exact
                              render={props => (
                                <Registration register={this.register} 
                                component={Registration} 
                                redirect={this.redirect} />
                              )}
                            />
                            <Route
                              path="/checkout"
                              exact
                              render={props => (
                                <Checkout
                                  shoppingCartProducts={this.state.shoppingCartProducts}
                                  productsCount={this.state.productsCount}
                                  kitsCount={this.state.kitsCount}
                                  minQuantity={this.state.minQuantity}
                                  shoppingCartKits={this.state.shoppingCartKits}
                                  shoppingCartCount={this.state.shoppingCartCount}
                                  updateShoppingCart={this.updateShoppingCart}
                                  totalPriceKits={this.state.totalPriceKits}
                                  totalPriceProducts={this.state.totalPriceProducts}
                                  setMoneyFormat={this.setMoneyFormat}
                                  clientId={this.state.clientId}
                                  clientEmail={this.state.clientEmail}
                                  redirect={this.redirect}
                                  setCheckoutOrderId={this.setCheckoutOrderId}
                                />
                              )}
                            />
                            <Route
                              exact
                              path="/minhaconta"
                              render={props => (
                                <MyAccount 
                                  />
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
                                <MyBox
                                  updateShoppingCart={this.updateShoppingCart}
                                  shoppingCartCount={this.state.shoppingCartCount}
                                  shoppingCartProducts={this.state.shoppingCartProducts} 
                                  shoppingCartKits={this.state.shoppingCartKits}
                                  />
                              )}
                            />
                            <Route
                              path="/pagamento"
                              exact
                              render={props => (
                                <Payment 
                                checkout_order_id={this.state.checkout_order_id} 
                                redirect={this.redirect}
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
              <ShoppingCartButton shoppingCartCount={this.state.shoppingCartCount}/> 
              <Warning warningMessage={this.state.warningMessage} />
            {this.state.shoppingCartCount > 0 && (
            <ShoppingCart
              shoppingCartProducts={this.state.shoppingCartProducts}
              shoppingCartKits={this.state.shoppingCartKits}
              productsCount={this.state.productsCount}
              kitsCount={this.state.kitsCount}
              minQuantity={this.state.minQuantity}
              totalPriceKits={this.state.totalPriceKits}
              totalPriceProducts={this.state.totalPriceProducts}
              setMoneyFormat={this.setMoneyFormat}
              loggedIn={this.state.loggedIn}
              warning={this.warning}
              redirect={this.redirect}
              renderRedirect={this.renderRedirect}
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
