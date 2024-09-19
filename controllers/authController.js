// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user instance
      user = new User({
        username,
        email,
        password,
      });
  
      // Encrypt the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save the user to the database
      await user.save();
  
      // Generate a JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      // Sign the JWT and send it as a response
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };

exports.login = async (req, res) => {
   // Check if user is already logged in by verifying JWT from the request header
   const token = req.header('x-auth-token');
   if (token) {
     try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       return res.status(400).json({ message: 'User is already logged in' });
     } catch (err) {
       // Token is invalid, proceed with login
     }
   }
 
   const { email, password } = req.body;
 
   try {
     // Check if the user exists
     let user = await User.findOne({ email });
     if (!user) {
       return res.status(400).json({ message: 'Invalid credentials' });
     }
 
     // Compare the entered password with the stored hashed password
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
       return res.status(400).json({ message: 'Invalid credentials' });
     }
 
     // Generate a JWT token
     const payload = {
       user: {
         id: user.id,
       },
     };
 
     // Sign the JWT and send it as a response
     jwt.sign(
       payload,
       process.env.JWT_SECRET,
       { expiresIn: '1h' },
       (err, token) => {
         if (err) throw err;
         res.json({ token,username: user.username });
       }
     );
   } catch (error) {
     console.error(error.message);
     res.status(500).send('Server error');
   }
};

exports.logout = (req, res) => {
    // Frontend will handle the removal of JWT from storage
    res.json({ message: 'User logged out successfully' });
  };