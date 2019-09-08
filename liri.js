var Spotify = require("node-spotify-api")
require("dotenv").config()
var keys = require("./keys.js")
var moment = require("moment")
var fs = require("fs")


var spotify = new Spotify(keys.spotify)