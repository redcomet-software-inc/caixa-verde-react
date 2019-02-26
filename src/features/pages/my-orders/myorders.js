import React, { Component } from 'react';
import LoaderHOC from '../../../HOC/loader-hoc';
import { Route } from 'react-router-dom';
import List from './myorders-index.js';
import Show from './myorders-show.js';


class MyOrders extends Component {

  constructor (props) {
    super(props);
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    this.state = {
      client_email: email || '',
      client_token: token || '',
      error:false,
      
    }
  }

  componentDidMount () {
    console.log("MOIUNTER");
    console.log(this.props);
  }

  handleBack = (e) => {
    e.preventDefault();
    console.log("Back");
    console.log(this.props);
    console.log(this.props.history);
  }
  
  render() {
    return (
      <div className="pages-my-orders">
        <h2 className="text-center title">Meus Pedidos</h2>
        <React.Fragment>

            <Route exact path={`${this.props.match.path}/:orderId`}
                    render={props => (
                      <Show
                      {...this.props}
                      {...props}
                      />
                    )}/>
            <Route exact path={`${this.props.match.path}`}
                    render={props => (
                      <List
                      {...this.props}
                      {...props}
                      />
                    )}/>
           
          </React.Fragment>
      </div>
    );
  }
}

export default LoaderHOC(MyOrders);