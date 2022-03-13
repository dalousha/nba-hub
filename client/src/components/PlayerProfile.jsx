import React from 'react';
import $ from 'jquery';
import FeedItem from './FeedItem.jsx'
import { youtubeAPI } from '../token.js'


class PlayerProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerId: window.location.pathname.split('/player/')[1],
      playerObj: {},
      playerTeam: {},
      feedItems: []
    }

    this.getPlayerObj = this.getPlayerObj.bind(this);
    this.getPlayerTeam = this.getPlayerTeam.bind(this);
    this.getData = this.getData.bind(this);
    this.calculateAge = this.calculateAge.bind(this);
    this.getRedditPosts = this.getRedditPosts.bind(this);
    this.getTwitterPosts = this.getTwitterPosts.bind(this);
    this.getYoutubeVideos = this.getYoutubeVideos.bind(this)
  }

  componentDidMount() {
    this.getData()

  }

  getPlayerObj() {
    return new Promise ((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `http://data.nba.net/10s/prod/v1/2021/players.json`,
        dataType: 'json',
        success: (data) => {
          resolve(data);
        }
      })
    })
  }

  getPlayerTeam() {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `https://data.nba.net/10s/prod/v1/2021/teams.json`,
        dataType: 'json',
        success: (data) => {
          resolve(data);
        }
      })
    })
  }

  getRedditPosts () {
    fetch('https://www.reddit.com/r/nba/hot.json')
      .then(responses => responses.json())
      .then(data => {
        console.log(data.data.children)
        for (var i = 0; i < data.data.children.length; i++) {
          if (data.data.children[i].data.title.includes(this.state.playerObj.firstName)) {
            let redditPostObj = {
              media: 'reddit',
              title: data.data.children[i].data.title,
              url: data.data.children[i].data.url,
              createdAt: data.data.children[i].data.created * 1000
            }
            console.log(i)
            this.setState({
              feedItems: [...this.state.feedItems, redditPostObj]
            })
          }
        }
      })
  }

  getTwitterPosts(fName, lName) {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3001/tweets',
      data: {
        playerName: fName + ' ' + lName
      },
      contentType: 'application/json',
      dataType: 'json',
      success: (data) => {
        console.log('tweet data', data)
        for (var i = 0; i < data.length; i++) {
            if (data[i].retweeted_status === undefined) {
            let date = new Date(data[i].created_at)
            let tweetObj = {
              media: 'twitter',
              id: data[i].id_str,
              createdAt: date.getTime()
            }
            this.setState({
              feedItems: [...this.state.feedItems, tweetObj]
            })
          }
        }

      }
    })

  }

  getYoutubeVideos(fName, lName) {
    $.ajax({
      method: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      data: {
        key: youtubeAPI,
        part: 'snippet',
        q: fName + ' ' + lName,
        channelId: 'UCRkBwWuLEig7FWaIrGmx',
        maxResults: 3,
        type: 'video'
      },
      success: (data) => {
        console.log(data);
      }
    })
  }

  getData() {
    this.getRedditPosts();
    Promise.all([
      this.getPlayerObj(),
      this.getPlayerTeam(),
    ]).then(responses => {
      var players = responses[0].league.standard
      var teams = responses[1].league.standard

      for (var i = 0; i < players.length; i++) {
        if (this.state.playerId === players[i].personId) {
          for (var j = 0; j < teams.length; j++) {
            if (players[i].teamId === teams[j].teamId) {
              this.setState({
                playerObj: players[i],
                playerTeam: teams[j],
                pickNum: players[i].draft.pickNum,
                pickYear: players[i].draft.seasonYear,
                pickRound: players[i].draft.roundNum
              })
            }
            if (players[i].draft.teamId === teams[j].teamId) {
              this.setState({
                pickTeam: teams[j].nickname
              })
            }
          }
          this.getYoutubeVideos(players[i].firstName, players[i].lastName)
          this.getTwitterPosts(players[i].firstName, players[i].lastName)
        }
      }

    })
  }

  calculateAge(dob) {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }


  render() {
    let playerObj = this.state.playerObj
    console.log(this.state.feedItems)
    let feedItems = this.state.feedItems.sort(function(a, b) {
      return b.createdAt - a.createdAt
    })
    return(
      <div className='playerProfileContainer'>
        <div className="playerProfile">
        <img className='playerProfilePicture' src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${this.state.playerId}.png`} alt='player headshot'></img>

        <div className="playerInfo">
          <h5>Player Info</h5>
          <table className="playerTable">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{playerObj.firstName} {playerObj.lastName}</td>
              </tr>
              <tr>
                <td>Jersey Number</td>
                <td>{playerObj.jersey}</td>
              </tr>
              <tr>
                <td>Position</td>
                <td>{playerObj.pos}</td>
              </tr>
              <tr>
                <td>Team</td>
                <td>{this.state.playerTeam.fullName}</td>
              </tr>
              <tr>
                <td>Birthday</td>
                <td>{playerObj.dateOfBirthUTC} (age {this.calculateAge(playerObj.dateOfBirthUTC)})</td>
              </tr>
              <tr>
                <td>College</td>
                <td>{playerObj.collegeName}</td>
              </tr>
              <tr>
                <td>Listed Height</td>
                <td>{playerObj.heightFeet} ft {playerObj.heightInches} in ({playerObj.heightMeters} m)</td>
              </tr>
              <tr>
                <td>Listed Weight</td>
                <td>{playerObj.weightPounds} lbs ({playerObj.weightKilograms} kg)</td>
              </tr>
              <tr>
                <td>Draft</td>
                <td>{this.state.pickYear} | Round: {this.state.pickRound} | Pick: {this.state.pickNum} Team: {this.state.pickTeam}</td>
              </tr>

            </tbody>
          </table>
        </div>

          {this.state.playerTeam.fullName}
        </div>
        <div className='playerFeed'>
          Welcome to the player profile of {playerObj.firstName} {playerObj.lastName}.
          <div>
            {feedItems.map((item, index) =>
              <FeedItem key={index} item={item}/>
            )}
          </div>
        </div>

      </div>
    )
  }
}

export default PlayerProfile;