var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var theEarth = (function() {
  var earthRadius = 6371 // radius of Earth in km
  var getDistanceFromRads = function(rads) {
    return parseFloat(rads * earthRadius);
  };
  var getRadsFromDistance = function(distance) {
    return parseFloat(distance / earthRadius);
  };
  return {
    getDistanceFromRads : getDistanceFromRads,
    getRadsFromDistance : getRadsFromDistance
  };
})()

var sendJSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content)
};

module.exports.locationsCreate = function(req, res) {
  Loc.create({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(","),
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openHours: [{
      days: req.body.days1,
      open: req.body.opening1,
      close: req.body.closing1,
      closed: req.body.closed1
    }, {
      days: req.body.days2,
      open: req.body.opening2,
      close: req.body.closing2,
      closed: req.body.closed2
    }]
  }, function(err, location) {
    if(err) {
      sendJSONResponse(res, 400, err);
    } else {
      sendJSONResponse(res, 201, location);
    }
  });
};
module.exports.locationsListByDistance = function(req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var geoPoint = {
    type: 'Point',
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    num: 10,
    maxDistance: theEarth.getRadsFromDistance(100)
  };
  if(!lng || !lat) {
    sendJSONResponse(res, 404, {
      'message': 'lng and lat query parameters required'
    });
  };
  Loc.geoNear(geoPoint, geoOptions, function(err, results, stats) {
    var locations = [];
    if(err) {
      sendJSONResponse(res, 404, err);
    } else {
      results.forEach(function(doc) {
        locations.push({
          distance: theEarth.getDistanceFromRads(doc.dis),
          name: doc.obj.name,
          address: doc.obj.address,
          rating: doc.obj.rating,
          facilities: doc.obj.facilities,
          _id: doc.obj._id
        });
      });
      sendJSONResponse(res, 200, locations);
    }
  });
};
module.exports.locationsReadOne = function(req, res) {
  if(req.params && req.params.locationid) {
    Loc
      .findById(req.params.locationid)
      .exec(function(err, location) {
        if(!location) {
          sendJSONResponse(res, 404, {
            'message': 'locationid not found'
          });
          return;
        } else if(err) {
          sendJSONResponse(res, 404, err);
          return;
        }
        sendJSONResponse(res, 200, location);
      });
  } else {
    sendJSONResponse(res, 404, {
      'message': 'No locationid specified in request'
    })
  }
};
module.exports.locationsUpdateOne = function(req, res) {
  var locationid = req.params.locationid;
  if(!locationid) {
    sendJSONResponse(res, 404, {
      'message': 'Not found, locationid is required'
    });
  } else {
    Loc
      .findById(locationid)
      .select('-reviews -rating')
      .exec(
        function(err, location) {
          if(!location) {
            sendJSONResponse(res, 404, {
              'message': 'locationid not found'
            });
          } else if(err) {
            sendJSONResponse(res, 400, err);
          } else {
              location.name = req.body.name,
              location.address = req.body.address,
              location.facilities = req.body.facilities.split(","),
              location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)],
              location.openHours = [{
                days: req.body.days1,
                open: req.body.opening1,
                close: req.body.closing1,
                closed: req.body.closed1
              }, {
                days: req.body.days2,
                open: req.body.opening2,
                close: req.body.closing2,
                closed: req.body.closed2
            }];
            location.save(function(err, location) {
              if(err) {
                sendJSONResponse(res, 400, err);
              } else {
                sendJSONResponse(res, 201, location);
              }
            });
          }
        }
      );
  };
};
  
module.exports.locationsDeleteOne = function(req, res) {
  sendJSONResponse(res, 200, { 'status': 'success' });
};