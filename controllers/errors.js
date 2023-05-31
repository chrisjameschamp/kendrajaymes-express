function errorHandler(err, req, res) {
    res.status(err[0]).send(err)//render('error', {content: req, error: err})
}

module.exports = errorHandler