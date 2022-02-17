import React from 'react';

class PlayerCard extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      playerTeam: {}
    }
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
  }

  render() {

    return(
      <div className='playerCard'>
        <img className='playerPicture' src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${this.props.player.personId}.png`} alt='player headshot'></img>
        <div className='playerInfo'>
        <h6><a href={`/player/${this.props.player.personId}`}>{this.props.player.firstName} {this.props.player.lastName}</a></h6>
        {this.state.playerTeam.fullName}
        </div>

      </div>
    )
  }
}

export default PlayerCard;

