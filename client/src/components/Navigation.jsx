import React from 'react';
import {Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

class Navigation extends React.Component {

  render() {
    return(
      <Navbar
      color="light">
        <Nav>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <UncontrolledDropdown>
            <DropdownToggle nav caret>
              Video Library
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem href="/highlights">
                Game Highlights
              </DropdownItem>
              <DropdownItem href="/reddit-clips">
                Reddit Clips
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink href="/players">Players</NavLink>
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