import { Routes, Route } from 'react-router-dom';

import logo from './logo.svg';
import Navigation from './components/Navigation.jsx'

import './App.css';

function App() {
  return (

    <div className="App">
    <div>
      <Navigation/>
      <Routes>
          <Route exact path="/"/>
          <Route path="/highlights"/>
          <Route path="players" />
          <Route path="tracker"/>
          <Route exact path="/SignIn"/>
        </Routes>
    </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
