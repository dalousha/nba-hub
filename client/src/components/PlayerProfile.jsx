import React from 'react';
import $ from 'jquery';
import FeedItem from './FeedItem.jsx'
import { youtubeAPI } from '../token.js'


class PlayerProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlayerTracked: true,
      playerId: window.location.pathname.split('/player/')[1],
      playerObj: {},
      playerTeam: {},
      seasonStats: {},
      careerStats: {},
      feedItems: []
    }

    this.checkTrackList = this.checkTrackList.bind(this);

    this.getPlayerObj = this.getPlayerObj.bind(this);
    this.getPlayerTeam = this.getPlayerTeam.bind(this);
    this.getData = this.getData.bind(this);
    this.calculateAge = this.calculateAge.bind(this);
    this.getRedditPosts = this.getRedditPosts.bind(this);
    this.getTwitterPosts = this.getTwitterPosts.bind(this);
    this.getYoutubeVideos = this.getYoutubeVideos.bind(this);
    this.getPlayerStats = this.getPlayerStats.bind(this);

    this.addPlayer = this.addPlayer.bind(this);
  }

  componentDidMount() {
    this.getData()
  }

  checkTrackList() {
    if (localStorage.getItem('userInfo') !== null) {
      return new Promise((resolve, reject) => {
        $.ajax({
          method: 'GET',
          url: `http://localhost:3001/users/`,
          data: {
            username: JSON.parse(localStorage.getItem('userInfo')).username
          },
          contentType: 'application/json',
          dataType: 'json',
          success: (data) => {
            resolve(data);
          }
        })
      })
    } else {
      var promise = Promise.resolve(null)
      return promise;
    }
  }

  addPlayer() {
    $.ajax({
      method: 'POST',
      url: `http://localhost:3001/trackedPlayers`,
      data: {
        username: JSON.parse(localStorage.getItem('userInfo')).username,
        playerId: (this.state.playerId)
      },
      dataType: 'json',
      success: (data) => {
        console.log('successfully posted... data: ', data)
        this.setState({isPlayerTracked: true})
      }
    })
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

  getPlayerStats(playerId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `https://data.nba.net/data/10s/prod/v1/2021/players/${playerId}_profile.json`,
        dataType: 'json',
        success: (data) => {
          resolve(data)
        }
      })
    })
  }

  getRedditPosts () {
    return new Promise((resolve, reject) => {
      fetch('https://www.reddit.com/r/nba/hot.json?limit=100')
      .then(responses => responses.json())
      .then(data => {
        resolve(data)
      })
    })
  }

  getTwitterPosts(fName, lName) {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: 'http://localhost:3001/tweets',
        data: {
          playerName: fName + ' ' + lName
        },
        contentType: 'application/json',
        dataType: 'json',
        success: (data) => {
          resolve(data)
        }
      })
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
    Promise.all([
      this.getPlayerObj(),
      this.getPlayerTeam(),
      this.checkTrackList()
    ]).then(responses => {
      var players = responses[0].league.standard
      var teams = responses[1].league.standard
      if (responses[2] !== null) {
        if (!responses[2].trackedPlayers.includes(this.state.playerId)) {
          this.setState({
            isPlayerTracked: false
          })
        }
      }

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
          Promise.all([
            this.getPlayerStats(this.state.playerObj.personId),
            this.getRedditPosts(),
            this.getTwitterPosts(this.state.playerObj.firstName, this.state.playerObj.lastName)
          ]).then(responses => {
            var seasonStats = responses[0].league.standard.stats.latest
            var careerStats = responses[0].league.standard.stats.careerSummary
            var redditPosts = responses[1].data.children
            var tweets = responses[2]

            this.setState({
              seasonStats: seasonStats,
              careerStats: careerStats
            })

            for (var i = 0; i < redditPosts.length; i++) {
              if (redditPosts[i].data.title.includes(this.state.playerObj.firstName) && redditPosts[i].data.title.includes(this.state.playerObj.lastName)) {
                let redditPostObj = {
                  media: 'reddit',
                  title: redditPosts[i].data.title,
                  url: redditPosts[i].data.url,
                  createdAt: redditPosts[i].data.created * 1000
                }
                console.log(i)
                this.setState({
                  feedItems: [...this.state.feedItems, redditPostObj]
                })
              }
            }

            for (var j = 0; j < tweets.length; j++) {
              if (tweets[j].retweeted_status === undefined) {
              let date = new Date(tweets[j].created_at)
              let tweetObj = {
                media: 'twitter',
                id: tweets[j].id_str,
                createdAt: date.getTime()
              }
              this.setState({
                feedItems: [...this.state.feedItems, tweetObj]
              })
            }
          }
          })
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
    let feedItems = this.state.feedItems.sort(function(a, b) {
      return b.createdAt - a.createdAt
    })
    console.log(feedItems)
    let seasonStats = this.state.seasonStats
    let careerStats = this.state.careerStats
    return(
      <div className='playerProfileContainer'>
        <div className="playerProfile">
        <img className='playerProfilePicture' src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${this.state.playerId}.png`} alt='player headshot'></img>

        <div className="playerInfo">
          {!this.state.isPlayerTracked ? <button className="track-button" onClick={this.addPlayer}>Track</button> : null}
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
                <td>{this.state.pickYear} | Round: {this.state.pickRound} | Pick: {this.state.pickNum}
                </td>
              </tr>
              <tr>
                <td>Draft Team</td>
                <td>{this.state.pickTeam}</td>
              </tr>

            </tbody>
          </table>
        </div>
          <h5 id="statsHeader">Player Stats</h5>
          <h7 className="statsHeading">Season Averages</h7>
          <table className="statsTable">
            <tbody>
              <tr>
                <td>Points</td>
                <td>{seasonStats.ppg}</td>
              </tr>
              <tr>
                <td>Assists</td>
                <td>{seasonStats.apg}</td>
              </tr>
              <tr>
                <td>Rebounds</td>
                <td>{seasonStats.rpg}</td>
              </tr>
              <tr>
                <td>Steals</td>
                <td>{seasonStats.spg}</td>
              </tr>
              <tr>
                <td>Blocks</td>
                <td>{seasonStats.bpg}</td>
              </tr>
              <tr>
                <td>Field Goal Percentage</td>
                <td>{seasonStats.fgp} %</td>
              </tr>
              <tr>
                <td>Free Throw Percentage</td>
                <td>{seasonStats.ftp} %</td>
              </tr>
              <tr>
                <td>Games Played</td>
                <td>{seasonStats.gamesPlayed}</td>
              </tr>
              <tr>
                <td>Games Started</td>
                <td>{seasonStats.gamesStarted}</td>
              </tr>
            </tbody>
          </table>
          <h7 className="statsHeading">Career Averages</h7>
          <table className="statsTable">
            <tbody>
              <tr>
                <td>Points</td>
                <td>{careerStats.ppg}</td>
              </tr>
              <tr>
                <td>Assists</td>
                <td>{careerStats.apg}</td>
              </tr>
              <tr>
                <td>Rebounds</td>
                <td>{careerStats.rpg}</td>
              </tr>
              <tr>
                <td>Steals</td>
                <td>{careerStats.spg}</td>
              </tr>
              <tr>
                <td>Blocks</td>
                <td>{careerStats.bpg}</td>
              </tr>
              <tr>
                <td>Field Goal Percentage</td>
                <td>{careerStats.fgp} %</td>
              </tr>
              <tr>
                <td>Free Throw Percentage</td>
                <td>{careerStats.ftp} %</td>
              </tr>
              <tr>
                <td>Games Played</td>
                <td>{careerStats.gamesPlayed}</td>
              </tr>
              <tr>
                <td>Games Started</td>
                <td>{careerStats.gamesStarted}</td>
              </tr>
            </tbody>
          </table>
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