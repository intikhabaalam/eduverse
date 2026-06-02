const express = require('express')

const {
    generateEventDescription,
    chatWithAI
} = require('../controllers/aiController')

const router = express.Router()

router.post('/generate-event', generateEventDescription)
router.post('/chat', chatWithAI)

module.exports = router