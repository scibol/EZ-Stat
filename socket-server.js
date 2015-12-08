var socketIo = require('socket.io');
var eventBus = require('./pubsub');
//var room;

module.exports = function (httpServer) {
    var io = socketIo(httpServer);

    // Socket.io server
    io.on('connect', function (socket) {
        console.log('Connected');

        socket.on('disconnect', function () {
            console.log('Disconnected')
        });

        socket.on('error', function (err) {
            console.log("Error: " + err)
        });
        socket.on("change", function(data){
            if(socket.rooms.length > 1) {
                socket.leave(socket.rooms[1]);
            }
            socket.join(data);

        });

    });

    eventBus.on('game.created', function(event){
        io.to(room).emit('change-game', event);
    });

    eventBus.on('change.room', function(event){
        io.emit('change-room', event);
    });

    eventBus.on('player.changed', function(event){
        var room = event.url;
        if (event.team1score != undefined || event.team2score != undefined) {
            io.emit('update-game-score', event)
        }
        if (event.data) {
            var data = event.data;
            console.log(event)
            io.to(room).emit('change-player', data);
        }
    });
};