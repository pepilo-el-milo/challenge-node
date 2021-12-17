const SucursalModel = require('../models/sucursal')
const { request, response } = require('express')
const client = require('../db/redis')
const logger = require('../helpers/logger')

const createSucursal = async(req = request, res = response) => {

    const {name, address} = req.body
    const sucursal = new SucursalModel({name, address})

    await sucursal.save()

    logger.info(sucursal)
    
    await client.set(`Sucursal:${name}`, sucursal._id.toString())

    return res.status(201).json({
        msg: "Sucursal guardada correctamente",
        sucursal
    })
}

const getAll = async(req = request, res = response) => {

    const docs = await SucursalModel.find().populate('products').populate('empleados')

    return res.status(200).json({
        docs
    })
}

const getByName = async(req = request, res = response) => {

    const {name} = req.params

    const id = await client.get(`Sucursal:${name}`)

    const docs = await EmployeeModel.findById(id).populate('products').populate('empleados')

    return res.status(200).json({
        docs
    })
}

const deleteSucursal = async(req = request, res = response) => {

    const {name} = req.params

    const id = await client.get(`Sucursal:${name}`)

    const sucursal = await SucursalModel.deleteOne({_id: id})

    await client.del(`Sucursal:${name}`)

    return res.status(200).json({
        sucursal
    })
}

module.exports = {
    createSucursal,
    getAll,
    getByName,
    deleteSucursal
}