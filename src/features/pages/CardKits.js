import React, { Component } from 'react';
import stardardImage from '../../images/standard.jpg';

export default class CardKits extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.myClass = 'card-active';

    this.state = {
      classState: 'card-mouseout',
      borderClass: '',
      cardCount: 0,
      displayControlClass: ''
    };
  }

  selectCard = (quantity) => {
    if(quantity === 0) {
      this.setState({borderClass:''});
    } else {
      this.setState({borderClass:this.myClass});
    }
  }

   componentDidMount(){
    this.setState({cardCount: this.props.quantity});
    this.selectCard(this.props.quantity);
  }
  componentWillReceiveProps(props) {
    this.setState({cardCount: props.quantity});
    this.selectCard(props.quantity);
  }

  render() {
    return (
      <div className="pages-card-kits m-4 m-4">
        <div className="card" style={{width: 18}} >
          <img alt="produto"  className="card-img-top" src={stardardImage} width={200} />
          <div className="card-body">
            <h5 className="card-title text-center">{this.props.name}</h5>
            <p className="card-text text-center">{this.props.setMoneyFormat(this.props.price)}</p>
          </div>
          <ul className="list-group list-group-flush">
            {this.props.products.map((product, index) => (
            <li className="list-group-item">{ product.name }</li>
             ))}
          </ul>
          <div id={this.props.id} className="card-text card-footer">
            <div id={this.props.id} className={this.state.displayControlClass}>
              <div id={this.props.id} onClick={this.props.addCardCountKit} className="btn btn-success">
                +
              </div>
              <div id={this.props.id} onClick={this.props.subtractCardCountKit} className="btn btn-danger">
                -
              </div>
              <div id={this.props.id} className="badge badge-info">{this.state.cardCount}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
