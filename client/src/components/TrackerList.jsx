import React from 'react';
import PlayerCard from './PlayerCard.jsx';

class TrackerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackedPlayers: ['Lebron James', 'Giannis Antetokounpo', 'Stephen Curry', 'Nikola Jokic', 'Kevin Durant', 'Joel Embiid', 'Luka Doncic']
    }
  }

  render() {
    return(
      <div>
        {this.state.trackedPlayers.map((player, index) =>
          <PlayerCard key={index} player={player}/>
        )}
      </div>
    )
  }
}

export default TrackerList;