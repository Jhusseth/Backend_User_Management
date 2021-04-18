const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ubicationModel = new Schema ({
    city: { type: String, required: true },
    address: { type: String, required: true },
    zipcode: { type: String, required: true }
})

module.exports = {
    Ubication: mongoose.model('ubication', ubicationModel),
    UbicationSchema : ubicationModel,
};