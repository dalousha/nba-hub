import React from 'react';

class PlayerProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerId: window.location.pathname.split('/player/')[1]
    }
  }



  render() {
    return(
      <div>
        Welcome to Player Profile.
      </div>
    )
  }
}

export default PlayerProfile;