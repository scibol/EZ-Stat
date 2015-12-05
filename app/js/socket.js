var socket = io.connect();

//socket.on("change-game", function(data) {
//    drawHit()
//});

socket.on("change-room", function(data) {
    console.log("Asd");
    console.log(data)
});

socket.on("change-player", function(data) {
    console.log(socket);
    drawHitAndMiss(data.success, data.pos_x, data.pos_y)
});