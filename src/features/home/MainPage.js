import React, { Component } from 'react';
import { Route, HashRouter, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Loads from 'react-loads';

import PropTypes from 'prop-types';
//import CurrencyInput from 'react-currency-input';
import axios from 'axios';
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
import Checkout from '../pages/Checkout.js';
import MyAccount from '../pages/MyAccount.js';
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
      totalPriceKits: '0.0',
      totalPriceProducts: '0.0',
      clientName:'',
      clientEmail: clientEmail || '',
      authentication_token: authentication_token || '',
      signInMessage: '',
      clientId: '',
      loggedIn: false,
      redirect: false,
      redirectTo:'',
      changeStateTest:'state1',
      errMessage:'',
      serviceAvailability:true,
      avatar:'',
      minQuantity:2,
      isLoading:false,
      warningMessage:'A sua caixa está vazia.',
    };

    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.auth();
    this.getMinQuantity();
  }

  getMinQuantity = () => {
    axios.get('http://localhost:3000/api/v1/minquantity.json').then(res => {
      this.setState({minQuantity: res.data.minquantity});
      console.log("min quantitty");
      console.log(res.data.minquantity);
    });
  }

  /*Check if user is LoggedIn */
  auth = () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    axios.get('http://localhost:3000/api/v1/sessions/check.json', {
      params: {
        client_email: email,
        client_token: token,
      },
    }).then(res => {
       if (res['status'] === 200) {
          this.setState({loggedIn: true});
          this.setState({avatar: res.data.thumb});
          this.setState({clientId: res.data.client.id});
          this.setState({clientName: res.data.client.name});
          this.props.turnOffLoading();
          setTimeout(()=>{this.props.turnOffLoading()}, 2000);
       } else {
          this.setState({loggedIn: false});
          setTimeout(()=>{this.props.turnOffLoading()}, 2000);
       }
    }).catch(err => {
      this.setState({loggedIn: false});
      setTimeout(()=>{this.props.turnOffLoading()}, 2000);
    });
  };

  getProducts = () => {
    axios.get(`http://localhost:3000/api/v1/products.json`).then(res => {
      const products = res.data;
      if(res.status === 200) {
        this.setState({ products: products });
        localStorage.setItem("productsList", JSON.stringify(products));
        this.updateShoppingCart("product");
      }
    }).catch(error => {
        throw error;
      });
  }

  getKits() {
    axios.get(`http://localhost:3000/api/v1/kits.json`).then(res => {
      const kits = res.data;
      if(res.status === 200) {
        this.setState({ kits: kits });
        localStorage.setItem("kitsList", JSON.stringify(kits));
        this.updateShoppingCart("kit");
      }
    });
  }

  /* Reset all data and states */
  changeToLoggedOut = () => {
    this.setState({loggedIn: false});
    this.setState({signInMessage:''});
    this.setState({selectedProducts:[]});
    this.setState({selectedKits:[]});
    this.setState({showComponent:false});
    this.setState({shoppingCartCount:0});
    this.setState({shoppingCartProducts:[]});
    this.setState({shoppingCartKits:[]});
    this.setState({clientName:''});
    this.setState({clientEmail:''});
    this.setState({authentication_token:''});
    this.setState({clientId:''});
    this.setState({loggedIn:false});
    this.setState({redirectTo:''});
    this.setState({changeStateTest:'state1'});
    this.setState({errMessage:''});
    this.setState({serviceAvailability:true});
  }

  /* Redirect and Render */
  redirect = (targetUrl) => {
    console.log("reached redirect");
    console.log(targetUrl);
    this.setState({redirectTo:targetUrl});
    this.setState({redirect: true});
  }

  renderRedirect = () => {
      if(this.state.redirect === true) {
        this.setState({redirect: false});
        return <Redirect exact to={this.state.redirectTo} />;
      }
  };
  
  

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

          totalPriceItems += parseFloat(selectedItem['price']) * quantity;
          
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
          console.log("ZERO");
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
      
    }
    let shoppingCartCount = countProductsAndKits(this.state.selectedProducts, this.state.selectedKits);
    let productsCount = countProducts(this.state.selectedProducts);
    let kitsCount = countKits(this.state.selectedKits);
    this.updateShoppingCart(name);
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
    const authentication_token = '';
    const status = '';

    this.setState({ signInMessage: '' });

    axios
      .post(`http://localhost:3000/api/v1/sessions.json`, { email, password })
      .then(res => {
        if (res['status'] === 201) {
          const token = res.data['authentication_token'];
          this.setState({ authentication_token: token });
          this.setState({ signInMessage: 'Você está logado.' });
          this.setState({ email: email });
          this.setState({ clientName:  res.data['name'] });
          this.setState({ clientId: res.data['id'] });
          this.setState({ loggedIn: true });
          localStorage.setItem('token', token);
          localStorage.setItem('email', email);
          this.setState({redirectTo:''});
          this.setState({ redirect: true });

        } else {
          // throw error and go to catch block
        throw new Error('Error');
        }
      })
      .catch(error => {
        console.log('Error', error);
        this.setState({ signInMessage: 'E-mail e/ou Senha não correspondem.' });

      });
  };
  
  showComponent = value => {
    this.setState({ showComponent: value });
  };

  changeErrMessage = text => {
    console.log("change Err Message");
    console.log(text);
    this.setState({ errMessage: text});
  }

  warning = (text) => {
    this.setState({warningMessage: text});
  }

  turnOffLoading = () => {
    console.log("OFF");
    this.setState({isLoading: false});
  }
  turnOnLoading = () => {
    console.log("ON");
    this.setState({isLoading: true});
  }
  renderSpinner = () => {
    if(this.state.isLoading===true) {
      return <Spinner />
    }
  }

  visible = () => {
    if(this.state.isLoading===true) {
      return 'invisible';
    } else {
      return 'visible';
    }
  }

  render() {
    return (

      <div>
        
        <HashRouter>
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
              <div className="col-md-3">{this.state.showComponent ? <SideBar /> : null}</div>
                <div className="container-fluid bg-grey">
                  <div className="content mx-auto">
                    {this.renderSpinner()}
                    <div className="row">
                      <div className={"col-lg-12 col-md-9 "+ this.visible()}>

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
                              changeErrMessage={this.changeErrMessage}
                              turnOnLoading={this.turnOnLoading}
                              turnOffLoading={this.turnOffLoading}
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
                            <MyAccount turnOffLoading={this.turnOffLoading} turnOnLoading={this.turnOnLoading} />
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
            
          </div>
        </HashRouter>

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
