import React, { Component } from 'react';
import * as actions from '../features/home/redux/actions.js';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

// This function takes a component...
const LoaderHOC = (WrappedComponent) => {
  // ...and returns another component...
  return class extends Component {
    componentDidMount() {
        this.props.actions.turnOffError();
        this.props.actions.turnOnLoading();
    }
    render() {
      return <WrappedComponent  {...this.props} />;
    }
  };
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
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



