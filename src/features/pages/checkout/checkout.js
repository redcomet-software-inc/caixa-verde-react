import React, { Component } from 'react';
import { setOrder } from '../../../common/set-order.js';
import LoaderHOC from '../../../HOC/loader-hoc';
import Loading from '../../common/loading.js';
import { PersonalDataClient, PersonalAddressDelivery, PersonalAddressBilling } from '../../pages/my-account/personal-data.js';
import YourBox from './yourbox';
import Success from '../common/success';
import { NavLink } from 'react-router-dom';

class Checkout extends Component {
  
  constructor(props) {
    super(props);
    
    let products = this.props.products;
    let kits = this.props.kits;
    let order_price = this.props.order_price;
    
    this.state = {
      checkout_order_id:0,
      order_price: order_price || 0,
      client_id: 0,
      products: products || [],
      kits: kits || [],
      submitLoading: false,
      client_data:[],
      error_min_quantity:false,
      warning_title: "Antes de continuar!",
      warning_message: "Para finalizar a compra é necessário ter um valor mínimo de " + this.props.home.min_quantity + " reais.",
      warning_body: (<span>
                        Adicione mais alguns produtos <NavLink to="personalizado">nesta página</NavLink>.
                    </span>)
    };
  }

  componentDidMount () {
    if(parseFloat(this.props.home.min_quantity) > parseFloat(this.props.order_price)) {
      this.setState({error_min_quantity: true});
      return;
    }
  }

  /*Get all the new Data and decide what to submit to the server*/
  checkOut = e => {
    e.preventDefault();

    console.log("Check Props");
    console.log(this.props.home.min_quantity);
    /* Check if the min Price is Enough to Continue */
    if(parseFloat(this.props.home.min_quantity) > parseFloat(this.props.order_price)) {
      this.setState({error_min_quantity: true});
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    /* Avoid Multiple Submits */
    if(this.state.submitLoading === true) {
      return false;
    }
    this.setState({submitLoading: true});
    /* Data structure to Create Order */
    const products = this.props.products;
    const order_price = this.props.order_price;

    var data = {
      order: {
          order_price: order_price,
          orders_kits_attributes:[],
          orders_products_attributes: products,
        },
    }

    setOrder(data).then(res => {
      this.setState({checkout_order_id: res.order.id});
      localStorage.setItem("checkout_order_id", res.order.id);
      this.props.setCheckoutOrderId(res.order.id);
      /* Good bye Cart */
      this.props.actions.clearBox();
      
      return;
      this.props.resetItems();
      this.props.actions.redirect('pagamento');
      this.getPermission();
    }).catch(error => {
      console.log(error);
      //throw new Error("Impossible to Create Order: ");
      
    });
  }

  change = (e) => {
    this.setState({adm_region_id: e.currentTarget});
  }

  renderLoading = () => {
    if(this.state.submitLoading) {
      return <Loading />
    }
  }


  render() {
    return (
      <div className="pages-checkout pb-5 mb-5">
          {this.state.error_min_quantity && (
            <Success status={"warning"} 
            title={this.state.warning_title}
            message={this.state.warning_message} 
            body={this.state.warning_body}
            />
          )}
          
          <h2 className="mb-3 title">Checkout</h2>
          <p className="text-muted">Confira seus dados e sua caixa</p>
          <hr className="mb-4 mt-4" />  
          <div className="row">
            <YourBox {...this.props} />
            <div className="col-md-8 order-md-1">
      
              <PersonalDataClient {...this.props} noborder /> 
              <PersonalAddressDelivery {...this.props} /> 
              <PersonalAddressBilling {...this.props} /> 

              <form onSubmit={e => this.checkOut(e)} className="needs-validation mt-3">
                <input
                  id="order_price"
                  name="order_price"
                  type="hidden"
                  value={this.state.order_price }
                />
                <div class="text-center mx-auto w-100">
                  <div class="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" disabled={this.props.disable} >Continuar Compra</button></div>
                  <div class="d-inline p-1 text-white position-absolute">{this.renderLoading()}</div>
                </div>  
              </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoaderHOC(Checkout); 