var fs = require('fs');
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function (opts) {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-Mc-inject', 'Streaming not supported'));
      return;
    }
    // 标签
    var startTag = new RegExp('<!--start:' + opts.target + '-->');
    var endTag = new RegExp('<!--end:' + opts.target + '-->');

    // 是否有标签
    if (!(startTag.test(file.contents.toString()) && endTag.test(file.contents.toString()))) {
      setImmediate(cb, null, file);
      return;
    } 
    // 标签外的内容
    var firstHalf = file.contents.toString().split(startTag);
    var secondHalf = file.contents.toString().split(endTag);
    // 嵌入或移除
    if (opts.method && opts.method == 'remove') {
        file.contents = new Buffer(firstHalf[0] + secondHalf[1]);

        setImmediate(cb, null, file);
    } else {
      fs.readFile(opts.path, 'utf8', function (err, data) {
        var resouseContent = '<!--start:' + opts.target + '-->\n<script type="text/javascript">\n' + data.toString() + '</script>\n<!--end:' + opts.target + '-->';
        file.contents = new Buffer(firstHalf[0] + resouseContent + secondHalf[1]);
  
        setImmediate(cb, null, file);
      });
    }
  });
};
