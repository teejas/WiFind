// GET home page
module.exports.home = function(req, res) {
  res.render('location-list', {
    title: 'WiFind - find a place to get connected quick!',
    sidebar: 'Ever feel the need to get connected immediately? WiFind helps you find the next hotspot to sit down, grab some food or a drink, and get connected immediately!',
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
    res.render('location-info', {
      title: 'Starbucks',
      sidebar: {
        main: 'Starbucks is on WiFind because it has great wifi and a place to sit down to get work done.',
        sub: 'If you\'ve been here and loved it or hated it, please write a helpful review for others like you.'
      },
      location: {
        rating: 4,
        address: '125 Wallaby Lane, Sydney, Australia',
        facilities: ['Hot Drinks', 'Food', 'Free WiFi'],
        distance: '100mi',
        coords: { lat: 51.455041, lng: -0.9690884},
        openHours: [
          { 
            days: 'Monday-Friday',
            open: '7:00am',
            close: '7:00pm',
            closed: false
          },
          {
            days: 'Saturday',
            open: '8:00am',
            close: '5:00pm',
            closed: false
          },
          {
            days: 'Sunday',
            closed: true
          }
        ],
        reviews: [
          {
            rating: 4,
            author: 'Tanuj Siripurapu',
            timestamp: 'July 1, 2016',
            review: 'Such an amazing place I love their Earl Grey Chai!'
          },
          {
            rating: 3,
            author: 'Busy Cooker',
            timestamp: 'June 30, 2015',
            review: 'Wifi is all I wanted and they had it.'
          }
        ]
      }
    });
};

// GET make a review page
module.exports.review = function(req, res) {
    res.render('location-review-form', {
      title: 'Add Review for Starbucks',
      pageHeader: 'Review Starbucks',
      
    });
};