import React from 'react';

class HighlightedVideo extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return(
      <div id='highlighedVideo'>
         <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/-_3b9H2y9Y8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen/>

      </div>
    )
  }
}

export default HighlightedVideo;
