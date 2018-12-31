import React, { Component } from 'react';
import stardardImage from '../../images/standard.jpg';
import { Icon } from 'react-icons-kit';
import {boxAdd} from 'react-icons-kit/icomoon/boxAdd';
import {minus} from 'react-icons-kit/icomoon/minus';


const Image = (props) => {

  let src='';

  if(props.image) {
    src = props.image;
  } else {
    src = stardardImage;
  }

  return (<img alt="kit" className="card-img-top " src={src} width={150} />);
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
  handleLoad = () => {
    this.props.cardMounted();
  }

  handleError = () => {
    localStorage.removeItem("productsList");
    localStorage.removeItem("kitsList");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("selectedKits");
    localStorage.removeItem("selectedProducts");
    window.location.reload();

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
       
    <div id={this.props.id}  onClick={this.addBorder} className={'p-0 mt-2 m-2 mx-auto card ' + this.state.borderClass}>
      <img src={this.props.image} onLoad={this.handleLoad} onError={this.handleError} />
        <div className="card-body text-center pb-0">
          <span className="card-text">{this.props.name}</span><br/>
          <small className="text-success">{this.props.setMoneyFormat(this.props.price)}</small><br/>
          <small className="card-text">{this.props.kind}</small>
        </div>
        <div className="card-body text-center">
          <div className="row">
            <div className="col-4">
                <Icon icon={minus} id={this.props.id} onClick={(e) => this.props.addCardCount(e.currentTarget.id,"product",-1)} className={'btn btn-info ' + this.state.show} />   
            </div>
            <div className={"col-4 " + this.state.show}>
                <div id={this.props.id} className={"btn disabled "+this.state.show}>{this.state.cardCount}</div>
            </div>
            <div className="col-4">
                <Icon icon={boxAdd} id={this.props.id} onClick={(e) => this.props.addCardCount(e.currentTarget.id,"product",1)} className="btn btn-success" />
            </div>
          </div>
        </div>
      </div>
    

    );
  }
}
