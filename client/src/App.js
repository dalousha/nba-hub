import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation.jsx';
import Home from './components/Home.jsx';
import AdvancedSearch from './components/AdvancedSearch.jsx';
import PlayerProfile from './components/PlayerProfile.jsx';
import Videos from './components/Videos.jsx';
import RedditClips from './components/RedditClips.jsx';
import LoginRegister from './components/LoginRegister.js';

import './App.css';

class App extends React.Component {
  componentDidMount() {
    console.log('DALTON XUE: ', JSON.parse(localStorage.getItem('userInfo')))
  }

  render() {
    return (
      <>
        <Navigation/>
        <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/highlights" element={<Videos />}/>
            <Route path="/reddit-clips" element={<RedditClips />}/>
            <Route path="/players" element={<AdvancedSearch />}/>
            <Route path="/player/:personId" element={<PlayerProfile />}></Route>
            <Route exact path="/login-register" element={<LoginRegister />}/>
          </Routes>
      </>
    );
  };
}


export default App;
