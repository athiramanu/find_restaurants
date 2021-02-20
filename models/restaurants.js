const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//create geolocation schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

// create restaurant Schema and model
const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: Number,
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

const Restaurant = mongoose.model('restaurant', RestaurantSchema);

module.exports = Restaurant;