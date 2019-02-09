import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class Index extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount () {
        console.log("Index Mounted");
    }

    renderKits = ( orders_kits) => {
        let order_dom = [];
        if( orders_kits.length > 0) {
            orders_kits.map((kit, index) => (
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

    renderPayment = (order_status) => {

        let payment = ""
        let received = ""
        console.log("Código de Pagamento");
        console.log(order_status.pagseguro_code)
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

    render() {
        return (
        <div>
            <div id="accordion" className="accordion p-0">
            {this.props.orders.map((order, index) => (
                <div className="card">
                <div className="" id={"heading" + index}>
                    <div className="row">
                        <div className="col"><button className="btn btn-info nav-link collapsed" data-toggle="collapse" data-target={"#collapse" + index} aria-expanded="false" aria-controls={"collapse" + index}>{ order.created_at }</button></div>
                        <div className="col my-auto"><NavLink to={"pedidos/" + order.id}>{ 'Pedido nº ' + order.order_status.id}</NavLink></div>
                        <div className="col my-auto"><button className="btn btn-info nav-link collapsed" >Pagar</button></div>    
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
                            { this.renderKits(order.orders_kits) }
                        </tbody>
                        </table>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        );
    }
}