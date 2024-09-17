import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);

      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token); 
        setMessage('Registration successful! Redirecting to home...');
        navigate('/'); 
      } else {
        setMessage('Registration failed: No token received.');
      }
    } catch (error) {

      if (error.response && error.response.data && error.response.data.message) {
        setMessage('Error: ' + error.response.data.message);
      } else {
        setMessage('An error occurred during registration.');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
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
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
