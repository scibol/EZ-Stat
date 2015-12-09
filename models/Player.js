/** @module models/Player
 * The Player Model.
 * Schema:
 * firstName           String       required   first name of the player
 * lastName            String       required   last name of the player
 * number              String       optional   number of the player. Default : ""
 * position            String       optional   role of the player. Default : ""
 * team                String       required   team of the player
 * shots               String       optional   Array of shots taken by the player. Default : []
 */


'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var CoordinateSchema = require('./Coordinate');


/** @constructor
 * @param {Object} definition
 */
var PlayerSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        number: {type: String, default: ""},
        position: {type: String, default: ""},
        team: {type: String, default: ""},
        shots: {type: [CoordinateSchema], default: []},
        succesfulPasses: {type: Number, default: 0},
        failedPasses: {type: Number, default: 0},
        assists: {type: Number, default: 0},
        lostBalls: {type: Number, default: 0},
        recoveredBalls: {type: Number, default: 0},
        freeshotsScored: {type: Number, default: 0},
        freeshotsMissed: {type: Number, default: 0},
        fouls: {type: Number, default: 0},
        technicalFouls: {type: Number, default: 0},
        unsportsmanshipFouls: {type: Number, default: 0}
    }
);


//register model
mongoose.model('Player', PlayerSchema);
module.exports = PlayerSchema;


