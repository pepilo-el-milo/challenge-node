const { request, response } = require('express')
const EmployeeModel = require('../models/empleado')
const client = require('../db/redis')
const logger = require('../helpers/logger')

const createEmployee = async(req = request, res = response) => {

    const {name, age, branch, phone} = req.body

    const sucursal = await client.get(`Sucursal:${branch}`)

    const empleado = new EmployeeModel({name, age, branch: sucursal, phone})

    await empleado.save()

    await client.set(`Empleado:${name}`, empleado._id.toString())

    return res.status(201).json({
        msg: "Empleado guardado correctamente",
        empleado
    })
}

const getAll = async(req = request, res = response) => {

    const docs = await EmployeeModel.find().populate('branch')

    return res.status(200).json({
        docs
    })
}

const getByName = async(req = request, res = response) => {

    const {name} = req.params

    const id = await client.get(`Empleado:${name}`)

    logger.info(name)

    const docs = await EmployeeModel.findById(id).populate('branch')

    return res.status(200).json({
        docs
    })
}

const deleteEmpleado = async(req = request, res = response) => {

    const {name} = req.params

    const id = await client.get(`Empleado:${name}`)

    const empleado = await EmployeeModel.deleteOne({_id: id})

    await client.del(`Empleado:${name}`)

    return res.status(200).json({
        empleado
    })
}


module.exports = {
    createEmployee,
    getAll,
    getByName,
    deleteEmpleado
}

