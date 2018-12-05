// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static('public'));


io.on('connection', (socket) => {
  socket.on('light', function(data) { //get light switch status from client
    console.log(data)
  });
});