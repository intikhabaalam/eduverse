import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import messageService from "./messageService";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        allMessages :[],
        messageLoading: false,
        messageSuccess: false,
        messageError: false,
        messageErrorMessage:""
},
reducers:{},
extraReducers:(builder) =>{
    builder
    .addCase(getMessages.pending,(state,action) => {
            state.productLoading = true
            state.productSuccess = false
            state.productError = false
            
        })
    .addCase(getMessages.fulfilled,(state,action) => {
            state.productLoading = false
            state.allMessages  = action.payload
            state.productSuccess = true
            state.productError = false
           
        })
    .addCase(getMessages.rejected,(state,action) => {
            state.productLoading = false
            state.productSuccess = false
            state.productError = true
            state.productErrorMessage = action.payload
    
       })
     .addCase(addMessage.pending,(state,action) => {
            state.productLoading = true
            state.productSuccess = false
            state.productError = false
            
        })
    .addCase(addMessage.fulfilled,(state,action) => {
            state.productLoading = false
            state.allMessages  = [action.payload]
            state.productSuccess = true
            state.productError = false
           
        })
    .addCase(addMessage.rejected,(state,action) => {
            state.productLoading = false
            state.productSuccess = false
            state.productError = true
            state.productErrorMessage = action.payload
    
       })


}

})

 export default messageSlice.reducer

 //get Messages

 export const getMessages = createAsyncThunk("FETCH/MESSAGES",async (_ , thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
      try {
        return await messageService.fetchMessages(token)
      } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
      }
 })

 
 //send Messages

 export const addMessage = createAsyncThunk("SEND/MESSAGES",async (pid, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
      try {
        return await messageService.sendMessage(pid,token)
      } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
      }
 })
  
  