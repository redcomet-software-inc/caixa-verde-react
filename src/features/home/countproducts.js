/* Count Products and Kits */
export const countProductsAndKits = (productsList, kitsList) => {
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
    var products = 0;
    var kits = 0;
    for (var i = 0; i <= productsList.length - 1; i++) {
      products +=  productsList[i].price * productsList[i].quantity;
    }
    for (var j = 0; j <= kitsList.length - 1; j++) {
      kits += kitsList[j].price * kitsList[j].quantity;
    }
    return products + kits;
}

export const countProducts = (productsList) => {
  var products = 0;
  if(productsList.length > 0) {
    for (var i = 0; i <= productsList.length - 1; i++) {
      products += productsList[i].quantity;
    }
    return products;
  } else {
    return 0;
  }
  
};

export const countKits = (kitsList) => {
  var kits = 0;
  if(kitsList.length > 0) {
    for (var i = 0; i <= kitsList.length - 1; i++) {
      kits += kitsList[i].quantity;
    }
    return kits;
  } else {
    return 0;
  }
  
};

