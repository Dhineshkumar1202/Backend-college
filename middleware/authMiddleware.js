const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; // Make sure this matches the secret key used when generating the token

// protect middleware to verify token
const protect = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Remove 'Bearer ' prefix and verify the token
    const tokenWithoutBearer = token.split(' ')[1];
    const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET);

    // Attach user info to the request object
    req.user = decoded; // Contains id, username, and role (from token)
    next(); // Pass control to the next middleware/route handler
  } catch (err) {
    console.error('Token verification failed:', err.message); // Log the error for debugging
    return res.status(400).json({ message: 'Token is not valid' });
  }
};

// authorize middleware to check for required roles
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: You do not have access to this route' });
    }
    next();
  };
};

module.exports = { protect, authorize };
