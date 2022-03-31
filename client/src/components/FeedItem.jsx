import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

class FeedItem extends React.Component {
  constructor(props) {
    super(props)

  }


  render() {
    let item = this.props.item
    if (item.media === 'reddit') {
      return(
      <div className="feedItemContainer redditItem">
        <a href={item.url}><img className="feedLogo" src='https://www.redditinc.com/assets/images/site/reddit-logo.png' alt='redditLogo'></img></a>
        <div className="feedItem">{item.title}</div>
      </div>
      )
    } else if (item.media === 'twitter') {
      return(
        <div className="embeddedTweet">
        <TwitterTweetEmbed tweetId={item.id}/>
        </div>
      )
    }

  }

}

export default FeedItem;