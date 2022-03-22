import React from 'react';
import $ from 'jquery';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allPlayers: [],
      allTeams: [],
      page: 0,
      rowsPerPage: 10,
      filter: '',

    }

    this.getPlayers = this.getPlayers.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.getData = this.getData.bind(this);

    this.handleSearch = this.handleSearch.bind(this);

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.calculateAge = this.calculateAge.bind(this);
    this.findPlayerTeam = this.findPlayerTeam.bind(this);

  }

  componentDidMount() {
    this.getData()
  }

  getPlayers() {
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

  getTeams() {
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

  getData() {
    Promise.all([
    this.getPlayers(),
    this.getTeams()
    ]).then(responses => {
      var teams = [];
      var responseTeams = responses[1].league.standard
      console.log(responseTeams);
      for (var i = 0; i < responseTeams.length; i++) {
        if (responseTeams[i].isNBAFranchise === true) {
          teams.push(responseTeams[i])
        }
      }
      this.setState({
        allPlayers: responses[0].league.standard,
        allTeams: teams
      })
    })
  }

  handleSearch(event) {
    this.setState({
      filter: event.target.value,
      page: 0
    })
  }

  handleChangePage(event, newPage) {
    this.setState({
      page: newPage
    })
  }

  handleChangeRowsPerPage(event) {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
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

  findPlayerTeam(teamId) {
    for (var i = 0; i < this.state.allTeams.length; i++) {
      if (teamId === this.state.allTeams[i].teamId) {
        return this.state.allTeams[i].fullName
      }
    }
    return 'Free Agent'
  }



  render() {
    const filteredNames = this.state.allPlayers.filter(player => {
      return (player.firstName + ' ' + player.lastName).toLowerCase().includes(this.state.filter.toLowerCase())
    });
    console.log(filteredNames);
    return(
      <div className="advancedSearchContent">
        <div>
          <form>
            <label>Search for a player</label> <br/>
            <input type='text' value={this.state.filter} onChange={this.handleSearch}></input>
          </form>
        </div>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={filteredNames.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Team</TableCell>
                <TableCell align="right">Date of Birth&nbsp;(Age)</TableCell>
                <TableCell align="right">Position</TableCell>
                <TableCell align="right">Experience&nbsp;(years)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredNames.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((player) => (
                <TableRow
                  key={player.personId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <a href={`/player/${player.personId}`}>{player.firstName}</a>
                  </TableCell>
                  <TableCell><a href={`/player/${player.personId}`}>{player.lastName}</a></TableCell>
                  <TableCell>{this.findPlayerTeam(player.teamId)}</TableCell>
                  <TableCell align="right">{player.dateOfBirthUTC} ({this.calculateAge(player.dateOfBirthUTC)})</TableCell>
                  <TableCell align="right">{player.pos}</TableCell>
                  <TableCell align="right">{player.yearsPro}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={filteredNames.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
      </div>
    )
  }
}

export default AdvancedSearch;