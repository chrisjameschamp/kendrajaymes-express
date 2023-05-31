// Imports
const express = require('express')
const router = express.Router()
const portfolioController = require('../controllers/portfolio')
const errorHandler = require('../controllers/errors')

// Routes
router.get('/', portfolioController.portfolio, (req, res) => {
    res.status(200).render('index', { content: req })
})

router.get('/:slug', portfolioController.project, portfolioController.portfolio, (req, res) => {
    if (!req.project) {
        return errorHandler([400, 'Project Not Found'], req, res)
    }
    res.status(200).render('index', { content: req })
})

module.exports = router