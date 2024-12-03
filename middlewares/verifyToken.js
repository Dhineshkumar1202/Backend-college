const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';


const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(403).json({ message: 'Access Denied' });
  }

  try {
    
    const tokenWithoutBearer = token.split(' ')[1];
    const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET);

   
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = verifyToken;
