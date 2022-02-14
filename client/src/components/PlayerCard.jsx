import React from 'react';

class PlayerCard extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className='playerCard'>
        <div className='playerPicture'>Image</div>
        <div className='playerInfo'>This is a {this.props.player} card.</div>
      </div>
    )
  }
}

export default PlayerCard;