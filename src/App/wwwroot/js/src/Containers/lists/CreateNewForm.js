import React, { Component, PropTypes } from 'react';
import { Grid, Col, Row, Input, ButtonInput, Panel } from 'react-bootstrap';

export default class CreateNewForm extends Component {
  static propTypes = {
    onCreate: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }



  handleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();
    const { onCreate } = this.props;
    const { title } = this.state;
    const { disabled } = validate(title);
    if(disabled) {
      return;
    }
    onCreate(title);
    this.setState({title: ''});
  }

  render() {
    const { title } = this.state;
    const { buttonStyle, disabled } = validate(title);
    return (
      <form style={{padding: '20px 0'}} onSubmit={this.submit}>
        <Grid>
          <Row>
            <Col xs={12} md={8}>
              <Input type="text" value={title} onChange={this.handleChange} />
            </Col>
            <Col xs={6} md={4}>
              <ButtonInput type='submit' value="Create new list" bsStyle={buttonStyle} bsSize="large" disabled={disabled} />
            </Col>
          </Row>
        </Grid>
      </form>
    );
  }
}

function validate(title) {
  let length = title.length;
  let buttonStyle = 'danger';

  if (length > 4) buttonStyle = 'success';
  else if (length > 2) buttonStyle = 'warning';

  let disabled = buttonStyle !== 'success';

  return { buttonStyle, disabled };
}
