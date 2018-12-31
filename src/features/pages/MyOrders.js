import React, { Component } from 'react';
import userImage from '../../images/userImage.jpg';
import Loading from '../common/Loading.js';
import request from '../../common/configApi.js';

export default class MyOrders extends Component {
  static propTypes = {
  
  };

  constructor (props) {
    super(props);
    this.props.turnOnLoading();
    this.props.turnOffError();
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    this.state = {
      client_email: email || '',
      client_token: token || '',
      orders_empty: true,
      error:false,
      orders:{},
      order_price: '',
      order_status_id: '',
      order_status_order_id: '', 
      order_status_paid: '', 
      order_status_paid_at: '',
      order_status_delivered: '', 
      order_status_delivered_at: '',
      order_status_canceled: '',
      order_status_mercadopago_id: '',
      order_status_paypal_id: '',
      order_status_created_at: '',
      order_status_updated_at: ''
      order_address.id: '',
      order_address.number: '',
      order_address.street: '',
      order_address.complement: '',
      order_address.adm_region_id: '',
      order_address.client_id: '',
      order_address.created_at: '',
      order_address.updated_at: '',
      order_address.zipcode: '',
      order_address.neighbourhood: '',
      order_address.order_id: '',
      order_address.kind: '',
      order_address.city: '',
      order_address.state: '',
    }
  }

  getOrders = () => {
      request({
        method: 'get',
        url: '/api/v1/orders/1.json',
        params: {
          client_email: this.state.client_email,
          client_token: this.state.client_token,
          orders:[]
        }
      }).then(res => {
        console.log("RESPONSE");
        console.log(res);
        
        if(res.length === 0) {
          
        } else {

            this.setState({order_price: res[0].order_price});

              /* Order_status */
              this.setState({order_status_id: res[0].order_status.id});});
              this.setState({order_status_order_id: res[0].order_status.order_id
              this.setState({order_status_paid: res[0].order_status.paid});
              this.setState({order_status_paid_at: res[0].order_status.paid_at});
              this.setState({order_status_delivered: res[0].order_status.delivered});
              this.setState({order_status_delivered_at: res[0].order_status.delivered_at});
              this.setState({order_status_canceled: res[0].order_status.canceled});
              this.setState({order_status_mercadopago_id: res[0].order_status.mercadopago_id});
              this.setState({order_status_paypal_id: res[0].order_status.paypal_id});
              this.setState({order_status_created_at: res[0].order_status.created_at});
              this.setState({order_status_updated_at: res[0].order_status.updated_at});
              /* Order Address */
              this.setState({order_address_id: res[0].order_address.id});
              this.setState({order_address_number: res[0].order_address.number});
              this.setState({order_address_street: res[0].order_address.street});
              this.setState({order_address_complement: res[0].order_address.complement});
              this.setState({order_address_adm_region_id: res[0].order_address.adm_region_id});
              this.setState({order_address_client_id: res[0].order_address.client_id});
              this.setState({order_address_created_at: res[0].order_address.created_at});
              this.setState({order_address_updated_at: res[0].order_address.updated_at});
              this.setState({order_address_zipcode:res[0].order_address.zipcode});
              this.setState({order_address_neighbourhood:res[0].order_address.neighbourhood});
              this.setState({order_address_order_id:res[0].order_address.order_id});
              this.setState({order_address_kind:res[0].order_address.kind});
              this.setState({order_address_city:res[0].order_address.city});
              this.setState({order_address_state:res[0].order_address.state});
        }
        console.log(res);
        this.props.turnOffLoading();
        this.props.turnOffError();
      }).catch(error => {
        console.log("ERROR");
        this.setState({ error: true});
        this.props.turnOffLoading();
        this.props.turnOnError(" Desculpe, tivemos um problema no Servidor.");
      });
  }

  componentDidMount () {
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
    this.getOrders();
  }


  renderOrders = () => {
    if(this.state.orders_empty===false) {
      /*
      return (
        <div>{this.state.orders.map((order, index) => ( 
            <div>{ order }</div>
        ))}</div>
      );
        */
    } else {
      return (
        <div className="row mx-auto">
          <div className="col-lg-6 col-md-8 mx-auto">
            <span className="tab">Por enquanto você ainda não possui nenhum pedido.
            Quando fizer o seu pedido você poderá acompanhá-lo nesta página.</span>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="pages-my-orders">
        <h2 className="text-center title">Meus Pedidos</h2>

        { this.renderOrders() }
        
      </div>
    );
  }
}
