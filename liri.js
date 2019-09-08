var Spotify = require("node-spotify-api")
require("dotenv").config()
var keys = require("./keys.js")
var moment = require("moment")
var fs = require("fs")
var axios = require("axios")

var spotify = new Spotify(keys.spotify)

var omdbapi = keys.OMDB.key

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
        if(!searchTerms){searchTerms = "The Sign Ace of Base"}
        spotify.search({type: 'track', query:searchTerms}, function(err, data){
            if(err){
                return console.log('Error occurred: '+err);
            }
            let songData =data.tracks.items[0]
            console.log("Artist: "+songData.artists[0].name+
            "\nSong title: "+songData.name+
            "\nPreview Link: "+songData.external_urls.spotify+
            "\nAlbum: "+songData.album.name)
        })
        break
    
    case "movie-this":
        if(!searchTerms){searchTerms = "Mr+Nobody"}
        let movieURL = "http://www.omdbapi.com/?t="+searchTerms+"&apikey="+omdbapi
        axios.get(movieURL).then(function(movieRes){
            let data = movieRes.data
            console.log("\nTitle: "+data.Title+
            "\nRelease Year: "+data.Year+
            "\nIMDB Rating: "+data.imdbRating+
            "\nRotten Tomatoes Rating: "+data.Ratings[1].Value+
            "\nCountry: "+data.Country+
            "\nLanguage: "+data.Language+
            "\nActors: "+data.Actors+
            "\nPlot: "+data.Plot)
        })
        break
    
    case "do-what-it-says":

        break
    default:
        console.log("This is not a known command. Please try again.")    
}