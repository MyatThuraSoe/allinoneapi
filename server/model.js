const mongoose = require('mongoose');

var fbviews = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    visittime: String,
    session: String
})

const fbviewsdb = mongoose.model('fbviews', fbviews);

var fbmessage = new mongoose.Schema({
    name: String,
    message: String,
    session: String
})
const fbmessagedb = mongoose.model('fbmessage', fbmessage);

var igviews = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    visittime: String,
    session: String
})

const igviewsdb = mongoose.model('igviews', igviews);

var igmessage = new mongoose.Schema({
    name: String,
    message: String,
    session: String
})
const igmessagedb = mongoose.model('igmessage', igmessage);

//---------------for travel bucket list api--------------
var travelPlaceSchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    imageUrls: {
        type: [String],  // Array for storing multiple image URLs
        required: true,
        validate: {
            validator: function(v) {
                return v.length >= 2;  // Ensures at least two images
            },
            message: "At least two images are required."
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 2000
    },
    estimatedCost: {
        type: Number,
        required: true,
        min: 0
    },
    bestSeasonToTravel: {
        type: String,
        required: true,
        enum: ['Winter', 'Spring', 'Summer', 'Autumn', 'All Year']  // Possible seasons
    }
}, { timestamps: true });

const travelPlacesdb = mongoose.model('travelplaces', travelPlaceSchema);


module.exports = {
    fbviewsdb,
    fbmessagedb,
    igviewsdb,
    igmessagedb,
    travelPlacesdb
};
