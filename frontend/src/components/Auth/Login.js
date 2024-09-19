import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css'; // Custom CSS for modal styling

Modal.setAppElement('#root'); // Accessibility feature to avoid issues with screen readers

function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

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
        // Assume the backend sends back a token and username
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        setMessage('Login successful');
        toggleModal();
        window.location.reload(); // Reload to update login status
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
      <Modal isOpen={isOpen} onRequestClose={toggleModal} contentLabel="Login Modal">
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
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
        <button onClick={toggleModal} className="btn">Close</button>
      </Modal>
    </div>
  );
}

export default Login;
