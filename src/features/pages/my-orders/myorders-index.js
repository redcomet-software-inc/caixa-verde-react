import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getOrders } from '../../../common/get-orders.js';
import Success from '../common/success';
import Loading from '../../common/loading.js';

export default class Index extends Component {

    constructor(props){
      super(props);
      this.state = {
        orders:[],
      }
    }
    
    renderKits = ( orders_kits) => {
        let order_dom = [];
        if( orders_kits.length > 0) {
            orders_kits.map((kit, index) => (
            order_dom.push(
            <tr key={"kits" + kit + index}>
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

    renderItems = (orders_products) => {
        let order_dom = [];
        if(orders_products.length > 0) {
            orders_products.map((product, index) => (
            order_dom.push(
            <tr key={"items" + product + index}>
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

      componentDidMount () {
        console.log("myorders-index.js");
        console.log(this.props);
        this.getOrders();
      }

      getOrders = () => {
        getOrders().then(res=>{
          this.props.actions.turnOffLoading();
          if(res) {
            console.log("check here");
            console.log(res);
            this.setState({orders_empty: false});
            this.setState({orders: res});
          } else {
            return this.setState({orders_empty: true});
          }
        }).catch(error =>{
          this.props.actions.turnOffLoading();
          //this.props.actions.turnOnError();
        }); 
      }

    render() {
        return (
        <React.Fragment>

          {!this.state.orders && (
            <Success
            status={"info"}
            title={"Você ainda não realizou nenhum pedido."}
            body={<span>
                  Quando efetuar seu primeiro pedido poderá acompanhá-lo nesta página.
                  <br />
                  <NavLink to="/kits">Leve-me aos Kits</NavLink>
                  <br />
                  <NavLink to="/personalizado">Leve-me aos Itens Personalizados</NavLink>
               </span> }/>
          )}
          
          <div className="w-50 text-center mx-auto">
            <div className={"mb-2"}>
              <div className="mb-3 pb-2">
                  <div className="d-inline-block">
                    {!this.state.orders.length == undefined && (
                      <Loading />
                    )}
                  </div>

                  {this.state.orders && this.state.orders.map((order, index) => (
                    <NavLink className="custom-link" to={`${this.props.match.path}/${order.id}`}>
                    <div key={"pedidos-" + index} className="card card-custom mb-2">
                      <div className="" id={"heading" + index}>
                          <div className="row order-style">
                              <div className="col"><div className="nav-link collapsed" data-toggle="collapse" data-target={"#collapse" + index} aria-expanded="false" aria-controls={"collapse" + index}>{ order.created_at }</div></div>
                              <div className="col my-auto">{ 'Pedido #' + order.order_status.id}</div>   
                          </div>
                      </div>
                    </div>
                    </NavLink>
                  ))}

              </div>
            </div>
          </div>
        </React.Fragment>
        );
    }
}