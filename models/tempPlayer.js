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
var tempCoordinateSchema = require('./tempCoordinate');



/** @constructor
 * @param {Object} definition
 */
var tempPlayerSchema = new mongoose.Schema(

    {
        firstName: { type: String, required: true },
        lastName : { type: String, required: true },
        number : {type: String, default : ""},
        position : {type: String, default : ""},
        team : {type: String, default: ""},
        shots : {type: [tempCoordinateSchema], default: []},
        assists : {type: Number, default: 0},
        fouls : {type: Number, default: 0},
        freeShots : {type: Number, default: 0},
    }

);


//register model
mongoose.model('tempPlayer', tempPlayerSchema);
module.exports = tempPlayerSchema;

