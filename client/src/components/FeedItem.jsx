import React from 'react';

class FeedItem extends React.Component {
  constructor(props) {
    super(props)

  }


  render() {
    let item = this.props.item
    return(
      <div className="feedItemContainer">
        <a href={item.url}><img className="feedLogo" src='https://www.redditinc.com/assets/images/site/reddit-logo.png' alt='feedLogo'></img></a>
        <div>{item.title}</div>
      </div>
    )
  }

}

export default FeedItem;