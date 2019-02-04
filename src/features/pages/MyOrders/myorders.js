import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoaderHOC from '../../../HOC/LoaderHOC.js';
import { getOrders } from '../../../common/get-orders.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import List from './myorders-index.js';
import Show from './myorders-show.js';

class MyOrders extends Component {
  static propTypes = {
    pages: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequfired,
  };

  constructor (props) {
    super(props);
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    this.state = {
      client_email: email || '',
      client_token: token || '',
      orders_empty: true,
      error:false,
      orders:[],
    }
  }

  componentDidMount () {
    this.getOrders();
  }

  getOrders = () => {
    getOrders().then(res=>{
      this.props.actions.turnOffLoading();
      if(res) {
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

  handleBack = (e) => {
    e.preventDefault();
    console.log("Back");
    console.log(this.props);
    console.log(this.props.history);
  } 

  renderOrders = () => {
    if(this.state.orders_empty===false) {
      const { match } = this.props
      return(
         <Router>
           <Switch>
              
              <Route exact path={"/pedidos/:orderId"}
                      render={props => (
                        <Show 
                        location={window.location}
                        {...props}
                        />
                      )}/>            
               
              <List orders={this.state.orders}>
               <Route component={List} />
              </List> 
               
            
          </Switch>
         </Router>  
        
      

      
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

export default LoaderHOC(MyOrders);