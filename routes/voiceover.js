// Imports
const express = require('express')
const router = express.Router()
const press = require('../controllers/voiceover')
//const errorHandler = require('../errors/errors')

// Routes
router.get('/', press, (req, res) => {
    res.status(200).render('voiceover', { content: req })
})

module.exports = router