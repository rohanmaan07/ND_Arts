const cloudinary = require("../config/cloudinary");
const productService=require("../Services/ProductS");


// const createProduct = async (req, res) => {
//   console.log("🟡 Controller received category:", req.body.category);

//   try {
//     const product = await productService.createProduct(req.body);
//     return res.status(201).send(product);
//   } catch (error) {
//     console.error("Product creation error:", error);
//     return res.status(500).send({ error: error.message });
//   }
// };
const createProduct = async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl || ""; // fallback

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataUri = `data:${req.file.mimetype};base64,${b64}`;
      const uploadRes = await cloudinary.uploader.upload(dataUri, { folder: "products" });
      imageUrl = uploadRes.secure_url;
    }

    const productData = {
      ...req.body,
      imageUrl,
    };

    const product = await productService.createProduct(productData);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.deleteProduct(productId);
    return res.status(200).send(product); // 200 is better for DELETE success
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.updateProduct(productId, req.body);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findProductById = async (req, res) => {
  const productId = req.params.id;
  console.log("Request for product id:", req.params.id);
  try {
    const product = await productService.findProductById(productId);
    console.log("Found product: ", product);

    if (!product) {
      return res.status(404).json({ error: "Product Not Found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    if (error.message === "Invalid product ID" || error.message === "Product not found") {
      return res.status(404).json({ error: error.message });
    }
    console.error("Error in findProductById:", error);
    console.error("❌ Controller Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.query);
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createMultipleproducts = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.createMultipleproduct(req.body);
    return res.status(200).send({message:"Create Succesfully.."}); // use 200 for GET
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getHomePageProducts = async (req, res) => {
  console.log(req.body)

  try {
    const menShirts = await productService.getProductsByCategory("Men Shirt",5);
    const womenKurtas = await productService.getProductsByCategory("Women Kurta",5);
    const sarees = await productService.getProductsByCategory("Saree",5);
    const tops = await productService.getProductsByCategory("Women Tops",5);
    const menPants = await productService.getProductsByCategory("Men Pant",5);

    const data = [
      { sectionName: "Men's Shirt", products: menShirts },
      { sectionName: "Women's Kurta", products: womenKurtas },
      { sectionName: "Saree", products: sarees },
      { sectionName: "Women Tops", products: tops },
      { sectionName: "Men's Pant", products: menPants }
    ];

    return res.status(200).send(data);
  } catch (error) {
    console.error("HomePage Error:", error);
    return res.status(500).send({ error: error.message });
  }
};
const getRemainingClothingProducts = async (req, res) => {
  try {
    // Exclude these categories from query
    const excludeCategories = ["tio"];

    const remainingProducts = await productService.getProductsExcludingCategories(excludeCategories);

    res.status(200).json(remainingProducts);
  } catch (error) {
    console.error("Clothing Page Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports={
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    createMultipleproducts,
    findProductById,
    getHomePageProducts, 
    getRemainingClothingProducts,
}