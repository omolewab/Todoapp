var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var PrioritySchema = new mongoose.Schema({
    Priority: String
})

PrioritySchema.plugin(mongoosePaginate)
const Priority = mongoose.model('Priority', PrioritySchema)

module.exports = Priority;