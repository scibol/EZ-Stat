/** @module tracks/router */
'use strict';

var express = require('express');
var router = express.Router();
var middleware =  require('../middleware');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Track = mongoose.model('Track');
var config = require("../../config");
var pubsub = require('../../pubsub');

//fields we don't want to show to the client
var fieldsFilter = { '__v': 0 };

//supported methods
router.all('/:trackid', middleware.supportedMethods('GET, PUT, DELETE, OPTIONS'));
router.all('/', middleware.supportedMethods('GET, POST, OPTIONS'));

//list tracks
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

  Track.find(filter, fieldsFilter).lean().populate('artist').populate('album').exec(function(err, tracks){
    if (err) return next (err);
    tracks.forEach(function(track){
      addLinks(track);
    });
    res.json(tracks);
  });
});

//create new track
router.post('/', function(req, res, next) {

  var newTrack = new Track(req.body);
  newTrack.save(onModelSave(res, 201, true));
});

//get a track
router.get('/:trackid', function(req, res, next) {
  Track.findById(req.params.trackid, fieldsFilter).lean().populate('artist').populate('album').exec(function(err, track){
    if (err) return next (err);
    if (!track) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    addLinks(track);
    res.json(track);
  });
});

//update a track
router.put('/:trackid', function(req, res, next) {
  var data = req.body;

  Track.findById(req.params.trackid, fieldsFilter , function(err, track){
    if (err) return next (err);
    if (track){
      if(data.name)
        track.name = data.name;
      else
        track.name = track.name;

      if(data.artist)
        track.artist = data.artist;
      else
        track.artist = track.artist;

      if(data.duration)
        track.duration = data.duration;
      else
        track.duration = track.duration;

      if(data.file)
        track.file = data.file;
      else
        track.file = track.file;

      if(data.album)
        track.album = data.album;
      else
        track.album = track.album;

      if(data.id3Tags)
        track.id3Tags = data.id3Tags;
      else
        track.id3Tags = track.id3Tags;

      if(data.dateReleased)
        track.dateReleased = data.dateReleased;
      else
        track.dateReleased = track.dateReleased;

      if(data.dateReleased)
        track.dateReleased = data.dateReleased;
      else
        track.dateReleased = track.dateReleased;

      track.save(onModelSave(res));
    }else{
      //track does not exist create it
      var newTrack = new Track(data);
      newTrack._id = ObjectId(req.params.trackid);
      newTrack.save(onModelSave(res, 201, true));
    }
  });
});

//remove a track
router.delete('/:trackid', function(req, res, next) {
  Track.findById(req.params.trackid, fieldsFilter , function(err, track){
    if (err) return next (err);
    if (!track) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    track.remove(function(err, removed){
      if (err) return next (err);
      res.status(204).end();
      pubsub.emit('track.deleted', removed)
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
  pubsub.emit('track.updated', {})
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

function addLinks(track){
  track.links = [
  { 
    "rel" : "self",
    "href" : config.url + "/tracks/" + track._id
  },
  { 
    "rel" : "artist",
    "href" : config.url + "/artists/" + track.artist
  }
  ];

  if(track.album){
    track.links.push({ 
      "rel" : "album",
      "href" : config.url + "/albums/" + track.album
    });
  }
}

/** router for /tracks */
module.exports = router;
