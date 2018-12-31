import React, { Component } from 'react';
import {
  NavLink
} from "react-router-dom";
import customizedImage from '../../images/customized.gif';
import kits from '../../images/kits2.png';
import custom from '../../images/custom.png';

export default class Option extends Component {
  static propTypes = {

  };

  constructor (){
    super();
    this.state = {
      kits_color: false,
      custom_colr: false,
    };
  }

  customColor = () => {
    if(this.state.custom_color===true) {
      return '';
    } else {
      return 'greyscale';
    }
  }

  kitsColor = () => {
    if(this.state.kits_color===true) {
      return '';
    } else {
      return 'greyscale';
    }
  }

  addColorKit = () => {
    this.setState({kits_color:true});
  }
  removeColorKit = () => {
    this.setState({kits_color:false});
  }
  addColorCustom = () => {
    this.setState({custom_color:true});
  }
  removeColorCustom= () => {
    this.setState({custom_color:false});
  }

  render() {
    return (
      <div className="pages-option">

        <h2 className="text-center title">Como você prefere comprar?</h2>

        
        
        
          <div className="row">
            <div className="col-md-6 text-center">
              <h4 className="text-info">Kits</h4>
              <NavLink className="mx-auto" to="/kits">
                <img onMouseOver={this.addColorKit} onMouseOut={this.removeColorKit} className={"img-fluid rounded option "+this.kitsColor()} src={kits} />
              </NavLink>
              <span style={{textAlign:"center"}}>10% de desconto</span>
            </div>
            <div className="col-md-6 text-center">
              <h4 className="text-info">Personalizado</h4>
              <NavLink className="mx-auto" to="/personalizado">
                <img onMouseOver={this.addColorCustom} onMouseOut={this.removeColorCustom} className={"img-fluid rounded option "+this.customColor()} src={custom} />
              </NavLink>
            </div>
          </div>
          <div className="h-100 row my-auto p-5">
            
          </div>

      </div>
    );
  }
}
