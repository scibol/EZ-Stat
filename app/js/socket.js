var socket = io.connect();



socket.on("change-player", function(data) {

    //console.log(socket);
    var ezApp = document.querySelector("ez-app");
    var stats = ezApp.$.buttonCounter;
    var canvas = ezApp.$.canv;
    //
     stats.$.getPlayer.generateRequest();
    //
    drawHitAndMiss(data.success, data.pos_x, data.pos_y, canvas.stage, canvas.selected, canvas.shotsObj)
});

socket.on("update-score", function(url) {
    var ezApp = document.querySelector("ez-app");
    var players = ezApp.game.players
    for (var player in players) {
        if (players[player]._id == url) {
            var score = ezApp.$.canv;
            //
            var getScore = score.$.getTeamScore;
            getScore.generateRequest();
            //
            score.drawScore()
        }
    }
});

socket.on("change-state", function(data) {
    var ezApp = document.querySelector("ez-app");
    ezApp.$.getGame.generateRequest();
});

socket.on("player-update-stat", function(data){
    var ezApp = document.querySelector("ez-app");
    var stats = ezApp.$.buttonCounter;

    switch(data.type) {
        case "assist":
            stats.$.getAssists.innerHTML = data.value
            break;
        default:
            break;
    }
    //stats.$.getPlayer.generateRequest();
})