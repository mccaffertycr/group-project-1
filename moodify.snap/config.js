// Initialize Firebase
var config = {
    apiKey: "AIzaSyDv49wCu5KM8OdclT6-gZtfvZzM98ahMas",
    authDomain: "moodify-76b22.firebaseapp.com",
    databaseURL: "https://moodify-76b22.firebaseio.com",
    projectId: "moodify-76b22",
    storageBucket: "moodify-76b22.appspot.com",
    messagingSenderId: "310383968549"
  };
  firebase.initializeApp(config);

var subscriptionKey = '';
var clientId = '';
var secret = '';

$('#save-keys').on('click', function() {

  subscriptionKey = $('#emotion-api-key-input').val().trim();
  clientId = $('#spotify-id-input').val().trim();
  secret = $('#spotify-secret-input').val().trim();
  $('#api-keys').empty();

})

