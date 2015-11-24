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
	date: { type: Date, default: Date.now},
	result : { type: String, required: true}
}

);


//register model
mongoose.model('Game', GameSchema);

