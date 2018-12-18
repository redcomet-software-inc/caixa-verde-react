import React, { Component } from 'react';
import { FulfillingSquareSpinner } from 'react-epic-spinners'
import ScrollLock from 'react-scrolllock';


export default class Spinner extends Component {
  static propTypes = {

  };


  render() {
    return (
      <div className="spinner">
        <FulfillingSquareSpinner className="mx-auto" color="#2c7957" />
      </div>
    );
  }
}
