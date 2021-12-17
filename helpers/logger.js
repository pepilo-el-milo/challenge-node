const winston = require('winston')
const args = require('args')

let argv

const argsConfig = () => {
    args
    .option('debug', 'Logs Options: winston || console', 'console')

    argv = args.parse(process.argv)
}

const winsLogs = winston.createLogger(
    {
        level: 'info',
        transports: [
            new winston.transports.File({filename: '../logs/info.log', level: 'info'}),
            new winston.transports.File({filename: '../logs/warn.log', level: 'warn'}),
            new winston.transports.File({filename: '../logs/error.log', level: 'error'}),
        ]
    }
)

const info = (message) => {
    if(argv.debug === 'console'){
        console.info(message)
    } else if (argv.debug === 'winston'){
        winsLogs.info(message)
    }
}

const warn = (message) => {
    console.log(argv)
    if(argv.debug === 'console'){
        console.warn(message)
    } else if (argv.debug === 'winston') {
        winsLogs.warn(message)
    }
}

const error = (message) => {
    if(argv.debug === 'console'){
        console.error(message)
    } else if (argv.debug === 'winston') {
        winsLogs.error(message)
    }
}


module.exports = {
    argsConfig,
    info,
    warn,
    error
}