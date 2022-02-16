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
      setPage: 0,
      rowsPerPage: 10
    }

    this.getPlayers = this.getPlayers.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.getData = this.getData.bind(this);

    this.createTable = this.createTable.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

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

  createTable(name, age, position, experience) {
    return { name, age, position, experience };
  }


  render() {
    return(
      <div className="advancedSearchContent">
        <div>
          <form>
            <label>Search for a player</label> <br/>
            <input type='text'></input>
          </form>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={this.state.allPlayers.length}
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
                <TableCell align="right">Date of Birth</TableCell>
                <TableCell align="right">Position</TableCell>
                <TableCell align="right">Experience&nbsp;(years)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.allPlayers.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((player) => (
                <TableRow
                  key={player.personId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {player.firstName}
                  </TableCell>
                  <TableCell>{player.lastName}</TableCell>
                  <TableCell>{player.teamId}</TableCell>
                  <TableCell align="right">{player.dateOfBirthUTC}</TableCell>
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
          count={this.state.allPlayers.length}
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