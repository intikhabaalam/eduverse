import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import messageService from "./messageService";

// GET MESSAGES
export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      return await messageService.getMessages(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// ADD MESSAGE
export const addMessage = createAsyncThunk(
  "message/addMessage",
  async (data, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      return await messageService.addMessage(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    allMessages: [],
    messageLoading: false,
    messageSuccess: false,
    messageError: false,
    messageErrorMessage: ""
  },
  reducers: {},
  extraReducers: (builder) => {

    // GET MESSAGES
    builder
      .addCase(getMessages.pending, (state) => {
        state.messageLoading = true;
        state.messageSuccess = false;
        state.messageError = false;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messageLoading = false;
        state.allMessages = action.payload;
        state.messageSuccess = true;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.messageLoading = false;
        state.messageError = true;
        state.messageErrorMessage = action.payload;
      })

      // ADD MESSAGE
      .addCase(addMessage.pending, (state) => {
        state.messageLoading = true;
        state.messageSuccess = false;
        state.messageError = false;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.messageLoading = false;
        state.allMessages.push(action.payload); // FIXED (overwrite nahi karega)
        state.messageSuccess = true;
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.messageLoading = false;
        state.messageError = true;
        state.messageErrorMessage = action.payload;
      });
  }
});

export default messageSlice.reducer;