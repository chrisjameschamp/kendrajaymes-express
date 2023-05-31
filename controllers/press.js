// Imports
const directus = require('@directus/sdk')
const data = new directus.Directus('http://localhost:8056')

async function press(req, res, next) {
    const results = await data.items('Press').readByQuery({
        sort: ['sort']
    })
    req.press = results.data
    next()
}

module.exports = press