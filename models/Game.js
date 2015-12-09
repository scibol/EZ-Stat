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
	players: {type: [PlayerSchema], default: []},
    name: {type: String, default: "New Game"},
	date: { type: Date, default: Date.now},
	result : { type: Boolean, default : false},
    started: {type: String, default: "0"},
    finished: {type: String, default: "0"},
    players1: {type: [PlayerSchema], default: []},
    players2: {type: [PlayerSchema], default: []},
    team1: {type: String, default:''},
    team2: {type: String, default:''}
}

);


//register model
mongoose.model('Game', GameSchema);

