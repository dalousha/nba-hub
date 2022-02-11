import React from 'react';
import {Navbar, Nav, NavItem, NavLink} from 'reactstrap';

class Navigation extends React.Component {

  render() {
    return(
      <Navbar>
        <Nav>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/highlights">Highlight Library</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/players">Players</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/tracker">Tracker</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login-register">Login/Register</NavLink>
          </NavItem>

        </Nav>
      </Navbar>
    )
  }
}

export default Navigation;