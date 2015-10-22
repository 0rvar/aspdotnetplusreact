import * as hooks from './actions/hooks';

import React, { Component, PropTypes } from 'react';
import { Provider} from 'react-redux';
import { Router, Route } from 'react-router';

import configureStore from './store/configureStore';
import history from './history';
import App from './containers/App';
import Lists from './containers/lists/Lists';

const store = configureStore();

export default class Root extends Component {
  render() {
    return(
      <Provider store={store}>
        <Router history={history}>
          <Route component={App}>
            <Route path='/'        component={Lists} onEnter={hooks.indexLists(store)} />
            <Route path='/list/:listId' component={Lists} onEnter={hooks.indexLists(store)} />
            <Route path='*' component={NotFound} />
          </Route>
        </Router>
      </Provider>
    )
  }
}
function NotFound() {
  return (<div>Not found!</div>);
}
function Draft() {
  return (<div>Draft!</div>);
}
