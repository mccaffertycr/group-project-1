 // declare global variables
 var database = firebase.database();
 // set camera with preferred resolution
 var constraints = { video: { width: 1366, height: 768 } };
 var player = document.getElementById('player');
 var canvas = document.getElementById('canvas');
 var cxt;
 var captureBtn = $('#capture');
 var dataURL = '';
 var upload;


 // function that attaches the video stream to the video element and autoplay 
 function getVideo() { 
     navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
        var video = document.querySelector('video');
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
            video.play();
     };
 })
 .catch(function(err) { 
     console.log(err.name + ": " + err.message); 
     }); // always check for errors at the end.
};



$(document).on('click', '.capture', function() {

    //empty the canvas var and create a new canvas with jquery
    dataURL = '';
    cxt = canvas.getContext('2d');

    // Draw the video frame to the canvas.
    cxt.drawImage(player, 0, 0, canvas.width, canvas.height);

    // store image data 
    dataURL = (canvas.toDataURL('image/png', 0.90)); 
    var blob = new Blob([dataURL], {
        type: 'image/png'
    }) 
    // canvas.toBlob(function(blob) {
    //    dataURL = blob;
    // }, 'image/jpeg', 1.0);

    // ajax call to azure emotion detection api to return mood data
    processImage(blob);

    // replace player with canvas image / mood and prompt user to confirm
    if (dataURL) {
        $('#main-wrapper').empty();
        $('#main-wrapper').append($('<h1>mood:</h1>'),
                                  $('#canvas'));
        $('#btn-wrapper').empty();
        $('#btn-wrapper').append($('<input class="confirm btn btn-dark mx-auto" value="confirm" id="confirm">'),
                                 $('<input class="reset btn btn-dark mx-auto" value="try again" id-"try-again">'));
    }
 });

 // event listener to reset if user hits try-again
 $(document).on('click', '.reset', function() {
    dataURL = '';
    $('#main-wrapper').empty();
    $('#main-wrapper').append($('<video class="col-10 mx-auto" id="player" controls autoplay></video>'));
    $('#btn-wrapper').empty();
    $('#btn-wrapper').append($('<input class="capture btn btn-dark mx-auto" value="capture" id="capture">'));
    getVideo();
 });

 // event listener that pushes the converted ajax data into firebase
 $(document).on('click', '.confirm', function() {
 });

 // get video when the page loads
 getVideo();