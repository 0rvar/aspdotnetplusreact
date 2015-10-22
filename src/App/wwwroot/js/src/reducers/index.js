import * as ActionTypes from '../actions';

import { combineReducers } from 'redux';

function todoLists(state = [], action) {
  return state;
}

const rootReducer = combineReducers({
  todoLists
});

export default rootReducer;
