import React, { Component, PropTypes } from 'react';
import { ListGroupItem, ListGroup, Input } from 'react-bootstrap';
import { connect } from 'react-redux';

import { action_update_todo_item } from '../../actions';

class TodoEntry extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    onChange: PropTypes.func
  }
  changed(attr) {
    return (e) => {
      const { text, done } = this.props;

      let value = e.target.value;
      if(value === 'on') {
        value = e.target.checked;
      }
      console.log(attr, value);
      this.props.onChange({
        text, done,
        [attr]: value
      });
    };
  }
  render() {
    const { text, done } = this.props;
    const checkbox = <input id={text} type="checkbox" checked={done} onChange={this.changed('done')} />;
    if(done) {
      return (
        <div>
          {checkbox}
          <label htmlFor={text}>{text}</label>
        </div>
      )
    } else {
      return (
        <div>
          <Input type="text" addonBefore={checkbox} value={text} onChange={this.changed('text')} />
        </div>
      );
    }
  }
}

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
