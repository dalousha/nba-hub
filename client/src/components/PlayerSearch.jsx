import React from 'react';

class PlayerSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      userLoggedIn: false
    }

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('userInfo') !== null) {
      this.setState({
        userLoggedIn: true,
        username: JSON.parse(localStorage.getItem('userInfo')).username
      })
    } else {
      this.setState({
        userLoggedIn: false
      })
    }
  }

  onSearchChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    console.log('USERNAME', this.state.username)
    return(
      <div id='searchbar'>
        <br/>
        {this.state.userLoggedIn ? <h4>Welcome, {this.state.username}!</h4> : null}
        <input type="text" placeholder="Search for a Player" value={this.state.search} onChange={this.onSearchChange}></input> <a href='/players'>Advanced Search</a>

      </div>
    )
  }
}

export default PlayerSearch;