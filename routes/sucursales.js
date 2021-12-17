const {Router} = require('express')
const {createSucursal,getAll,getByName,deleteSucursal} = require('../services/sucursalesService')


const router = Router()

router.get('/', getAll)
router.get('/:name', getByName)
router.post('/', createSucursal)
router.delete('/:name', deleteSucursal)

module.exports = router