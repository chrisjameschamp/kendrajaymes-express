// Imports
const express = require('express')
const proxy = require('http-proxy-middleware')
const proxyRedirect = proxy.createProxyMiddleware
const metadata = require('./controllers/metadata')
const errorHandler = require('./controllers/errors')

const app = express()
const port = 3008

// Health
const healthRouter = require('./routes/health')
app.use('/health', healthRouter)

// Static Files
app.use('/static', express.static('public'))
app.use('/css', express.static('./public/css'))
app.use('/js', express.static('./public/js'))
app.use('/img', express.static('./public/img'))
app.use('/favicon', express.static('./public/favicon'))

// Set Views
app.set('view engine', 'pug')

// Assets
app.use('/assets', proxyRedirect({
    target: 'http://localhost:8056',
    changeOrigin: true,
    pathRewrite: {
        '^/assets': '/assets'
    }
}))

// Metadata
app.use(metadata)

// Press
const pressRouter = require('./routes/press')
app.use('/press/', pressRouter)

// Voiceover
const voRouter = require('./routes/voiceover')
app.use('/voiceover/', voRouter)

// Routes
const portfolioRouter = require('./routes/portfolio')
app.use('/', portfolioRouter)

// Error
app.get('*', (req, res) => {
    return errorHandler([404, 'Page Not Found'], req, res)
})

// Listen on Port 3008
app.listen(port, () => console.log(`KendraJaymes-Express listening on port ${port}`))