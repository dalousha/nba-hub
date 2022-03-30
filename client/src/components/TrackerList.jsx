import React from 'react';

import PlayerCard from './PlayerCard.jsx';

class TrackerList extends React.Component {

  render() {
    return(
      <div>
        {this.props.trackedPlayers.map((player, index) =>
          <PlayerCard key={index} player={player} teams={this.props.teams}/>
        )}
      </div>
    )
  }
}

export default TrackerList;