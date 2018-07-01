// listen for uploads

function readURL(input) {
    // Stop all video streams.
    player.srcObject.getVideoTracks().forEach(track => track.stop());

    // if a file was uploaded create an img element than use that to draw the canvas
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var img = new Image();
        console.log(input.files);
        reader.onload = function (e) {
            img.src =  e.target.result;
            img.width = '640px';
            img.height = '480px';
            img.id = 'placeholder';
            img.alt = input.files[0].name;
            $('#snapshot-wrapper').append(img);
 
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        reader.readAsDataURL(input.files[0]);

        $('#canvas').show();
        $('#main-wrapper').hide();
        $('#upload-wrapper').hide();
        $('#snapshot-wrapper').append($('<h2 id="confirm-label">is this okay?</h2>'),
                                      $('<button class="confirm btn btn-dark mr-2" id="confirm">confirm</button>'),
                                      $('<button class="confirm btn btn-dark mx-auto" id="try-again">try again</button>'));
    }
}
