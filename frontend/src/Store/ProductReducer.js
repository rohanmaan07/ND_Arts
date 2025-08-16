// import {
//   FIND_PRODUCTS_REQUEST,
//   FIND_PRODUCTS_SUCCESS,
//   FIND_PRODUCTS_FAILURE,
//   FIND_PRODUCT_BY_ID_REQUEST,
//   FIND_PRODUCT_BY_ID_SUCCESS,
//   FIND_PRODUCT_BY_ID_FAILURE,

//   CREATE_PRODUCT_REQUEST,
//   CREATE_PRODUCT_SUCCESS,
//   CREATE_PRODUCT_FAILURE,
//   DELETE_PRODUCT_REQUEST,
//   DELETE_PRODUCT_SUCCESS,
//   DELETE_PRODUCT_FAILURE,
// } from "./ProductActionTyp";

// const initialState = {
//   products: [],
//   product: null,
//   loading: false,
//   error: null,
  
// };

// // const customerProductReducer = (state = initialState, action) => {
// //   switch (action.type) {
// //     case FIND_PRODUCTS_REQUEST:
// //     case FIND_PRODUCT_BY_ID_REQUEST:
// //       return { ...state, loading: true, error: null };

// //     case FIND_PRODUCTS_SUCCESS:
// //       return {
// //         ...state,
// //         loading: false,
// //         products: action.payload,
// //         error: null,
// //       };

// //     case FIND_PRODUCT_BY_ID_SUCCESS:
// //       return {
// //         ...state,
// //         loading: false,
// //         product: action.payload,
// //         error: null,
// //       };
    
// //     case FIND_PRODUCTS_FAILURE:
// //     case FIND_PRODUCT_BY_ID_FAILURE:
// //       return { ...state, loading: false, error: action.payload };

// //     default:
// //       return state;
// //   }
// // };
// const customerProductReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // Loading start for all request actions
//     case FIND_PRODUCTS_REQUEST:
//     case FIND_PRODUCT_BY_ID_REQUEST:
//     case CREATE_PRODUCT_REQUEST:
//     case DELETE_PRODUCT_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };

//     // Success when fetching products
//     case FIND_PRODUCTS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         products: action.payload,
//       };

//     // Success when fetching single product
//     case FIND_PRODUCT_BY_ID_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         product: action.payload,
//       };

//     // Success when creating a product
//     case CREATE_PRODUCT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         products: [...state.products, action.payload], // add new product
//       };

//     // Success when deleting a product
//     // Reducer me:
// case DELETE_PRODUCT_SUCCESS:
//   return {
//     ...state,
//     loading: false,
//     products: {
//       ...state.products,
//       content: state.products.content.filter(
//         (product) => product._id !== action.payload
//       ),
//     },
//   };


//     // All failure cases
//     case FIND_PRODUCTS_FAILURE:
//     case FIND_PRODUCT_BY_ID_FAILURE:
//     case CREATE_PRODUCT_FAILURE:
//     case DELETE_PRODUCT_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// export default customerProductReducer;
// ProductReducer.js


import {
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,

  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from "./ProductActionTyp";
const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  
};
const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCTS_REQUEST:
    case FIND_PRODUCT_BY_ID_REQUEST:
    case CREATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };

    case FIND_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };

    case FIND_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: false, product: action.payload };

    case CREATE_PRODUCT_SUCCESS:
      // Agar array hai to append karo
      if (Array.isArray(state.products)) {
        return { 
          ...state,
          loading: false, 
          products: [...state.products, action.payload] 
        };
      }
      // Agar paginated object hai to content me push karo
      if (state.products && Array.isArray(state.products.content)) {
        return {
          ...state,
          loading: false,
          products: {
            ...state.products,
            content: [...state.products.content, action.payload],
          },
        };
      }
      return { ...state, loading: false };

    case DELETE_PRODUCT_SUCCESS:
      // ✅ Agar products ek simple array hai
      if (Array.isArray(state.products)) {
        return {
          ...state,
          loading: false,
          products: state.products.filter(
            (product) => product._id !== action.payload
          ),
        };
      }
      // ✅ Agar products ek paginated object hai
      if (state.products && Array.isArray(state.products.content)) {
        return {
          ...state,
          loading: false,
          products: {
            ...state.products,
            content: state.products.content.filter(
              (product) => product._id !== action.payload
            ),
          },
        };
      }
      return { ...state, loading: false };

    case FIND_PRODUCTS_FAILURE:
    case FIND_PRODUCT_BY_ID_FAILURE:
    case CREATE_PRODUCT_FAILURE:
    case DELETE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};


export default customerProductReducer;