const express = require("express")
const { getEvents, getEvent } = require("../controllers/eventController")


const router = express.Router()

router.get("/", getEvents)
router.use("/:eid/comment", require("./commentRoutes"))
router.get("/:eid",getEvent)





module.exports = router 

