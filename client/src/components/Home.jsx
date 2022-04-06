import React from 'react';
import $ from 'jquery';

import PlayerSearch from './PlayerSearch.jsx';
import HighlightedVideo from './HighlightedVideo.jsx';
import TrackerList from './TrackerList.jsx';
import Feed from './Feed.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerIds: ['2544', '203507', '201939', '203999', '201142', '203954', '1629029'],
      trackedPlayers: [],
      players: [],
      teams: []
    }

    this.getPlayers = this.getPlayers.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.getUsersPlayers = this.getUsersPlayers.bind(this);

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

  getUsersPlayers() {
    if (localStorage.getItem('userInfo') !== null) {
      return new Promise((resolve, reject) => {
        $.ajax({
          method: 'GET',
          url: `http://localhost:3001/users/`,
          data: {
            username: JSON.parse(localStorage.getItem('userInfo')).username
          },
          contentType: 'application/json',
          dataType: 'json',
          success: (data) => {
            resolve(data);
          }
        })
      })
    }
    return null
  }

  getData() {
    Promise.all([
      this.getPlayers(),
      this.getTeams(),
      this.getUsersPlayers()
    ]).then(responses => {
      var players = responses[0].league.standard;
      var teams = responses[1].league.standard.filter(team => team.isNBAFranchise === true);
      console.log('responses', responses)
      if (responses[2] !== null) {
        this.setState({
          playerIds: responses[2].trackedPlayers
        })
      } else {
        this.setState({
          playerIds: ['2544', '203507', '201939', '203999', '201142', '203954', '1629029']
        })
      }

      console.log('wtf playerIds', this.state.playerIds)
      var playerIds = this.state.playerIds
      var trackedPlayers = [];

      for (var i = 0; i < playerIds.length; i++) {
        for (var j = 0; j < players.length; j++) {
          if (playerIds[i] === players[j].personId) {
            trackedPlayers.push(players[j])
          }
        }
      }

      this.setState({
        players: players,
        trackedPlayers: trackedPlayers,
        teams: teams
      })

    })
  }

  render() {
    console.log(this.state)
    return(
      <div className='allcontent'>
        <div className='header'>
          <h3> &nbsp; </h3>
        </div>
        <div className='content_container'>

          <div className='row searchbar'>
            <PlayerSearch/>
          </div>

          <div className='row highlight-video'>
            <HighlightedVideo/>
          </div>

          <div className='Trackerlist'>
            <h4>Player Tracker</h4>
            <TrackerList players={this.state.players} teams={this.state.teams} trackedPlayers={this.state.trackedPlayers}/>
          </div>

          <div className='feed'>
            <Feed players={this.state.players} trackedPlayers={this.state.trackedPlayers}/>
          </div>

        </div>


      </div>
    )
  }
}

export default Home;