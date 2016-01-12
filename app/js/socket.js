var socket = io.connect();

socket.on("change-state", function (data) {
    var ezApp = document.querySelector("ez-app");
    if (data.id == ezApp.game._id) {
        var canvas = ezApp.$.canv;
        var btnCounter = ezApp.$.buttonCounter;
        canvas.editable = data.editable;
        btnCounter.disabled = data.disabled;
    }

});

socket.on("update-score", function (event) {
    var ezApp = document.querySelector("ez-app");
    var players = ezApp.game.players;
    for (var player in players) {
        if (players[player]._id == event.id) {
            if (event.data.type == "team1score") {
                ezApp.$.team1score.innerHTML = event.data.value
            }
            else if (event.data.type == "team2score") {
                ezApp.$.team2score.innerHTML = event.data.value
            }
        }
    }
});

socket.on("player-update-shot", function (data) {
    var ezApp = document.querySelector("ez-app");
    var canvas = ezApp.$.canv;
    if (data.type == "hit") {
        canvas.drawHit(data.x, data.y)
    }
    else if (data.type == "miss") {
        canvas.drawMiss(data.x, data.y)
    }
})

socket.on("update-stats-table", function (data) {
    var ezApp = document.querySelector("ez-app");
    var players = ezApp.game.players;
    for (var player in players) {
        if (players[player]._id == data.id) {
            ezApp.updateStats(data);
        }
    }
})


socket.on("player-update-stat", function (data) {
    var ezApp = document.querySelector("ez-app");
    var stats = ezApp.$.buttonCounter;

    switch (data.type) {
        case "assists":
            stats.$.assists.innerHTML = data.value;
            break;
        case "successfulPasses":
            stats.$.succesfulPasses.innerHTML = data.value;
            break;
        case "failedPasses":
            stats.$.failedPasses.innerHTML = data.value;
            break;
        case "lostBalls":
            stats.$.lostBalls.innerHTML = data.value;
            break;
        case "recoveredBalls":
            stats.$.recoveredBalls.innerHTML = data.value;
            break;
        case "freeshotsScored":
            stats.$.freeshotsScored.innerHTML = data.value;
            break;
        case "freeshotsMissed":
            stats.$.freeshotsMissed.innerHTML = data.value;
            break;
        case "fouls":
            stats.$.fouls.innerHTML = data.value
            break;
        case "technicalFouls":
            stats.$.technicalFouls.innerHTML = data.value
            break;
        case "unsportsmanshipFouls":
            stats.$.unsportsmanshipFouls.innerHTML = data.value
            break;
        default:
            break;
    }
})