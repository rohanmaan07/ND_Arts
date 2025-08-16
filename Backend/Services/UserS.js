const bcrypt = require("bcryptjs");
const User = require("../Models/user.js");
const jwtProvider = require("../config/jwtProvider.js");
// const createUser = async (userData) => {
//   try {
//     const { firstName, lastName, email, password } = userData;
//     const isUserExist = await User.findOne({ email });
//     if (isUserExist) {
//       throw new Error("User already exists with email: " + email);
//     }

//     // Hash password
//     let hashedPassword = null;

//     if (password) {
//       hashedPassword = await bcrypt.hash(password, 8);
//     }

//     // Create new user
//     const user = await User.create({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//     });

//     console.log("Created user:", user);
//     return user;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };
const createUser = async (userData) => {
  try {
    const { firstName, lastName, email, password } = userData;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("User already exists with email: " + email);
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 8);
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    console.log("Created user:", user);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId)
    .populate("address");

    if (!user) {
      throw new Error(`User not found with id: ${userId}`);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({email}).populate("address");

    // if (!user) {
    //   throw new Error(`User not found with email: ${email}`);
    // }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);

    const user = await findUserById(userId);

    if (!user) {
      throw new Error(`User not found with id: ${userId}`);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  findUserById,
  getUserProfileByToken,
  getAllUsers,
};
