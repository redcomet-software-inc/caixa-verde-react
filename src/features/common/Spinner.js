import React, { Component } from 'react';
import { FulfillingSquareSpinner } from 'react-epic-spinners'

export default class Spinner extends Component 
{
  static propTypes = 
  {
      page: ""
  };

  render() 
  {
    return (
      <div className="spinner">
        <FulfillingSquareSpinner className="mx-auto" color="#2c7957" />
        Page: {this.props.page}
      </div>
    );
  }
}
