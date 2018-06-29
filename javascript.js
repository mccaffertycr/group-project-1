$(document).ready(function () {
   // console.log("ready!");
    var limit = 5;
    var q = "Happy";
    //offsets randomly by 100 to hopefully give different results.
    //however I think for the finished we should append to new array then randomize that for real different feeling results
    var offset = Math.floor(Math.random() * 100);
    var queryPlaylist = "https://api.spotify.com/v1/search?q="+ q +"&type=playlist&market=US&limit="+limit+"&offset="+offset;
    //var for storing the access_token
    var atoken = "";
    
    
    function startApp(){

    var queryURL = "https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token";
    var clientId = "1734fafdd46a492594d75bd172d27d33";
    var secret = "76fc2f6fd0454a5ab0ec014a3a42fa19";
    var bas64 = btoa(  clientId +  ":" + secret );
    var storePlaylist = [""];
   

    //console.log(btoa(  clientId +  ":" + secret ))
    $.ajax({
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Basic " + bas64)
        },
        url: queryURL,
        method: "POST",
        data: {grant_type: "client_credentials"}
        // xhrFields: { withCredentials: true}
    }).done(function (response) {
        console.log(response);
        //get access token
        atoken = response.access_token;
        console.log(atoken);
        //run next playlist search function after token is recieved
        playlistSearch();
    }).fail(function() {
       console.log('something failed'); 
    });

    }
   
    startApp();

function playlistSearch() {
    $.ajax({
        url: queryPlaylist,
        method: "GET",
        headers: { Authorization: "Bearer " + atoken }
    }).done(function(response){
        console.log(response);
        for(var i=0;i<20;i++){
       
       console.log(response.playlists.items[1].uri);
     
        $("#putSongsHere").append("<iframe src='https://open.spotify.com/embed?uri=" + response.playlists.items[i].uri +"'width='300' height='380' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>");
       }
       
       // displaySongs(); 
    }).fail(function() {
        console.log('NOOO');
    });

}

function displaySongs(){
   

}

    


});