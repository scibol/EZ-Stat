'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


var tempCoordinateSchema = new mongoose.Schema(

{
  pos_x: {type: String, default: ""},
  pos_y: { type: String, default: ""},
  success : { type: Boolean, required: true},
  two_points: { type: Boolean, default: false}
}

);


//register model
mongoose.model('tempCoordinate', tempCoordinateSchema);
module.exports = tempCoordinateSchema;

