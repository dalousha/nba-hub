import React from 'react';
import FeedItem from './FeedItem.jsx';

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerNames: [],
      feedItems: []
    }
  }




  render() {
    // console.log(this.state.feedItems)
    var realFeedItems = []
    let feedItems = this.props.feedItems.sort(function(a, b) {
      return b.createdAt - a.createdAt
    })
    for (var i = 0; i < feedItems.length; i++) {
      for (var j = 0; j < this.props.trackedPlayers.length; j++) {
        if (feedItems[i].title.includes(this.props.trackedPlayers[j].firstName)) {
          realFeedItems.push(feedItems[i])
        }
      }
    }
    console.log('feedItems: ', feedItems)
    console.log('adjusted: ', realFeedItems)
    var uniqueFeedItems = [...new Set(realFeedItems)];
    console.log('most adjusted: ', uniqueFeedItems)
    return(
      <div className="feedContainer">
        <h4>Feed</h4>
        {uniqueFeedItems.map((item, index) =>
          <FeedItem key={index} item={item}/>
        )}
      </div>
    )
  }
}

export default Feed;