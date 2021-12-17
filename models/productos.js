const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'Empleado'},
    branch: {type: Schema.Types.ObjectId, ref: 'Sucursal'}
})

const ProductModel = model('Producto', productSchema)

module.exports = model('Producto', productSchema)