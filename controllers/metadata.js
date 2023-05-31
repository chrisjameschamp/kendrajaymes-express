// Imports
const directus = require('@directus/sdk')
const data = new directus.Directus('http://localhost:8056')

async function metadata(req, res, next) {
    const metadata = await data.items('Information').readByQuery('id')
    let file = await data.files.readByQuery({ filter: { 'id': { '_eq': metadata.data.Metadata_Image } } })
    metadata.data.Metadata_Image = file.data[0]
    req.metadata = metadata.data
    const social = await data.items('Social_Links').readByQuery({ sort: ['sort'] })
    req.social = social.data
    const nav = await data.items('Nav').readByQuery({ sort: ['sort'] })
    req.nav = nav.data
    const agent = await data.items('Commercial_Agent').readByQuery('id')
    req.agent = agent.data
    next()
}

module.exports = metadata