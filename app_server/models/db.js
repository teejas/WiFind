var mongoose = require('mongoose');

var shutdownMessage = function(msg, exit) {
  mongoose.connection.close(function() {
    console.log('Mongoose connection ended through' + msg);
    exit();
  })
}
var dbURI = 'mongodb://localhost/WiFind';
mongoose.connect(dbURI);

// log connection
mongoose.connection.on('connected', function() {
  console.log('Mongoose has been connected to ' + dbURI);
});
// log error
mongoose.connection.on('error', function() {
  console.log('Mongoose has encountered an error at ' + dbURI);
});
// log disconnection
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose has disconnected from ' + dbURI);
});

// message for nodemon restart
process.once('SIGUSR2', function() {
  shutdownMessage('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// message for app termination
process.once('SIGINT', function() {
  shutdownMessage('app closed', function() {
    process.exit(0);
  });
});
// message for heroku termination
process.once('SIGTERM', function() {
  shutdownMessage('heroku app closed', function() {
    process.exit(0);
  });
});

require('/locations');