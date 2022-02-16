import React from 'react';
import $ from 'jquery';

import PlayerCard from './PlayerCard.jsx';

class TrackerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackedPlayers: [],
      players: [],
      allTeams: []
    }

    this.getPlayers = this.getPlayers.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
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
      console.log(responses[0].league.standard);
      var defaultList = ['2544', '203507', '201939', '203999', '201142', '203954', '1629029'];
      var trackedPlayers = [];
      for (var i = 0; i < defaultList.length; i++) {
        for (var j = 0; j < responses[0].league.standard.length; j++) {
          if (defaultList[i] === responses[0].league.standard[j].personId) {
            trackedPlayers.push(responses[0].league.standard[j])
          }
        }
      }
      var teams = [];
      var responseTeams = responses[1].league.standard
      console.log(responseTeams);
      for (var k = 0; k < responseTeams.length; k++) {
        if (responseTeams[k].isNBAFranchise === true) {
          teams.push(responseTeams[k])
        }
      }
      this.setState({
        players: responses[0].league.standard,
        trackedPlayers: trackedPlayers,
        allTeams: teams
      })
    })
  }

  render() {
    return(
      <div>
        {this.state.trackedPlayers.map((player, index) =>
          <PlayerCard key={index} player={player} teams={this.state.allTeams}/>
        )}
      </div>
    )
  }
}

export default TrackerList;