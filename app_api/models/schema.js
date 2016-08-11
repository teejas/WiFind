var mongoose = require('mongoose');

var openingTimesSchema = new mongoose.Schema({
  days: {type: String, required: true},
  open: String,
  close: String,
  closed: {type: Boolean, required: true}
});

var reviewsSchema = new mongoose.Schema({
  rating: {type: Number, 'default': 0, min: 0, max: 5},
  author: String,
  review: String,
  timestamp: {type: Date, 'default': Date.now}
});

var locationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: String,
  rating: {type: Number, 'default': 0, min: 0, max: 5},
  facilities: [String],
  coords: {type: [Number], index: '2dsphere'},
  openHours: [openingTimesSchema],
  reviews: [reviewsSchema]
});

mongoose.model('Location', locationSchema, 'locations');