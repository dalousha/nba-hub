import React from 'react';

import PlayerSearch from './PlayerSearch.jsx';
import HighlightedVideo from './HighlightedVideo.jsx';
import TrackerList from './TrackerList.jsx';
import Feed from './Feed.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className='allcontent'>
        <div className='header'>
          <h3> &nbsp; </h3>
        </div>
        <div className='content_container'>

          <div className='row searchbar'>
            <PlayerSearch/>
          </div>

          <div className='row highlight-video'>
            <HighlightedVideo/>
          </div>

          <div className='Trackerlist'>
            <h4>Player Tracker</h4>
            <TrackerList/>
          </div>

          <div className='feed'>
            <Feed/>
          </div>

        </div>


      </div>
    )
  }
}

export default Home;