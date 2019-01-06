import React, { Component } from 'react';

export default class MyBox extends Component {
  constructor (props) 
  {
    super(props);
    /* Load Props from MainPage */
    this.props.turnOffError();
    this.props.turnOnLoading(); /* Every Component has this one */
    this.props.updateShoppingCart("product");
    this.props.updateShoppingCart("kit");
    let count = this.props.shoppingCartCount;
    let box_empty = true;
    if(count>0) {
      box_empty = false;
    }
    this.state = {
        box_empty: box_empty,
        authorized: true,
    }
  }

  /* Mount */
  componentDidMount() 
  {
    this.setState({authorized: true});
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
    this.authorize();
    console.log(this.props.shoppingCartProducts);
    
  }
  /* Clear */
  componentWillUnmount() 
  {
    this.setState({authorized: false});
  }
  /*  */
  authorize = () => 
  {
      if(this.state.authorized) 
      {
        this.props.turnOffLoading();
      } else {
        this.props.turnOnError("Permissão não concedida");
      }
  }

  renderBox = () => 
  {
    if(this.state.box_empty===false) 
    {
      return(
        <div className="card-columns">
          { this.props.shoppingCartProducts.map((product, index) => (

              <div className="card mb-3" style={{width: 180, backgroundColor: '#fff'}}>
                <div className="card-header">{ product.name }</div>
                <div className="card-body">
                  <img alt={"Image do Produto " + product.name} className="img-fluid" src={ product.thumb } />
                  <p className="card-text"></p>
                </div>
              </div>

          ))}

          { this.props.shoppingCartKits.map((kit, index) => (
            <div>
              <div className="card bg-light mb-3" style={{width: 180}}>
                 { kit.products.map((product, index) => (
                <div className="card-header">{ product.name }</div>
                 ))}
                <div className="card-body">
                  <h5 className="card-title">Kits</h5>
                  <p className="card-text"></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else 
    {
      return(
        <div>
          A sua Caixa Está Vazia
        </div>
      );
    }
  }

  render() 
  {
    return (
      <div className="pages-my-box">
        <h2 className="text-center title">Minha Caixa</h2>
        { this.renderBox() }
      </div>
    );
  }
}
