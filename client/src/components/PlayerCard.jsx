import React from 'react';

class PlayerCard extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className='playerCard'>
        <img className='playerPicture' src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${this.props.player.personId}.png`} alt='player headshot'></img>
        <div className='playerInfo'>This is {this.props.player.firstName} {this.props.player.lastName}.</div>
      </div>
    )
  }
}

export default PlayerCard;

