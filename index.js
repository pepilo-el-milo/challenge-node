require('dotenv').config()
const {db} = require('./db/mongodb')
const logger = require('./helpers/logger')
const {app} = require('./app')
const client = require('./db/redis')
const { cli } = require('winston/lib/winston/config')

logger.argsConfig()

db.then(async () => {
    logger.info('Se ha conectado correctamente a la base de datos');
    await client.connect()
    app.listen(process.env.PORT, () => {
        logger.info(`Se escucha el puerto ${process.env.PORT}`)
    })
}).catch((err) => {
    logger.error(err)
})