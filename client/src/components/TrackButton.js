import React from 'react';

function TrackButton (props) {
  if (props.isUserLoggedIn) {
    return (
      <div>
        {!props.isPlayerTracked ? <button className="track-button" onClick={props.addPlayer}>Track</button> : <button className="track-button" onClick={props.removePlayer}>Untrack</button>}
      </div>
    )
  } else {
    return null
  }
}

export default TrackButton;