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
  pos_x: {type: String, default: ""},
  pos_y: { type: String, default: ""},
  success : { type: Boolean, required: true},
  two_points: { type: Boolean, default: false}
}

);


//register model
mongoose.model('Coordinate', CoordinateSchema);
module.exports = CoordinateSchema;

