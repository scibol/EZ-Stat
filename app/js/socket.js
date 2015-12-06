var socket = io.connect();

//socket.on("change-game", function(data) {
//    drawHit()
//});


socket.on("change-player", function(data) {
    console.log(socket);
    drawHitAndMiss(data.success, data.pos_x, data.pos_y)
});