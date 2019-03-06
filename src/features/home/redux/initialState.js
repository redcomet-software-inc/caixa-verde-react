const initialState = {
  isLoading: false,
  isError: false,
  redirect:false,
  redirectTo:'/',
  selected_products:{},
  selected_kits:{},
  products: {},      // Products Info Directive
  kits: {},          // Kits Info Directive
  myBoxProducts: {}, // Detailed Selected Products Info --
  myBoxKits: {},     // Detailed Selected Kits Info  --
  client_data:[],
  getClientDataPending: false,
  getClientDataError: null,    // All Data to be persisted
  min_quantity:50,
  getMinQuantityRequestPending: false,
  getMinQuantityRequestError: null,
  order_price:0,
  count:0, // Number of all products and Kits selected
  logged_in:false,
};

export default initialState;
