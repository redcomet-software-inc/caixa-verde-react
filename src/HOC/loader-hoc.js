import React, { Component } from 'react';
import * as actions from '../features/home/redux/actions.js';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { getAuth } from '../common/get-auth.js';

// What pages are public (all the other one gonna be redirected if not logged In)
const no_private_paths = [
  "/login", 
  "/cadastro",
  "/kits", 
  "/personalizado",
  "/minhacaixa"
];
// This function takes a component...
const LoaderHOC = (WrappedComponent) => {

  // ...and returns another component...
  return class extends Component {

    constructor(props) {
      super(props);
      this.path = props.location.pathname;
      this.authorization = this.authorization.bind(this);
      this.state = {
        rehydrated_once: true,
      }
    }

    /* Redirect if Client is not Logged In */
    security_redirect() {
      const path = this.path; // Declared on contructor
      if(path === "/checkout") {
        this.props.actions.redirect('/login');
        return;
      }
      if(!no_private_paths.includes(path)) {
        this.props.actions.redirect('/');
        return;
      }
    }

    authorization () {
      this.props.actions.getClientData().then(res => {
        if (!res) {
          this.security_redirect();
        }
      }).catch(error => {
          console.log("Promise Rejected");
          console.log(error);
          this.security_redirect();
      });
    }

    // Check User Data after Rehydrated
    componentDidUpdate (prevProps) {
      if(prevProps !== this.props) {
        if(this.props._persist && this.props._persist.rehydrated && this.state.rehydrated_once) {
          this.setState({rehydrated_once: false});
          this.authorization();
          return
        }
      }
    }
    
    componentDidMount() {
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
      this.props.actions.turnOffError();
      this.props.actions.turnOffLoading();
    }

    render() {
      return <WrappedComponent location={this.props.location} {...this.props}  />;
    }
  };
}

// Conect to Redux Storage
const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

const composedFieldWrapper = compose(
  connect(mapStateToProps, mapDispatchToProps), LoaderHOC
);

export default composedFieldWrapper;



