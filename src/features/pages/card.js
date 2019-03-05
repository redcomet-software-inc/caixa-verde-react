import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { boxAdd } from 'react-icons-kit/icomoon/boxAdd';
import { minus } from 'react-icons-kit/icomoon/minus';
import userImage from '../../images/caixaverde-finalizacao-WHITE-BOX.png';
import { setMoneyFormat } from '../home/local-actions';

export default class Card extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);

    let productData = {
      product_id: this.props.id,
      name: this.props.name,
      price: this.props.price,
      quantity: this.props.quantity
    }

    let myBoxProduct = {
      id: this.props.id,
      name: this.props.name,
      price: this.props.price,
      quantity: this.props.quantity,
      kind: this.props.kind,
      thumb: this.props.thumb,
    }

    this.props.refProduct(productData);
    let hide = null;
    let card_active = null;
    if(this.props.quantity > 0) {
      hide = "show";
      card_active = "card-active";
    } else {
      productData.quantity = 0;
    }

    this.state = {
      borderClass: 'standard',
      productData: productData || {},
      myBoxProduct: myBoxProduct || {},
      card_active: card_active || '',
      hide: hide || 'hide',
    };
  }

  handleLoad = () => {
    this.props.cardMounted();
  };

  handleError (e, id) {
    e.persist();
    e.target.src = userImage;
  }

  /* Add Item to the Shopping List */
  addCardCount = (delta) => {
    console.log("delta");
    console.log(delta);
    /* name variable can be either kit or product */
      let item = this.state.productData;
      let box = this.state.myBoxProduct;
      let quantity = item.quantity;
      let nextQuantity = item.quantity + delta;
      console.log(item);
      console.log(this.state.productData);
      console.log("quantity: " + quantity);
      console.log("next quantity: " + nextQuantity);

      if ((quantity === 0 && delta === 1) || nextQuantity > 0) {
        item.quantity += delta;
        box.quantity += delta;
        this.setState({card_active: "card-active"});
        this.setState({ hide: 'show' });
        console.log("plus");
      }

      if(nextQuantity === 0) {
        item.quantity = 0;
        box.quantity =0;
        console.log(quantity);
        this.setState({card_active: ""});
        this.setState({ hide: 'hide' });
        console.log("minus");
      }
      this.setState({ productData: item});
      this.setState({ myBoxProduct: box});
      this.props.refProduct(item, box);
  };

  handleClickPlus = () => {
    this.addCardCount(1);
    this.props.productPlus(this.state.productData, this.state.myBoxProduct);
    this.props.getOrderPrice();
  }

  handleClickMinus = () => {
    if(this.state.productData.quantity > 0) {
      this.addCardCount(-1);
      this.props.productMinus(this.state.productData, this.state.myBoxProduct);
      this.props.getOrderPrice();
    }
  }

  render() {
    return (
      <div key={"div" + this.state.productData.id} className={"card m-2 text-center mx-auto " + this.state.card_active} style={{maxWidth:200}}>
        <img
          alt={"Imagem" + this.props.name}
          className="card-img-top mt-5"
          
          src={this.props.thumb && this.props.thumb || userImage}
          onLoad={this.handleLoad}
          onError={e => this.handleError(e, this.state.productData.id)}
        />
        <div className="card-body text-center pb-0">
          <span className="card-text">{this.state.productData.name}</span>
          <br />
          <small className="text-success">{setMoneyFormat(this.state.productData.price)}</small>
          <br />
          <small className="card-text">{this.props.kind}</small>
        </div>
        <div className="card-body text-center">
          <div className="row">
            <div className="col-4">
              <Icon
                icon={minus}
                id={this.props.id}
                onClick={e => this.handleClickMinus(e)}
                className={'btn btn-info ' + this.state.hide}   />
            </div>
            <div className={'col-4 ' + this.state.hide}>
              <div id={this.props.id} className={'btn ' + this.state.hide}>
                {this.state.productData.quantity}
              </div>
            </div>
            <div className="col-4">
              <Icon
                icon={boxAdd}
                id={this.props.id}
                onClick={e => this.handleClickPlus(e)}
                className="btn btn-success" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
