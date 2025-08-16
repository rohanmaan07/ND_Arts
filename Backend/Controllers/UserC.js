const userService = require("../Services/UserS");
const User=require("../Models/user")
const Address = require("../Models/address");

// const getUserProfile = async (req, res) => {
//   try {
//     const jwt = req.headers.authorization?.split(" ")[1]; // Extract token after "Bearer"

//     if (!jwt) {
//       return res.status(404).send({ error: "token not found" });
//     }

//     const user = await userService.getUserProfileByToken(jwt);

//     return res.status(200).send(user);
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };

const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization?.split(" ")[1];
    if (!jwt) {
      return res.status(404).send({ error: "token not found" });
    }
    // yahan populate add karo:
    const userId = jwtProvider.getUserIdFromToken(jwt);
    const user = await User.findById(userId).populate({
      path: "address",
      options: { sort: { updatedAt: -1 },limit: 1  }  // 👈 ye line important hai
    });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};



const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;  // Auth middleware se milta hai
    let updates = req.body;

    // Agar frontend se address object aaya hai to usko alag Address collection me save karo
    if (updates.address && typeof updates.address === "object" && !Array.isArray(updates.address)) {
      // User field zarur set karo
      const newAddress = new Address({
        ...updates.address,
        user: userId // Required field to link Address to User
      });
      await newAddress.save();

      // User document me address ObjectId push karo
      await User.findByIdAndUpdate(userId, { $push: { address: newAddress._id } });

      // Updates se address hatao, baaki fields ke liye
      delete updates.address;
    }

    // Baaki user ke fields update karo
    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).populate("address");;

    if (!user)
      return res.status(404).json({ error: "User not found" });

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};




module.exports = { getUserProfile, getAllUsers ,updateUserProfile};
