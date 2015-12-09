var socket = io.connect();



socket.on("change-player", function(data) {

    //console.log(socket);
    var ezApp = document.querySelector("ez-app");
    var stats = ezApp.$.buttonCounter;
    stats.$.getPlayer.generateRequest();
    //var score = ezApp.$.canv;
    //canv.$.getTeam1Score.generateRequest()
    drawHitAndMiss(data.success, data.pos_x, data.pos_y)
});

socket.on("change-state", function(data) {
    var ezApp = document.querySelector("ez-app");
    ezApp.$.getGame.generateRequest();
});
