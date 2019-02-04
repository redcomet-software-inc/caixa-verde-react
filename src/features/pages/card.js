import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { boxAdd } from 'react-icons-kit/icomoon/boxAdd';
import { minus } from 'react-icons-kit/icomoon/minus';

export default class Card extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);

    let itemData = {
      product_id: this.props.id,
      name: this.props.name,
      price: this.props.price,
      quantity: this.props.quantity
    }

    let myBox = {
      id: this.props.id,
      name: this.props.name,
      price: this.props.price,
      quantity: this.props.quantity,
      kind: this.props.kind,
      thumb: this.props.thumb,
    }

    this.props.refItem(itemData, myBox);
    let hide = null;
    let card_active = null;
    if(this.props.quantity > 0) {
      hide = "show";
      card_active = "card-active";
    } else {
      itemData.quantity = 0;
    }

    this.state = {
      borderClass: 'standard',
      itemData: itemData || {},
      myBox: myBox || {},
      card_active: card_active || '',
      hide: hide || 'hide',
    };
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

  /* Add Item to the Shopping List */
  addCardCount = (delta) => {
    console.log("delta");
    console.log(delta);
    /* name variable can be either kit or product */
      let item = this.state.itemData;
      let box = this.state.myBox;
      let quantity = item.quantity;
      let nextQuantity = item.quantity + delta;
      console.log(item);
      console.log(this.state.itemData);
      console.log("quantity: " + quantity);
      console.log("next quantity: " + nextQuantity);

      if (quantity === 0 && delta === 1 || nextQuantity > 0) {
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
      this.setState({ itemData: item});
      this.setState({ myBox: box});
      this.props.refItem(item, box);
  };

  handleClickPlus = () => {
    this.addCardCount(1);
    this.props.productPlus("product", this.state.itemData, this.state.myBox);
  }

  handleClickMinus = () => {
    if(this.state.itemData.quantity > 0) {
      this.addCardCount(-1);
      this.props.productMinus("product", this.state.itemData, this.state.myBox);
    }
  }

  render() {
    return (
      <div key={"div" + this.state.itemData.id} className={"card m-2 mx-auto " + this.state.card_active} style={{maxWidth:200}}>
        <img
          alt={"Image" + this.props.name}
          className="card-img-top"
          src={this.props.thumb}
          onLoad={this.handleLoad}
          onError={this.handleError}
        />
        <div className="card-body text-center pb-0">
          <span className="card-text">{this.state.itemData.name}</span>
          <br />
          <small className="text-success">{this.props.setMoneyFormat(this.state.itemData.price)}</small>
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
                {this.state.itemData.quantity}
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
