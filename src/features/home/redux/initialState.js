const initialState = {
  isLoading: false,
  isError: false,
  redirect:false,
  redirectTo:'/',
  products: {},      // Products Info Directive
  kits: {},          // Kits Info Directive
  myBoxProducts: {}, // Detailed Selected Products Info --
  myBoxKits: {},     // Detailed Selected Kits Info  --
  client_data:[],
  getClientDataPending: false,
  getClientDataError: null,    // All Data to be persisted
};

export default initialState;
