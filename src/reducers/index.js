import {combineReducers} from 'redux';
import baseReducer from './base';
import playReducer from './play';

export default combineReducers({
  base: baseReducer,
  play: playReducer
})
