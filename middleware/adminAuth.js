const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

// Middleware to authenticate token and check admin role
const authToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);

  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  try {
    
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    

    // Attach user info to the request for use in other routes
    req.user = decoded;

    next();  // Proceed to the next middleware or route handler

  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};


// middleware to check admin role

const isAdmin = (req, res, next) => {
  if (req.user.is_admin !== true) {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();  // If admin, continue
};

module.exports = { authToken, isAdmin };
