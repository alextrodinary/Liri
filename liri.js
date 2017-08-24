var keys = require('./keys.js');

var Twitter = require('twitter');

var spotify = require('spotify');

var request = require('request');


var getMyTweets = function(){

    var client = new Twitter(keys.twitterKeys);
    
    var params = {screen_name: 'alextrodinary'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
     if (!error) {
       console.log(tweets);
    
       for(var i=0; i < tweets.length; i++ ) {
           console.log(tweets[i].created_at);
           console.log(' ');
           console.log(tweets[i].text);
       }
     }
    });  
}

var getArtistNames = function(artist) {
    return artist.name;
}
var getMeSpotify = function(songName) {

    spotify.search({ type: 'track', query: 'alive' }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items;
        for(var i=0; i<songs.length;i++) {
            console.log(i);
            console.log('artist(s):' + songs[i].artist.map(getArtistNames));
            console.log('song name:' + songs[i].name);
            console.log('preview song:' + songs[i].preview_url);
            console.log('album:' + songs[i].album.name);

        }
      console.log(data);
      //console.log(data.tracks.items[0]);
     });
}


var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
            getMyTweets();
            break;
        case 'spotify-this-song' :
            getMeSpotify(functionData);
            break;
        default:
        console.log("Liri doesnt know this");
    }
}

var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);