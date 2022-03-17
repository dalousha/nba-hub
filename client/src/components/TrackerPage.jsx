import React from 'react'
import TrackerList from './TrackerList.jsx';

class TrackerPage extends React.Component {


  render() {
    return(
      <div>
        <iframe src="https://streamable.com/o/rh2xlg" allowfullscreen scrolling="no" allow="encrypted-media;"></iframe>
        <TrackerList/>
      </div>
    )
  }
}

export default TrackerPage;