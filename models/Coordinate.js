/** @module models/Coordinate
* The Coordinate Model. 
* Schema:
* shot            Array       required   array of 3 elements, first two are xy coords third is boolean success
*/


'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


var CoordinateSchema = new mongoose.Schema(

{
  pos_x: {type: String, required: true},
  pos_y: { type: String, required: true},
  success : { type: String, required: true}
}

);


//register model
mongoose.model('Coordinate', CoordinateSchema);
module.exports = CoordinateSchema;

