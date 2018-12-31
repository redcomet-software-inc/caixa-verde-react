import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Loads from 'react-loads';

import PropTypes from 'prop-types';
//import CurrencyInput from 'react-currency-input';
import request from '../../common/configApi.js';
import NavBar from '../navbar/NavBar.js';
import Footer from '../footer/Footer.js';

/* External Functions */
import { setLocalStorage, checkLocalStorage } from './SetLocalStorage';
import { countProductsAndKits } from './CountProducts';
import { countProducts } from './CountProducts';
import { countKits } from './CountProducts';
import { getTotalPrice } from './CountProducts';

/* Pages and render components */
import Products from '../pages/Products.js';
import Kits from '../pages/Kits.js';
import Option from '../pages/Option.js';
import SideBar from '../navbar/SideBar.js';
import Login from '../pages/Login.js';
import Registration from '../pages/Registration.js';
import ShoppingCart from '../pages/ShoppingCart.js';
import ShoppingCartButton from '../components/ShoppingCartButton.js';
import Checkout from '../pages/Checkout.js';
import MyAccount from '../pages/MyAccount.js';
import Payment from '../pages/Payment.js';
import MyOrders from '../pages/MyOrders.js';
import Orders from '../pages/Orders.js';
import Err from '../common/Err.js';
import Warning from '../common/Warning.js';
import Spinner from '../common/Spinner.js';


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
      var totalPrice = getTotalPrice(selectedProducts, selectedKits);//Does not inclue freight
      var productsList = JSON.parse(localStorage.getItem('productsList'));
      var kitsList = JSON.parse(localStorage.getItem('kitsList'));
    } else {
      this.getProducts();
      this.getKits();
    }
    
    this.state = {
      products: productsList || [],
      selectedProducts: selectedProducts || [],
      kits: kitsList || [],
      selectedKits: selectedKits ||  [],
      showComponent: false,
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
      signInMessage: '',
      clientId: '',
      loggedIn: false,
      redirect: false,
      redirectTo:'',
      changeStateTest:'state1',
      err_message:'',
      serviceAvailability:true,
      avatar:'',
      minQuantity:2,
      isLoading:false,
      isError:false,
      warningMessage:'A sua caixa está vazia.',
      checkout_order_id:0,
    };

    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.auth();
    this.getMinQuantity();
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
        setTimeout(()=>{this.props.turnOffMainLoading()}, 4000);
    }).catch(err => {
      this.setState({loggedIn: false});
      setTimeout(()=>{this.props.turnOffMainLoading()}, 4000);
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
    this.setState({showComponent: false});
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
    this.setState({isLoading:false});
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
  updateShoppingCart = (name) => {
      var selectedItemsInfo = [];
      var totalPriceItems = 0;
    if (name==="kit") {
      var items = this.state.kits;
      var selectedItems = this.state.selectedKits;
    } else if (name==="product") {
      var items = this.state.products;
      var selectedItems = this.state.selectedProducts;
    }
    for (var i = 0; i <= items.length - 1; i++) {
      for (var j = 0; j <= selectedItems.length - 1; j++) {
        if (parseInt(items[i].id, 10) === parseInt(selectedItems[j].id, 10)) {
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
    this.setState({ totalPrice: totalPriceItems });
    if (name==="kit") {
      this.setState({ shoppingCartKits: selectedItemsInfo });
      this.setState({totalPriceKits: totalPriceItems});
    } else if (name==="product") {
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
    if (name==="kit") {
      var priceTableId = '';
      var selectedItems = this.state.selectedKits;
      var items = this.state.kits;
    } else if (name==="product") {
      var priceTableId = '';
      var selectedItems = this.state.selectedProducts;
      var items = this.state.products;
    }

    /* Get Price_table_id from clicked element */
    for (var i = 0; i <= items.length - 1; i++) {
      if (items[i].id === id) {
        priceTableId = items[i].price_table_id;
      }
    }

    /* Get Element from Array State and Update the data in a temporary Variable */
    var checkExistingElement = 0;
    for (var i = 0; i <= selectedItems.length - 1; i++) {
      if (selectedItems[i].id === id) {
        checkExistingElement += 1;
        if(selectedItems[i].quantity + delta === 0) {
            selectedItems.splice(i,1);
        } else { 
          
          var newItem = {
            id: id,
            quantity: selectedItems[i].quantity + delta,
            price_table_id: selectedItems[i].price_table_id,
          };
          selectedItems.splice(i, 1, newItem);
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
    if (name==="kit") {
      this.setState({ selectedKits: selectedItems });
      this.updateShoppingCart("kit");
    } else if (name==="product") {
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
  signIn = e => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    this.setState({ signInMessage: '' });

    request({
      method:'post',
      url: 'api/v1/sessions.json',
      params: {
        email: email,
        password: password
      }
    }).then(res => { 
      const token = res['authentication_token'];
      this.setState({ authentication_token: token });
      this.setState({ email: email });
      this.setState({ signInMessage: 'Você está logado.' });
      this.setState({ clientName:  res['name'] });
      this.setState({ clientId: res['id'] });
      this.setState({ loggedIn: true });
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      this.setState({redirectTo:''});
      this.setState({ redirect: true });

    }).catch(error => {
        console.log('Error', error);
        this.setState({ signInMessage: 'E-mail e/ou Senha não correspondem.' });
    });
  };
  
  showComponent = value => {
    this.setState({ showComponent: value });
  };

  warning = (text) => {
    this.setState({warningMessage: text});
  }

  turnOffLoading = () => {
    this.setState({isLoading: false});
  }
  turnOnLoading = () => {
    this.setState({isLoading: true});
  }

  turnOffError = () => {
    console.log("Turn Off Error");
    this.setState({isError: false});
  }

  turnOnError = (err_message) => {
    /* Error Also Turn Off Loading */
    this.turnOffLoading();
    console.log("Error");
    this.redirect('0');
    this.setState({ err_message: err_message});
    this.setState({isError: true});
  }

  renderError = () => {
    if(this.state.isError===true) {
      return <Err err_message={this.state.err_message} />
    }
  }

  renderSpinner = () => {
    if(this.state.isLoading===true) {
      return <Spinner />
    }
  }

  visible = () => {
    if(this.state.isLoading===true || this.state.isError===true) {
      return 'invisible';
    } else {
      return 'visible';
    }
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.location);
    if (this.props.location !== prevProps.location) {
      console.log("cmo did update");
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div>
      
        <Router  basename="app" history={ Router } >
          <div className="header">
            <div className="left-margin" />
            <ShoppingCartButton />
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
                    <div className="row my-auto ">
                      <div className={"col-lg-12 pt-md-5 mt-md-5 mx-auto my-auto "+ this.visible()}>

                        {this.renderRedirect(this.state.redirectTo)}
                        
                        <Route exact path="/" component={Option} />
                        <Route
                          exact
                          path="/Personalizado"
                          render={props => (
                            <Products
                              addCardCount={this.addCardCount}
                              setMoneyFormat={this.setMoneyFormat}
                              subtractCardCount={this.subtractCardCount}
                              selectedProducts={this.state.selectedProducts}
                              products={this.state.products}
                              onRef={ref => (this.custom = ref)}
                              showComponent={this.showComponent}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/Kits"
                          render={props => (
                            <Kits
                              addCardCount={this.addCardCount}
                              subtractCardCountKit={this.subtractCardCountKit}
                              selectedKits={this.state.selectedKits}
                              kits={this.state.kits}
                              onRef={ref => (this.custom = ref)}
                              setMoneyFormat={this.setMoneyFormat}
                              showComponent={this.showComponent}
                            />
                          )}
                        />
                        <Route
                          path="/login"
                          render={props => (
                            <Login
                              signIn={this.signIn}
                              signInMessage={this.state.signInMessage}
                              loggedIn={this.state.loggedIn}
                              redirect={this.redirect}
                            />
                          )}
                        />
                        <Route
                          path="/cadastro"
                          render={props => (
                            <Registration register={this.register} component={Registration} redirect={this.redirect} />
                          )}
                        />
                        <Route
                          path="/checkout"
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
                              turnOnError={this.turnOnError}
                              turnOffError={this.turnOffError}
                              turnOnLoading={this.turnOnLoading}
                              turnOffLoading={this.turnOffLoading}
                              setCheckoutOrderId={this.setCheckoutOrderId}
                            />
                          )}
                        />
                        <Route
                          path="/orders"
                          render={props => (
                            <Orders />
                          )} 
                        />
                        <Route
                          path="/minhaconta"
                          render={props => (
                            <MyAccount 
                              turnOffLoading={this.turnOffLoading} 
                              turnOnLoading={this.turnOnLoading} 
                              turnOnError={this.turnOnError}
                              turnOffError={this.turnOffError}
                              />
                          )}
                        />
                        <Route
                          path="/pedidos"
                          render={props => (
                            <MyOrders 
                              turnOnLoading={this.turnOnLoading} 
                              turnOffLoading={this.turnOffLoading} 
                              turnOnError={this.turnOnError}
                              turnOffError={this.turnOffError} />
                          )}
                        />
                        <Route
                          path="/pagamento"
                          render={props => (
                            <Payment turnOffLoading={this.turnOffLoading} turnOnLoading={this.turnOnLoading} checkout_order_id={this.state.checkout_order_id} />
                          )}
                        />
                        <Route
                          path="/err"
                          render={props => (
                            <Err errMessage={this.state.errMessage} />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <Footer />
          </div>

        </Router>

        <Warning warningMessage={this.state.warningMessage} />

        

        {this.state.shoppingCartCount > 0 && (
          <ShoppingCart
            shoppingCartProducts={this.state.shoppingCartProducts}
            productsCount={this.state.productsCount}
            kitsCount={this.state.kitsCount}
            shoppingCartKits={this.state.shoppingCartKits}
            minQuantity={this.state.minQuantity}
            totalPriceKits={this.state.totalPriceKits}
            totalPriceProducts={this.state.totalPriceProducts}
            setMoneyFormat={this.setMoneyFormat}
            loggedIn={this.state.loggedIn}
            warning={this.warning}
            redirect={this.redirect}
            renderRedirect={this.renderRedirect}
            onRef={ref => (this.custom = ref)}
          />
        )}
          
      </div>
    );
  }
}
