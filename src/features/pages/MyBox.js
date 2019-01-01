import React, { Component } from 'react';

export default class MyBox extends Component {
  static propTypes = {

  };

  constructor (props) 
  {
    super(props);
    /* Load Props from MainPage */
    this.props.turnOnLoading(); /* Every Component has this one */
    this.props.updateShoppingCart("product");
    this.props.updateShoppingCart("kit");
    let count = this.props.shoppingCartCount;
    let box_empty = true;

    this.state = {
        kits_empty: true,
        products_empty: true, 
        products_loaded: false,
        kits_loaded: false,
        authorized: false,
    }
  }

  /* Mount */
  componentDidMount() 
  {
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
    this.authorize();
    

  }
  /* Clear */
  componentWillUnmount() 
  {
    this.setState({authorized: false});
  }
  /* Verify if all Data has been loaded */
  authorize = () => 
  {
      console.log("authorization");
      console.log(this.state.authorized)
   
      if(this.state.authorized) 
      {
        console.log("authorized");
        this.props.turnOffLoading();
      }
  }

  loadedCheck = () =>
  {
    console.log(this.state.kits_empty);
    console.log("loaded check");

    if(this.state.products_loaded && this.state.kits_loaded)
    {
      this.setState({ authorized: true});
      this.authorize();
    }
  }
  
  componentDidUpdate(prevProps, prevState) 
  {
    
    if(prevProps.shoppingCartKits !== this.props.shoppingCartKits) 
    { 
      this.setState({ kits_loaded: true });
      if(this.props.shoppingCartKits.length > 0) {
        this.setState({ kits_empty: false });
      } else
      {
        this.setState({ kits_empty: true });
      }
      console.log("set state 2");

    }

    if(prevProps.shoppingCartProducts !== this.props.shoppingCartProducts) 
    {
      this.setState({ products_loaded: true });
      if(this.props.shoppingCartProducts.length > 0) {
        this.setState({ kits_empty: false });
      } else
      {
        this.setState({ products_empty: true });
      }
      console.log("set state 2");
      
    }

    if(prevState.products_loaded !== this.state.products_loaded) {
      console.log("prev State");
        this.loadedCheck();
    }
    if(prevState.kits_loaded !== this.state.kits_loaded) {
      console.log("Prev State 2")
        this.loadedCheck();
    }
  }

  renderBox = () => {
    
    if(this.state.box_empty==false) 
    {
      return(
        <div>
          Print all the Items
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

  render() {
    return (
      <div className="pages-my-box">
        <h2 className="text-center title">Minha Caixa</h2>
        { this.renderBox() }
      </div>
    );
  }
}
