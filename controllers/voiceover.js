// Imports
const directus = require('@directus/sdk')
const data = new directus.Directus('http://localhost:8056')

async function voiceover(req, res, next) {
    const voiceover = await data.items('Voiceover').readByQuery('id')
    req.voiceover = voiceover.data
    next()
}

module.exports = voiceover