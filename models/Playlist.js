/** @module models/Playlist
* The Playlist Model.
* Schema:
* _id           String       required   unique identifier of the playlist.
* name          String       required   name of the playlist.
* tracks        [ObjectId]   optional   tracks that this playlist contains. They should be `_id`s of Track model documents.
* dateCreated   Date         required   date the playlist was created. Default: Date.now()
*/

'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


/** @constructor
* @param {Object} definition
*/
var PlaylistSchema = new mongoose.Schema(
  {
    name : { type: String, required: true },
    tracks : { type: [ObjectId], ref: "Track" },
    dateCreated : { type: Date, default: Date.now },
  }

);


//register model

mongoose.model('Playlist', PlaylistSchema);
module.exports = PlaylistSchema;
