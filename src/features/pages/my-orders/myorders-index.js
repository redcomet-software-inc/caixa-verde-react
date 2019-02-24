import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Index extends Component {

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
        <React.Fragment>
          <div className="w-50 text-center mx-auto">
            <div className={"mb-2"}>
              <div className="mb-3 pb-2">
                  <div class="d-inline-block">

                  </div>

                  {this.props.orders && this.props.orders.map((order, index) => (
                    <div className="card card-custom mb-2">
                      <div className="" id={"heading" + index}>
                          <div className="row order-style">
                              <div className="col"><div className="nav-link collapsed" data-toggle="collapse" data-target={"#collapse" + index} aria-expanded="false" aria-controls={"collapse" + index}>{ order.created_at }</div></div>
                              <div className="col my-auto"><NavLink className="custom-link" to={"pedidos/" + order.id}>{ 'Pedido #' + order.order_status.id}</NavLink></div>   
                          </div>
                      </div>
                    </div>
                  ))}

              </div>
            </div>
          </div>
        </React.Fragment>
        );
    }
}