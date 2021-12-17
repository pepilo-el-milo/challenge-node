const {Router} = require('express')
const empleadosRouter = require('./empleados')
const sucursalRouter = require('./sucursales')
const productosRouter = require('./productos')

const router = Router()

router.use('/empleados', empleadosRouter)
router.use('/sucursales', sucursalRouter)
router.use('/productos', productosRouter)

module.exports = {
    router
}