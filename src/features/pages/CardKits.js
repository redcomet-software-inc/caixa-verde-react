import React, { Component } from 'react';
import stardardImage from '../../images/standard.jpg';
import { Icon } from 'react-icons-kit';
import { boxAdd } from 'react-icons-kit/icomoon/boxAdd';
import { minus } from 'react-icons-kit/icomoon/minus';

const Image = (props) => {
  let src='';
  if(props.thumb) {
    src = "http://localhost:3000"+ props.image;
  } else {
    src = stardardImage;
  }
  return (<img alt="kit" className="card-img-top" src={src} width={200} />);
}

export default class CardKits extends Component {
  static propTypes = {

  };

  constructor(props) 
  {
    super(props);
    this.myClass = 'cardkits-active';
    this.state = {
      classState: 'cardkits-mouseout',
      borderClass: 'standard',
      cardCount: 0,
      displayControlClass: '',
      show: 'hide',
    };
  }

  addBorder = (e) => 
  {
    if(this.state.cardCount===0 && this.state.borderClassName==='') {
      this.setState({ borderClass: 'cardkits-active' });
      this.setState({cardCount: this.props.quantity});
      this.props.addCardCount(e);
    }
  };

  deactivateBorder = e => 
  {
    this.setState({ borderClass:''});
  }

   selectCard = (quantity) => 
   {
    if(quantity === 0) 
    {
      this.setState({borderClass:'standard'});
      this.setState({show:'hide'});
    } else 
    {
      this.setState({borderClass:this.myClass});
      this.setState({show:'show'});
    }
  }

  componentDidMount()
  {
    this.setState({cardCount: this.props.quantity});
    this.selectCard(this.props.quantity);
  }
  componentWillReceiveProps(props)
  {
    this.setState({cardCount: props.quantity});
    this.selectCard(props.quantity);
  }

  render()
  {
    return (
      <div id={this.props.id}  onClick={this.addBorder} className={'p-0 mt-2 m-2 mx-auto card cardkits '+ this.state.borderClass} >
        <div className="card-body">
          <h5 className="card-title text-center">{this.props.name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          {this.props.products.map((product, index) => (
          <li className="list-group-item"> 
            <div className="row">
              <div className="col p-0">
                <img alt={"Imagem Kit " + product.name} src={product.thumb} />
              </div>
              <div className="col my-auto">
                { product.name }
              </div>
            </div>
          </li>
            ))}
        </ul>
        <div className="card-body text-center">
        <div className="row">
          <div className="col">
            <p className="card-text text-center text-success">{this.props.setMoneyFormat(this.props.price)}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
          <Icon
                icon={minus}
                id={this.props.id}
                onClick={e => this.props.addCardCount(e.currentTarget.id, 'kit', -1)}
                className={'btn btn-info ' + this.props.hide_number}   />
          </div>
          <div className={"col-4 " + this.state.show}>
            <div id={this.props.id} className={'btn disabled '+ this.state.show}>{this.state.cardCount}</div>
          </div>
          <div className="col-4">
          <Icon
                icon={boxAdd}
                id={this.props.id}
                onClick={e => this.props.addCardCount(e.currentTarget.id, 'kit', 1) }
                className="btn btn-success btn-lg" />
            
          </div>
        </div>
      </div>
    </div>
    );
  }
}
