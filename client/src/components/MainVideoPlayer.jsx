import React from 'react';

class MainVideoPlayer extends React.Component {

  render() {
    return(
      <iframe
        width="784"
        height="441"
        src={`https://www.youtube.com/embed/${this.props.videoId}`}
        title="Youtube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }
}

export default MainVideoPlayer;