import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';

function logger(store) {
  return function(next) {
    return function(action) {
      console.log('Last State', store.getState())
      console.log('Action', action);
      const result = next(action)
      console.log('Final State', store.getState())
      return result;
    }
  }
}

function thunk(store) {
  return function(next) {
    return function(action) {
      if (typeof action !== 'function') {
        return next(action)
      } else {
        return action(store.dispatch, store.getState)
      }
    }
  }
}

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
);

export default store;
