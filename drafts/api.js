function processImage(imageURL) {
    console.log('API call', imageURL);
    // Perform the REST API call.
    $.ajax({
        url: 'http://localhost:8000',

        type: "POST",

        // Request body.
        data: {imageURL: imageURL}
    })
    .done(function(data) {
        // Show formatted JSON on webpage.
        console.log(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.      
                
    })
};

