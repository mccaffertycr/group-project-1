// function that converts img upload into a url
function getDataUrl(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
}

// event listener for user to upload an image 
$(document).on('click', '.upload', function() {
    upload = $('#image-input').prop('files');
    console.log(upload);
    dataURL = upload[0];
    console.log(dataURL);

    // store **probably need to use some sort of conversion here* img url to firebase\

    getDataUrl(dataURL, function() {
        // Do whatever you'd like with the Data URI!
        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
});

    // store img url in firebase

    console.log(dataURL);

    // empty main div and show picture with mood / confirm try again buttons
    $('#main-wrapper').empty();
    $('#main-wrapper').append($('<h1>mood:</h1>'),
                              $('<img src="' + dataURL + '" >'));

    $('#btn-wrapper').empty();
    $('#btn-wrapper').append($('<input class="confirm btn btn-dark mx-auto" value="confirm" id="confirm">'),
                             $('<input class="reset btn btn-dark mx-auto" value="try again" id-"try-again">'));
});