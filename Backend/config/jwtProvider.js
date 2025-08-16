const jwt = require("jsonwebtoken");
const userService = require("../Services/UserS");
const SECRET_KEY = "jnasiuywhebruytyfgfhytrujasjlkdiuao2gukjnaeyjhiuyewqyhjweui";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await userService.findUserById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Now you'll have req.user._id, req.user.email, etc.
    next();
  } catch (error) {
    console.error("Authentication Middleware Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
};

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded.userId;
  } catch (error) {
    console.error("JWT Decode Error:", error.message);
    return null;
  }
};

module.exports = { authenticate, generateToken, getUserIdFromToken };
