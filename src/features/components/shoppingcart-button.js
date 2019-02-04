import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import {threeDCube} from 'react-icons-kit/metrize/threeDCube';
import * as actions from './redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


export class ShoppingCartButton extends Component {
  constructor (props) {
    super(props);
    let count = this.props.count;
    let show = '';
    if (count>0) {
      show = 'hide-btn disabled';
    }
    show = 'show-btn'
    this.state = {
      invisible: show,
    }
  }

  /* Hide Shopping Cart Button if Count equal 0 */
  componentDidUpdate(prevProps){
    if(prevProps.count !== this.props.count) {
      if(this.props.count) {
        this.setState({ invisible: 'show-btn'});
      } else {
        this.setState({ invisible: 'hide-btn disabled'});
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div type="button" className="" data-toggle="modal" data-target='#shoppingCartDialog'>
          <div className={"shopping-cart-button shadow " + this.state.invisible}>
              <Icon className="ico" icon={threeDCube} size={40} />
          </div>
        </div>
      </React.Fragment>
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