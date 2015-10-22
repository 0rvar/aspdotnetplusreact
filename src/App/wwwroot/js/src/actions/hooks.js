import request from 'superagent';

import {
  action_fetch_lists
} from './index';

export function indexLists(store) {
  return () => {
    const lists = store.getState().todoLists;
    if(lists.length < 1) {
      store.dispatch(action_fetch_lists());
    }
  };
}
