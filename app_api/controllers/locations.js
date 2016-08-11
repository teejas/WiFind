var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content)
};

module.exports.locationsCreate = function(req, res) {
  sendJSONResponse(res, 200, { 'status': 'success' });
};
module.exports.locationsListByDistance = function(req, res) {
  sendJSONResponse(res, 200, { 'status': 'success' });
};
module.exports.locationsReadOne = function(req, res) {
  sendJSONResponse(res, 200, { 'status': 'success' });
};
module.exports.locationsUpdateOne = function(req, res) {
  sendJSONResponse(res, 200, { 'status': 'success' });
};
module.exports.locationsDeleteOne = function(req, res) {
  sendJSONResponse(res, 200, { 'status': 'success' });
};