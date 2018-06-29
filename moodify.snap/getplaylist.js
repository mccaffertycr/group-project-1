function playlistMatch(userMood) {
     console.log("ready!");
     var limit = 5;
     var q = userMood;
     //offsets randomly by 100 to hopefully give different results.
     //however I think for the finished we should append to new array then randomize that for real different feeling results
     var offset = Math.floor(Math.random() * 100);
     var queryPlaylist = "https://api.spotify.com/v1/search?q="+ q +"&type=playlist&market=US&limit="+limit+"&offset="+offset;
     //var for storing the access_token
     var atoken = "";
     
     
     function startApp() {
 
     var queryURL = "https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token";
     var bas64 = btoa(  clientId +  ":" + secret );
     var storePlaylist = [""];  

     $.ajax ({
         beforeSend: function(request) {
             request.setRequestHeader("Authorization", "Basic " + bas64)
         },
         url: queryURL,
         method: "POST",
         data: {grant_type: "client_credentials"},
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

         var rndm = Math.floor(Math.random()*5);    

         $("#playlist-wrapper").append("<iframe src='https://open.spotify.com/embed?uri=" 
                                   + response.playlists.items[rndm].uri 
                                   + "'width='300' height='380' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>");
        
     }).fail(function() {
         console.log('NOOO');
     });
    }
}
 
 
