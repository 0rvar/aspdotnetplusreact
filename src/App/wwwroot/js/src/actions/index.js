import history from '../history';
import Api from '../data/api';

export const RECEIVE_LISTS = 'receive_lists';
export function action_fetch_lists(style) {
  return (dispatch) => {
    Api.getLists().then((lists) => {
      dispatch({
        type: RECEIVE_LISTS,
        lists
      });
    });
  };
}

export function action_create_list(title) {
  return (dispatch) => {
    Api.createList(title).then(({lists, index}) => {
      dispatch({
        type: RECEIVE_LISTS,
        lists
      });
      history.pushState({}, `/${index}`);
    });
  };
}

export const UPDATE_TODO_ITEM = 'update_todo_item';
export function action_update_todo_item(index, entryIndex, entry) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_TODO_ITEM,
      index, entryIndex, entry
    });
    Api.updateListEntry(index, entryIndex, entry);
  }
}
