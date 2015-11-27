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
        // games.forEach(function(game){
        //   addLinks(game);
        // });
        res.json(games);
    });
});

//create new game
router.post('/', function (req, res, next) {
    var newGame = new Game(req.body);
    newGame.save(onModelSave(res, 201, true));
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
        addLinks(game);
        res.json(game);
    });
});

//update a game
router.put('/:gameid', function (req, res, next) {
    var data = req.body;
    Game.findById(req.params.gameid, fieldsFilter, function (err, game) {
        if (err) return next(err);
        if (game) {
            if (data.firstName) {
                Player.findOne(data, fieldsFilter, function (err, player) {
                    game.players.push(player)
                });
            }
            if (data.result) {
                game.result = data.result;
            }
            if (data.state) {
                game.state = data.state;
            }
            game.save(onModelSave(res));
        } else {
            //game does not exist create it
            var newGame = new Game(data);
            newGame._id = ObjectId(req.params.gameid);
            newGame.save(onModelSave(res, 201, true));
        }
    });
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

        pubsub.emit('game.updated', {})
        if (sendItAsResponse) {
            var obj = saved.toObject();
            delete obj.password;
            delete obj.__v;
            addLinks(obj);
            return res.status(statusCode).json(obj);
        } else {
            return res.status(statusCode).end();
        }
    }
}

function addLinks(game) {
    game.links = [
        // {
        //   "rel" : "self",
        //   "href" : config.url + "/games/" + game._id
        // },
        // {
        //   "rel" : "artist",
        //   "href" : config.url + "/artists/" + game.artist
        // }
    ];
}

/** router for /games */
module.exports = router;
