import React from 'react';
import $ from 'jquery';
import { youtubeAPI } from '../token.js';

import MainVideoPlayer from './MainVideoPlayer.jsx';

class Videos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weeklyHighlights: [],
      dailyHighlights: [],
      fullGameHighlights: [],
      mainPlayerVidId: '',

    }

    this.getData = this.getData.bind(this);
    this.getWeeklyHighlights = this.getWeeklyHighlights.bind(this);
    this.getDailyHighlights = this.getDailyHighlights.bind(this);
    this.getFullGameHighlights = this.getFullGameHighlights.bind(this);

    this.changeVideo = this.changeVideo.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getWeeklyHighlights() {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
          key: youtubeAPI,
          part: 'snippet',
          q: 'allintitle: "week"',
          channelId: 'UCWJ2lWNubArHWmf3FIHbfcQ',
          maxResults: 5,
          order: 'date',
          type: 'video'
        },
        success: (data) => {
          resolve(data);
        }
      })
    })
  }

  getDailyHighlights() {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
          key: youtubeAPI,
          part: 'snippet',
          q: 'allintitle: "of the night"',
          channelId: 'UCWJ2lWNubArHWmf3FIHbfcQ',
          maxResults: 5,
          order: 'date',
          type: 'video'
        },
        success: (data) => {
          resolve(data);
        }
      })
    })
  }

  getFullGameHighlights() {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
          key: youtubeAPI,
          part: 'snippet',
          q: 'allintitle: "Full Game Highlights"',
          channelId: 'UCWJ2lWNubArHWmf3FIHbfcQ',
          maxResults: 5,
          order: 'date',
          type: 'video'
        },
        success: (data) => {
          resolve(data);
        }
      })
    })
  }

  changeVideo(e) {
    if (e.target.getAttribute('alt') !== this.state.mainPlayerVidId) {
      this.setState({mainPlayerVidId: e.target.getAttribute('alt')})
    }

  }

  getData() {
    Promise.all([
      this.getWeeklyHighlights(),
      this.getDailyHighlights(),
      this.getFullGameHighlights()
    ]).then(responses => {
      var weeklyVideos = responses[0].items
      var dailyVideos = responses[1].items
      var fullGameVideos = responses[2].items
      console.log('responses', responses)
      for (var i = 0; i < weeklyVideos.length; i++) {
        var videoObj = {
          vidObj: weeklyVideos[i],
          videoId: weeklyVideos[i].id.videoId
        }
        this.setState({
          weeklyHighlights: [...this.state.weeklyHighlights, videoObj]
        })
      }
      this.setState({
        mainPlayerVidId: this.state.weeklyHighlights[0].videoId
      })

      for (var k = 0; k < dailyVideos.length; k++) {
        var dailyVideoObj = {
          vidObj: dailyVideos[k]
        }
        this.setState({
          dailyHighlights: [...this.state.dailyHighlights, dailyVideoObj]
        })
      }

      for (var jj = 0; jj < fullGameVideos.length; jj++) {
        var fullGameVideoObj = {
          vidObj: fullGameVideos[jj]
        }
        this.setState({
          fullGameHighlights: [...this.state.fullGameHighlights, fullGameVideoObj]
        })
      }
    })
  }

  render() {
    console.log('this state: ', this.state)
    return(
      <div className='videosContainer'>
        <div className='mainVideo'>
          <MainVideoPlayer videoId={this.state.mainPlayerVidId}/>
        </div>
        <h3>Weekly Highlights</h3>
        <div className='weeklyHighlightVideos'>
          {this.state.weeklyHighlights.map((video, index) =>
            <div className="vidColumn">
              <img className="videoThumbnail" src={video.vidObj.snippet.thumbnails.medium.url} alt={`${video.vidObj.id.videoId}`} onClick={this.changeVideo}/>
              <br/>
              {video.vidObj.snippet.title}
            </div>
          )}
        </div>
        <h3>Daily Hightlights</h3>
        <div className='dailyHighlightVideos'>
          {this.state.dailyHighlights.map((video, index) =>
            <div className="vidColumn">
              <img className="videoThumbnail" src={video.vidObj.snippet.thumbnails.medium.url} alt={`${video.vidObj.id.videoId}`} onClick={this.changeVideo}/>
              {video.vidObj.snippet.title}
            </div>
          )}
        </div>
        <h3>Full Game Highlights</h3>
        <div className='fullGameHighlights'>
          {this.state.fullGameHighlights.map((video, index) =>
            <div className="vidColumn">
              <img className="videoThumbnail" src={video.vidObj.snippet.thumbnails.medium.url} alt={`${video.vidObj.id.videoId}`} onClick={this.changeVideo}/>
              {video.vidObj.snippet.title}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Videos;