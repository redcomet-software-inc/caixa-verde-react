import React, { Component } from 'react';
import { PixelSpinner } from 'react-epic-spinners'

export default class Loading extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="common-loading">
        <PixelSpinner color="#2c7957" size={30} />
      </div>
    );
  }
}
