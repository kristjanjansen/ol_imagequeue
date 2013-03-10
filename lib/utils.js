var fs = require('fs')
var path = require('path')

var im = require('imagemagick');
var request = require('request')
var cheerio = require('cheerio')
var config = require('config');


exports.spGetPic = function(id, callback) {

  var j = request.jar()
  var cookie = request.cookie('PHPSESSID=' + config.spSessionId)
  j.add(cookie)

  var form = {
    SearchText: id,
    own_10: 1,
    own_29: 1,
  }
  request.post({url: config.spUrl, jar: j, form: form}, function (e, r, b) {

  var form = {
    PicNum: 1
  }

  request.post({url: config.spUrl, jar: j, form: form}, function (e, r, b) {
    if (e) throw e; 

    $ = cheerio.load(b);

    var url = $('#viewxframe img').first().attr('src')
    var file = $('#viewxframe div').eq(1).find('strong').parent().html().split('<br>')[2]
    var filepath = config.dirImagesIn + '/' + file
    
      var form = {
        SelAction3: 'Salvesta',
        dlsize: 'L'
      }
      
      request.post({url: config.spUrl, jar: j, form: form}, function(err, r, b) {
        exports.generateThumbnail(filepath, config.dirImagesInThumbnails, config.thumbnailsExt, function() {
          callback()
        })
      }).pipe(fs.createWriteStream(filepath))

  })

  })

}

exports.generateThumbnail = function(filePath, thumbPath, thumbExt, callback) {
  var file = path.basename(filePath)
  var thumbFilePath = thumbPath + '/' + file.replace(path.extname(filePath), '.' + thumbExt)
  console.log(filePath)
  console.log(thumbFilePath)
  im.convert([filePath, '-resize', '100x100^', '-gravity', 'center', '-crop', '100x100+0+0', thumbFilePath], function(e, so, se) {
    callback()
  });       
}
