const mongoose = require('mongoose');
const {UbicationSchema} = require('../models/ubication.model')
const Schema = mongoose.Schema;

const campusModel = new Schema ({
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
    ubication:{type: UbicationSchema}
})

module.exports = mongoose.model('campus', campusModel);
