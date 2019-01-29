import React, { Component } from 'react';
import * as actions from '../features/home/redux/actions.js';
import { bindActionCreators, compose } from 'redux';
import { getAuth } from '../common/getAuth.js';
import { connect } from 'react-redux';

// This function takes a component...
const LoaderHOC = (WrappedComponent) => {
  // ...and returns another component...
  return class extends Component {

    redirect = () => {
      console.log("redirect");
      if(!this.props.permit) {
        console.log("redirected");
        console.log(this.props.permit);
        let url = "";
        if(this.props.redirectTo) {
          console.log("detectado");
          url=this.props.redirectTo;
        } else {
          url="/"
        }
        this.props.actions.redirect(url);
      }
    }

    componentDidMount() {
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
        this.props.actions.turnOffError();
        this.props.actions.turnOnLoading();
        getAuth().then(res => {

          res ? null : this.redirect();
          this.props.actions.turnOffLoading();

        }).catch(error => {
          this.props.actions.turnOffLoading();
          this.redirect();
        });

    }
    render() {
      return <WrappedComponent  {...this.props} />;
    }
  };
}

/* istanbul ignore next */
const mapStateToProps = (state, props) => {
  return {
    isLoading: state.isLoading,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

const composedFieldWrapper = compose(
  connect(mapStateToProps, mapDispatchToProps), LoaderHOC
);

export default composedFieldWrapper;



