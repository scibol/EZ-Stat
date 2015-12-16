var socketIo = require('socket.io');
var eventBus = require('./pubsub');
//var room;

module.exports = function(httpServer) {
	var io = socketIo(httpServer);

	// Socket.io server
	io.on('connect', function(socket){
		 console.log('Connected');

		socket.on('disconnect', function(){
			 console.log('Disconnected')
		});

		socket.on('error', function(err){
			console.log("Error: " + err)
		});

		socket.on("change", function(data){
			if(socket.rooms.length > 1) {
				socket.leave(socket.rooms[1]);
			}
			socket.join(data);

		});
		socket.on("update-score", function(event) {
			socket.broadcast.emit("update-score", event)
		});

		socket.on("player-update-stat", function(event) {
			socket.broadcast.to(event.id).emit("player-update-stat", event.data);
		});

		socket.on("player-update-shot", function(event) {
			socket.broadcast.to(event.id).emit("player-update-shot", event.data);
		});

		socket.on("update-stats-table", function(event){
			socket.broadcast.emit("update-stats-table", event);
		})

		socket.on("change-state", function (event) {
			socket.broadcast.emit("change-state", event)
		})


	});
};

