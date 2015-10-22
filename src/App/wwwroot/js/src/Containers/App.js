import React, { Component, PropTypes } from 'react';
import { Navbar, NavBrand, Nav, NavItem} from 'react-bootstrap';

export default class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Navbar>
          <NavBrand>React-Bootstrap</NavBrand>
          <Nav activeKey={1}>
            <NavItem eventKey={1} href="/post/new">Home</NavItem>
            <NavItem eventKey={2} href="/post/new">New list</NavItem>
          </Nav>
        </Navbar>
        {children}
      </div>
    );
  }
}
