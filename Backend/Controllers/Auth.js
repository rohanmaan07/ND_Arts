const userService = require("../Services/UserS.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcryptjs");
const User=require("../Models/user.js")

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// const cartService=require("../Services/CartS.js");

const register = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }
    // Uske baad createUser call karo...
    const user = await userService.createUser(req.body);
    const jwt = jwtProvider.generateToken(user._id);
    return res.status(200).send({ jwt, message: "register success" });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).send({ error: error.message });
  }
};

// const login = async (req, res) => {
//   const { password, email } = req.body;
//   try {
//     const user = await userService.getUserByEmail(email);
    
//     if (!user) {
//       return res.status(404).send({ message: `User not found with email: ${email}` });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).send({ message: "Invalid Password..." });
//     }

//     const jwt = jwtProvider.generateToken(user._id);

//     // Remove sensitive info like password before sending
//     const userData = {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role
//       // add more fields if needed
//     };

//     return res.status(200).send({ jwt, user: userData, message: "login success" });
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await userService.getUserByEmail(email); // populated address ke sath

    if (!user) {
      return res.status(404).send({ message: `User not found with email: ${email}` });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid Password..." });
    }

    const jwt = jwtProvider.generateToken(user._id);

    // password hata ke safe user object banao
    const { password: pwd, ...safeUser } = user.toObject();

    // populated user object safeUser me address bhi hoga
    return res.status(200).send({ jwt, user: safeUser, message: "login success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// const googleLogin = async (req, res) => {
//   try {
//     const { credential } = req.body; // Frontend se token milega
//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();

//     // Console log karo apne debugging ke liye:
//     console.log("Google payload:", payload);

//     // User database me check karo
//     let user = await userService.getUserByEmail(payload.email);
//     if (!user) {
//       // User nahi mila, toh create karo with firstName, lastName from Google payload
//       user = await userService.createUser({
//         firstName: payload.given_name,
//         lastName: payload.family_name,
//         email: payload.email,
//         password: null,  // Google login users ke liye password null
//         role: "user"
//       });
//     }

//     // JWT generate karo
//     const jwt = jwtProvider.generateToken(user._id);

//     // Response me user data bhejo
//     const userData = {
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       role: user.role
//     };

//     return res.status(200).send({ jwt, user: userData, message: "Google login success" });
//   } catch (error) {
//     console.error("Google login error:", error);
//     return res.status(500).send({ error: error.message });
//   }
// };

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Google payload:", payload);

    let user = await userService.getUserByEmail(payload.email);

    if (!user) {
      user = await userService.createUser({
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email,
        password: null,
        role: "user",
      });
    }

    // Populate address before sending
    const userPopulated = await User.findById(user._id).populate("address");

    const jwt = jwtProvider.generateToken(userPopulated._id);

    const { password: pwd, ...safeUser } = userPopulated.toObject();

    return res.status(200).send({ jwt, user: safeUser, message: "Google login success" });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).send({ error: error.message });
  }
};


module.exports = { register, login,googleLogin };
