import React, { Component } from 'react';
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
      orders_empty: false,
      error:false,
      orders:[],
    }
  }

  componentDidMount () {
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
    this.getOrders();
  }

  getOrders = () => {
      request({
        method: 'get',
        url: '/api/v1/orders/1.json',
        params: {
          client_email: this.state.client_email,
          client_token: this.state.client_token,
        }
      }).then(res => {
        this.props.turnOffLoading();
        if(res.length === 0) {
          this.setState({orders_empty: true});
        } else {
          this.setState({orders_empty: false});
          this.setState({orders: res});
        }
      }).catch(error =>{
        this.props.turnOffLoading();
        this.props.turnOnError(" Desculpe, tivemos um problema no Servidor.");
      });
      
  }

  

  renderPayment = (order_status) => {
    let payment = ""
    let received = ""
    const order_number = order_status.id
    if(order_status.paid === false) {
      payment = "Pendente"
    } else {
      payment = "Sim"
    }
    if(order_status.received === false) {
      received = "A caminho"
    } else {
      received = "Sim"
    }
    return(
    <tr>
      <th scope="row">{ order_number }</th>
      <td>{ received }</td>
      <td>{ payment }</td>
    </tr>
    );
  }

  renderKits = (kits_orders) => {
    let order_dom = [];
    if(kits_orders.length > 0) {
       kits_orders.map((kit, index) => (
    order_dom.push(
        <tr>
          <th scope="row">{ index+1 }</th>
          <td>{kit.name}</td>
          <td></td>
          <td>{kit.price}</td>
        </tr>
        )
      ));
      return order_dom;  
    }
  }

  renderItens = (orders_products) => {
    let order_dom = [];
    if(orders_products.length > 0) {
        orders_products.map((product, index) => (
    order_dom.push(
        <tr>
          <th scope="row">{ index+1 }</th>
          <td>{product.name}</td>
          <td>{product.kind}</td>
          <td>{product.price}</td>
        </tr>
        )
      ));

      return order_dom;
    }
  }

  renderOrders = () => {
    console.log(" render orders");
    console.log(this.state.orders_empty);
    if(this.state.orders_empty===false) {

      return (
        <div>
            <div id="accordion" className="accordion p-0">
            {this.state.orders.map((order, index) => (
              <div className="card">
                <div className="" id={"heading" + index}>
                    <div className="row">
                        <div className="col"><button className="btn btn-info nav-link collapsed" data-toggle="collapse" data-target={"#collapse" + index} aria-expanded="false" aria-controls={"collapse" + index}>{ order.created_at }</button></div>
                        <div className="col my-auto">{ 'Pedido nº ' + order.order_status.id}</div>
                        
                    </div>
                </div>

                <div id={"collapse" + index} className="collapse" aria-labelledby={"heading" + index} data-parent="#accordion">
                  <div className="card-body p-0">

                      <table className="table table-hover">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col"></th>
                            <th scope="col">Recebido</th>
                            <th scope="col">Pago</th>
                          </tr>
                        </thead>
                        <tbody>
                        { this.renderPayment(order.order_status)}
                        </tbody>
                      </table>

                      <table className="table table-hover">
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Itens</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          { this.renderItens(order.orders_products) }
                          { this.renderKits(order.kits_orders) }
                        </tbody>
                      </table>
                  </div>
                </div>
              </div>
            ))}
            </div>
        </div>
      );

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
