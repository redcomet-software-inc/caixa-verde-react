import React, { Component } from 'react';
import { FulfillingSquareSpinner } from 'react-epic-spinners'

export default class Spinner extends Component {
  constructor(props) {
    super(props);
    super(props);
    this.state = {
      timeout:false,
    }
  }
  render() {
    return (
      <div className="spinner">
        <FulfillingSquareSpinner className="mx-auto mt-5" color="#2c7957" />
        <div className="warning-muted mt-2 pt-2">Carregando {this.state.timeout}</div>
      </div>
    );
  }
}
