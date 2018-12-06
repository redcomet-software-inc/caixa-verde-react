import React, { Component } from 'react';
import { FulfillingSquareSpinner } from 'react-epic-spinners'


export default class Spinner extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div>
      <FulfillingSquareSpinner color="#2c7957" />
      </div>
    );
  }
}
