import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';

import history from '../../history';
import CreateNewForm from '../../components/lists/CreateNewForm';
import TodoList from './TodoList';
import { action_create_list } from '../../actions';

class ListsContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  getCurrentList() {
    let currentList = this.props.params.listId;
    if(typeof(currentList) === 'undefined') {
      currentList = null;
    } else if(currentList !== null && !isNaN(currentList)) {
      return parseInt(currentList, 10);
    }
    if(currentList === null) {
      return -1;
    }
    return currentList;
  }

  handleSelect(id) {
    const currentList = this.getCurrentList();
    if(id === currentList) {
      return;
    }
    if(id === -1) {
      history.pushState({}, '/');
    } else {
      history.pushState({}, `/${id}`)
    }
  }

  render() {
    const { lists, dispatch } = this.props;
    const currentList = this.getCurrentList();

    const onCreateNew = (title) => dispatch(action_create_list(title));

    return (
      <div>
        <h1>Here be lists!</h1>
        <Tabs activeKey={currentList} onSelect={(id) => this.handleSelect(id)}>
          <Tab eventKey={-1} title="Create new">
            <CreateNewForm onCreate={onCreateNew} />
          </Tab>
          {lists.map((list, i) => (
            <Tab key={i} eventKey={i} title={list.title}>
              <TodoList index={i} />
            </Tab>
          ))}
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.todoLists
  }
}

export default connect(mapStateToProps)(ListsContainer);
