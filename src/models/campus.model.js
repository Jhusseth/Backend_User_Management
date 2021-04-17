const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campusModel = new Schema ({
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
    contact:{type: Shema.ObjectId, ref: "contact"},
    ubication:{type: Shema.ObjectId, ref: "ubication"},
    users:[{type: Shema.ObjectId, ref: "user"}]
})

module.exports = mongoose.model('campus', campusModel);
