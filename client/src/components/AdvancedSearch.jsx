import React from 'react';
import $ from 'jquery';

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allPlayers: [],
      allTeams: []
    }

    this.getPlayers = this.getPlayers.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.getData = this.getData.bind(this);

  }

  componentDidMount() {
    this.getData()
  }

  getPlayers() {
    return new Promise ((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `http://data.nba.net/10s/prod/v1/2021/players.json`,
        dataType: 'json',
        success: (data) => {
          resolve(data);
        }
      })
    })
  }

  getTeams() {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `https://data.nba.net/10s/prod/v1/2021/teams.json`,
        dataType: 'json',
        success: (data) => {
          resolve(data);
        }
      })
    })
  }

  getData() {
    Promise.all([
    this.getPlayers(),
    this.getTeams()
    ]).then(responses => {
      var teams = [];
      var responseTeams = responses[1].league.standard
      console.log(responseTeams);
      for (var i = 0; i < responseTeams.length; i++) {
        if (responseTeams[i].isNBAFranchise === true) {
          teams.push(responseTeams[i])
        }
      }
      this.setState({
        allPlayers: responses[0].league.standard,
        allTeams: teams
      })
    })
  }



  render() {
    return(
      <div className="advancedSearchContent">
        <div>
          <form>
            <label>Search for a player</label> <br/>
            <input type='text'></input>
          </form>
        </div>

        <div className='playersTable'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Position</th>
              <th>Experience</th>
            </tr>
          </thead>
        {this.state.allPlayers.map((player, key) => {

          return (
            <tbody key={key}>
              <tr>
                <td>{player.firstName}</td>
                <td>{player.lastName}</td>
                <td>{player.pos}</td>
                <td>{player.yearsPro}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
        </div>


      </div>
    )
  }
}

export default AdvancedSearch;