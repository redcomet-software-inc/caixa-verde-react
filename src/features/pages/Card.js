import React, { Component } from 'react';
import stardardImage from '../../images/standard.jpg';

const Image = (props) => {

  let src='';

  if(props.image) {
    src = "http://localhost:3000"+ props.image;
  } else {
    src = stardardImage;
  }

  return (<img alt="kit" className="card-img-top" src={src} width={200} />);
}

export default class Card extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.myClass = 'card-active';

    this.state = {
      classState: 'card-mouseout',
      borderClass: 'standard',
      cardCount: 0,
      show: 'hide',
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
      this.setState({borderClass:'standard'});
      this.setState({show:'hide'});
    } else {
      this.setState({borderClass:this.myClass});
      this.setState({show:'show'});
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
       
    <div id={this.props.id}  onClick={this.addBorder} className={'p-0 mt-2 m-2 mx-auto card ' + this.state.classState + ' ' + this.state.borderClass}>
      
      <Image image={this.props.image} />
      
      <div className="card-body text-center">
        <span className="card-text">{this.props.name}</span><br/>
        <small className="text-success">{this.props.setMoneyFormat(this.props.price)}</small>
      </div>

      <div className="card-body text-center">
        <div className="row">
          <div className="col-4">
              <div id={this.props.id} onClick={(e) => this.props.addCardCount(e.target.id,"product",-1)} className={'btn btn-info btn-lg '+this.state.show}>
                -
              </div>
              
          </div>
          <div className="col-4">
              <div id={this.props.id} className={'btn disabled '+this.state.show}>{this.state.cardCount}</div>
          </div>
          <div className="col-4">
              <div id={this.props.id} onClick={(e) => this.props.addCardCount(e.target.id,"product",1)} className="btn btn-success btn-lg">
                +
              </div>
          </div>
             
        </div>

  
      </div>
      </div>
    

    );
  }
}
