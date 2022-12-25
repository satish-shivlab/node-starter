const http = require('http')
const app = require('./app')
const port = process.env.PORT || 8050

console.log('Server started at : ' + port)
const server = http.createServer(app)
server.listen(port)
