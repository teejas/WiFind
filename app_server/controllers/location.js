// GET home page
module.exports.home = function(req, res) {
    res.render('locationlist', {title: 'WiFind'});
};

// GET location details page
module.exports.locationDetails = function(req, res) {
    res.render('index', {title: 'Location Info'});
};

// GET make a review page
module.exports.review = function(req, res) {
    res.render('index', {title: 'Add Review'});
};