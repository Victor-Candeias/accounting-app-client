import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import MainMenu from './components/MainMenu'; // Import MainMenu component

function App() {
  return (
    <Router>
      <div className="App">
        <h1>User Authentication System</h1>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainmenu" element={<MainMenu />} />
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
