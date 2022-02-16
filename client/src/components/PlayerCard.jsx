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
        <div className='playerInfo'>This is {this.props.player.firstName} {this.props.player.lastName}, he plays for the {this.state.playerTeam.nickname}. </div>

      </div>
    )
  }
}

export default PlayerCard;

