const {createClient} = require('redis')
const logger = require('../helpers/logger')
require('dotenv').config()

const client = createClient(6379,'0.0.0.0')
// const client = createClient({
//     url: process.env.REDIS
// })

client.on('error', (err) => logger.error(err));
client.on('connect', () => logger.info('Se ha conectado a redis correctamente'))

module.exports = client