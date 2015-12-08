var socket = io.connect();

socket.on("update-game-score", function(data) {
    console.log(data)
    updateScore(data)
});


socket.on("change-player", function(data) {
    drawHitAndMiss(data.success, data.pos_x, data.pos_y)
});

socket.on('update-secondary', function(data){
    if (data.assists || data.assists == 0) {
        updateAssists(data)
    }
    if (data.passes || data.passes == 0) {
        updatePasses(data)
    }
    if (data.freeShots || data.freeShots == 0) {
        updateFreeShots(data)
    }
    if (data.fouls || data.fouls == 0) {
        updateFouls(data)
    }
});

