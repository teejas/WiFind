var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content)
};

var addReview = function(req, res, location) {
  if(!location) {
    sendJSONResponse(res, 404, {
      'message': 'locationid not found'
    });
  } else {
    location.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    location.save(function(err, location) {
      var thisReview;
      if(err) {
        sendJSONResponse(res, 400, err);
      } else {
        updateAvgRating(location._id);
        thisReview = location.reviews[location.reviews.length - 1];
        sendJSONResponse(res, 201, thisReview);
      }
    });
  }
};

var updateAvgRating = function(locationid) {
  Loc
    .findById(locationid)
    .select('reviews rating')
    .exec(
      function(err, location) {
        if(err) {
          console.log(err);
        } else {
          setAvgRating(location);
        }
      }
)};

var setAvgRating = function(location) {
  var i, reviewCount, ratingTotal, ratingAverage;
  if(location.reviews && location.reviews.length > 0) {
    reviewCount = location.reviews.length;
    for(i = 0; i < reviewCount; i++) {
      ratingTotal += location.reviews[i].rating;
    };
    ratingAverage = ratingTotal / reviewCount;
    location.rating = ratingAverage;
    location.save(function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('Average rating of location has been updated to' + ratingAverage);
      }
    });
  }
};

module.exports.reviewsCreate = function(req, res) {
  var location = req.params.locationid;
  if(locationid) {
    Loc
      .findById(locationid)
      .select('reviews')
      .exec(
        function(err, location) {
          if(err) {
            sendJSONResponse(res, 400, err);
          } else {
            addReview(req, res, location);
          }
        }
    );
  } else {
    sendJSONResponse(res, 404, {
      'message' : 'Not Found, locationid is required'
    });
  }
};
module.exports.reviewsReadOne = function(req, res) {
  if(req.params && req.params.locationid && req.params.reviewid) {
    Loc
      .findById(req.params.locationid)
      .select('name reviews')
      .exec(function(err, location) {
        var response, review;
        if(!location) {
          sendJSONResponse(res, 404, {
            'message': 'locationid not found'
          });
          return;
        } else if(err) {
          sendJSONResponse(res, 400, err);
          return;
        }
        if(location.reviews && location.reviews.length > 0) {
          review = location.reviews.id(req.params.reviewid);
          console.log('review: ' + review);
          if(!review) {
            sendJSONResponse(res, 404, {
              'message': 'reviewid not found'
            });
          } else {
            response = {
              location: {
                name : location.name,
                id : req.params.locationid
              },
              review : review
            };
            sendJSONResponse(res, 200, response);
            }
          } else {
            sendJSONResponse(res, 404, {
              'message': 'no reviews found'
            })
          }
        });
    } else {
      sendJSONResponse(res, 404, {
        'message': 'No locationid or reviewid specified in request'
    })
  }
};
module.exports.reviewsUpdateOne = function(req, res) {
  if(!req.params.locationid || !req.params.reviewid) {
    sendJSONResponse(res, 404, {
      'message': 'Not found, both locationid and reviewid required'
    });
    return;
  }
  Loc
    .findById(req.params.locationid)
    .select(reviews)
    .exec(
      function(err, location) {
        var thisReview;
        if(!location) {
          sendJSONResponse(res, 404, {
            'message': 'Not found, locationid is required'
          });
          return;
        } else if(err) {
          sendJSONResponse(res, 400, err);
          return;
        }
        if(location.reviews && location.reviews.length > 0) {
          thisReview = location.reviews.id(req.params.reviewid);
          if(!thisReview) {
            sendJSONResponse(res, 404, {
              'message': 'reviewid not found'
            });
          } else {
            thisReview.author = req.body.author;
            thisReview.rating = req.body.rating;
            thisReview.reviewText = req.body.reviewText;
            location.save(function(err, location) {
              if(err) {
                sendJSONResponse(res, 404, err);
              } else {
                updateAvgRating(location._id);
                sendJSONResponse(res, 200, thisReview);
              }
            });
          }
        } else {
          sendJSONResponse(res, 404, {
            'message': 'no review to update'
          });
        }
      }
  )
};
module.exports.reviewsDeleteOne = function(req, res) {
  if(!req.params.locationid || !req.params.reviewid) {
    sendJSONResponse(res, 404, {
      'message': 'Not found, locationid and reviewid required'
    });
  } else {
    Loc
      .findById(req.params.locationid)
      .select('reviews')
      .exec(
        function(err, location) {
          if(!location) {
            sendJSONResponse(res, 404, {
              'message': 'locationid not found'
            });
            return;
          } else if(err) {
            sendJSONResponse(res, 400, err);
            return;
          }
          if(location.reviews && location.reviews.length > 0) {
            var thisReview = location.reviews.id(req.params.reviewid);
            if(!thisReview) {
              sendJSONResponse(res, 404, {
                'message': 'reviewid not found'
              });
            } else {
              thisReview.remove();
              location.save(function(err) {
                if(err) {
                  sendJSONResponse(res, 400, err);
                } else {
                  updateAvgRating(location._id);
                  sendJSONResponse(res, 204, null);
                }
              });
            }
          } else {
            sendJSONResponse(res, 404, {
              'message': 'no review to delete'
            });
          }
    });
  }
};