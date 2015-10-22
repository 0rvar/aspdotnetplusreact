import * as ActionTypes from '../actions';

import update from 'react-addons-update';
import { combineReducers } from 'redux';

function todoLists(state = [], action) {
  if(action.type === ActionTypes.RECEIVE_LISTS) {
    return action.lists;
  }
  if(action.type === ActionTypes.UPDATE_TODO_ITEM) {
    return update(state, {
      [action.index]: { entries: { [action.entryIndex]: {
        $set: action.entry
      }}}
    });
  }
  return state;
}

const rootReducer = combineReducers({
  todoLists
});

export default rootReducer;
