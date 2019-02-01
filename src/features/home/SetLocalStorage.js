export const storageProduct = (products) => {
/* Add List of Selected Products and Kits to Local Storage */
  let ls = localStorage.setItem('selectedProducts', JSON.stringify(products));
  ls ? true : false
}

export const storageKit = (kits) => {
  let ls = localStorage.setItem('selectedKits', JSON.stringify(kits));
  ls ? true : false
}

/* Verify if a localStore key is available */
export const checkLocalStorage = () => {
    if (localStorage.getItem('selectedProducts') === null && localStorage.getItem('selectedKits') === null) {
      return false;
    } else {
      return true;
    }
}

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

export const destroyShoppingCart = () => {
  localStorage.removeItem("selectedKits");
  localStorage.removeItem("selectedProducts");
}