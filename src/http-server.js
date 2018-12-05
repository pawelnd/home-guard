var express = require('express');

var app = express();

var path = require('path');

var server = require('http').createServer(app);

var io = require('socket.io')(server);

export  function start() {
  var port = process.env.PORT || 3000;
  server.listen(port, function () {
    console.log('Server listening at port %d', port);
  }); // Routing

  app.use(express.static('public'));
  io.on('connection', function (socket) {
    socket.on('light', function (data) {
      //get light switch status from client
      console.log(data);
    });
  });
}