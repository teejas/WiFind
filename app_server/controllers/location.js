// GET home page
module.exports.home = function(req, res) {
    res.render('location-list', {title: 'WiFind'});
};

// GET location details page
module.exports.locationDetails = function(req, res) {
    res.render('location-info', {title: 'Location Info'});
};

// GET make a review page
module.exports.review = function(req, res) {
    res.render('location-review-form', {title: 'Add Review'});
};