    //
    //
    // global vars
    //
    //

    var player;
    var canvas;
    var context;
    var captureButton;
    var constraints;
    var imageData = null;
    var mood = '';
    var firstvisit = true;
    var atoken = ""; 

// $(document).ready(function() {
//     var landingpage =  
//     $('<div id="info" class="container-fluid text-center">' +
//         '<div id="logo-wrapper" class="container-fluid">' +
//             '<img src="assets/images/default_logo.png" id="logo"class="mx-auto"></img>' +
//             '<br>' +
//             '<button class="confirm btn btn-dark mr-2" id="get-started">get started</button>' +
//         '</div>' + 
//       '</div>');

//     $('body').append(landingpage);
// })

$(document).ready(function() {

    // // hide get started button
    // $(this).hide();
    
    // // divide the screen with css grid
    // if (($('#info').css('grid-column-end'))) {
    //      $('#info').css('grid-column-end', '2');
    // } else {
    //      $('#info').css('grid-row-end', '2');
    // }
    // // if first time to the page create and append the main div html
    // if (firstvisit) { 
    //   var maindiv = 
    //   $('<div id="main" class="container-fluid text-center">' +

    //     '<!-- header and api key inputs -->' +
    //         '<form class="mt-3 mb-5" id="api-keys">' +
    //             '<input type="text" id="emotion-api-key-input" placeholder="Emotion Detection API-KEY">' +
    //             '<input type="text" id="spotify-id-input" placeholder="Spotify Id">' +                
    //             '<input type="text" id="spotify-secret-input" placeholder="Spotify Secret">' +
    //             '<br>' +
    //             '<button class="capture btn btn-dark mt-3" id="save-keys" type="enter">enter</button>' +              
    //         '</form>' +
    
    //     '<!-- display for the video capture / captured image / chosen mood / playlist -->' +
    //     '<div id="main-wrapper" class="mt-2">' +
    //         '<video id="player" controls autoplay></video><br>' +
    //         '<button class="capture btn btn-dark mx-auto" value="capture" id="capture">capture</button>' +
    //     '</div>' +

    //     '<div id="upload-wrapper">' +
    //         '<button class="capture btn btn-dark mx-auto" id="use-webcam">use webcam</button>' +
    //         '<h1>or</h1>' +
    //         '<input class="btn btn-dark text-center" onchange="readURL(this)" type="file" name="pic" accepts="images/*" id="image-input">' +
    //     '</div>' +

    //     '<!-- snapshot displayed here-->' +
    //     '<div id="snapshot-wrapper" class="mt-3">' +
    //         '<canvas id="canvas" width=640 height=480></canvas>' +
    //     '</div>' +
     
    //     '<div id="playlist-wrapper" class="mt-1">' +

    //     '</div>' +

    // '</div>');
    
    // $('body').append(maindiv);
    // }
    // // create how to modal
    // if (firstvisit) {
    // var howTo = 
    // $('<div id="how-to-modal">' +
    //     '<button type="button" class="btn btn-dark" data-toggle="modal" data-target=".bd-modal-lg">how to use</button>' +

    //     '<div class="modal fade bd-modal-lg" tabindex="-1" role="dialog" aria-labelledby="how-to" aria-hidden="true">' +
    //         '<div class="modal-dialog modal-lg">' +
    //             '<div class="modal-body">' +
    //                 '<h2>use your cam to take a picture (or upload one) </h2><br>' +
    //                 '<h2>moodify will analyze your facial expression to determine your mood</h2><br>' +  
    //                 '<h2>make sure the picture you submit has a face in it or moodify might not work</h2><br>' +
    //                 '<h2>once your mood is determined moodify will give you 4 spotify playlists that match it</h2><br>' +
    //                 '<h2>if you get tired of those or start feeling differently just click not feeling it to submit a new picture</h2><br>' +
    //             '</div>' +
    //         '</div>' +
    //     '</div>' +
    // '/div')
    // $('#info').append(howTo); 
    // } else {
    // $('#how-to-modal').show();
    // }

    // hide the canvas
    $('#canvas').hide();
    // remove current mood 
    $('#mood-label').remove();
    // empty any existing playlists
    $('#playlist-wrapper').empty();
    // display the main container and main-wrapper 
    $('#main').show();
    $('#main-wrapper').hide();
    $('#upload-wrapper').show();
    
    $('#get-started').hide(); 
    // change info color to default
    $('#info').css('background', '#4E5F82');
    $('#logo').attr('src', 'assets/images/logodesignlandingblank.png');
    
    // set webcam / canvas variables
    player = document.getElementById('player');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    captureButton = document.getElementById('capture');
    constraints = {
        video: true,
    };

    // adjust first visit var
    firstvisit = false;
   
});
