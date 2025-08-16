const CustomOrder = require('../Models/Custom');
const cloudinary = require('../config/cloudinary');

// const createCustomOrder = async (data, files) => {
//   // files is an array of uploaded files (multer)
//   const photoUrls = files ? files.map(file => file.filename) : [];

//   const newOrder = new CustomOrder({
//     firstname: data.firstname,
//     lastname: data.lastname,
//     address: data.address,
//     city: data.city,
//     state: data.state,
//     zip: data.zip,
//     phone: data.phone,
//     material: data.material,
//     colour: data.colour,
//     size: data.size,
//     dressType: data.dressType,
//     photos: photoUrls,
//     user: data.userId || null,
//   });

//   const savedOrder = await newOrder.save();
//   return savedOrder;
// };

const createCustomOrder = async (data, files) => {
  let photoUrls = [];
  if (files && files.length) {
    for (const file of files) {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = "data:" + file.mimetype + ";base64," + b64;
      const uploadRes = await cloudinary.uploader.upload(dataURI, { folder: "customOrders" });  // Use await!
      photoUrls.push(uploadRes.secure_url);  // Use secure_url!
    }
  }
  const newOrder = new CustomOrder({
    ...data,
    photos: photoUrls,
    user: data.userId || null,
  });
  return await newOrder.save();
};

const getAllCustomOrders = async () => {
  return await CustomOrder.find().sort({ createdAt: -1 }).lean();
};
const updateOrderStatus = async (id, status) => {
  return await CustomOrder.findByIdAndUpdate(
    id,
    { isCompleted: status },
    { new: true }
  );
}
module.exports = { createCustomOrder, getAllCustomOrders,updateOrderStatus };
