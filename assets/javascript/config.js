var subscriptionKey = '';
var clientId = '';
var secret = '';

// event listener that collects api keys and also gets a token from spotify

$(document).on('click', '#save-keys', function() {
  subscriptionKey = $('#emotion-api-key-input').val().trim();
  clientId = $('#spotify-id-input').val().trim();
  secret = $('#spotify-secret-input').val().trim();
  $('#api-keys').empty();
  startApp();
})


