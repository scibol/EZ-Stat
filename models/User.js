/** @module users/User
* The User Model
* Schema:
* _id           ObjectId           Unique identifier of the user
* userName      String             Username of the user
* email         String             Email address of the user
* password      String             Password for the user account
* firstName     String             First name of the user. Default: username
* lastName      String             Last name of the user. Default: username
* dateCreated   Date               Date the user was created.  Default: Date.now()
* playlists     [PlaylistSchema]   Playlists of the user. Default: []
*/


'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var PlaylistSchema = require('./Playlist');

/** @constructor
* @param {Object} definition
*/
var userSchema = new mongoose.Schema(
{
  userName : { type: String, required: true },
  firstName: { type: String },
  lastName : { type: String },
  password : { type: String, required: true },
  email   : { type: String, required: true },
  dateCreated : { type: Date, required: true, default: Date.now },
  playlists : { type: [PlaylistSchema], default: [] }
}
);

userSchema.pre('save', function (next) {
  //default for firstName is userName
  if( this.firstName === undefined 
    || this.firstName === null 
    || this.firstName.toString().trim() === ''){
    this.firstName = this.userName;
  }
  
  //default for lastName is userName
  if( this.lastName === undefined 
    || this.lastName === null 
    || this.lastName.toString().trim() === ''){
    this.lastName = this.userName;
  }
  return next();
});

userSchema.pre('save', function(next) {
  var user = this;

  // return if the password was not modified.
  if (!user.isModified('password')) { return next(); }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) { return next(err); }

      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) { return next(err); }

          user.password = hash;
          next();
      });
  });
});


userSchema.methods.isValidPassword = function isValidPassword(candidate, callback) {
  bcrypt.compare(candidate, this.password, function onPwdCompare(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

//register model
mongoose.model('User', userSchema);