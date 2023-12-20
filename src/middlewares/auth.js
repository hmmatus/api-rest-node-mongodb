const jwt = require("jsonwebtoken");

const verifiedToken = (req, res, next) => {
  let token = req.get("Authorization");
  jwt.verify(token, process.env.SEED, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        error,
      });
    }
    req.user = decoded.user;
    next();
  });
};

module.exports = verifiedToken;
