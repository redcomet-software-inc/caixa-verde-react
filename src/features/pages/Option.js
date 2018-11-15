import React, { Component } from 'react';
import {
  NavLink
} from "react-router-dom";

export default class Option extends Component {
  static propTypes = {

  };

  constructor (){
    super();
    this.state = {
      colorOption1: '#08bdbd',
      colorOption2: '#abff4f',
    };
  }

  reset() {
    this.setState({colorOption1: '#08bdbd', colorOption2: '#abff4f'});
  }

  changeColorOption1 () {
    this.setState({colorOption1:'#106d09'});
  }

  changeColorOption2 () {
    this.setState({colorOption2:'#106d09'});
  }

  render() {
    return (
      <div className="pages-option">

        <h2 className="text-center title">Como você prefere comprar?</h2>

        <div className="card-deck">
        
          <NavLink className="mx-auto" to="/kits">
            <div className="card text-white mb-1 option mx-auto" onMouseOver={this.changeColorOption1.bind(this)} onMouseOut={this.reset.bind(this)}  style={{ background: this.state.colorOption1 }}>
              <div className="card-header"></div>
              <div className="card-body">
                <h5 className="card-title text-center">Kits</h5>
                <p className="card-text"></p>
              </div>
              <div className="card-footer text-center">10% de desconto</div>
            </div>
          </NavLink>

          <NavLink className="mx-auto" to="/personalizado">
            <div className="card text-white mb-1 option" onMouseOver={this.changeColorOption2.bind(this)} onMouseOut={this.reset.bind(this)}  style={{ background: this.state.colorOption2 }}>
              <div className="card-header"></div>
                <div className="card-body">
                  <h5 className="card-title text-center">Personalizado</h5>
                  <p className="card-text"></p>
                </div>
              </div>
          </NavLink>
        </div>
      </div>
    );
  }
}
