const {Router} = require('express')
const {createEmployee, getAll, getByName, deleteEmpleado} = require('../services/empleadosService')
const { check } = require('express-validator')

const router = Router()

router.get('/',[
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('age', 'La edad es requerida').not().isEmpty(),
    check('branch', 'La sucursal es requerida').not().isEmpty()
], getAll)
router.get('/:name', getByName)
router.post('/', createEmployee)
router.delete('/:name',deleteEmpleado)

module.exports = router