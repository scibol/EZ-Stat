var socket = io.connect();


socket.on("change-player", function (data) {

    var ezApp = document.querySelector("ez-app");
    var stats = ezApp.$.buttonCounter;
    var canvas = ezApp.$.canv;
    //
    stats.$.getPlayer.generateRequest();
    //
    drawHitAndMiss(data.success, data.pos_x, data.pos_y, canvas.stage, canvas.selected, canvas.shotsObj)
});

socket.on("update-score", function (url) {
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

socket.on("change-state", function (data) {
    var ezApp = document.querySelector("ez-app");
    ezApp.$.getGame.generateRequest();

});

socket.on("update-score", function (event) {
    var ezApp = document.querySelector("ez-app");
    var canvas = ezApp.$.canv;
    var players = ezApp.game.players;
    for (var player in players) {
        if (players[player]._id == event.id) {
            if (event.data.type == "team1score") {
                canvas.$.team1score.innerHTML = event.data.value
            }
            else if (event.data.type == "team2score") {
                canvas.$.team2score.innerHTML = event.data.value
            }
        }
    }
});


socket.on("player-update-stat", function (data) {
    var ezApp = document.querySelector("ez-app");
    var stats = ezApp.$.buttonCounter;
    switch (data.type) {
        case "assists":
            stats.$.getAssists.innerHTML = data.value
            break;
        case "successfulPasses":
            stats.$.getSuccesfulPasses.innerHTML = data.value
            break;
        case "failedPasses":
            stats.$.getFailedPasses.innerHTML = data.value
            break;
        case "lostBalls":
            stats.$.getLostBalls.innerHTML = data.value
            break;
        case "recoveredBalls":
            stats.$.getRecoveredBalls.innerHTML = data.value
            break;
        case "freeshotsScored":
            stats.$.getFreeshotsScored.innerHTML = data.value
            break;
        case "freeshotsMissed":
            stats.$.getFreeshotsMissed.innerHTML = data.value
            break;
        case "fouls":
            stats.$.getFouls.innerHTML = data.value
            break;
        case "technicalFouls":
            stats.$.getTechnicalFouls.innerHTML = data.value
            break;
        case "unsportsmanshipFouls":
            stats.$.getUnsportsmanshipFouls.innerHTML = data.value
            break;
        default:
            break;
    }
})