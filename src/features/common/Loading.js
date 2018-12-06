import React, { Component } from 'react';
import { SelfBuildingSquareSpinner } from 'react-epic-spinners'

export default class Loading extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="common-loading">
        <SelfBuildingSquareSpinner color="#2c7957" />
      </div>
    );
  }
}
