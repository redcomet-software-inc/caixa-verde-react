import React, { Component } from 'react';
import axios from 'axios';

export default class Orders extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    this.state = {
      email: email,
      token: token,
      orders: [],
    }
  }

  getOrders = () => {
     axios.get('http://localhost:3000/api/v1/orders.json', {
      params: {
        client_email: this.state.email,
        client_token: this.state.token,
      },
    }).then(res => {
       if (res['status'] === 200) {
          this.setState({orders: res.data});
       } else {
          throw new Error('Error');
       }
    });
  }

  componentDidMount(){
    this.getOrders();
  }

  render() {
    return (
      <div className="pages-orders">
        <h2 className="text-center title">Histórico</h2>
        <div className="content" >
          <table class="table table-borderless text-center mx-auto">
            <thead>
              <tr>
                <th>Data</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              { this.state.orders.map((item, index) => (
              <tr>
                <td>{item.created_at}</td>
                <td>{item.order_price}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
