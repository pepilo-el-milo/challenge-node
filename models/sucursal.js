const {Schema, model} = require('mongoose')

const sucursalSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    products: [{type: Schema.Types.ObjectId, ref: 'Producto'}],
    empleados: [{type: Schema.Types.ObjectId, ref: 'Empleado'}],
})

module.exports = model('Sucursal', sucursalSchema)