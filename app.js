var config = require('config')
var tako = require('tako')
var utils = require('./lib/utils');

var app = tako()
app.httpServer.listen(8000)

app.route('/new').json(function(req, resp) {
  req.on('body', function (body) {
    var data = JSON.parse(body)
    console.log(data)
    utils.spGetPic(data.id, function() {
      resp.end({
        message: 'Added image to queue',
        image_url: config.dirImagesInThumbnails + '/'+ data.id
      })
    })    
  })
}).methods('POST')

app.route('/').file(__dirname + '/client/index.html');
app.route('/files/*').files(__dirname + '/files');
app.route('/*').files(__dirname + '/client');




