var Spotify = require("node-spotify-api")
require("dotenv").config()
var keys = require("./keys.js")
var moment = require("moment")
var fs = require("fs")
var axios = require("axios")

var spotify = new Spotify(keys.spotify)



var searchCommand = process.argv[2];
var searchTerms = process.argv.slice(3).join("+");
var separator = "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~"

switch(searchCommand){
    case "concert-this":
        let bandURL = "https://rest.bandsintown.com/artists/" + searchTerms + "/events?app_id=codingbootcamp"
        axios.get(bandURL).then(function(bandRes){
            if(!bandRes.data || !bandRes.data.length){console.log("This artist is not touring in the near future")}

            for(i of bandRes.data){
                let tourDate = moment(i.datetime).format("MMM Do YYYY, h:mm a")
                console.log("\nVenue: "+i.venue.name+"\nLocation: "+i.venue.city+", "+i.venue.country+"\nDate: "+tourDate)
                console.log(separator)
            }
        })
        break
    
    case "spotify-this-song":

        break
    
    case "movie-this":

        break
    
    case "do-what-it-says":

        break
    default:
        console.log("This is not a known command. Please try again.")    
}