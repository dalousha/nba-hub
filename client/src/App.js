import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation.jsx'
import Home from './components/Home.jsx'
import AdvancedSearch from './components/AdvancedSearch.jsx'

import './App.css';

function App() {
  return (
    <>
      <Navigation/>
      <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/highlights"/>
          <Route path="players" element={<AdvancedSearch />}/>
          <Route path="tracker"/>
          <Route exact path="/SignIn"/>
        </Routes>
    </>
  );
}

export default App;
