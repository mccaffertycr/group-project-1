var subscriptionKey = '';
var clientId = '';
var secret = '';

// event listener that collects api keys

$('#save-keys').on('click', function() {
  subscriptionKey = $('#emotion-api-key-input').val().trim();
  clientId = $('#spotify-id-input').val().trim();
  secret = $('#spotify-secret-input').val().trim();
  $('#api-keys').empty();
})

// hide main container when page loads
$('#main').hide();

$('#get-started').on('click', function() {

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

  // start webcam
  navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            // Attach the video stream to the video element and autoplay.
            player.srcObject = stream;
        });
})
