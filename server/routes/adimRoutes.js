const express = require("express")
const { updateUser, getAllUsers, addEvent, updateEvent, updateProductListing, getAllComments } = require("../controllers/adminController")
const adminProtect = require("../middleware/adimMiddleware")


const router = express.Router()

router.get("/users",adminProtect,getAllUsers)
router.put("/user/:uid",adminProtect,updateUser)
router.post("/event",adminProtect,addEvent)
router.put("/event/:eid",adminProtect,updateEvent)
router.put("/product/:pid",adminProtect,updateProductListing)
router.get("/event/comment/:eid",adminProtect,getAllComments)

module.exports = router
