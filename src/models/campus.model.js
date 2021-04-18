const mongoose = require('mongoose');
const {UbicationSchema} = require('../models/ubication.model')
const Schema = mongoose.Schema;

const campusModel = new Schema ({
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
    contact:{type: Schema.ObjectId, ref: "contact"},
    ubication:{type: UbicationSchema},
    users:[{type: Schema.ObjectId, ref: "user"}]
})

module.exports = mongoose.model('campus', campusModel);
