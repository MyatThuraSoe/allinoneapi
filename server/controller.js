var model = require('./model');
var FBviews = model.fbviewsdb;
var FBmsg = model.fbmessagedb;
var IGviews = model.igviewsdb;
var IGmsg = model.igmessagedb;
var sendmail = require('./sendemail');
const url = require('url');

var TravelPlace = model.travelPlacesdb; //---------------for travel bucket list app

const connectDB = require('./dbconnection');


exports.fbview = (req, res) => {
    connectDB();

    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    var viewdata = new FBviews({
        ip: req.socket.remoteAddress,
        visittime: req.body.currenttime,
        session: req.session.id
    })
    
    viewdata
        .save()
        .catch(err => {
            console.log(err, " while saving the first data");
        });

    res.status(200).end();

}


exports.fbmessage = (req, res) => {
    connectDB();
    if (req.body) {

        let name = req.body.name ? req.body.name : 'Anonymous';
        let message = req.body.message;


        var messagedata = new FBmsg({
            name: name,
            message: message,
            session: req.session.id
        })
        console.log(messagedata);
        messagedata
            .save()
            .catch(err => {
                console.log(err, " while saving the first data");
            });

        res.send('<h1>Thanks for the message</h1>');
        sendmail.sendEmail(name, message);
        res.status(200).end();
    }
    else {
        return;
    }

}
exports.igview = (req, res) => {
    connectDB();

    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    var viewdata = new IGviews({
        ip: req.socket.remoteAddress,
        visittime: req.body.currenttime,
        session: req.session.id
    })

    viewdata
        .save()
        .catch(err => {
            console.log(err, " while saving the first data");
        });

    res.status(200).end();

}


exports.igmessage = (req, res) => {
    connectDB();
    if (req.body) {
        let name = req.body.name ? req.body.name : 'Anonymous';
        let message = req.body.message;


        var messagedata = new IGmsg({
            name: name,
            message: message,
            session: req.session.id
        })

        messagedata
            .save()
            .catch(err => {
                console.log(err, " while saving the first data");
            });

        res.send('<h1>Thanks for the message</h1>');
        sendmail.sendEmail( name, message);
        res.status(200).end();
    }
    else {
        return;
    }

}
exports.getFBviews = (req, res) => {
    connectDB();
    FBviews.find()
        .sort({ created_at: 1 })
        .then(views => {
            res.send(views)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving Views db information" })
        })
}
exports.getIGviews = (req, res) => {
    connectDB();
    IGviews.find()
        .sort({ created_at: 1 })
        .then(views => {
            res.send(views)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving Views db information" })
        })
}
exports.getFBmsg = (req, res) => {
    connectDB();
    FBmsg.find()
        .sort({ created_at: 1 })
        .then(msgs => {
            res.send(msgs)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving Views db information" })
        })
}
exports.getIGmsg = (req, res) => {
    connectDB();
    IGmsg.find()
        .sort({ created_at: 1 })
        .then(msg => {
            res.send(msg)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving Views db information" })
        })
}



//---------------travel bucket list-----------
// Controller for adding a new travel place
exports.addTravelPlace = (req, res) => {
    connectDB();

    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    // Create a new TravelPlace object from the request body
    var travelPlaceData = new TravelPlace({
        cityName: req.body.cityName,
        imageUrls: req.body.imageUrls,
        description: req.body.description,
        estimatedCost: req.body.estimatedCost,
        bestSeasonToTravel: req.body.bestSeasonToTravel
    });

    // Save the travel place to the database
    travelPlaceData.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while saving travel place data."
            });
        });
};

// Controller for getting all travel places
exports.getTravelPlaces = (req, res) => {
    connectDB();
    TravelPlace.find()
        .sort({ createdAt: -1 })  // Sort by the latest first
        .then(travelPlaces => {
            res.status(200).send(travelPlaces);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving travel places data."
            });
        });
};

// Controller for retrieving a single travel place by ID
exports.getTravelPlaceById = (req, res) => {
    connectDB();

    let id = req.params.id;
    TravelPlace.findById(id)
        .then(travelPlace => {
            if (!travelPlace) {
                res.status(404).send({ message: "No travel place found with the given ID" });
            } else {
                res.status(200).send(travelPlace);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving travel place data."
            });
        });
};

// Controller for deleting a travel place by ID
exports.deleteTravelPlace = (req, res) => {
    connectDB();

    let id = req.params.id;
    TravelPlace.findByIdAndRemove(id)
        .then(travelPlace => {
            if (!travelPlace) {
                res.status(404).send({ message: "No travel place found with the given ID" });
            } else {
                res.status(200).send({ message: "Travel place deleted successfully!" });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while deleting travel place data."
            });
        });
};

