const cloudinary = require('cloudinary').v2;
cloudinary.config(); // This will automatically use process.env.CLOUDINARY_URL
module.exports = cloudinary;
