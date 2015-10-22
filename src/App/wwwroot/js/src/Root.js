import React, { Component, PropTypes } from 'react';
import { createHistory } from 'history';
import { Provider} from 'react-redux';
import { Router, Route } from 'react-router';

import configureStore from './store/configureStore';
import App from './containers/App';

const store = configureStore();
const history = createHistory();

// TODO remove
const hooks = { editPost: () => console.log('editPost hook') };

export default class Root extends Component {
  render() {
    return(
      <Provider store={store}>
        <Router history={history}>
          <Route component={App}>
            <Route path='/post/:id/edit' name='editPost' component={Draft}
                   onEnter={hooks.editPost(store)}/>
            <Route path='/post/new' component={Draft}/>
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
