const mongoose = require('mongoose')

const ipAddressSchema = new mongoose.Schema({
    ipAddress: {
        type: String,
        required: true
    }
})

const ipAddress = mongoose.model('ipAddress', ipAddressSchema)
module.exports = ipAddress