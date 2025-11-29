const express = require('express')
require('dotenv').config()
const path = require('path')
const colors = require('colors')
const connectDB = require('./config/dbConfig')
const errorhandler = require('./middleware/errorHandler')

const PORT = process.env.PORT || 5000
const app = express()

connectDB()

//middleware
app.use(express.json())
app.use(express.urlencoded ())
// Home Route

// app.all("/",(req,res) => {
// //     res.json({
// //         msg:"WELCOME TO EDUVERSE API 1.0"
// //     })

   
// // })



 //Auth Routes
    app.use("/api/auth",require("./routes/authRoutes"))
 //Listing Routes
  app.use("/api/product",require("./routes/productRoutes"))   
  //message Routes
  app.use("/api/message",require("./routes/messageRoutes")) 
  //Event Routes
  app.use("/api/event", require("./routes/eventRoutes")) 
  //Admin Routes
  app.use("/api/admin",require("./routes/adminRoutes")) 


    //Default Route 
  if(process.env.NODE_ENV === "production"){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname,"/client/dist")));

    app.use((req,res)=>
        res.sendFile(path.resolve(__dirname, "client","dist","index.html"))
    )
  }else{
       app.get("/",(req,res)=>{
        res.send("API is running... (development mode)")
       })
  }
  //Error Handler
  app.use(errorhandler)  

app.listen(PORT,() =>{
    console.log(`SERVER IS RUNNING AT PORT:${PORT}`.bgBlue.white)

})