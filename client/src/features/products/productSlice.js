import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Store } from "lucide-react";
import productService from "./productService";

const productSlice = createSlice({
   name:"products",
   initialState:{
    allProducts:[],
    product:{},
    productLoading:false,
    productSuccess:false,
    productError:false,
    productErrorMessage:"",
    edit:{
          product :{},   
          isEdit : false
        }
       
    },
   reducers:{
      editProduct :(state,action)=>{
        return{
        ...state,
        edit: {product: action.payload, isEdit:true   }
        }
     }
   },
   extraReducers:(builder) =>{
    builder
    .addCase(getProducts.pending,(state,action) => {
        state.productLoading = true
        state.productSuccess = false
        state.productError = false
        
    })
        .addCase(getProducts.fulfilled,(state,action) => {
        state.productLoading = false
        state.allProducts  = action.payload
        state.productSuccess = true
        state.productError = false
       
    })
        .addCase(getProducts.rejected,(state,action) => {
        state.productLoading = false
        state.productSuccess = false
        state.productError = true
        state.productErrorMessage = action.payload
    })

      .addCase(getProduct.pending,(state,action) => {
        state.productLoading = true
        state.productSuccess = false
        state.productError = false
        
    })
        .addCase(getProduct.fulfilled,(state,action) => {
        state.productLoading = false
        state.product  = action.payload
        state.productSuccess = true
        state.productError = false
       
    })
        .addCase(getProduct.rejected,(state,action) => {
        state.productLoading = false
        state.productSuccess = false
        state.productError = true
        state.productErrorMessage = action.payload
    })

      .addCase(updateProduct.pending,(state,action) => {
        state.productLoading = true
        state.productSuccess = false
        state.productError = false
        
    })
        .addCase(updateProduct.fulfilled,(state,action) => {
        state.productLoading = false
        state.allProducts  = state.allProducts.map(product =>product._id === action.payload._id? action.payload : product)
        state.edit = {product:{}, isEdit: false}
        state.productSuccess = true
        state.productError = false
       
    })
        .addCase(updateProduct.rejected,(state,action) => {
        state.productLoading = false
        state.productSuccess = false
        state.productError = true
        state.productErrorMessage = action.payload
    })

          .addCase(addProduct.pending,(state,action) => {
        state.productLoading = true
        state.productSuccess = false
        state.productError = false
        
    })
        .addCase(addProduct.fulfilled,(state,action) => {
        state.productLoading = false
        state.allProducts  = [action.payload, ...state.allProducts]
        state.productSuccess = true
        state.productError = false
       
    })
        .addCase(addProduct.rejected,(state,action) => {
        state.productLoading = false
        state.productSuccess = false
        state.productError = true
        state.productErrorMessage = action.payload

   })
}
})
export const{editProduct} = productSlice.actions
export default productSlice.reducer

//feth Product

export const getProducts = createAsyncThunk("FETCH/PRODUCTS",async()=>{
    try {
        return await productService.fetchProducts()
        
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

//fetch single product

export const getProduct = createAsyncThunk("FETCH/PRODUCT",async(id)=>{
    try {
        return await productService.fetchProduct(id)
        
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

//fetch update product

export const updateProduct = createAsyncThunk("UPDATE/PRODUCT",async(formData,thunkAPI)=>{
    let token = thunkAPI.getState().auth.user.token
    try {
        return await productService.update(formData,token)
        
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
    })

    //fetch single product

export const addProduct = createAsyncThunk("ADD/PRODUCT",async(formData,thunkAPI)=>{
    let token = thunkAPI.getState().auth.user.token
    try {
        return await productService.add(formData,token)
        
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
    })
