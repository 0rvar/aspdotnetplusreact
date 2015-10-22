import React, { Component, PropTypes } from 'react';
import {  Input } from 'react-bootstrap';

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
