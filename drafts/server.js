var express = require('express')
var app = express()
var fs = require('fs');
var bodyParser = require('body-parser');
app.use( express.json() );
app.use(bodyParser.urlencoded({
    extended: false
}));
var oxford = require('project-oxford'),
    client = new oxford.Client('7fb073s72bh72663y5ddh129m12e598d');
    
var request = require('request').defaults({
    headers: {'User-Agent': 'nodejs/0.4.0'}}),
fs = require('fs'),
_Promise = require('bluebird');

app.post('/', function (req, res) {
    console.log(req);
  res.send('Hello World!');
  var subscriptionKey = "0c0068183a334f2fb537b49e73b0fd1f";

    // NOTE: You must use the same region in your REST call as you used to
    // obtain your subscription keys. For example, if you obtained your
    // subscription keys from westus, replace "westcentralus" in the URL
    // below with "westus".
    //
    // Free trial subscription keys are generated in the westcentralus region.
    // If you use a free trial subscription key, you shouldn't need to change 
    // this region.
    var uriBase =
        "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "emotion"
    };
    function _emotionData(image) {
        return new _Promise(function (resolve, reject) {
            /*fs.createReadStream(image).pipe(*/
            request.post({
                uri: host + rootPath + recognizePath,
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                    'Content-Type': 'application/octet-stream'
                },
                body: image
            }, (error, response) => {
                response.body = JSON.parse(response.body);
                _return(error, response, resolve, reject);
            });
        });
    }
    _emotionData()
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})

