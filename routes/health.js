const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    return res.status(200).json('All Systems Go')
})

module.exports = router