import React, { Component } from 'react';
import { Link, Route, HashRouter, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history'
import CurrencyInput from 'react-currency-input';
import axios from 'axios';
import NavBar from '../navbar/NavBar.js';
import Footer from '../footer/Footer.js';

/* Pages and render components */
import Custom from '../pages/Index.js';
import Kits from '../pages/Kits.js';
import Option from '../pages/Option.js';
import SideBar from '../navbar/SideBar.js';
import Login from '../pages/Login.js';
import Registration from '../pages/Registration.js';
import ShoppingCart from '../pages/ShoppingCart.js';
import Checkout1 from '../pages/Checkout1.js';

//created_at: "2018-11-06T10:47:32.310Z"

//id: 21
//name: "Product 1"
//description: "Description of Product 1"
//price: null

class DefaultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProducts: [],
      showComponent: false,
      shoppingCartCount: 0,
      shoppingCart: [],
      totalPrice: '0.0',
      email: '',
      authentication_token: '',
      signInMessage: '',
      clientId: '',
      loggedIn: false,
      kits: [],
    };
    this.addCardCount = this.addCardCount.bind(this);
    this.subtractCardCount = this.subtractCardCount.bind(this);
  }

  /* Get Product List from Index.js, count it, and pass it to the 'Custom' component */
  productsList = productsList => {
    var count = 0;
    for (var i = 0; i <= productsList.length - 1; i++) {
      count += productsList[i].quantity;
    }
    this.setState({ shoppingCartCount: count });
  };

  /* Add List of Selected Products to Local Storage */
  setLocalStorage() {
    this.productsList(this.state.selectedProducts);
    localStorage.setItem('selectedProducts', JSON.stringify(this.state.selectedProducts));
  }

  /* Verify if a localStore key is available */
  checkLocalStorage() {
    if (localStorage.getItem('selectedProducts') === null) {
      return false;
    } else {
      return true;
    }
  }

  /* Get List of Selected Products from Local Storage */
  getLocalStorage() {
    if (this.checkLocalStorage() !== false) {
      var selectedProducts = localStorage.getItem('selectedProducts');
      this.setState({ selectedProducts: JSON.parse(selectedProducts) });
      this.productsList(JSON.parse(selectedProducts)); //Updates NavBar
    }
  }

  retrieveDataFromLocalStorage() {
    var result = localStorage.getItem('selectedProducts');
    console.log('DataRetrieved');
    console.log(result);
  }

  getProducts() {
    axios.get(`http://localhost:3000/api/v1/products`).then(res => {
      const products = res.data;
      this.setState({ products: products });
    });
  }
  
  getKits() {
    axios.get(`http://localhost:3000/api/v1/kits`).then(res => {
      const kits = res.data;
      this.setState({ kits: kits });
      console.log("KITS");
      console.log(res.data);
    });
  }
  isClientLoggedIn() {

    console.log("teste")
    const email = "guilhermewn@gmail.com";
    const token = "g5EiYut5zz821CXNemLy";
    console.log(email);
    console.log(token);


    axios.get("http://localhost:3000/api/v1/clients.json", {
        params: {
          client_email: email,
          client_token: token
        }

      });

  }

  componentDidMount() {
    this.getLocalStorage();
    this.getProducts();
    this.getKits();
    this.isClientLoggedIn();
  }

  getSelectedProductsInfo = () => {
    var products = this.state.products;
    var selectedProducts = this.state.selectedProducts;
    var selectedProductsInfo = [];
    var totalPrice = 0;

    for (var i = 0; i <= products.length - 1; i++) {
      for (var j = 0; j <= selectedProducts.length - 1; j++) {
        if (products[i].id == selectedProducts[j].id) {
          var selectedProduct = products[i];
          var quantity = selectedProducts[j].quantity;
          var price_table_id = selectedProducts[j].price_table_id;
          selectedProduct['quantity'] = quantity;
          selectedProduct['price_table_id'] = price_table_id;

          totalPrice += parseFloat(selectedProduct['price']) * quantity;
          selectedProductsInfo.push(selectedProduct);
        }
      }
    }
    console.log(selectedProductsInfo);
    this.setState({ shoppingCart: selectedProductsInfo });
    this.setState({ totalPrice: totalPrice });

    return selectedProductsInfo;
  };

  setMoneyFormat = price => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    // => "R$100,000,000.00"
  };

  setShoppingCart = data => {
    console.log('Shopping Cart');
    console.log(data);
  };

  /* Add Item to the Shopping List */
  addCardCount = e => {
    var id = parseInt(e.target.id);

    var priceTableId = '';
    var selectedProductsTemp = this.state.selectedProducts;
    var productsTemp = this.state.products;

    /* Get Price_table_id from clicked element */
    for (var i = 0; i <= productsTemp.length - 1; i++) {
      if (productsTemp[i].id === id) {
        priceTableId = productsTemp[i].price_table_id;
      }
    }

    /* Get Element from Array State and Update the data in a temporary Variable */
    var checkExistingElement = 0;
    for (var i = 0; i <= this.state.selectedProducts.length - 1; i++) {
      if (selectedProductsTemp[i].id === id) {
        checkExistingElement += 1;
        var newProduct = {
          id: id,
          quantity: selectedProductsTemp[i].quantity + 1,
          price_table_id: selectedProductsTemp[i].price_table_id,
        };
        selectedProductsTemp.splice(i, 1, newProduct);
      }
    }
    /* If the Element does not exist inside SelectedProducts, just push it */
    if (checkExistingElement == 0) {
      var newProduct = {
        id: id,
        quantity: 1,
        price_table_id: priceTableId,
      };
      selectedProductsTemp.push(newProduct);
    }
    /* UpdateState */
    this.setState({ selectedProducts: selectedProductsTemp });
    this.setLocalStorage();
  };

  /* Add Item to the Shopping List and Update State */
  subtractCardCount = e => {
    var id = parseInt(e.target.id);

    var selectedProductsTemp = this.state.selectedProducts;
    /* Get Element from Array State and Update the data in a temporary Variable */
    for (var i = 0; i <= this.state.selectedProducts.length - 1; i++) {
      if (selectedProductsTemp[i].id === id) {
        var newProduct = {
          id: id,
          quantity: selectedProductsTemp[i].quantity - 1,
          price_table_id: selectedProductsTemp[i].price_table_id,
        };

        if (newProduct.quantity == 0) {
          selectedProductsTemp.splice(i, 1);
        } else {
          selectedProductsTemp.splice(i, 1, newProduct);
        }
      }
    }

    /* UpdateState */
    this.setState({ selectedProducts: selectedProductsTemp });
    this.setLocalStorage();
  };

  /* Submit Data to the API */
  requestAPI = e => {
    //name, lastname, email, password, city, state, zipcode, address, number, neighbourhood, complement, phone1, phone2, rg, cpf
    e.preventDefault();
    const name = e.target.elements.name.value;
    const lastname = e.target.elements.lastname.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const city = e.target.elements.city.value;
    const state = e.target.elements.state.value;
    const zipcode = e.target.elements.zipcode.value;
    const address = e.target.elements.address.value;
    const number = e.target.elements.number.value;
    const neighbourhood = e.target.elements.neighbourhood.value;
    const complement = e.target.elements.complement.value;
    const phone1 = e.target.elements.phone1.value;
    const phone2 = e.target.elements.phone2.value;
    const rg = e.target.elements.rg.value;
    const cpf = e.target.elements.cpf.value;

    axios.get(`http://localhost:3000/api/v1/clients`).then(res => {
      console.log('here');
      console.log(res);
    });
  };

  /* Sign In Client and Register new Token */
  signIn = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const authentication_token = '';
    const status = '';
    console.log(password);

    axios
      .post(`http://localhost:3000/api/v1/sessions`, { email, password })
      .then(res => {
        if (res['status'] === 201) {
          const token = res.data['authentication_token'];
          this.setState({ authentication_token: token });

          console.log(res['status']);
          this.setState({ signInMessage: 'Você está logado.' });
          this.setState({ email: email });
          this.setState({ clientId: res.data['id'] });
          this.setState({ loggedIn: true});

          localStorage.setItem('token', token);
          localStorage.setItem('email', email);

          console.log('Client ID');
          console.log(this.state.clientId);

           
         

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

  /*Check User Authorization */
  auth = () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    
  }


  showComponent = (value) => {
    this.setState({showComponent: value});
  }

  render() {
    return (
      <div>
        <HashRouter>
          <div className="header">
            <div className="left-margin" />
            <NavBar
              authentication_token={this.state.authentication_token}
              email={this.state.email}
              shoppingCartCount={this.state.shoppingCartCount}
              getSelectedProductsInfo={this.getSelectedProductsInfo}
            />
            <div className="row content">
              <div className="col-md-3">{this.state.showComponent ? <SideBar /> : null}</div>
              <div className="col-md-6">
                
                <Route exact path="/" component={Option} />
                <Route
                  exact
                  path="/Personalizado"
                  render={props => (
                    <Custom
                      addCardCount={this.addCardCount}
                      setMoneyFormat={this.setMoneyFormat}
                      subtractCardCount={this.subtractCardCount}
                      selectedProducts={this.state.selectedProducts}
                      products={this.state.products}
                      onRef={ref => (this.custom = ref)}
                      setShoppingCart={this.setShoppingCart}
                      showComponent={this.showComponent}
                    />
                  )}
                />
                <Route
                  exact
                  path="/Kits"
                  render={props => (
                    <Kits
                      setMoneyFormat={this.setMoneyFormat}
                      kits={this.state.kits}
                      showComponent={this.showComponent}
                    />
                  )}
                />
                <Route
                  path="/login"
                  render={props => (
                    <Login signIn={this.signIn} signInMessage={this.state.signInMessage} loggedIn={this.state.loggedIn} />
                  )}
                />
                <Route
                  path="/cadastro"
                  render={props => (
                    <Registration requestAPI={this.requestAPI} component={Registration} />
                  )}
                />
                <Route
                  path="/finalizar1"
                  render={props => (
                    <Checkout1
                      getSelectedProductsInfo={this.getSelectedProductsInfo}
                      shoppingCart={this.state.shoppingCart}
                      shoppingCartCount={this.state.shoppingCartCount}
                      totalPrice={this.state.totalPrice}
                      setMoneyFormat={this.setMoneyFormat}
                      clientId={this.state.clientId}
                    />
                  )}
                />
              </div>
            </div>
            <Footer />
          </div>
        </HashRouter>

        {this.state.shoppingCartCount > 0 && (
          <ShoppingCart
            shoppingCart={this.state.shoppingCart}
            totalPrice={this.state.totalPrice}
            setMoneyFormat={this.setMoneyFormat}
          />
        )}
      </div>
    );
  }
}
export default DefaultPage;
