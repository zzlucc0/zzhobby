// server.js
const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const cors = require('cors');


dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
}));

app.use(express.json());

const authRoutes = require('./routes/authRoutes');

// 使用路由
app.use('/auth', authRoutes); 

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('send_message', (data) => {
    io.to(data.to_user_id).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
