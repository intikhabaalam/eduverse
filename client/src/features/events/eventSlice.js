import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventService from "./eventService";

const eventSlice = createSlice({
 name:"events",
   initialState:{
    allEvents:[],
    event:{},
    eventLoading:false,
    eventSuccess:false,
    eventError:false,
    eventErrorMessage:""
   },
   reducers:{},
   extraReducers:(builder) =>{
    builder
    .addCase(getEvents.pending,(state,action) => {
        state.eventLoading = true
        state.eventSuccess = false
        state.eventError = false
        
    })
        .addCase(getEvents.fulfilled,(state,action) => {
        state.eventLoading = false
        state.allEvents  = action.payload
        state.eventSuccess = true
        state.eventError = false
       
    })
        .addCase(getEvents.rejected,(state,action) => {
        state.eventLoading = false
        state.eventSuccess = false
        state.eventError = true
        state.eventErrorMessage = action.payload

   })
    .addCase(getEvent.pending,(state,action) => {
        state.eventLoading = true
        state.eventSuccess = false
        state.eventError = false
        
    })
        .addCase(getEvent.fulfilled,(state,action) => {
        state.eventLoading = false
        state.event  = action.payload
        state.eventSuccess = true
        state.eventError = false
       
    })
        .addCase(getEvent.rejected,(state,action) => {
        state.eventLoading = false
        state.eventSuccess = false
        state.eventError = true
        state.eventErrorMessage = action.payload

   })
}

})

export default eventSlice.reducer

//feth Events

export const getEvents = createAsyncThunk("FETCH/EVENT",async()=>{
    try {
        return await eventService.fetchEvents()
        
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

//feth Event

export const getEvent = createAsyncThunk("FETCH/EVENTs",async(eid)=>{
    try {
        return await eventService.fetchEvent(eid)
        
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})