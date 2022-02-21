import React from 'react';
import $ from 'jquery';


class PlayerProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerId: window.location.pathname.split('/player/')[1],
      playerObj: {},
      playerTeam: {}
    }

    this.getPlayerObj = this.getPlayerObj.bind(this);
    this.getPlayerTeam = this.getPlayerTeam.bind(this);
    this.getData = this.getData.bind(this);
    this.calculateAge = this.calculateAge.bind(this);
  }

  componentDidMount() {
    this.getData()
  }

  getPlayerObj() {
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

  getPlayerTeam() {
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
      this.getPlayerObj(),
      this.getPlayerTeam()
    ]).then(responses => {
      var players = responses[0].league.standard
      var teams = responses[1].league.standard
      for (var i = 0; i < players.length; i++) {
        if (this.state.playerId === players[i].personId) {
          for (var j = 0; j < teams.length; j++) {
            if (players[i].teamId === teams[j].teamId) {
              this.setState({
                playerObj: players[i],
                playerTeam: teams[j]
              })
            }
          }
        }
      }
    })
  }

  calculateAge(dob) {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }


  render() {
    let playerObj = this.state.playerObj
    return(
      <div className='playerProfileContainer'>
        <div className="playerProfile">
        <img className='playerProfilePicture' src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${this.state.playerId}.png`} alt='player headshot'></img>

        <div className="playerInfo">
          <h5>Player Info</h5>
          <table className="playerTable">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{playerObj.firstName} {playerObj.lastName}</td>
              </tr>
              <tr>
                <td>Jersey Number</td>
                <td>{playerObj.jersey}</td>
              </tr>
              <tr>
                <td>Position</td>
                <td>{playerObj.pos}</td>
              </tr>
              <tr>
                <td>Team</td>
                <td>{this.state.playerTeam.fullName}</td>
              </tr>
              <tr>
                <td>Birthday</td>
                <td>{playerObj.dateOfBirthUTC} (age {this.calculateAge(playerObj.dateOfBirthUTC)})</td>
              </tr>
              <tr>
                <td>College</td>
                <td>{playerObj.collegeName}</td>
              </tr>
              <tr>
                <td>Listed Height</td>
                <td>{playerObj.heightFeet} ft {playerObj.heightInches} in ({playerObj.heightMeters} m)</td>
              </tr>
              <tr>
                <td>Listed Weight</td>
                <td>{playerObj.weightPounds} lbs ({playerObj.weightKilograms} kg)</td>
              </tr>
              <tr>
                <td>Draft</td>
                <td>{playerObj.country} | Round: {playerObj.country} | Pick: {playerObj.country}</td>
              </tr>
            </tbody>
          </table>
        </div>

          {this.state.playerTeam.fullName}
        </div>
        <div>
          Welcome to the player profile of {playerObj.firstName} {playerObj.lastName}.
        </div>

      </div>
    )
  }
}

export default PlayerProfile;