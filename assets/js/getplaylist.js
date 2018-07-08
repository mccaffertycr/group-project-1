// function that gets access token from Spotify
function startApp() { 
    console.log("ready!"); 
    var queryURL = "https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token";
    var bas64 = btoa(  clientId +  ":" + secret );

    $.ajax ({
        beforeSend: function(request) {
             request.setRequestHeader("Authorization", "Basic " + bas64)
        },
        url: queryURL,
        method: "POST",
        data: {grant_type: "client_credentials"},
    })
    
    .done(function (response) {
     // get access token
     atoken = response.access_token;
     // log if token exists
     if (atoken !== '') {
        console.log('Token Granted!');
     }
    })

    .fail(function() {
        console.log('token request failed'); 
    });
}

function playlistMatch() {  
    // limit to 1 to speed up as much as possible
    var limit = 4;
    var q = mood;
    // offset by 10 to return a random playlist
    var offset = Math.floor(Math.random() * 10);
    var queryPlaylist = "https://api.spotify.com/v1/search?q="+ q +"&type=playlist&market=US&limit="+limit+"&offset="+offset;

    $.ajax({
        url: queryPlaylist,
        method: "GET",
        headers: { Authorization: "Bearer " + atoken }
    })
    
    .done(function(response){
        for (var i = 0; i < response.playlists.items.length; i++) {
        $("#playlist-wrapper").append("<iframe src='https://open.spotify.com/embed?uri=" 
                                        + response.playlists.items[i].uri 
                                        + "' width='300' height='320' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>");
        }

    })
     
    .fail(function() {
        console.log('playlistMatch() failed');
    });
}



 
 
