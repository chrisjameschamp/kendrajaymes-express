// Imports
const directus = require('@directus/sdk')
const data = new directus.Directus('http://localhost:8056')

async function portfolio(req, res, next) {
    const results = await data.items('Portfolio').readByQuery({
        sort: ['sort'],
        filter: {
            'status': {
                '_eq': 'published'
            }
        }
    })
    req.projects = results.data
    next()
}

async function project(req, res, next) {
    const results = await data.items('Portfolio').readByQuery({
        filter: {
            'slug': {
                '_eq': req.params.slug
            }
        }
    })
    if (results.data) {
        for (const [key, value] of Object.entries(results.data)) {
            let file = await data.files.readByQuery({
                filter: {
                    'id': {
                        '_eq': value.Thumbnail
                    }
                }
            })
            value.Thumbnail = file.data[0]
        }
    }
    req.project = results.data[0]
    next()
}

module.exports = {
    portfolio,
    project
}