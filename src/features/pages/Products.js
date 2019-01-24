import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../pages/Card.js';
import Categories from '../components/Categories.js';
import LoaderHOC from '../../HOC/LoaderHOC.js';

class Products extends Component {
  static propTypes = {
    pages: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequfired,
  };

  constructor(props) {
    super(props);
    
    this.state = {
      hide_products: 'hide-products',
      card_active: '',
      products_by_category:[],
      products_view:[],
      products_length:0,
      products_mounted:0,
      localLoading:false,
    }
  }

  componentDidMount() {
    this.props.onRef(this);
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
    
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  /* Get the Product ID and return the quantity from Selected Products */
  getIndexReturnQtd = index => {
    var selectedProducts = this.props.selectedProducts;
    var checkExistingElement = 0;
    for (var i = 0; i <= selectedProducts.length - 1; i++) {
      if (parseInt(selectedProducts[i].id, 10) === index) {
        checkExistingElement += 1;
        return selectedProducts[i].quantity;
      }
    }
    if (checkExistingElement === 0) {
      return 0;
    }
  };

  refProducts = (products) => 
  {
    this.setState({ products_by_category: products});
    this.setState({ products_length: products.length});
  }
  cardMounted = () => 
  {
    let products_mounted = this.state.products_mounted + 1;
    this.setState({ products_mounted: products_mounted});
    if(products_mounted === this.state.products_length) 
    {
      
      console.log("Mounted");
    }
  }

  resetImgCount = () => 
  {
    this.setState({products_mounted: 0});
    this.setState({ localLoading: false});
  }

  turnOnLocalLoading = () => 
  {
    this.setState({localLoading: true});
    this.setState({hide_products: 'hide-products'});
  }

  turnOffLocalLoading = () => 
  {
    this.setState({localLoading: false});
    this.setState({hide_products: 'unhide-products'});
  }

  selectCard = (quantity) => 
  {
    if(quantity === 0) {
      this.setState({borderClass:'standard'});
      this.setState({show:'hide'});
    } else {
      this.setState({borderClass:this.myClass});
      this.setState({show:'show-product'});
    }
  }
  activate_card = (quantity) => 
  {
    /* Make sure we just call this function once */
    if(quantity > 0 && this.state.card_active==="") {
      this.setState({card_active: "card-active"});
    }
  }

  renderCard = (item) => 
  {
   let quantity=this.getIndexReturnQtd(item.id);
   let card_active="";
   let hide_number="";
   if(quantity > 0) {
     card_active="card-active"
     hide_number=""
   } else {
     quantity = 0;
     card_active="";
     hide_number="hide";
   }
   return(
    <div key={"div" + item.id} className={"card m-2 mx-auto " + card_active} style={{maxWidth:200}}>
        {' '}
        <Card
          key={"card" + item.id}
          id={item.id}
          cardMounted={this.cardMounted}
          name={item.name}
          description={item.description}
          kind={item.kind}
          price={item.price}
          image={item.thumb}
          setMoneyFormat={this.props.setMoneyFormat}
          quantity={quantity}
          hide_number={hide_number}
          addCardCount={this.props.addCardCount}
          subtractCardCount={this.props.subtractCardCount}
          ref={instance => {
            this.card = instance;
          }}
        />
      </div>
    );
  }

  render() 
  {
    return (
      <div>
        <h3 className="text-left title">Personalizado</h3>
        <div className="ml-auto">
          <Categories refProducts={this.refProducts} 
          localLoading={this.state.localLocalLoading} 
          turnOnLocalLoading={this.turnOnLocalLoading} 
          turnOffLocalLoading={this.turnOffLocalLoading}
          resetImgCount={this.resetImgCount} />
        </div>
        <div className={"card-columns mx-auto pb-5 " + this.state.hide_products} >
            {this.state.products_by_category.map((item, index) => (
                this.renderCard(item)
            ))}
        </div>
      </div>
    );
  }
}


export default LoaderHOC(Products);