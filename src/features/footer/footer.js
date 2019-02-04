import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import FooterLogo from '../../images/caixaverde-finalizacao-symbol.png';
import fbIcon from '../../images/fb_icon.png';
import instaIcon from '../../images/insta_icon.png';
import {
  NavLink
} from "react-router-dom";

export class Footer extends Component {
  static propTypes = {
    footer: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  rollTop = () => {
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
  }

  render() {
    return (
      <div className="footer-style font-small pt-5 mt-0 pl-2">
        <div className="text-center text-md-left">
          <div className="row">
            <div className="col-lg-4 mx-auto my-auto">
            
            <p className="m-3 pl-lg-5 mx-auto my-auto text-center">
              <NavLink exact onClick={this.rollTop} to="/">
                <img alt={"Logo Caixa Verde"} src={ FooterLogo } width={150} />
              </NavLink>
            </p>
            </div>
            <div className="col-lg-4 mx-auto text-center">
              <ul className="list-group pl-3 pr-2 pb-5">
                <li className="list-group-item p-3"><NavLink className="nav-link" strict to="/personalizado">Produtos</NavLink></li>
                <li className="list-group-item p-3"><NavLink className="nav-link" strict to="/kits">Kits</NavLink></li>
                <li className="list-group-item p-3"><NavLink className="nav-link" strict to="/quemsomos">Quem Somos</NavLink></li>
                <li className="list-group-item p-3"><NavLink className="nav-link" strict to="/ajuda">Ajuda</NavLink></li>
                <li className="list-group-item p-3"><NavLink className="nav-link" strict to="/contato">Contato</NavLink></li>
                
            </ul>
            </div>
            <div className="col-lg-4 my-auto text-center">
              <span className="p-2">Siga-nos nas Redes Sociais</span><br/>
              <a href="https://www.facebook.com/caixaverdebrasil/"><img alt={"Link para Facebook"} src={fbIcon} width={50} /></a>
              <a href="https://www.instagram.com/caixaverdebrasil"><img alt={"Link para Instagram"}  src={instaIcon} width={50} /></a>

              <div className="p-5">
                  &copy; {new Date().getFullYear()} copyright {" "}
                  caixaverde 2018
              </div>
              <div>
                <ul className="list-group">
                  <li className="nav-link pb-0"><NavLink to="/servico">Termos de Serviço</NavLink></li>
                  <li className="nav-link "><NavLink to="/servico">Política de Privacidade</NavLink></li>
                </ul>
              </div>

            </div>
            
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
