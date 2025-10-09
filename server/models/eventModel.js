const {mongoose} = require ("mongoose")

const eventSchema = new mongoose.Schema({

 eventName : {
    type : String,
    required :[true,"Please Fill Event Name"] 
 },
 eventDescription : {
    type : String,
    required :[true,"Please Fill Event Description "] 
 },
 eventImage :{
    type : String,
    required :[true,"Please Fill Event Image Url"] 
 },
 eventDate : {
    type : String,
    required :[true,"Please Fill Event date"] 
 },
 status : {
    type : String,
    enum : ["upcoming","completed","ongoing","postponed"],
    required :true,
    default : "upcoming",
 },
 location :{
    type : String,
    required :[true,"Please Fill Event Location"] 
 },
 availableSeats : {
    type : Number,
    required :[true,"Please Fill Event Seats"],
    default : 50 
 },
 organizer :{
    type : String,
    required :[true,"Please Fill Event Organizer Name"] 
 },
 price :{
    type : Number,
    required :[true,"Please Fill Event price"] 
 }
},{
    timestamps : true
})

module.exports = mongoose.model('Event',eventSchema) 