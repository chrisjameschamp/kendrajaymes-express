// Imports
const express = require('express')
const router = express.Router()
const press = require('../controllers/press')
//const errorHandler = require('../errors/errors')

// Routes
router.get('/', press, (req, res) => {
    res.status(200).render('press', { content: req })
})

module.exports = router