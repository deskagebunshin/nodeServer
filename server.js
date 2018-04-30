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

  //send message
  socket.on('send message', function (data) {
    console.log('new message'+ data.msg);
    io.sockets.emit('new message', {msg: data.msg, plat: data.platforms});
  });

  socket.on('delete object', function (data) {
    console.log('deleting:' + data);
    io.sockets.emit('delete', data);
  });

  socket.on('update list', function functionName(data) {
    console.log('updating list:' + data);
    io.sockets.emit('new list', data);
  });

  socket.on('refresh', function (data) {
    console.log('refresh now please');
    io.sockets.emit('refresh now');
  });

  socket.on('shuffle', function (data) {
    console.log('shuffle');
    io.sockets.emit('shuffle now');
  });
  socket.on('speedUp', function (data) {
    console.log('speed up');
    io.sockets.emit('speed up now');
  });
  socket.on('speedDown', function (data) {
    console.log('speed down');
    io.sockets.emit('speed down now');
  });

  socket.on('interupt', function (data) {
    console.log('interupt');
    io.sockets.emit('interupt now', data);
  });

  socket.on('new streamingURL', function (data) {
    io.sockets.emit('streamingURL', data);
  });

  socket.on('toVR', function (data) {
    io.sockets.emit('forVR', data);
  })
});
