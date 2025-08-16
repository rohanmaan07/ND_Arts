const jwtProvider = require("../config/jwtProvider.js");
const userService = require("../Services/UserS.js");


const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log("Token:", token)
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const userId = jwtProvider.getUserIdFromToken(token);
    if (!userId) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    req.user = user;
    req.userId = user._id; // <== Add this line
    
    
    next();
  } catch (error) {
    console.error("Authentication Middleware Error:", error.message);
    res.status(500).json({ message: "Authentication failed" });
  }
};

module.exports = authenticate;
