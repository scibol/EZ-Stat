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
        players.forEach(function (player) {
            addLinks(player);
        });
        res.json(players);
    });
});

//create new player
router.post('/', function (req, res, next) {
    var newPlayer = new Player(req.body);
    console.log(newPlayer);
    newPlayer.save(onModelSave(res, 201, true));
});

//get a player
router.get('/:playerid', function (req, res, next) {
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
        addLinks(player);
        res.json(player);
    });
});

//update a player
router.put('/:playerid', function (req, res, next) {
    var data = req.body;
    console.log("maho")
    console.log(req.body);
    Player.findById(req.params.playerid, fieldsFilter, function (err, player) {
        if (err) return next(err);
        if (player) {
            if (data.pos_x) {
                player.shots.push(data)
                player.save(onModelSave(res));
            }
            console.log()
            if (data.assists) {
                console.log("de")
                player.assists = data.assists;
                player.save(onModelSave(res));
            }
            //player.firstName =  player.firstName || data.firstName;
            //player.secondName = player.secondName || data.secondName;
            //player.number = player.number || data.number;
            //player.position = player.position || data.position;
            //player.team = player.team || data.team;
        }
        else {
            //player does not exist create it
            var newPlayer = new Player(data);
            newPlayer._id = ObjectId(req.params.playerid);
            newPlayer.save(onModelSave(res, 201, true));
        }
        pubsub.emit("player.changed", data)
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
            addLinks(obj);
            return res.status(statusCode).json(obj);
        } else {
            return res.status(statusCode).end();
        }
    }
}

function addLinks(player) {
    player.links = [
        // {
        //   "rel" : "self",
        //   "href" : config.url + "/players/" + player._id
        // },
        // {
        //   "rel" : "artist",
        //   "href" : config.url + "/artists/" + player.artist
        // }
    ];
}

/** router for /players */
module.exports = router;
