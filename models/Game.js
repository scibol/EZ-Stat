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


/** @constructor
* @param {Object} definition
*/
var GameSchema = new mongoose.Schema(

{
	players: {type: [PlayerSchema], default: []},
    name: {type: String, default: "New Game"},
	date: { type: Date, default: Date.now},
	team1score : { type: Number, default : 0},
    team2score : { type: Number, default : 0},
	result : { type: Boolean, default : false},
    started: {type: String, default: "0"},
    finished: {type: String, default: "0"},
    players1: {type: Array, default: []},
    players2: {type: Array, default: []},
    team1: {type: String, default:''},
    team2: {type: String, default:''}
});


//register model
mongoose.model('Game', GameSchema);

