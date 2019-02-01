import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { boxAdd } from 'react-icons-kit/icomoon/boxAdd';
import { minus } from 'react-icons-kit/icomoon/minus';

export default class CardKits extends Component {
  constructor(props) {
    super(props);

    let itemData = {
      kit_id: this.props.id,
      name: this.props.name,
      price: this.props.price,
      quantity: this.props.quantity
    }

    this.props.refItem(itemData);
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
      card_active: card_active || '',
      hide: hide || 'hide',
    };
  }

  addCardCount = (delta) => {
    console.log("delta");
    console.log(delta);
    /* name variable can be either kit or product */
      let item = this.state.itemData;
      let quantity = item.quantity;
      let nextQuantity = item.quantity + delta;
      console.log(item);
      console.log(this.state.itemData);
      console.log("quantity: " + quantity);
      console.log("next quantity: " + nextQuantity);

      if (quantity === 0 && delta === 1 || nextQuantity > 0) {
        item.quantity += delta;
        this.setState({card_active: "card-active"});
        this.setState({ hide: 'show' });
        console.log("plus");
      }

      if(nextQuantity === 0) {
        item.quantity = 0;
        console.log(quantity);
        this.setState({card_active: ""});
        this.setState({ hide: 'hide' });
        console.log("minus");
      }
      this.setState({ itemData: item});
      console.log("check here");
      console.log(this.state.itemData);
      this.props.refItem(item);
  };

  handleClickPlus = () => {
    this.addCardCount(1);
    this.props.productPlus("kit", this.state.itemData);
  }

  handleClickMinus = () => {
    if("kit", this.state.itemData.quantity > 0) {
      this.addCardCount(-1);
      this.props.productMinus("kit", this.state.itemData);
    }
  }

  render() {
    return (
      <div id={this.props.id} className={'p-0 mt-2 m-2 mx-auto card cardkits ' + this.state.card_active}>
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
            <p className="card-text text-center text-success">{this.props.setMoneyFormat(this.state.itemData.price)}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
          <Icon
                icon={minus}
                id={this.props.id}
                onClick={e => this.handleClickMinus(e)}
                className={'btn btn-info ' + this.props.hide}   />
          </div>
          <div className={"col-4 " + this.state.hide}>
            <div id={this.props.id} className={'btn disabled '+ this.state.hide}>
              {this.state.itemData.quantity}
            </div>
          </div>
          <div className="col-4">
          <Icon
                icon={boxAdd}
                id={this.props.id}
                onClick={e => this.handleClickPlus(e)}
                className="btn btn-success btn-lg" />
          </div>
        </div>
      </div>
    </div>
    );
  }
}
