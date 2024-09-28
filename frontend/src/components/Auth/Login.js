import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css'; 
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // Accessibility feature to avoid issues with screen readers

function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  // Toggle modal open/close
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend API endpoint
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
   
      if (response.ok) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', data.username);
        setMessage('Login successful');
        toggleModal();
        navigate('/');
        window.location.reload(); 
      } else {
        setMessage(data.message || 'Invalid email or password');
      }
    } catch (error) {
      setMessage('Login failed. Please try again later.');
    }
  };

  return (
    <div>
      <button onClick={toggleModal} className="btn">Login</button>
      <Modal isOpen={isOpen} onRequestClose={toggleModal} contentLabel="Login Modal" style={{
                overlay: {
                  position: 'fixed',
                  zIndex: 1020,
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  background: 'rgba(255, 255, 255, 0.75)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                content: {
                  background: 'white',
                  width: '30rem',
                  height:'35rem',
                  maxWidth: 'calc(100vw - 2rem)',
                  maxHeight: 'calc(100vh - 2rem)',
                  overflowY: 'auto',
                  position: 'relative',
                  justifyContent: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '0.3rem',
                }}}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input 
            className='input-login'
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className='input-login'
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className='submit-btn'>Submit</button>
        </form>
        {message && <p>{message}</p>}
        <button onClick={toggleModal} className="btn">Close</button>
      </Modal>
    </div>
  );
}

export default Login;
