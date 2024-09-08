const express = require('express');
const route = express.Router()

// const services = require('./render');
const controller = require('./controller');

/**
 *  @description Root Route
 *  @method GET /
 */


route.post('/fbview', controller.fbview);
route.post('/fbmsg', controller.fbmessage);

route.post('/igview', controller.igview);
route.post('/igmsg', controller.igmessage);

route.get('/fbviews',controller.getFBviews);
route.get('/fbmsg',controller.getFBmsg);
route.get('/igviews', controller.getIGviews);
route.get('/igmsg', controller.getIGmsg);

// route.put('/api/users/:id', controller.update);
// route.delete('/api/users/:id', controller.delete);


// Travel Bucket List routes
route.post('/travelplaces', controller.addTravelPlace); // Add a new travel place
route.get('/travelplaces', controller.getTravelPlaces); // Get all travel places
route.get('/travelplaces/:id', controller.getTravelPlaceById); // Get a travel place by ID
route.delete('/travelplaces/:id', controller.deleteTravelPlace); // Delete a travel place by ID


module.exports = route