var express = require ('express');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io').listen(server);
var users = [];
var connections = [];

server.listen(process.env.PORT || 3000);
console.log('server running...');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Conected: %s sockets connected', connections.length)

  // Disconnect
  socket.on('disconnect', function () {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected %s sockets connected', connections.length);
  });

  socket.on('send message', function (data) {
    console.log(data);
    io.sockets.emit('new message', {msg: data.msg, plat: data.platforms});
  });

  socket.on('update list', function (data) {
    console.log('new list:' + data);
    io.sockets.emit('new list', data);
  });

  socket.on('refresh', function (data) {
    console.log('refresh now please');
    io.sockets.emit('refresh now');
  });

  socket.on('update list', function (data) {
    console.log('new list:' + data);
    io.sockets.emit('new list', data);
  });



});
