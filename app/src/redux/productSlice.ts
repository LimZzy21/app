import { createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import { CommentProd, Product, ProductState } from "./types";
import { NewProduct } from "../models";

const API_URL = "http://localhost:5000/api/products";

const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Server error";
  }
  return "Unknown error occurred";
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Product[]>(API_URL);
      console.log("fetching", response.data);

      return response.data;
    } catch (error) {
      console.log("failed");

      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct: NewProduct, { rejectWithValue }) => {
    try {
      const response = await axios.post<Product>(API_URL, newProduct);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (updatedProduct: Product, { rejectWithValue }) => {
    try {
      const response = await axios.put<Product>(
        `${API_URL}/${updatedProduct._id}`,
        updatedProduct
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (_id: string) => {
    const response = await axios.get(`${API_URL}/${_id}`);
    return response.data;
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";

export const addCommentProd = createAsyncThunk<
  { productId: string; comment: CommentProd }, 
  { productId: string; text: string } 
>("products/comment", async ({ productId, text }) => {
  const response = await fetch(`${API_URL}/api/products/comments/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ text }), 
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }

  const data = await response.json(); 

  return {
    productId,
    comment: data.product.comments
  };
});




const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  product: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null; 
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      
      
      
      
  },
});

export default productsSlice.reducer;
