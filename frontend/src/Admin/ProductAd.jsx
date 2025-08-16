import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Button, Box, CircularProgress
} from '@mui/material';
import { deleteProduct, findProducts } from '../Store/ProductAction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../Pages/Loader';

const ProductAd = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.product);

  const filters = {
    category: ["Saree","Women Tops","Women Kurta","Men Pant","Men Shirt"],
    colors: [],
    sizes: [],
    minPrice: 0,
    maxPrice: 100000,
    minDiscount: 0,
    sort: "price_low",
    stock: "",
    pageNumber: 0,
    pageSize: 50
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId, filters));
  };

  useEffect(() => {
    dispatch(findProducts(filters));
  }, [dispatch]);

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <div style={{ backgroundColor: "#01090C"}}>
      {/* Toast container for notifications */}
      <ToastContainer />

      <TableContainer component={Paper} sx={{ backgroundColor: '#0F1A1C' }}>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow>
              {["Image", "Title", "Category", "Price", "Quantity", "Delete"].map((header) => (
                <TableCell
                  key={header}
                  sx={{ color: "#DCE3E9", fontWeight: "bold" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.content?.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Avatar src={product.imageUrl} alt={product.title} />
                </TableCell>
                <TableCell sx={{ color: "#DCE3E9" }}>{product.title}</TableCell>
                <TableCell sx={{ color: "#DCE3E9" }}>{product.category?.name}</TableCell>
                <TableCell sx={{ color: "#DCE3E9" }}>₹{product.discountedPrice}</TableCell>
                <TableCell sx={{ color: "#DCE3E9" }}>{product.quantity}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(product._id)} variant="contained" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {products?.content?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: "#DCE3E9" }}>
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductAd;
