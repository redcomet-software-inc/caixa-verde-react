
/* Get Accurate Price of Products And Kits Selections */ 
const order_priceB = (myObject) => {
    let value = 0;
    if(this.isEmpty(myObject) === false) {
      for(var key in myObject) {
        value += myObject[key].price * myObject[key].quantity;
      }
    }
    return value;
  }

export const getOrderPrice = (props) => {
    let value = 0;
    let price_products = this.order_priceB(props.home.products);
    let price_kits = this.order_priceB(props.home.kits);
    value = price_products + price_kits;
    return value;
  }