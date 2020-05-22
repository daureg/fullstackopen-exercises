const config = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./app')
const http = require('http')

const PORT = config.PORT || 3003
const server = http.createServer(app)
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
