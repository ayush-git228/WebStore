// just a simple middleware to allow cors, include it in all your routes that need cross-origin content
module.exports = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
}