import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home'; // Import HomePage from Home.js
import Register from './components/Auth/Register'; // Your Register component
import Login from './components/Auth/Login'; // Your Login component
import CreatePost from './components/Post/CreatePost'; // Your Login component

import './App.css'; // Import your CSS

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
