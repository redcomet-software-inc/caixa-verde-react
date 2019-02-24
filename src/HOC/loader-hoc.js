import React, { Component } from 'react';
import * as actions from '../features/home/redux/actions.js';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { getAuth } from '../common/get-auth.js';

// This function takes a component...
const LoaderHOC = (WrappedComponent) => {
  // ...and returns another component...
  return class extends Component {

    constructor(props) {
      super(props);
      this.state = {
        client_data:[],
      }
    }

    redirect = () => {
      if(!this.props.permit) {
        let url = "";
        if(this.props.redirectTo) {
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
          this.props.actions.turnOffLoading();
          if (!res) {
            this.redirect();
          } 

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
    home: state.home,
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



