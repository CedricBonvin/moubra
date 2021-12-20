




   
const jwt = require('jsonwebtoken');
require("dotenv").config()

module.exports = (req, res, next) => {
  try {
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `clef de malade`);
    const userId = decodedToken.userId;
    if (req.body.user._id && req.body.user._id !== userId) {
      res.status(400).json({message : "invalide token"});
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
      err : "Token invalid"
    });
  }
};