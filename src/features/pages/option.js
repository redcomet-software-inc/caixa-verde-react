import React, { Component } from 'react';
import {
  NavLink
} from "react-router-dom";
import kits from '../../images/kit_2.png';
import custom from '../../images/custom_2.png';

export default class Option extends Component 
{
  static propTypes = {
  };
  constructor ()
  {
    super();
    this.state = {
      kits_color: false,
      custom_color: false,
    };
  }

  customColor = () => 
  {
    if(this.state.custom_color===true) 
    {
      return '';
    } else {
      return 'greyscale';
    }
  }

  kitsColor = () => {
    if(this.state.kits_color===true) 
    {
      return '';
    } else 
    {
      return 'greyscale';
    }
  }

  addColorKit = () => 
  {
    this.setState({kits_color:true});
  }
  removeColorKit = () => 
  {
    this.setState({kits_color:false});
  }
  addColorCustom = () => 
  {
    this.setState({custom_color:true});
  }
  removeColorCustom= () => 
  {
    this.setState({custom_color:false});
  }

  render() 
  {
    return (
      <div className="pages-option">
        <h3 className="text-center title">Como você prefere comprar?</h3>
          <div className="row">
            <div className="col-md-6 pl-2 text-center pl-lg-2 mt-5">
              <div className="col pl-lg-5 mt-lg-4 mt-md-3">
                <div className="col pl-lg-2">
                  <h4 className="text-info">Kits</h4>
                    <NavLink className="mx-auto" to="/kits">
                      <img alt={"Ir para Lista de Kits"} onMouseOver={this.addColorKit} onMouseOut={this.removeColorKit} className={"img-fluid rounded option "+this.kitsColor()} src={kits} width={200} />
                    </NavLink><br />
                    <h5 className="warning-muted text-danger" style={{textAlign:"center"}}>10% de desconto</h5>
                </div>
              </div>
            </div>
            <div className="col-md-6 pl-2 text-center pr-lg-5 mt-5">
              <div className="col pr-lg-5 mt-lg-4 mt-md-3">
                <div className="col pr-lg-5">
                  <h4 className="text-info">Personalizado</h4>
                  <NavLink className="mx-auto" to="/personalizado">
                    <img alt={"Ir para Lista de Personalizados"} onMouseOver={this.addColorCustom} onMouseOut={this.removeColorCustom} className={"img-fluid rounded option "+this.customColor()} src={custom}  width={200} />
                  </NavLink><br />
                </div>
              </div>
            </div>
          </div>
          <div className="h-100 row my-auto p-5">
          </div>
      </div>
    );
  }
}
