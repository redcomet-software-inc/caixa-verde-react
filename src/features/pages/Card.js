import React, { Component } from 'react';
import stardardImage from '../../images/standard.jpg';

export default class Card extends Component {
  static propTypes = {};

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

  //When the user moves the mouse on the Card changes the color
  cardStyle = e => {
    if (e === 1) {
      this.setState({ classState: 'card-mouseover' });
    } else {
      this.setState({ classState: 'card-mouseout' });
    }
  };


  addBorder = (e) => {
      if(this.state.cardCount===0 && this.state.borderClassName==='') {
        this.setState({ borderClass: 'card-active' });
        this.setState({ displayControlClass: '' });
        console.log("aqui");
        console.log(this.props);
        this.setState({cardCount: this.props.quantity});
        this.props.addCardCount(e);
      }
  };

  deactivateBorder = e => {
    this.setState({ borderClass:''});
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

  //created_at: "2018-11-06T10:47:32.310Z"
//description: "Description of Product 1"
//id: 21
//name: "Product 1"
//updated_at: "2018-11-06T10:47:32.310Z"
//weight_per_unit: null


  render() {
    return (
  

    <div id={this.props.id}  onClick={this.addBorder} className={'card card ' + this.state.classState + ' ' + this.state.borderClass} style={{width: 60}}>
      <img alt="kit" className="card-img-top" src={stardardImage} width={200} />
      <div className="card-body">
        <p className="card-text">{this.props.name}</p>
        
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{this.props.setMoneyFormat(this.props.price)}</li>
      </ul>
      <div className="card-body">
        <div id={this.props.id} className="card-text">
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
