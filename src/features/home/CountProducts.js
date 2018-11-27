/* Count Products and Kits */
export const countProducts = (productsList, kitsList) => {
    var products = 0;
    var kits = 0;

    for (var i = 0; i <= productsList.length - 1; i++) {
      products += productsList[i].quantity;
    }
    for (var j = 0; j <= kitsList.length - 1; j++) {
      kits += kitsList[j].quantity;
    }
    var shoppingCartCount = products + kits; 
    return shoppingCartCount;
    
  };

export const getTotalPrice = (productsList, kitsList) => {
  console.log("Calculating Total Price Noew");
  console.log(productsList);
  console.log(kitsList);
}