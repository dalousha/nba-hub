import React from 'react';
import $ from 'jquery';

class PlayerCard extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      playerTeam: {},
      playerStats: {},
    }

    this.getPlayerStats = this.getPlayerStats.bind(this);
  }

  componentDidMount() {
    for (var i = 0; i < this.props.teams.length; i++) {
      if (this.props.player.teamId === this.props.teams[i].teamId) {
        this.setState({
          playerTeam: this.props.teams[i]
        })
        break;
      }
    }
    Promise.all([
      this.getPlayerStats(this.props.player.personId)
    ]).then(responses => {
      var seasonStats = responses[0].league.standard.stats.latest
      this.setState({
        playerStats: seasonStats
      })
    })
  }

  getPlayerStats(playerId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `https://data.nba.net/10s/prod/v1/2021/players/${playerId}_profile.json`,
        dataType: 'json',
        success: (data) => {
          resolve(data)
        }
      })
    })
  }

  render() {
    return(
      <div className='playerCard'>
        <img className='playerPicture' src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${this.props.player.personId}.png`} alt='player headshot'></img>
        <div className='playerInfo'>
        <h6><a href={`/player/${this.props.player.personId}`}>{this.props.player.firstName} {this.props.player.lastName}</a></h6>
        {this.state.playerTeam.fullName}
        <div className="playerCardStats">
          Season Averages
          <br/>
          {this.state.playerStats.ppg}/{this.state.playerStats.apg}/{this.state.playerStats.rpg}
        </div>
        </div>

      </div>
    )
  }
}

export default PlayerCard;

