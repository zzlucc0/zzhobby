import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request
      const res = await api.post('/auth/login', formData);

      // Ensure res.data contains the token and username
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token); // Store token
        localStorage.setItem('username', res.data.username); // Store username
        setMessage('Login successful! Redirecting to home...');
        navigate('/'); // Redirect to homepage after login
      } else {
        setMessage('Login failed: No token received.');
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data && error.response.data.message) {
        setMessage('Error: ' + error.response.data.message);
      } else {
        setMessage('An error occurred during login.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
