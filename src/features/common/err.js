import React, { Component } from 'react';

export default class Err extends Component {
  static propTypes = {

  };

  constructor (props) {
    super(props);
    this.state = {
      report_form_visible:false,
      report_thanks_visible:false,
    }
  }

  sendReport = () => {
    this.setState({report_form_visible:false});
    this.setState({report_thanks_visible:true});
  }

  renderFormError = () => {
    if(this.state.report_form_visible===true) {
      return(
        <div className="mt-4">
          <span>
          Descreva o que você estava fazendo quando isso aconteceu?
          <textarea class="form-control pb-4 mt-2" id="errorFormControl" rows="3"></textarea>
          </span>
          <div class="text-center mx-auto w-100 pt-4">
            <div class="d-inline p-2 text-white"><button className="btn btn-primary" type="submit" onClick={() => this.sendReport()} >Enviar</button></div>
            <div class="d-inline p-1 text-white position-absolute"></div>
          </div>
        </div>
      );
    }
  }

  renderErrorMessage = () => {
    if(this.state.report_thanks_visible===false) {
      return(
        <div>
            <h2 className="text-center title">Ops!</h2>
            <p>{this.props.err_message}</p>
        

        <div className="row">
          <div className="col-lg-12 col-md-12 mx-auto text-middle h-100 mt-4">
            <button onClick={() => this.handleClick()} className="btn btn-info mr-2 mb-2">Clique Aqui</button> para reportar este problema.
          </div>
        </div>
        </div>
      );
    } else {
      return(
        <div>
            <h2 className="text-center title">Obrigado por sua colaboração!</h2>
            <p>Vamos tentar corrigir este problema mais rápido possível.</p>
        </div>
      );
    }
  }

  handleClick = () => {
    this.setState({ report_form_visible: !this.state.report_form_visible});
  }

  render() {

    return (
      <div className="common-err">
        <div className="row">
          <div className="col-lg-6 col-md-8 mx-auto">
            {this.renderErrorMessage()}
          </div>
          <p>
            
          </p>
        </div>
        

        <div className="row">
          <div className="col-lg-6 col-md-8 mx-auto text-middle h-100 mt-4 ">
            {this.renderFormError()}
          </div>
        </div>
      </div>
    );
  }
}
