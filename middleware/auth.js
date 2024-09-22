// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get the token from the request header
  const authHeader = req.header('Authorization'); 
  const token = authHeader && authHeader.split(' ')[1]; 

  // Check if the token is present
  if (!token) {
    console.log('No token found');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
