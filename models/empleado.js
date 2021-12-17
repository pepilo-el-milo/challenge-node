const {Schema, model} = require('mongoose')

const employeeSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    phone: {type: String},
    branch: {type: Schema.Types.ObjectId, ref: 'Sucursal', required: true}
})

const EmployeeModel = model('Empleado', employeeSchema)

module.exports = model('Empleado', employeeSchema)