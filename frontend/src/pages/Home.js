import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,Autoplay } from 'swiper/modules';
import Header from './Header';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CreatePost from '../components/Post/CreatePost'; 
import PostList from '../components/Post/PostList';

const modelImages = [
  "/images/model_kit_1.webp",
  "/images/model_kit_2.webp"
];

function HomePage() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  // const username = localStorage.getItem('username');
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

  const handleCreatePost = () => {
    if (token) {
      navigate('/create-post'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <div className="homepage">
      <Header /> 
      <div className="main-content">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="swiper-container"
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          loop={true} 
          modules={[Navigation, Pagination, Autoplay]}
          
        >
          {modelImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Model Kit ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="main-content">
        <button onClick={handleCreatePost} className="btn">
          Create Post
        </button>
        <PostList /> 
      </div>
    </div>
  );
}

export default HomePage;
