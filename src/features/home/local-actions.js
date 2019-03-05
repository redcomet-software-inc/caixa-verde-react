
export const setMoneyFormat = price => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    // => "R$100,000,000.00"
};

/* Check if User is LoggedIn */
export const getLocalStorage = () => {
    if(localStorage.getItem("email") !== null && localStorage.getItem("token") !== null ) {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const client_credentials = {
        email: email,
        token: token,
    }
    return client_credentials;
    } else {
    return false;
    }
}

/* Checkout Utility */
export const setCheckoutOrderId = (order_id) => {
    localStorage.setItem("checkout_order_id", order_id);
}

 /* Check if a Giving Object is Empty */
export const isEmpty = function (obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
        }
        return true;
 }

export const countB = (myObject) => {
    let count = 0;
    if(isEmpty(myObject) === false) {
      for (var key in myObject) {
        count += myObject[key].quantity;
      }
    }
    return count;
  }

export const count = (products, kits) => {
    let sum_product, sum_kit;

    sum_product = countB(products);
    sum_kit = countB(kits);

    return sum_product + sum_kit;
}


/*
// Count Products and Kits
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

// LocalStorage Utility
export const storageProduct = (products) => {
    // Add List of Selected Products and Kits to Local Storage
    let ls = localStorage.setItem('selectedProducts', JSON.stringify(products));
    if(ls) {
    return true;
    } else {
    return false;
    }
}
    
export const storageKit = (kits) => {
    let ls = localStorage.setItem('selectedKits', JSON.stringify(kits));
    if(ls) {
    return true;
    } else {
    return false;
    }
}


// Verify if a localStore key is available
export const checkLocalStorage = () => {
    if (localStorage.getItem('selectedProducts') === null && localStorage.getItem('selectedKits') === null) {
        return false;
    } else {
        return true;
    }
}
*/
