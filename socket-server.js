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

        socket.on("change", function (data) {
            socket.rooms = [];
            socket.join(data);
            console.log(data);
        });

    });

    eventBus.on('game.created', function (event) {
        //var room = window.location.href.split("/games/")[1];
        io.to(room).emit('change-game', event);
    });

    eventBus.on('change.room', function (event) {
        io.emit('change-room', event);
    });


    eventBus.on('player.changed', function (event) {
        var room = event.url;
        var data = event.data;
        if (!(data.pos_x)) {
            io.to(room).emit('update-secondary', data)
        }
        else {
            io.to(room).emit('change-player', data);
        }
    });
};