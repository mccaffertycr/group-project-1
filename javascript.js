$(document).ready(function () {
    console.log("ready!");

    var queryURL = "https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token" 
    var clientId = "1734fafdd46a492594d75bd172d27d33"
    var secret = "76fc2f6fd0454a5ab0ec014a3a42fa19"
    var bas64 = btoa(  clientId +  ":" + secret )

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
    }).fail(function() {
       console.log('something failed'); 
    });
});