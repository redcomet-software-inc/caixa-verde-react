import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { boxAdd } from 'react-icons-kit/icomoon/boxAdd';
import { minus } from 'react-icons-kit/icomoon/minus';
import { getProduct } from '../../common/get-products.js';
import userImage from '../../images/caixaverde-finalizacao-WHITE-BOX.png';

export default class CardKits extends Component {
  constructor(props) {
    super(props);

    let kitData = {
      kit_id: this.props.id,
      name: this.props.name,
      price: this.props.price,
      quantity: this.props.quantity
    }

    let myBoxKit = {
      id: this.props.id,
      name: this.props.name,
      price: this.props.price,
      quantity: this.props.quantity,
      kind: this.props.kind,
      products: this.props.products,
    }

    this.props.refKit(kitData, myBoxKit);
    let hide = null;
    let card_active = null;
    if(this.props.quantity > 0) {
      hide = "show";
      card_active = "card-active";
    } else {
      kitData.quantity = 0;
    }
    this.state = {
      borderClass: 'standard',
      kitData: kitData || {},
      myBoxKit: myBoxKit || {},
      card_active: card_active || '',
      hide: hide || 'hide',
    };
  }

  addCardCount = (delta) => {
    console.log("delta");
    console.log(delta);
    /* name variable can be either kit or product */
      let kit = this.state.kitData;
      let box = this.state.myBoxKit;
      let quantity = kit.quantity;
      let nextQuantity = kit.quantity + delta;
      console.log(kit);
      console.log(this.state.kitData);
      console.log("quantity: " + quantity);
      console.log("next quantity: " + nextQuantity);

      if ((quantity === 0 && delta === 1) || nextQuantity > 0) {
        kit.quantity += delta;
        box.quantity += delta;
        this.setState({card_active: "card-active"});
        this.setState({ hide: 'show' });
        console.log("plus");
      }

      if(nextQuantity === 0) {
        kit.quantity = 0;
        box.quantity = 0;
        console.log(quantity);
        this.setState({card_active: ""});
        this.setState({ hide: 'hide' });
        console.log("minus");
      }
      this.setState({ kitData: kit});
      this.setState({ myBoxKit: box});
      console.log("check here");
      console.log(this.state.kitData);
      this.props.refKit(kit, box);
  };

  handleClickPlus = () => {
    this.addCardCount(1);
    this.props.kitPlus(this.state.kitData, this.state.myBoxKit);
    this.props.getOrderPrice();
  }

  handleClickMinus = () => {
    if(this.state.kitData.quantity > 0) {
      this.addCardCount(-1);
      this.props.kitMinus(this.state.kitData, this.state.myBoxKit);
      this.props.getOrderPrice();
    }
  }

  renderProducts = () => {
    let table = [];
    let products = this.props.products;
    console.log("PRODUCTS");
    console.log(products);
    if(products !== undefined) {
      for(let product in this.props.products) {
        table.push(
          <ul className="list-group list-group-flush">
            <li className="list-group-kit"> 
              <div className="row">
                <div className="col">
                  <img onError={e => this.handleError(e, products[product].id)} className="img-fluid" alt={"Imagem Kit " + products[product].name} src={products[product].thumb} />
                </div>
                <div className="col my-auto">
                  { products[product].name }
                </div>
              </div>
            </li>
          </ul>
        );
      }
    }

    return table;
  }

  handleError (e, id) {
    e.persist();
    getProduct(id).then(res => {
      e.target.src = res.thumb;
      if(typeof res.thumb === 'undefined') {
        e.target.src = userImage;
      }
    });
  }
  

  render() {
    return (
      <div id={this.props.id} className={'p-0 mt-2 m-2 mx-auto card cardkits ' + this.state.card_active}>
        <div className="card-body">
          <h5 className="card-title text-center">{this.props.name}</h5>
        </div>
        
          { this.renderProducts() }
 
        <div className="card-body text-center">
        <div className="row">
          <div className="col">
            <p className="card-text text-center text-success">{this.props.setMoneyFormat(this.state.kitData.price)}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
          <Icon
                icon={minus}
                id={this.props.id}
                onClick={e => this.handleClickMinus(e)}
                className={'btn btn-lg btn-info ' + this.state.hide}   />
          </div>
          <div className={"col-4 " + this.state.hide}>
            <div id={this.props.id} className={'btn disabled '+ this.state.hide}>
              {this.state.kitData.quantity}
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
