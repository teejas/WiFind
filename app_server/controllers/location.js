// GET home page
module.exports.home = function(req, res) {
  res.render('location-list', {
    title: 'WiFind - find a place to get connected quick!',
    pageHeader: {
      title: 'WiFind',
      subTitle: 'Find places to work with wifi near you!'
    },
    locations: [{
      name: 'Starbucks',
      address: '125 Wallaby Lane, Sydney, Australia',
      rating: 4,
      facilities: ['Hot Drinks', 'Food', 'Free WiFi'],
      distance: '100mi'
    },
    {
      name: 'Caffeinator',
      address: '15225 Blue Gum Court, Saratoga, CA',
      rating: 5,
      facilities: ['Food', 'Free WiFi'],
      distance: '500mi'
    },
    {
      name: 'WiFood',
      address: '19489 Brockton Lane, Saratoga, CA',
      rating: 3,
      facilities: ['Hot Drinks', 'Food', 'Free WiFi'],
      distance: '50mi'
    }]   
  });
};

// GET location details page
module.exports.locationDetails = function(req, res) {
    res.render('location-info', {title: 'Location Info'});
};

// GET make a review page
module.exports.review = function(req, res) {
    res.render('location-review-form', {title: 'Add Review'});
};