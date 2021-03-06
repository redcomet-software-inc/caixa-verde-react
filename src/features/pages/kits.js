import React, { Component } from 'react';
import CardKits from '../pages/cardkits.js';
import LoaderHOC from '../../HOC/loader-hoc';
import { getKits } from '../../common/get-products.js';

class Kits extends Component {

  constructor(props) {
    super(props);
    this.state = {
      kitData:[],
      myBox:[]
    }
  }

  componentDidMount () {
    console.log("Verify why this turn Off Loading does not work");
    this.getKits();
  }

  getKits = () => {
     getKits().then(res => {
      this.setState({kitData: res});
      this.props.actions.kits(res);
      this.props.actions.turnOffLoading();
    }); 
  }

  refKit = (kitData, myBox) => {
    this.setState({kitData: kitData});
    this.setState({myBox: myBox});
    console.log("kit data");
    console.log(kitData);
  }

  getQuantity = (id) => {
    let kits = this.props.home.selected_kits; // this comes from Redux Store
    let quantity = 0;
    if (kits["kit" + id] !== undefined ) {
      quantity = kits["kit" + id].quantity;
    }
    return quantity;
  }

  renderKits = () => {
    let table = [];
    let kits = this.props.home.kits;
    if(kits !== undefined) {
      for(let kit in this.props.home.kits) { 
        table.push(
          <div className="m-2">
          <CardKits
              key={"cardkit" + kits[kit].id}
              id={kits[kit].id}
              name={kits[kit].name}
              kind={kits[kit].kind}
              description={kits[kit].description}
              price={kits[kit].price_kit}
              products={kits[kit].products}
              quantity={this.getQuantity(kits[kit].id)}
              refKit={this.refKit}
              kitPlus={this.props.actions.kitPlus}
              kitMinus={this.props.actions.kitMinus}
              getOrderPrice={this.props.actions.getOrderPrice}
              />
            </div>
        );
      }
    }

    return table;
  }

  render() {
    return (
        <div className="card-deck mx-auto">
              
          {this.renderKits()}

        </div>
      );
  }
}

export default LoaderHOC(Kits);