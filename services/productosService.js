const { request, response } = require('express')
const ProductModel = require('../models/productos')
const client = require('../db/redis')
const logger = require('../helpers/logger')

const createProducto = async(req = request, res = response) => {

    const {name, price, branch, empleado} = req.body

    const sucursal = await client.get(`Sucursal:${branch}`)

    const employee = await client.get(`Empleado:${empleado}`)

    const producto = new ProductModel({name, price, createdBy: employee, branch: sucursal})

    await producto.save()

    return res.status(201).json({
        msg: "Producto guardado correctamente",
        producto
    })
}

const getAll = async(req = request, res = response) => {

    const docs = await ProductModel.find().populate('createdBy').populate('branch')

    return res.status(200).json({
        docs
    })
}

const getByName = async(req = request, res = response) => {

    const {name} = req.params

    const docs = await ProductModel.find({name: name}).populate('createdBy').populate('branch')

    return res.status(200).json({
        docs
    })
}

const deleteProducto = async(req = request, res = response) => {

    const {id} = req.params

    const producto = await ProductModel.deleteOne({_id: id})

    return res.status(200).json({
        producto
    })
}

module.exports = {
    createProducto,
    getAll,
    getByName,
    deleteProducto
}