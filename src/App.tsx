import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Nav from './screens/Nav/Nav';
import Home from './screens/Home/Home';
import Auth from './screens/Auth/Auth';
import UserProfile from './screens/UserProfile/UserProfile';
import Price from './screens/Price/Price';
import './App.css';

function App() {
  return (
    <Authenticator.Provider>
      <Router>
        <div className="app">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/price" element={<Price />} />
          </Routes>
        </div>
      </Router>
    </Authenticator.Provider>
  );
}

export default App;
