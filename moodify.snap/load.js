    // declare global vars
    
    var player;
    var canvas;
    var context ;
    var captureButton;
    var constraints;
    var imageData = null;
    var mood = '';

$(document).on('click', '#get-started', function(){ 
    var maindiv = $('<div id="main" class="container-fluid text-center">' +

        '<!-- header and api key inputs -->' +

            '<form class="mt-3" id="api-keys">' +
                '<input type="text" id="emotion-api-key-input" placeholder="Emotion Detection API-KEY">' +

                '<input type="text" id="spotify-id-input" placeholder="Spotify Id">' +
                
                '<input type="text" id="spotify-secret-input" placeholder="Spotify Secret">' +
                '<br>' +

                '<button class="capture btn btn-dark mt-3" id="save-keys" type="enter">enter</button>' +              
            '</form>' +
    
        '<!-- display for the video capture / captured image / chosen mood / playlist -->' +
        '<div id="main-wrapper" class="mt-2">' +
            '<video id="player" controls autoplay></video><br>' +
            '<button class="capture btn btn-dark mx-auto" value="capture" id="capture">capture</button>' +
        '</div>' +

        '<!-- alternate option to upload an image of face -->' +

        '<!-- <h1>or</h1>' +
        '<input class="btn btn-dark text-center" type="file" name="pic" accepts="images/*" id="image-input">' +
        '<input class="upload btn btn-dark text-center" id="upload" value="upload"> -->' +

        '<!-- snapshot displayed here-->' +
        '<div id="snapshot-wrapper" class="mt-3">' +
            '<canvas id="canvas" width=640 height=480></canvas>' +
        '</div>' +


        '<div id="playlist-wrapper" class="mt-1">' +

        '</div>' +

    '</div>');

    $('body').append(maindiv);

        // hide this button
        $(this).hide();
        // divide the screen
        $('#info').css('grid-column-end', '2');
        // hide the canvas
        $('#canvas').hide();
        // remove current mood 
        $('#mood-label').remove();
        // empty any existing playlists
        $('#playlist-wrapper').empty();
        // display the main container and main-wrapper 
        $('#main').show();
        $('#main-wrapper').show();
        // adjust text on header button
        $('#get-started').text('get started'); 
        // change info color to default
        $('#info').css('background-color', 'white').css('color', 'black');

    player = document.getElementById('player');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    captureButton = document.getElementById('capture');
    constraints = {
        video: true,
    };

    // start webcam
    navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
        // Attach the video stream to the video element and autoplay.
        player.srcObject = stream;
    });

        })