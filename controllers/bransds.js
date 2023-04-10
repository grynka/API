const mongoose = require('mongoose');

const getManufacturesSchema = new mongoose.Schema({
        id: Number,
        canbedisplayed: Boolean,
        description: String,
        fulldescription: String,
        haslink: Boolean,
        isaxle: Boolean,
        iscommercialvehicle: String,
        isengine: String,
        ismotorbike: Boolean,
        ispassengercar: String,
        istransporter: Boolean,
        isvgl: Boolean,
        matchcode: String,
})

const Brand = mongoose.model('Brands', getManufacturesSchema)

module.exports = {
    Brand
}