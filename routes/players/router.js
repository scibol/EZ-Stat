/** @module players/router */
'use strict';

var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Player = mongoose.model('Player');
var config = require("../../config");
var pubsub = require('../../pubsub');

//fields we don't want to show to the client
var fieldsFilter = {'__v': 0};

//supported methods
router.all('/:playerid', middleware.supportedMethods('GET, PUT, DELETE, OPTIONS'));
router.all('/', middleware.supportedMethods('GET, POST, OPTIONS'));

//list players
router.get('/', function (req, res, next) {
    Player.find({}, fieldsFilter).lean().exec(function (err, players) {
        if (err) return next(err);
        res.json(players);

    });

});

//create new player
router.post('/', function (req, res, next) {
    var newPlayer = new Player(req.body);
    newPlayer.save(onModelSave(res, 201, true));
});

//get a player
router.get('/:playerid', function (req, res, next) {
    if (req.params.playerid == "team1" || req.params.playerid == "team2") {
        return
    }
    Player.findById(req.params.playerid, fieldsFilter).lean().exec(function (err, player) {
        if (err) return next(err);
        if (!player) {
            res.status(404);
            res.json({
                statusCode: 404,
                message: "Not Found"
            });
            return;
        }
        res.json(player);
    });
});

//update a player
router.put('/:playerid', function (req, res, next) {
    var data = req.body;
    Player.findById(req.params.playerid, fieldsFilter, function (err, player) {
        if (err) return next(err);
        if (player) {
            if (data.pos_x) {
                player.shots.push(data);
                player.save(onModelSave(res));
            }
            if (data.assists || data.assists == 0) {
                player.assists = data.assists;
                player.save(onModelSave(res));
            }
            if (data.passes || data.passes == 0) {
                player.passes = data.passes;
                player.save(onModelSave(res));
            }
            if (data.freeShots || data.freeShots == 0) {
                player.freeShots = data.freeShots;
                player.save(onModelSave(res));
            }
            if (data.succesfulPasses || data.succesfulPasses == 0) {
                player.succesfulPasses = data.succesfulPasses;
                player.save(onModelSave(res));
            }
            if (data.failedPasses || data.failedPasses == 0) {
                player.failedPasses = data.failedPasses;
                player.save(onModelSave(res));
            }
            if (data.lostBalls || data.lostBalls == 0) {
                player.lostBalls = data.lostBalls;
                player.save(onModelSave(res));
            }
            if (data.recoveredBalls || data.recoveredBalls == 0) {
                player.recoveredBalls = data.recoveredBalls;
                player.save(onModelSave(res));
            }
            if (data.freeshotsScored || data.freeshotsScored == 0) {
                player.freeshotsScored = data.freeshotsScored;
                player.save(onModelSave(res));
            }
            if (data.freeshotsMissed || data.freeshotsMissed == 0) {
                player.freeshotsMissed = data.freeshotsMissed;
                player.save(onModelSave(res));
            }
            if (data.technicalFouls || data.technicalFouls == 0) {
                player.technicalFouls = data.technicalFouls;
                player.save(onModelSave(res));
            }
            if (data.unsportsmanshipFouls || data.unsportsmanshipFouls == 0) {
                player.unsportsmanshipFouls = data.unsportsmanshipFouls;
                player.save(onModelSave(res));
            }
            if (data.fouls || data.fouls == 0) {
                player.fouls = data.fouls;
                player.save(onModelSave(res));
            }
        }
        else {
            //player does not exist create it
            var newPlayer = new Player(data);
            newPlayer._id = ObjectId(req.params.playerid);
            newPlayer.save(onModelSave(res, 201, true));
        }
        pubsub.emit("player.changed", {"data":data, "url":req.params.playerid});
    });
});

//remove a player
router.delete('/:playerid', function (req, res, next) {
    Player.findById(req.params.playerid, fieldsFilter, function (err, player) {
        if (err) return next(err);
        if (!player) {
            res.status(404);
            res.json({
                statusCode: 404,
                message: "Not Found"
            });
            return;
        }
        player.remove(function (err, removed) {
            if (err) return next(err);
            res.status(204).end();
            pubsub.emit('player.deleted', {})
        })
    });
});

function onModelSave(res, status, sendItAsResponse) {
    var statusCode = status || 204;
    var sendItAsResponse = sendItAsResponse || false;
    return function (err, saved) {
        if (err) {
            if (err.name === 'ValidationError'
                || err.name === 'TypeError') {
                res.status(400);
                return res.json({
                    statusCode: 400,
                    message: "Bad Request"
                });
            } else {
                return next(err);
            }
        }

        pubsub.emit('player.updated', {});
        if (sendItAsResponse) {
            var obj = saved.toObject();
            delete obj.password;
            delete obj.__v;
            return res.status(statusCode).json(obj);
        } else {
            return res.status(statusCode).end();
        }
    }
}

/** router for /players */
module.exports = router;
