import React, { Component } from 'react';
import stardardImage from '../../images/standard.jpg';
import { Icon } from 'react-icons-kit';
import { boxAdd } from 'react-icons-kit/icomoon/boxAdd';
import { minus } from 'react-icons-kit/icomoon/minus';

const Image = props => {
  let src = '';

  if (props.image) {
    src = props.image;
  } else {
    src = stardardImage;
  }

  return <img alt="kit" className="card-img-top " src={src} width={150} />;
};

export default class Card extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      borderClass: 'standard',
      show: 'hide',
    };
  }

  componentDidMount() {}

  componentWillUpdate(prevProps) {
    if (prevProps.quantity !== this.props.quantity) {
      
      if (this.props.quantity > 0) {
        this.setState({ show: '' });
        console.log('show');
      } else {
        console.log('hide');
        this.setState({ show: 'hide' });
      }
    }
  }

  handleLoad = () => {
    this.props.cardMounted();
  };

  handleError = () => {
    localStorage.removeItem('productsList');
    localStorage.removeItem('kitsList');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('selectedKits');
    localStorage.removeItem('selectedProducts');
    window.location.reload();
  };

  render() {
    return (
      <React.Fragment>
        <img
          className="card-img-top"
          src={this.props.image}
          onLoad={this.handleLoad}
          onError={this.handleError}
        />
        <div className="card-body text-center pb-0">
          <span className="card-text">{this.props.name}</span>
          <br />
          <small className="text-success">{this.props.setMoneyFormat(this.props.price)}</small>
          <br />
          <small className="card-text">{this.props.kind}</small>
        </div>
        <div className="card-body text-center">
          <div className="row">
            <div className="col-4">
              <Icon
                icon={minus}
                id={this.props.id}
                onClick={e => this.props.addCardCount(e.currentTarget.id, 'product', -1)}
                className={'btn btn-info ' + this.props.hide_number}   />
            </div>
            <div className={'col-4 ' + this.props.hide_number}>
              <div id={this.props.id} className={'btn ' + this.props.hide_number}>
                {this.props.quantity}
              </div>
            </div>
            <div className="col-4">
              <Icon
                icon={boxAdd}
                id={this.props.id}
                onClick={e => this.props.addCardCount(e.currentTarget.id, 'product', 1)}
                className="btn btn-success" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
