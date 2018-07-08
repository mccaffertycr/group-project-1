// listen for uploads

function readURL(input) {

    // if a file was uploaded create an img element than use that to draw the canvas
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            var img = new Image(640, 480);
            img.src =  e.target.result;
            img.id = 'placeholder';
            img.alt = input.files[0].name;
            $('#snapshot-wrapper').prepend(img);
            imageData = convertToBlobFormat(e.target.result);
        };
        reader.readAsDataURL(input.files[0]);

        $('#main-wrapper').hide();
        $('#upload-wrapper').hide();
        $('#snapshot-wrapper').append($('<h2 id="confirm-label">is this okay?</h2>'),
                                      $('<button class="confirm btn btn-dark mr-2" id="confirm">confirm</button>'),
                                      $('<button class="confirm btn btn-dark mx-auto" id="try-again">try again</button>'));
    }
}
