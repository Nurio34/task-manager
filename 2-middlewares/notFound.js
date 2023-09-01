
const notFoundMiddleware = (req,res) => res.status(404).send(`Route doesn't exist...Detected by "notFoundMiddleware"`)

module.exports = notFoundMiddleware