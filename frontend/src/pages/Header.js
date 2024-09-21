import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Auth/Login'; 
import Register from '../components/Auth/Register'; 

function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    alert('Logged out successfully');
    window.location.reload();
  };

  return (
    <header className="header">
      <img 
        src="/images/logo.png" 
        alt="Logo" 
        className="logo" 
        onClick={() => navigate('/')} 
        style={{ cursor: 'pointer' }}
      />
      <h1 className="welcome">Welcome to ZzHobby</h1>
      {username ? (
        <div className="user-info">
          <span className="welcome-text">Hi, {username}</span>
          <button className="btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="auth-buttons">
            <Login />  
            <Register /> 
        </div>
      )}
    </header>
  );
}

export default Header;
