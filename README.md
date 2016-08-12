# gulp-Mc-inject

向html指定位置插入、移除脚本、样式

## 使用
### Html
  <!--start:injectScript--><!--end:injectScript-->
### Gulp
  var McInject = require('./gulp-Mc-inject');
  gulp.src('./index.html')
    .pipe(McInject({
      path: '../js/inject.js',
      target: 'injectScript',
      method: 'inject',
    }))
    
## Options
  path: 插入脚本、样式文件路径；
  target: 插入位置，如：injectScript, <!--start:injectScript--><!--end:injectScript-->；
  method: 插入或移除，inject 插入，remove 移除
  
