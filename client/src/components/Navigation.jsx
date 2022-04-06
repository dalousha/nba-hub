import React from 'react';
import {Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: false
    }

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    console.log('local storage: ', localStorage.getItem('userInfo'))
    if (localStorage.getItem('userInfo') !== null) {
      this.setState({
        userLoggedIn: true
      })
    } else {
      this.setState({
        userLoggedIn: false
      })
    }
  }

  handleLogout() {
    localStorage.removeItem('userInfo');
  }

  render() {
    console.log(this.state.userLoggedIn)
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

        </Nav>
        <Nav>
          <NavItem>
            {!this.state.userLoggedIn ? <NavLink href="/login-register">Login/Register</NavLink> : <NavLink href='/login-register' onClick={this.handleLogout}>Logout</NavLink>}
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default Navigation;