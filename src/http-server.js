var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

export async function startHTTP() {
    return new Promise(function(success, nosuccess) {
      var port = process.env.PORT || 3000;
      server.listen(port, function () {
        console.log('Started server HTTP at port %d', port);
      });
      app.use(express.static('public'));
      io.on('connection', function (socket) {
        success(socket);
      });
    });
};

