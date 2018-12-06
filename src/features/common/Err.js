import React, { Component } from 'react';

export default class Err extends Component {
  static propTypes = {

  };



  render() {
    return (
      <div className="common-err">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="title">Ops!</h2>
            <p>{this.props.errMessage}</p>
          </div>
        </div>
      </div>
    );
  }
}
