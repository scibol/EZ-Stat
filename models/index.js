/** @module models/index.js
* Loads all models
*/
'use strict';

var mongoose = require('mongoose');

require('./Coordinate');
require('./Game');
require('./Player');
require('./Album');
require('./Artist');
require('./Playlist');
require('./Track');
require('./User');


module.exports = {
  'Coordinate' : mongoose.model('Coordinate'),
  'Game' : mongoose.model('Game'),
  'Player' : mongoose.model('Player'),
  'Album' : mongoose.model('Album'),
  'Artist' : mongoose.model('Artist'),
  'Playlist' : mongoose.model('Playlist'),
  'Track' : mongoose.model('Track'),
  'User' : mongoose.model('User')
}

