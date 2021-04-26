import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import history from './history';
import rootReducer from './rootReducer';

import { persistStore, persistReducer, createMigrate } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import reduxReset from 'redux-reset';


const MIGRATION_DEBUG = false;


const router = routerMiddleware(history);

// NOTE: Do not change middleares delaration pattern since rekit plugins may register middlewares to it.
const middlewares = [
  thunk,
  router,
];

let devToolsExtension = f => f;

/* istanbul ignore if  */
if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
  if (window.devToolsExtension) {
    devToolsExtension = window.devToolsExtension();
  }
}

export default function configureStore(initialState) {

  const migrations = {
    0: (state) => initialState,
    1: previousVersionState => ({
      number: {
        change: previousVersionState.number,
        lastUpdate: new Date()
      }
    })   
      // migration clear out device state
  }

  const persistConfig = {
    key: 'caixa-verde',
    version: 0,
    migrate: createMigrate(migrations, {debug: MIGRATION_DEBUG }),
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, initialState, 
    compose(applyMiddleware(...middlewares),
    reduxReset(),  // Will use 'RESET' as default action.type to trigger reset
    devToolsExtension ? devToolsExtension && devToolsExtension : f => f
  ));

  /* Create Persistor */
  const persistor = persistStore(store);

    /* istanbul ignore if  */
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default; // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }
  return [ store, persistor ];
}











