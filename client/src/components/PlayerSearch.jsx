import React from 'react';

class PlayerSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    return(
      <div id='searchbar'>
        <br/>
        <input type="text" placeholder="Search for a Player" value={this.state.search} onChange={this.onSearchChange}></input> <a href='/players'>Advanced Search</a>

      </div>
    )
  }
}

export default PlayerSearch;