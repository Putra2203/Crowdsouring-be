const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided or invalid format!" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "YOUR_SECRET_KEY", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token!" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
