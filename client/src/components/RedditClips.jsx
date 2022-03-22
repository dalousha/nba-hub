import React from 'react';

class RedditClips extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redditStreams: []
    }

    this.getRedditStreams = this.getRedditStreams.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getRedditStreams() {
    return new Promise((resolve, reject) => {
      fetch('https://www.reddit.com/r/nba/hot.json')
        .then(responses => responses.json())
        .then(data => resolve(data))
    })
  }

  getData() {
    Promise.all([
      this.getRedditStreams()
    ]).then(responses => {
      var redditPosts = responses[0].data.children
      for (var i = 0; i < redditPosts.length; i++) {
        if (redditPosts[i].data.url.includes('streamable')) {
          let newURL = redditPosts[i].data.url.split('.com').join('.com/o')
          let redditObj = {
            title: redditPosts[i].data.title,
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
    return(
      <div className="redditClipContainer">
        <h2 className="redditHeader">Reddit Clips</h2>
        <div className="redditStreams">
          {this.state.redditStreams.slice(0, 6).map((video, index) =>
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

export default RedditClips;