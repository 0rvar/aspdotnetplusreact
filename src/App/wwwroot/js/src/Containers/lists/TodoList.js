import React, { Component, PropTypes } from 'react';
import { ListGroupItem, ListGroup, Input } from 'react-bootstrap';
import { connect } from 'react-redux';

import TodoEntry from '../../components/lists/TodoEntry';
import { action_update_todo_item } from '../../actions';

export class TodoList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    entries: PropTypes.array.isRequired
  }

  onTodoChanged(entryIndex) {
    return (entry) => {
      const { dispatch, index } = this.props;
      dispatch(action_update_todo_item(index, entryIndex, entry));
    };
  }

  render() {
    const { title, entries } = this.props;
    return (
      <div>
        <h2>{title}</h2>
        <ListGroup>
          {entries.map((entry, i) => (
            <ListGroupItem key={i}>
              <TodoEntry {...entry} onChange={this.onTodoChanged(i)} />
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const list = state.todoLists[ownProps.index];
  return list;
}
export default connect(mapStateToProps)(TodoList);
