import React from 'react';
import FeedItem from './FeedItem.jsx';

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerNames: [],
      feedItems: []
    }

    this.getPlayerNames = this.getPlayerNames.bind(this);

    this.getRedditPosts = this.getRedditPosts.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getPlayerNames();
    this.getData();
  }

  getPlayerNames() {
    var players = this.props.trackedPlayers;
    var names = [];
    for (var i = 0; i < players.length; i++) {
      var namesObj = {
        firstName: players[i].firstName,
        lastName: players[i].lastName
      }
      names.push(namesObj)
    }
    this.setState({
      playerNames: names
    })
  }

  getRedditPosts() {
    return new Promise((resolve, reject) => {
      fetch('https://www.reddit.com/r/nba/hot.json')
      .then(responses => responses.json())
      .then(data => resolve(data))
    })
  }

  getData() {
    Promise.all([
      this.getRedditPosts()
    ]).then(responses => {
      var redditPosts = responses[0].data.children

      var feedItems = []
      for (var i = 0; i < redditPosts.length; i++) {
        for (var j = 0; j < this.props.trackedPlayers.length; j++) {
          if (redditPosts[i].data.title.includes(this.props.trackedPlayers[j].firstName) && redditPosts[i].data.title.includes(this.props.trackedPlayers[j].lastName)) {
            let redditPostObj = {
              media: 'reddit',
              title: redditPosts[i].data.title,
              url: redditPosts[i].data.url,
              createdAt: redditPosts[i].data.created * 1000
            }
            feedItems.push(redditPostObj)
          }
        }
      }

      var uniqueFeedItems = [...new Set(feedItems)]

      this.setState({
        feedItems: uniqueFeedItems
      })
    })
  }


  render() {
    console.log(this.state.feedItems)
    let feedItems = this.state.feedItems.sort(function(a, b) {
      return b.createdAt - a.createdAt
    })
    return(
      <div className="feedContainer">
        <h4>Feed</h4>
        {feedItems.map((item, index) =>
          <FeedItem key={index} item={item}/>
        )}
      </div>
    )
  }
}

export default Feed;