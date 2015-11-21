/** @module players/router */
'use strict';

var express = require('express');
var router = express.Router();
var middleware =  require('../middleware');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Player = mongoose.model('Player');
var config = require("../../config");
var pubsub = require('../../pubsub');

//fields we don't want to show to the client
var fieldsFilter = { '__v': 0 };

//supported methods
router.all('/:playerid', middleware.supportedMethods('GET, PUT, DELETE, OPTIONS'));
router.all('/', middleware.supportedMethods('GET, POST, OPTIONS'));

//list players
router.get('/', function(req, res, next) {

  var filter = {};
  if (req.query.filter) {
    var jsonFilter = JSON.parse(req.query.filter);
    
    if(jsonFilter.artist){
      filter.artist = jsonFilter.artist;
    }
    else if(jsonFilter.album){
      filter.album = jsonFilter.album;
    }
  }

  Player.find(filter, fieldsFilter).lean().populate('shots').exec(function(err, players){
    if (err) return next (err);
    players.forEach(function(player){
      addLinks(player);
    });
    res.json(players);
  });
});

//create new player
router.post('/', function(req, res, next) {

  var newPlayer = new Player(req.body);
  newPlayer.save(onModelSave(res, 201, true));
});

//get a player
router.get('/:playerid', function(req, res, next) {
  Player.findById(req.params.playerid, fieldsFilter).lean().populate('shots').exec(function(err, player){
    if (err) return next (err);
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
router.put('/:playerid', function(req, res, next) {
  var data = req.body;

  Player.findById(req.params.playerid, fieldsFilter , function(err, player){
    if (err) return next (err);
    if (player){
      if(data.name)
        player.name = data.name;
      else
        player.name = player.name;

      if(data.artist)
        player.artist = data.artist;
      else
        player.artist = player.artist;

      if(data.duration)
        player.duration = data.duration;
      else
        player.duration = player.duration;

      if(data.file)
        player.file = data.file;
      else
        player.file = player.file;

      if(data.album)
        player.album = data.album;
      else
        player.album = player.album;

      if(data.id3Tags)
        player.id3Tags = data.id3Tags;
      else
        player.id3Tags = player.id3Tags;

      if(data.dateReleased)
        player.dateReleased = data.dateReleased;
      else
        player.dateReleased = player.dateReleased;

      if(data.dateReleased)
        player.dateReleased = data.dateReleased;
      else
        player.dateReleased = player.dateReleased;

      player.save(onModelSave(res));
    }else{
      //player does not exist create it
      var newPlayer = new Player(data);
      newPlayer._id = ObjectId(req.params.playerid);
      newPlayer.save(onModelSave(res, 201, true));
    }
  });
});

//remove a player
router.delete('/:playerid', function(req, res, next) {
  Player.findById(req.params.playerid, fieldsFilter , function(err, player){
    if (err) return next (err);
    if (!player) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    player.remove(function(err, removed){
      if (err) return next (err);
      res.status(204).end();
      pubsub.emit('player.deleted', removed)
    })
  });
});

function onModelSave(res, status, sendItAsResponse){
  var statusCode = status || 204;
  var sendItAsResponse = sendItAsResponse || false;
  return function(err, saved){
    if (err) {
      if (err.name === 'ValidationError' 
        || err.name === 'TypeError' ) {
        res.status(400)
      return res.json({
        statusCode: 400,
        message: "Bad Request"
      });
    }else{
      return next (err);
    }
  }

  // var obj = saved.toObject();
  pubsub.emit('player.updated', {})
  if( sendItAsResponse){
    var obj = saved.toObject();
    delete obj.password;
    delete obj.__v;
    addLinks(obj);
    return res.status(statusCode).json(obj);
  }else{
    return res.status(statusCode).end();
  }

}
}

function addLinks(player){
  player.links = [
  { 
    "rel" : "self",
    "href" : config.url + "/players/" + player._id
  },
  { 
    "rel" : "artist",
    "href" : config.url + "/artists/" + player.artist
  }
  ];

  if(player.album){
    player.links.push({ 
      "rel" : "album",
      "href" : config.url + "/albums/" + player.album
    });
  }
}

/** router for /players */
module.exports = router;
