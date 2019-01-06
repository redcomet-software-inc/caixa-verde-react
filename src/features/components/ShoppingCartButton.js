import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import {threeDCube} from 'react-icons-kit/metrize/threeDCube';
import {
  NavLink,
  Link,
  Route,
  HashRouter
} from "react-router-dom";
import * as actions from './redux/actions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import request from '../../common/configApi.js';
import Loading from '../common/Loading.js';


export class ShoppingCartButton extends Component {
  static propTypes = {

  };

  constructor (props) {
    super(props);
    this.state = {
      invisible:'show-btn'
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
    //document.addEventListener('scroll', this.handleScroll, { passive: true});
  }

  componentWillUnmount() {
    //document.removeEventListener('scroll', this.handleScroll);
  }

  handleClick = () => {
      
  }
  render() {

   

    return (
      <NavLink  className="" data-toggle="modal" data-target='#shoppingCartDialog' exact to="/" >
        <div onClick={this.handleClick} className={"shopping-cart-button shadow " + this.state.invisible}>
           
            <Icon className="ico" icon={threeDCube} size={40} />
          
        </div>
      </NavLink>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    components: state.components,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCartButton);