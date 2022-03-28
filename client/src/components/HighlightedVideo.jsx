import React from 'react';
import $ from 'jquery';
import { youtubeAPI } from '../token.js';

class HighlightedVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoObj: {},
      videoId: ''
    }

    this.getHighlightedVideo = this.getHighlightedVideo.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getHighlightedVideo() {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
          key: youtubeAPI,
          part: 'snippet',
          channelId: 'UC-XWpctw55Q6b_AHo8rkJgw',
          maxResults: 1,
          order: 'date',
          type: 'video'
        },
        datatype: 'json',
        success: (data) => {
          resolve(data);
        }
      })
    })
  }

  getData() {
    Promise.all([
      this.getHighlightedVideo()
    ]).then(responses => {
      console.log(responses[0].items[0].id.videoId)
      this.setState({
        videoObj: responses[0].items[0],
        videoId: responses[0].items[0].id.videoId
      })
    })
  }

  render() {
    return(
      <div id='highlighedVideo'>
        <h4 id='highlightedVideoHeading'>Highlighted Video</h4>
         <iframe
          width="784"
          height="441"
          src={`https://www.youtube.com/embed/${this.state.videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen/>

      </div>
    )
  }
}

export default HighlightedVideo;
