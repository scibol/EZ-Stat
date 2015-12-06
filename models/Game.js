/** @module models/Game
* The Game Model.
* Schema:
* teams            String       required   Unique
* date             String       required   date of the game. Default: Date.now
* result           String       required   score of the game
*/


'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var PlayerSchema = require('./Player');
var tempPlayerSchema = require('./tempPlayer')


/** @constructor
* @param {Object} definition
*/
var GameSchema = new mongoose.Schema(

{
	event: {type: [tempPlayerSchema], default: []},
	date: {type: Date, default: Date.now},
	result : {type: String, default: ""},
	state : {type: Number, default: 0},
    finished: {type: Boolean, default: false},
	team1: {type: [PlayerSchema], default: []},
    team2 : {type: [PlayerSchema], default: []}
}

);


//register model
mongoose.model('Game', GameSchema);

