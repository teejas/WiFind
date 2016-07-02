var express = require('express');
var router = express.Router();
var aboutCtrl = require('../controllers/other');
var locationCtrl = require('../controllers/location')

/* GET location pages. */
router.get('/', locationCtrl.home);
router.get('/location', locationCtrl.locationDetails);
router.get('/location/review/new', locationCtrl.review);

/* GET about page */
router.get('/about', aboutCtrl.about);

module.exports = router;
