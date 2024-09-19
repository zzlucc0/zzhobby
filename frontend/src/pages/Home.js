import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Login from '../components/Auth/Login'; // Import Login
import Register from '../components/Auth/Register'; // Import Register

const modelImages = [
  "/images/model_kit_1.webp",
  "/images/model_kit_2.webp",
  "/images/model_kit_3.webp"
];

function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    alert('Logged out successfully');
    window.location.reload();
  };

  return (
    <div className="homepage">
      <header className="header">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <h1>Welcome to ZzHobby</h1>
        {token ? (
          <div className="user-info">
            <span className="welcome-text">Welcome, {username}</span>
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Login />  {/* Display Login Modal */}
            <Register /> {/* Display Register Modal */}
          </div>
        )}
      </header>
      <div className="main-content">
        <h2>Model Kit Showcase</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="swiper-container"
        >
          {modelImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Model Kit ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HomePage;
