import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import FooterLogo from '../../images/caixaverde-finalizacao-WHITE.png'


export class Footer extends Component {
  static propTypes = {
    footer: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="footer footer-footer font-small pt-4 mt-4">
        <div className="container container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6">
            <h5 className="title"></h5>
            <p>
              <img src={ FooterLogo } width={150} />
            </p>
            </div>
            <div className="col-md-6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center py-3">
          <div className="container-fluid">
            &copy; {new Date().getFullYear()} copyright {" "}
            <a href="https://www.MDBootstrap.com"> caixaverde 2018 </a>
          </div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    footer: state.footer,
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
)(Footer);
