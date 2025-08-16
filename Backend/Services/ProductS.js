const mongoose = require("mongoose");
const Product = require("../Models/product");
const Category = require("../Models/category");


async function createProduct(reqData) {
  console.log("🟠 Service received category:", reqData.category);

  let categoryId;

  if (reqData.category) {
    categoryId = new mongoose.Types.ObjectId(reqData.category);
  }

  if (!categoryId) {
    throw new Error("Category ID is required.");
  }

  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountPercent: reqData.discountPercent || 0,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    size: reqData.size,
    quantity: reqData.quantity,
    category: categoryId,
    thirdLevelCategory: reqData.thirdLevelCategory,
  });

  console.log("🟢 Final category ID going to DB:", categoryId);

  return await product.save();
}



async function deleteProduct(productId) {
  // check if product exists before deleting (optional)
  const product = await findProductById(productId);
  await Product.findByIdAndDelete(productId);
  return "Product deleted successfully";
}

async function updateProduct(productId, reqData) {
  await findProductById(productId);

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    reqData,
    { new: true }
  );

  return updatedProduct;
}

const findProductById = async (id) => {
  console.log("🔎 ProductService received ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid product ID");
  }

  try {
    const product = await Product.findById(id).populate("category").exec();
    if (!product) throw new Error("Product not found");

    console.log("✅ ProductService found product:", product.title);
    return product;
  } catch (err) {
    console.error("❌ ProductService error:", err.message);
    throw err;
  }
};

// async function getAllProducts(reqQuery) {
//   let {
//     category,
//     color,
//     sizes,
//     minPrice,
//     maxPrice,
//     minDiscount,
//     sort,
//     stock,
//     pageNumber,
//     pageSize,
//   } = reqQuery;

//   pageSize = parseInt(pageSize) || 10;
//   pageNumber = parseInt(pageNumber) || 1;

//   let query = Product.find().populate("category");

//   // Category filter
//   if (category) {
//     const existCategory = await Category.findOne({ name: category });
//     if (existCategory) {
//       query = query.where("category").equals(existCategory._id);
//     } else {
//       return { content: [], currentPage: 1, totalPages: 0 };
//     }
//   }

//   // Color filter
//   if (color) {
//     const colorSet = new Set(
//       color.split(",").map((c) => c.trim().toLowerCase())
//     );

//     const colorRegex =
//       colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

//     if (colorRegex) {
//       query = query.where("color").regex(colorRegex);
//     }
//   }

//   // Size filter
//   if (sizes) {
//     const sizeSet = new Set(sizes.split(",").map((size) => size.trim()));

//     query = query.where("size.name").in([...sizeSet]);  // note corrected "size" key as per model
//   }

//   // Price range filter
//   if (minPrice && maxPrice) {
//     query = query.where("price").gte(minPrice).lte(maxPrice);
//   }

//   // Minimum discount
//   if (minDiscount) {
//     query = query.where("discountPercent").gte(minDiscount);  // typo fix here
//   }

//   // Stock filter
//   if (stock) {
//     if (stock === "in_stock") {
//       query = query.where("quantity").gt(0);
//     } else if (stock === "out_of_stock") {
//       query = query.where("quantity").lte(0);
//     }
//   }

//   // Sort
//   if (sort) {
//     const sortDirection = sort === "price_high" ? -1 : 1;
//     query = query.sort({ discountedPrice: sortDirection });
//   }

//   // Count total documents for pagination
//   const totalProducts = await Product.countDocuments(query.getFilter());

//   // Pagination
//   const skip = (pageNumber - 1) * pageSize;
//   query = query.skip(skip).limit(pageSize);

//   // Execute query
//   const products = await query.exec();

//   const totalPages = Math.ceil(totalProducts / pageSize);

//   return {
//     content: products,
//     currentPage: pageNumber,
//     totalPages,
//   };
// }

// Other functions unchanged...

async function getAllProducts(reqQuery) {
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  pageSize = parseInt(pageSize) || 10;
  pageNumber = parseInt(pageNumber) || 1;

  let query = Product.find().populate("category");

  // Multi-category filter (comma separated categories)
  if (category) {
    const categoryNames = category.split(",").map((c) => c.trim());
    const categories = await Category.find({ name: { $in: categoryNames } });
    if (categories.length > 0) {
      const categoryIds = categories.map((cat) => cat._id);
      query = query.where("category").in(categoryIds);
    } else {
      // If no matching categories found, return empty result
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }

  // Color filter
  if (color) {
    const colorSet = new Set(
      color.split(",").map((c) => c.trim().toLowerCase())
    );
    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    if (colorRegex) {
      query = query.where("color").regex(colorRegex);
    }
  }

  // Size filter
  if (sizes) {
    const sizeSet = new Set(sizes.split(",").map((size) => size.trim()));
    query = query.where("size.name").in([...sizeSet]);
  }

  // Price range filter
  if (minPrice && maxPrice) {
    query = query.where("price").gte(minPrice).lte(maxPrice);
  }

  // Minimum discount
  if (minDiscount) {
    query = query.where("discountPercent").gte(minDiscount);
  }

  // Stock filter
  if (stock) {
    if (stock === "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock === "out_of_stock") {
      query = query.where("quantity").lte(0);
    }
  }

  // Sort
  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  // Count total documents for pagination
  const totalProducts = await Product.countDocuments(query.getFilter());

  // Pagination
  const skip = (pageNumber - 1) * pageSize;
  query = query.skip(skip).limit(pageSize);

  // Execute query
  const products = await query.exec();

  const totalPages = Math.ceil(totalProducts / pageSize);

  return {
    content: products,
    currentPage: pageNumber,
    totalPages,
  };
}



// Fix for createMultipleproduct parameter and usage
async function createMultipleproduct(products) {
  for (let product of products) {
    await createProduct(product);
  }
}

const getProductsByCategory = async (categoryName, limit = 0, sort = { createdAt: -1 }) => {
  // find category (if you want only level 3 categories, add level: 3)
  const category = await Category.findOne({ name: categoryName });
  if (!category) return [];

  let query = Product.find({ category: category._id }).populate("category");

  // apply sort (default: newest first)
  if (sort) query = query.sort(sort);

  // apply limit if provided (>0)
  if (limit && Number(limit) > 0) {
    query = query.limit(Number(limit));
  }

  return await query.exec();
};
const getProductsExcludingCategories = async (excludeCategoryNames) => {
  // Find category IDs for names to exclude
  const excludedCategories = await Category.find({
    name: { $in: excludeCategoryNames }
  }).select("_id");

  const excludedCategoryIds = excludedCategories.map(cat => cat._id);

  // Fetch products that are NOT in excluded categories
  return Product.find({
    category: { $nin: excludedCategoryIds }
  }).lean();
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleproduct,
  getProductsByCategory,
  getProductsExcludingCategories
};
