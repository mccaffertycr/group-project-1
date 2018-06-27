$(document).ready(function () {
    console.log("ready!");


    //GET https://www.googleapis.com/youtube/v3/search?part=snippet&topicId=/m/05z1_&type=video&key=AIzaSyCfZI_vpTv4-aT3219PMkDee1Z_iaocTkQ

    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&topicId=/m/04rlf" + "&type=video&key=AIzaSyCfZI_vpTv4-aT3219PMkDee1Z_iaocTkQ";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.items);

        for (var i = 0; i < response.items.length; i++) {
            $("#results").append("<iframe id='player' type='text/html' width='640' height='390'"+
            "src='http://www.youtube.com/embed/"+ response.items[i].id.videoId + 
             "?enablejsapi=1&origin=http://example.com'"+
            "frameborder='0'></iframe>'")
        }

    })



});