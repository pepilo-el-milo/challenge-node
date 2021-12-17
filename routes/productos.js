const {Router} = require('express')

const router = Router()
const {createProducto, getAll, getByName, deleteProducto} = require('../services/productosService')

router.get('/', getAll)
router.get('/', getByName)
router.post('/', createProducto)
router.delete('/:id', deleteProducto)

module.exports = router