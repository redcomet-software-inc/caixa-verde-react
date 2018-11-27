import React, { Component } from 'react';
import axios from 'axios';
import Loads from 'react-loads';

import appLogo from '../../images/caixaverde-finalizacao-weblogo.png'
import CheckoutPage from './CheckoutPage.js'; 

export default class Checkout extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    
    this.state = {
      clientId:0,
      clientName:'',
      clientLastname:'',
      clientEmail:'',
      clientAddress:'',
      clientComplement:'',
      clientZipCode:'',
      freight:'',
      neighbourhoodId:'',
      neighbourhoodName:'',
      email:email || '',
      token:token || '',
      mercadoPagoAccessToken:'',
      mercadoPagoShoppingCart:[],
    }
    
    this.redirect = this.redirect.bind(this);
    this.props.updateShoppingCart();
    this.mercadoPagoPay = this.mercadoPagoPay.bind(this);

    
  }
  
  checkOut = (e) => {    
    e.preventDefault();

    const token = this.state.token;
    const clientId =e.target.elements.clientId.value;
    const products = JSON.stringify(this.props.shoppingCartProducts);
    const kits = JSON.stringify(this.props.shoppingCartKits);
    const orderPrice = parseFloat(e.target.elements.orderPrice.value).toFixed(2);
    const name = e.target.elements.name.value;
    const lastname = e.target.elements.lastname.value;
    const email = e.target.elements.email.value;
    const address = e.target.elements.address.value;
    const addressId = e.target.elements.clientAddressId.value;

    const complement = e.target.elements.complement.value;
    const administrative_region = e.target.elements.administrative_region.value;
    const zipcode = e.target.elements.zipcode.value;

    const pyamentMethod = e.target.elements.paymentMethod.value;
    const cpf = e.target.elements.cpf.value;

    return(
    
      axios({ method: 'POST', url: 'http://localhost:3000/api/v1/orders.json"', headers: {  
          'X-Client-Email': email,
          'X-Client-Token': token,
         },
        data: { 
          client_id: clientId,
          price_table_id: '1',
          address_id: addressId,
          products_json: products,
          kits_json: kits,
          client_email: email,
          order_price: orderPrice,
          

         } }).then((res)=>{
           if(res.status===200) {
             this.mercadoPagoPay();
           }
         })

      
    );
  }
  

  getClientInformations = () =>  {
    /* Get Data from current user based on email and token */
    return(
      axios.get("http://localhost:3000/api/v1/clients/1.json", {
        params:{
          client_email: this.state.email,
          client_token: this.state.token,
        }
      }
      )
    )
  }

  

  /*Init payment Process with Mercado Pago */
  mercadoPagoPay = () => {

      const mercadoPagoAccessToken = this.state.mercadoPagoAccessToken;

      var apiRequest = {
        items:[],
        payer: {},
        payment_methods: {},
      };

      apiRequest.payment_methods = {
        excluded_payment_types: [{id:"ticket"}, {id:"atm" }]
      }

      apiRequest.payer = {
          name : 'Guilherme',
          surname : 'Nunes',
          email : 'guilhermewn@gmail.com',
          phone: {
            area_code:61,
            number:998698660,
          },
          address: {
            street_name: "Rua Yollanda Ferreira Penzo",
            street_number: 60,
            zip_code: '79826-175'
          }
        };


      var productsList = this.props.shoppingCartProducts;
      /* Mercado Pago Data Format */ 
      
      productsList.map(function(item) {
        apiRequest.items.push({
          "title" : item.name,
          "quantity" : item.quantity,
          "unit_price" : 12
        });
      })


      apiRequest = JSON.stringify(apiRequest);

      console.log("PRODUCTS");
      console.log(apiRequest);

      const url = 'https://api.mercadopago.com/checkout/preferences/?attributes=id,client_id,sandbox_init_point&access_token='+mercadoPagoAccessToken;
       
      var request = axios({ method: 'POST', url: url, headers: {  
          'Content-Type': 'application/json',
         },
         data:apiRequest
         } ).then((response)=>{
              if(response.status===201) {
                window.location = response.data['sandbox_init_point'];
                console.log( response.data);
              }
         }).catch(function (error) {
          // handle error
          console.log(error);
        });
  }

  /*Get Auth Token from Mercado Pago */
  mercadoPago = () => {
       axios({ method: 'POST', url: 'https://api.mercadopago.com/oauth/token', headers: {  
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json',
         },
        data: { 
          grant_type:'client_credentials',
          client_id: '2818049652001946',
          client_secret: 'HtIm5hoTD2cMwRPTr2Nv2dEaGkhPZ1YL',

         } }).then((response)=>{
              if(response.status===200) {
                this.setState({mercadoPagoAccessToken: response.data['access_token']});
                console.log(response.data['access_token']);
              }

         })

 

  }

  convertShoppingCartToMercadoPago = () => {
    console.log("Converting JSON SHOPPING CART TO MERCADO PAGO");
    console.log(this.props.addressIdshoppingCart);
    return null;
  }


  componentDidMount () {
    this.props.updateShoppingCart();
    this.mercadoPago();
    
    console.log("COMPONENT MOUNTED TEST");
    console.log(this.props);
  }

  redirect () {
    
    return this.props.redirect('login');
  }



 
  renderQuantity = (quantity) => {
    if(quantity>1) {
      return "("+quantity+")";
    }
  }

  render() {
    return (
      <div className="pages-checkout">
       <Loads loadOnMount={true} delay={3000} load={this.getClientInformations} >
          {({ isIdle, isLoading, isSuccess, isError, load, response, error }) => (
            <div>
              {isIdle && <button onClick={load}>Load </button>}
              {isLoading && <div><img src={appLogo} /></div>}
              {isSuccess && <CheckoutPage
                      shoppingCartProducts={this.props.shoppingCartProducts}
                      shoppingCartKits={this.props.shoppingCartKits}
                      shoppingCartCount={this.props.shoppingCartCount}
                      totalPrice={this.props.totalPrice}
                      setMoneyFormat={this.props.setMoneyFormat}
                      clientId={response.data.id}
                      clientName={response.data.name}
                      clientLastname={response.data.lastname}
                      clientEmail={response.data.email}
                      clientAddress={response.data.address['street']}
                      clientAddressId={response.data.address['id']}
                      clientComplement={response.data.address['complement']}
                      clientZipcode={response.data.address['zipcode']}
                      freight={response.data.freight}
                      neighbourhoodId={response.data.neighbourhood['id']}
                      neighbourhoodName={response.data.neighbourhood['name']}
                      checkOut = {this.checkOut}
                      renderQuantity={this.renderQuantity} /> }
              {isError && <renderError /> }
              
            </div>
          )}
        </Loads>
      </div>
    );
  }
}


const renderError =() => {

  return (<p>Erro</p>);

}


