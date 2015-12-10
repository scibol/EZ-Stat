/** @module models/index.js
* Loads all models
*/
'use strict';

var mongoose = require('mongoose');

require('./Coordinate');
require('./tempCoordinate');
require('./tempPlayer');
require('./Game');
require('./Player');
require('./User');


module.exports = {
  'Coordinate' : mongoose.model('Coordinate'),
  'Game' : mongoose.model('Game'),
  'Player' : mongoose.model('Player'),
  'User' : mongoose.model('User'),
  'tempPlayer' : mongoose.model('tempPlayer'),
  'tempCoordinate' : mongoose.model('tempPlayer')
};

