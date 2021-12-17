const winston = require('winston')
const args = require('args')

const argsConfig = () => {
    args
    .option('debug', 'Logs Options: winston || console')
}