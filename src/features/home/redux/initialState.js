const initialState = {
  isLoading: false,
  isError: false,
  redirect:false,
  redirectTo:'/',
  products: {},      // Products Info Directive
  kits: {},          //Kits Info Directive
  myBoxProducts: {}, // Detailed Selected Products Info --
  myBoxKits: {},     // Detailed Selected Kits Info  --
};

export default initialState;
