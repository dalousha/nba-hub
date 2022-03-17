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
      mainPlayerVidId: '',
      redditStreams: [],

    }

    this.getData = this.getData.bind(this);
    this.getWeeklyHighlights = this.getWeeklyHighlights.bind(this);
    this.getDailyHighlights = this.getDailyHighlights.bind(this);
    this.getRedditStreams = this.getRedditStreams.bind(this);

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

  getRedditStreams() {
    return new Promise((resolve, reject) => {
      fetch('https://www.reddit.com/r/nba/hot.json')
        .then(responses => responses.json())
        .then(data => resolve(data))
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
      this.getRedditStreams()
    ]).then(responses => {
      var weeklyVideos = responses[0].items
      var dailyVideos = responses[1].items
      var redditPosts = responses[2].data.children
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


      for (var j = 0; j < redditPosts.length; j++) {
        if (redditPosts[j].data.url.includes('streamable')) {
          let newURL = redditPosts[j].data.url.split('.com').join('.com/o')
          let redditObj = {
            thumbnail: redditPosts[j].data.thumbnail,
            title: redditPosts[j].data.title,
            url: newURL
          }
          this.setState({
            redditStreams: [...this.state.redditStreams, redditObj]
          })
        }
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
            <div>
              <img className="videoThumbnail" src={video.vidObj.snippet.thumbnails.medium.url} alt={`${video.vidObj.id.videoId}`} onClick={this.changeVideo}/>
              {video.vidObj.snippet.title}
            </div>
          )}
        </div>
        <h3>Daily Hightlights</h3>
        <div className='dailyHighlightVideos'>
          {this.state.dailyHighlights.map((video, index) =>
            <div>
              <img className="videoThumbnail" src={video.vidObj.snippet.thumbnails.medium.url} alt={`${video.vidObj.id.videoId}`} onClick={this.changeVideo}/>
              {video.vidObj.snippet.title}
            </div>
          )}
        </div>
        <h3>Reddit Clips</h3>
        <div className='redditStreams'>
          {this.state.redditStreams.slice(0, 5).map((video, index) =>
            <div className="redditClips">
               <iframe className="redditClip" src={`${video.url}`} title={`redditClip${index}`} scrolling="no" allow="encrypted-media fullscreen;"></iframe>
               {video.title}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Videos;