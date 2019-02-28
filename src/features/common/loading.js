import React, { Component } from 'react';
import { PixelSpinner } from 'react-epic-spinners'

export default class Loading extends Component {
  static propTypes = {

  };

  constructor (props) {
    super(props);
    this.state = {
      size: 20,
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.size !== prevProps.size) {
      this.setState({size: this.props.size});
    }
  }

  render() {
    return (
      <div className="common-loading">
        <PixelSpinner className="spinnerl" color="#2c7957" size={this.props.size || 30} />
      </div>
    );
  }
}
