    
    // function that calls to the face detection api and matches mood with a spotify
    function processImage() {
        // Replace <Subscription Key> with your valid subscription key.

        // NOTE: You must use the same region in your REST call as you used to
        // obtain your subscription keys. For example, if you obtained your
        // subscription keys from westus, replace "westcentralus" in the URL
        // below with "westus".
        //
        // Free trial subscription keys are generated in the westcentralus region.
        // If you use a free trial subscription key, you shouldn't need to change 
        // this region.
        var uriBase = "https://eastus.api.cognitive.microsoft.com/face/v1.0/detect";

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
            // save pertinent data as a variable
            var result = data[0].faceAttributes.emotion;

            // conditional that determines, matches the playlist and changes css
            if (Math.round(result.neutral) === 1) {
                mood = 'chill';
                $('#snapshot-wrapper').append($('<h2 id="mood-label">current mood: <span class="' + mood +  '">' + mood + '</span></h2>'));
                playlistMatch();
                $('body').css('background-color', '#a260ee');
                $('#logo').attr('src', 'assets/images/chillLogo.png');
            } else if (Math.round(result.anger) === 1) {
                mood = 'rage';
                $('#snapshot-wrapper').append($('<h2 id="mood-label">current mood: <span class="' + mood +  '">' + mood + '</span></h2>'));
                playlistMatch();
                $('body').css('background-color', '#972d2d');
                $('#logo').attr('src', 'assets/images/rageLogo.png');
            } else if (Math.round(result.contempt) === 1) {
                mood = 'revenge';
                $('#snapshot-wrapper').append($('<h2 id="mood-label">current mood: <span class="' + mood +  '">' + mood + '</span></h2>'));
                playlistMatch();
                $('body').css('background-color', '#0f4e33');
                $('#logo').attr('src', 'assets/images/revengeLogo.png');
            } else if (Math.round(result.disgust) === 1) {
                mood = 'bored';
                $('#snapshot-wrapper').append($('<h2 id="mood-label">current mood: <span class="' + mood +  '">' + mood + '</span></h2>'));
                playlistMatch();
                $('body').css('background-color', '#725d40');
                $('#logo').attr('src', 'assets/images/boredLogo.png');
            } else if (Math.round(result.happiness) === 1) {
                mood = 'happy';
                $('#snapshot-wrapper').append($('<h2 id="mood-label">current mood: <span class="' + mood +  '">' + mood + '</span></h2>'));
                playlistMatch();
                $('body').css('background-color', '#e5d53c');
                $('#logo').attr('src', 'assets/images/happyLogo.png');
            } else if (Math.round(result.sadness) === 1) {
                mood = 'sad';
                $('#snapshot-wrapper').append($('<h2 id="mood-label">current mood: <span class="' + mood +  '">' + mood + '</span></h2>'));
                playlistMatch();
                $('body').css('background-color', '#333333');
                $('#logo').attr('src', 'assets/images/sadLogo.png');
            } else if (Math.round(result.surprise) === 1) {
                mood = 'shock';
                $('#snapshot-wrapper').append($('<h2 id="mood-label">current mood: <span class="' + mood +  '">' + mood + '</span></h2>'));
                playlistMatch();
                $('body').css('background-color', '#e17b2d');
                $('#logo').attr('src', 'assets/images/shockedLogo.png');
            }

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // display error message.
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
                errorString += (jqXHR.responseText === "") ?
                                    "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                                                jQuery.parseJSON(jqXHR.responseText).message :
                                                jQuery.parseJSON(jqXHR.responseText).error.message;
            console.log(errorString);
        });
    };

    // function that converts img data to blob format
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

    // 
    // 
    // event listeners
    // 
    // 

    $(document).on('click', '#capture', function () { 
        // draw canvas from video player and save image data       
        context.drawImage(player, 0, 0, canvas.width, canvas.height);
        imageData = convertToBlobFormat(canvas.toDataURL('image/jpeg'));
        $('#canvas').show();
        // Stop all video streams.
        player.srcObject.getVideoTracks().forEach(track => track.stop());
        
        // replace player with canvas image / mood and prompt user to confirm
        if (imageData !== null) {
            $('#snapshot-wrapper').append($('<h2 id="confirm-label">Is this picture okay?</h2>'),
                $('<button class="confirm btn btn-dark mr-2" id="confirm">confirm</button>'),
                $('<button class="confirm btn btn-dark mx-auto" id="try-again">try again</button>'));
        }
        $('#upload-wrapper').hide();
        $('#main-wrapper').hide();
    });

    $(document).on('click', '#confirm', function() {          
        processImage();
        $('#confirm-label').remove();
        $('#confirm').remove();
        $('#try-again').remove();
        $('#placeholder').remove();
        // clear the canvas 
        context.clearRect(0, 0, canvas.width, canvas.height);
        $('#canvas').hide();
        $('#how-to-modal').hide();
        $('#get-started').show();
        $('#get-started').text('not feeling it?');
        $("#get-started").href("page2.html");
    });

    $(document).on('click', '#try-again', function(){
        // clear the canvas 
        context.clearRect(0, 0, canvas.width, canvas.height);
        $('#canvas').hide();
        $('#placeholder').remove();
        $('#confirm-label').remove();
        $('#confirm').remove();
        $('#try-again').remove();
        $('#main-wrapper').hide(); 
        $('#upload-wrapper').show();              
        
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                // Attach the video stream to the video element and autoplay.
                player.srcObject = stream;
            });
    });

    $(document).on('click', '#use-webcam', function() {
        $('#upload-wrapper').hide();
        $('#main-wrapper').show();
        // start webcam 
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                // Attach the video stream to the video element and autoplay.
                player.srcObject = stream;
        });
    });

    