'use strict';

var mongoose = require('mongoose');
var Coordinates = mongoose.model('Coordinates');
var ObjectId = mongoose.Types.ObjectId;

var players = {
  name : 'Player',
  data : [
    {
      "_id"          : ObjectId(),
      "firstName"    : "Checco",
      "lastName"     : "Bello",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
      "_id"          : ObjectId(),
      "firstName"    : "XYZ",
      "lastName"     : "Bombazza",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
      "_id"          : ObjectId(),
      "firstName"    : "Brutto",
      "lastName"     : "haho",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
      "_id"          : ObjectId(),
      "firstName"    : "666",
      "lastName"     : "wella",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
      "_id"          : ObjectId(),
      "firstName"    : "321",
      "lastName"     : "44",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
      "_id"          : ObjectId(),
      "firstName"    : "vecchio",
      "lastName"     : "jojo",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
      "_id"          : ObjectId(),
      "firstName"    : "vecchio",
      "lastName"     : "jojo",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
      "_id"          : ObjectId(),
      "firstName"    : "Yeah",
      "lastName"     : "Weah",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : "ciao",
      "lastName"     : "ciao",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
      "_id"          : ObjectId(),
      "firstName"    : "delirio",
      "lastName"     : "bho",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : "Yeah",
      "lastName"     : "Weah",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : "asxkaixas",
      "lastName"     : "Wedadedsah",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : "dwadawsda",
      "lastName"     : "bgfbfg",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : "dwqdwqasda",
      "lastName"     : "bfgbfgbfb",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : "12d122d",
      "lastName"     : "d32ndji1",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : "12d1asxas",
      "lastName"     : "d21bh2d",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : "dasnjdka2",
      "lastName"     : "dsanjax",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : "dnjsakd8",
      "lastName"     : "sxnjk as0",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : " c ccjnc",
      "lastName"     : "sajndkas",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : "dnji12",
      "lastName"     : "csnjaslkc",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : "dawjkdads",
      "lastName"     : "llllllll",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : "dasbdkj2",
      "lastName"     : "xxx",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : "d12njkd1h8",
      "lastName"     : "nsja kc ajk",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
            "_id"          : ObjectId(),
      "firstName"    : "das kxas",
      "lastName"     : "dawnjk21",
      "number"       : "",
      "position"     : "",
      "team"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "shots"        : new Coordinates({
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
        ["pos_x"          : "12.5"
        "pos_y"          : "33",
        "success"        : "false"],
        ["pos_x"          : "33.5"
        "pos_y"          : "100",
        "success"        : "true"],
      }),
    ]
  }
}
var games = {
  'name' : 'Game'
  data : [
  'teams' : [players.data[0]._id,
  players.data[1]._id,
  players.data[2]._id,
  players.data[3]._id,
  players.data[4]._id,
  players.data[5]._id,
  players.data[6]._id,
  players.data[7]._id,
  players.data[8]._id,
  players.data[9]._id,
  players.data[10]._id,
  players.data[11]._id],
  [players.data[12]._id,
  players.data[13]._id,
  players.data[14]._id,
  players.data[15]._id,
  players.data[16]._id,
  players.data[17]._id,
  players.data[18]._id,
  players.data[19]._id,
  players.data[20]._id,
  players.data[21]._id,
  players.data[22]._id,
  players.data[23]._id,
  ],
  'date' : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)",
  'result' : 'true'
  ]}

var seedData = [];
seedData.push(players);
seedData.push(games);

module.exports = seedData;
