import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import {threeDCube} from 'react-icons-kit/metrize/threeDCube';
import {
  NavLink,
  Link,
  Route,
  HashRouter
} from "react-router-dom";


export default class ShoppingCartButton extends Component {
  static propTypes = {

  };

  constructor (props) {
    super(props);
    this.state = {
      invisible:'hide-btn disabled'
    }
  }

  handleScroll = () => {
    if(window.scrollY > 250) {
      this.setState({ invisible: 'show-btn'});
    } else {
      this.setState({ invisible: 'hide-btn disabled'});
    }
    //return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll, { passive: true});
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }
  render() {
    return ( 
        <div className={"shopping-cart-button shadow " + this.state.invisible}>
          <href  className="" data-toggle="modal" data-target='#shoppingCartDialog' exact to="/" > 
            <Icon className="ico" icon={threeDCube} size={40} />
          </href>
        </div>
    );
  }
}
