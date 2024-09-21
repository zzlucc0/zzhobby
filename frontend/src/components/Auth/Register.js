import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css'; // Custom CSS for modal styling

Modal.setAppElement('#root'); // Accessibility feature to avoid issues with screen readers

function Register() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to your backend API to register a new user
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the backend returns a token and username
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', data.username);
        setMessage('Sign up successful');
        toggleModal();
        window.location.reload(); // Reload to update login status
      } else {
        setMessage(data.message || 'Sign up failed');
      }
    } catch (error) {
      setMessage('Sign up failed. Please try again later.');
    }
  };

  return (
    <div>
      <button onClick={toggleModal} className="btn">Sign Up</button>
      <Modal isOpen={isOpen} onRequestClose={toggleModal} contentLabel="Sign Up Modal" style={{
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
        <h2>Sign Up</h2>
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
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
        <button onClick={toggleModal} className="btn">Close</button>
      </Modal>
    </div>
  );
}

export default Register;
