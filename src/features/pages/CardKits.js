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

  componentDidMount(){
    console.log("products");
    console.log(this.props.products);
  }

  render() {
    return (
      <div className="pages-card-kits m-4 m-4">
        <div className="card" style={{width: 18}} >
          <img  className="card-img-top" src={stardardImage} width={200} />
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
              <div id={this.props.id} onClick={this.props.addCardCount} className="btn btn-success">
                +
              </div>
              <div id={this.props.id} onClick={this.props.subtractCardCount} className="btn btn-danger">
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
