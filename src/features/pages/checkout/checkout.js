import React, { Component } from 'react';
import { setOrder } from '../../../common/set-order.js';
import LoaderHOC from '../../../HOC/loader-hoc';
import Loading from '../../common/loading.js';
import { PersonalDataClient, PersonalAddressDelivery, PersonalAddressBilling } from '../../pages/my-account/personal-data.js';
import YourBox from './yourbox';
import Success from '../common/success';
import { setCheckoutOrderId } from '../../home/set-checkout-order-id.js';
import { NavLink } from 'react-router-dom';
import { getFreight } from '../../../common/get-extra-charges.js';

class Checkout extends Component {
  
  constructor(props) {
    super(props);
    let products = this.props.products;
    let kits = this.props.kits;
    this.state = {
      rehydrated_once: true,
      checkout_order_id:0,
      order_price:0,
      freight:5,
      total_price: 0,
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

  componentDidUpdate(prevState, prevProps) {
    if(prevProps !== this.props) {
      if(this.props._persist.rehydrated && this.state.rehydrated_once) {
          if(this.state.order_price === 0) {
            this.setState({rehydrated_once: false});
            this.props.actions.getOrderPrice();
            const order_price =  this.props.home.order_price;
            if(order_price === 0) {
              return;
            }
            this.setState({order_price});
            getFreight().then(res => {
              if(this.state.freight === 5) {
                this.setState({freight: res.freight});
              }
              if(this.state.total_price === 0) {
                const total_price = res.freight + this.state.order_price;
                this.setState({total_price});
              }
            }).catch(error => {
              console.log(error);
            });   
          }
      }
      if(parseFloat(this.props.home.min_quantity) > parseFloat(this.props.order_price)) {
        console.log("min quant:" + parseFloat(this.props.home.min_quantity));
        console.log("order price:" +  parseFloat(this.props.order_price));

        if(this.state.error_min_quantity === false) {
          this.setState({error_min_quantity: true});
        }
        return;
      }
    }
  }

  componentDidMount () {
    console.log("order price request");
    console.log(this.props);
  }

  /*Get all the new Data and decide what to submit to the server*/
  checkOut = e => {
    e.preventDefault();
    /* Check if the min Price is Enough to Continue */
    if(parseFloat(this.props.home.min_quantity) > parseFloat(this.props.home.order_price)) {
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
    const products = this.props.home.products;
    const order_price = this.props.home.order_price;

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
      setCheckoutOrderId(res.order.id);
      /* Good bye Cart */
      this.props.actions.clearBox();
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
            <Success 
            notitle
            status={"danger"} 
            title={this.state.warning_title}
            message={this.state.warning_message} 
            body={this.state.warning_body}
            />
          )}
          
          <h2 className="mb-3 title">Checkout</h2>
          <p className="text-muted">Confira seus dados e sua caixa</p>
          <hr className="mb-4 mt-4" />  
          <div className="row">
            <YourBox products={this.props.home.products} kits={this.props.home.kits} order_price={this.state.order_price} total_price={this.state.total_price} freight={this.state.freight} />
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
                <div className="text-center mx-auto w-100">
                  <div className="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" disabled={this.props.disable} >Continuar Compra</button></div>
                  <div className="d-inline p-1 text-white position-absolute">{this.renderLoading()}</div>
                </div>  
              </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoaderHOC(Checkout); 