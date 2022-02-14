import React from 'react';

import PlayerSearch from './PlayerSearch.jsx';
import HighlightedVideo from './HighlightedVideo.jsx';
import TrackerList from './TrackerList.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div class='allcontent'>
        <div class='header'>
          <h3> &nbsp; </h3>
        </div>
        <div class='content_container'>

          <div class='row searchbar'>
            <PlayerSearch/>
          </div>




          <div class='row highlight-video'>
            <HighlightedVideo/>
          </div>


          <div class='Trackerlist'>
            <TrackerList/>
          </div>

          <div class='feed'>
            Feed
          </div>

        </div>


      </div>
    )
  }
}

export default Home;