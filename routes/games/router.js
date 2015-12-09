/** @module games/router */
'use strict';

var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Game = mongoose.model('Game');
var config = require("../../config");
var pubsub = require('../../pubsub');
var Player = mongoose.model('Player');

//fields we don't want to show to the client
var fieldsFilter = {'__v': 0};

//supported methods
router.all('/:gameid', middleware.supportedMethods('GET, PUT, DELETE, OPTIONS'));
router.all('/', middleware.supportedMethods('GET, POST, OPTIONS'));

//list games
router.get('/', function (req, res, next) {
    Game.find({}, fieldsFilter).lean().exec(function (err, games) {
        if (err) return next(err);
        res.json(games);
    });
});

//create new game
router.post('/', function (req, res, next) {
    var newGame = new Game(req.body);
    newGame.save(onModelSave(res, 201, true));
    //pubsub.emit("game.created",newGame);
});

//get a game
router.get('/:gameid', function (req, res, next) {
    Game.findById(req.params.gameid, fieldsFilter).lean().exec(function (err, game) {
        if (err) return next(err);
        if (!game) {
            res.status(404);
            res.json({
                statusCode: 404,
                message: "Not Found"
            });
            return;
        }
        console.log(game)
        res.json(game);
    });
});

//update a game
router.put('/:gameid', function (req, res, next) {
    var data = req.body;
    console.log(data)
    Game.findById(req.params.gameid, fieldsFilter, function (err, game) {
        if (err) return next(err);
        if (game) {
            if (data.firstName) {
                Player.findOne(data, fieldsFilter, function (err, player) {
                    //var p = new Player();
                    game.players.push(player);

                    if (player.team === game.team1) {
                        game.players1.push(player)
                    }
                    if (player.team === game.team2) {
                        game.players2.push(player)
                    }
                    game.save(onModelSave(res));
                });
            }
            if (data.name) {
                game.name = data.name;
            }
            if (data.team1) {
                game.team1 = data.team1;
            }
            if (data.team2) {
                game.team2 = data.team2;
            }
            if (data.result) {
                game.result = data.result;
            }
            if (!isNaN(data.assists)) {
                game.assists = data.assists;
            }
            if (data.started) {
                game.started = data.started;
                pubsub.emit("state.changed",{});
            }
            if (data.finished) {
                game.finished = data.finished;
                pubsub.emit("state.changed",{});
            }
            if (data.team1score) {
                game.team1score = data.team1score;
            }
            if (data.team2score) {
                game.team2score = data.team2score;
            }

            game.save(onModelSave(res));
        } else {
            //game does not exist create it
            var newGame = new Game(data);
            newGame._id = ObjectId(req.params.gameid);
            newGame.save(onModelSave(res, 201, true));
        }
    });
    //pubsub.emit("player.changed", {"team1score":data.team1score, "team2score" : data.team2score, "url":req.params.gameid});
});

//remove a game
router.delete('/:gameid', function (req, res, next) {
    Game.findById(req.params.gameid, fieldsFilter, function (err, game) {
        if (err) return next(err);
        if (!game) {
            res.status(404);
            res.json({
                statusCode: 404,
                message: "Not Found"
            });
            return;
        }
        game.remove(function (err, removed) {
            if (err) return next(err);
            res.status(204).end();
            pubsub.emit('game.deleted', {})
        })
    });
});

function onModelSave(res, status, sendItAsResponse) {
    var statusCode = status || 204;
    var sendItAsResponse = sendItAsResponse || false;
    return function (err, saved) {
        if (err) {
            console.log(err)
            if (err.name === 'ValidationError'
                || err.name === 'TypeError') {
                res.status(400)
                return res.json({
                    statusCode: 400,
                    message: "Bad Request"
                });
            } else {
                return next(err);
            }
        }
        pubsub.emit('game.updated', {});
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

/** router for /games */
module.exports = router;
