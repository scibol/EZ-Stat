/** @module models/Coordinate
* The Coordinate Model. 
* Schema:
* shot            Array       required   array of 3 elements, first two are xy coords third is boolean success
*/


'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


/** @constructor
* @augments AbstractSoundCollectionSchemaInstance
* @param {Object} definition
*/
var CoordinateSchema = new mongoose.Schema(

{
  shot : { type: Array, required: true },
}

);


//register model
mongoose.model('Coordinate', CoordinateSchema);

