export const setLocalStorage = (products, kits) => {
/* Add List of Selected Products and Kits to Local Storage */
    //this.countProducts(products, kits);
    localStorage.setItem('selectedProducts', JSON.stringify(products));
    localStorage.setItem('selectedKits', JSON.stringify(kits));
}

/* Verify if a localStore key is available */
export const checkLocalStorage = () => {
    if (localStorage.getItem('selectedProducts') === null || localStorage.getItem('selectedKits') === null) {
      return false;
    } else {
      return true;
    }
  }