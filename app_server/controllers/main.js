// make GET request
module.exports.index = function(req, res) {
    res.render('index', { title: 'Express' });
};