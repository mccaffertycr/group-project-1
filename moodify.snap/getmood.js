    const player = document.getElementById('player');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const captureButton = document.getElementById('capture');
    
    const constraints = {
        video: true,
    };

    var imageData = null;
    var mood = '';


    $(document).on('click', '#capture', () => {
        context.drawImage(player, 0, 0, canvas.width, canvas.height);

        imageData = convertToBlobFormat(canvas.toDataURL('image/jpeg'));

        // Stop all video streams.
        player.srcObject.getVideoTracks().forEach(track => track.stop());

        // replace player with canvas image / mood and prompt user to confirm
        if (imageData !== null) {
        $('#main-wrapper').append($('<h2>Are you happy with your Snapshot?</h2>'),
                                  $('#canvas'));
        $('#btn-wrapper').empty()
                         .append($('<input class="confirm btn btn-dark mx-auto" value="confirm" id="confirm">'))
                         .append($('<input class="confirm btn btn-dark mx-auto" value="try-again" id="try-again">'));
        }
    });

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            // Attach the video stream to the video element and autoplay.
            player.srcObject = stream;
        });

    function processImage() {
        // Replace <Subscription Key> with your valid subscription key.
        // var subscriptionKey = "";

        // NOTE: You must use the same region in your REST call as you used to
        // obtain your subscription keys. For example, if you obtained your
        // subscription keys from westus, replace "westcentralus" in the URL
        // below with "westus".
        //
        // Free trial subscription keys are generated in the westcentralus region.
        // If you use a free trial subscription key, you shouldn't need to change 
        // this region.
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

        // Request parameters.
        var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "emotion"
        };

        // Make API request to Face API
        $.ajax({
            url: uriBase + "?" + $.param(params),
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",
            processData: false,
            data: imageData
        })        

        .done(function(data) {
            console.log(data)
            var result = data[0].faceAttributes.emotion;

            if (Math.round(result.neutral) === 1) {
                mood = 'chill';
                console.log(mood);
                $('#main-wrapper').append($('<h2>Your Mood: ' + mood + '</h2>'));
                playlistMatch(mood);
            } else if (Math.round(result.anger) === 1) {
                mood = 'rage';
                $('#main-wrapper').append($('<h2>Your Mood: ' + mood + '</h2>'));
                playlistMatch(mood);
            } else if (Math.round(result.contempt) === 1) {
                mood = 'revenge';
                $('#main-wrapper').append($('<h2>Your Mood: ' + mood + '</h2>'));
                playlistMatch(mood);
            } else if (Math.round(result.digust) === 1) {
                mood = 'disgusted';
                $('#main-wrapper').append($('<h2>Your Mood: ' + mood + '</h2>'));
                playlistMatch(mood);
            } else if (Math.round(result.happiness) === 1) {
                mood = 'happy';
                $('#main-wrapper').append($('<h2>Your Mood: ' + mood + '</h2>'));
                playlistMatch(mood);
            } else if (Math.round(result.sadness) === 1) {
                mood = 'sad';
                $('#main-wrapper').append($('<h2>Your Mood: ' + mood + '</h2>'));
                playlistMatch(mood);
            } else if (Math.round(result.surprise) === 1) {
                mood = 'awe';
                $('#main-wrapper').append($('<h2>Your Mood: ' + mood + '</h2>'));
                playlistMatch(mood);
            }

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
                errorString += (jqXHR.responseText === "") ?
                                    "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                                                jQuery.parseJSON(jqXHR.responseText).message :
                                                jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };

    function convertToBlobFormat(dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = decodeURIComponent(parts[1]);
            return new Blob([raw], { type: contentType });
        }
        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }

    // event listeners

    $(document).on('click', '#confirm', function(){
        processImage();
    });

    $(document).on('click', '#try-again', function(){
        $('#main-wrapper').empty()
                          .append($('<video id="player" controls autoplay></video>'),
                                  $('<canvas id="canvas" width=320 height=240></canvas>'));
        
            navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
            // Attach the video stream to the video element and autoplay.
            player.srcObject = stream;
            });
                          
        $('#btn-wrapper').empty()
                         .append('<input class="capture btn btn-dark mx-auto" value="capture" id="capture">');
    });
