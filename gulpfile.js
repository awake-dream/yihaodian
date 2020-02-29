// 1. 导入 gulp 这个第三方模块
const gulp = require('gulp')

// 2. 导入 gulp-cssmin 这个第三方模块
const cssmin = require('gulp-cssmin')

// 2-2. 导入 gulp-autoprefixer 这个第三方模块
const autoprefixer = require('gulp-autoprefixer')

// 3. 导入 gulp-uglify 这个第三方模块
const uglify = require('gulp-uglify')

// 3-2. 导入 gulp-babel 这个第三方模块
const babel = require('gulp-babel')

// 4. 导入 gulp-htmlmin 这个第三方模块
const htmlmin = require('gulp-htmlmin')

// 7. 导入 del 这个第三方模块
const del = require('del')

// 8. 导入 gulp-webserver 这个第三方模块
const webserver = require('gulp-webserver')

const sass = require('gulp-sass')

// 2. 先写一个打包 css 的方法
const cssHandler = () => {
  return gulp.src('./src/css/*.css')   // 找到 src 目录下 css 目录下 所有后缀为 .css 的文件
             .pipe(autoprefixer())   // 把 css 代码自动添加前缀
             .pipe(cssmin())  // 压缩 css 代码
             .pipe(gulp.dest('./dist/css'))  // 压缩完毕的 css 代码放在 dist 目录下的 css 文件夹里面
}

// 3. 书写一个打包 js 的方法
const jsHandler = () => {
  return gulp.src('./src/js/*.js') // 找到文件
             .pipe(babel({
               presets: ['@babel/env']
             })) // 转码 es6 转换成 es5 了, 就可以压缩了
             .pipe(uglify()) // 压缩
             .pipe(gulp.dest('./dist/js')) // 把压缩完毕的放入文件夹
}

// 4. 书写一个打包 html 的方法
const htmlHandler = () => {
  return gulp.src('./src/pages/*.html') // 找到要压缩的 html 文件
             .pipe(htmlmin({ // 想进行压缩, 需要在这个对象里面进行配置
               removeAttributeQuotes: true, // 移出属性上的双引号
               removeComments: true, // 移除注释
               collapseBooleanAttributes: true, // 把值为布尔值的属性简写
               collapseWhitespace: true, // 移除所有空格, 变成一行代码
               minifyCSS: true, // 把页面里面的 style 标签里面的 css 样式也去空格
               minifyJS: true, // 把页面里面的 script 标签里面的 js 代码给去空格
             })) // 压缩
             .pipe(gulp.dest('./dist/pages')) // 把压缩完毕的放到一个指定目录
}

// 5. 书写一个移动 image 文件的方法
const imgHandler = () => {
  return gulp.src('./src/images/**') // images 文件夹下的所有文件
             .pipe(gulp.dest('./dist/images')) // 放到指定目录就可以了
}

// 6. 书写一个移动 lib 文件的方法
const libHandler = () => {
  return gulp.src('./src/lib/**')
             .pipe(gulp.dest('./dist/lib'))
}

// 7. 书写一个任务, 自动删除 dist 目录
const delHandler = () => {
  // 这个函数的目的就是为了删除 dist 目录使用的
  return del(['./dist'])
}

// 8. 书写一个配置服务器的任务
const serverHandler = () => {
  return gulp.src('./dist') // 找到我要打开的页面的文件夹, 把这个文件夹当作网站根目录
             .pipe(webserver({ // 需要一些配置项
               host: 'www.wangke.com', // 域名, 这个域名可以自定义
               port: 8080, // 端口号, 0 ~ 65535, 尽量不适用 0 ~ 1023
               open: './pages/index.html', // 你默认打开的首页, 从 dist 下面的目录开始书写
               livereload: true, // 自动刷新浏览器 - 热重启
               // 所有的代理配置都在 proxies 里面
               proxies: [
                 // 每一个代理配置就是一个对象
                 {
                   source: '/gx', // 源, 你的代理标识符
                   // 你直接请求下面这个地址压根也拿不到东西, 因为跨域了
                   target: 'http://127.0.0.1/test.php' // 目标, 你要代理的地址
                 },
                 {
                   source: '/gx2',
                   target: 'http://127.0.0.1/xxx.php'
                 }
               ]
             })) // 开启服务器
}

const sassHandler = () => {
  return gulp.src('./src/sass/*.scss')
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(cssmin())
            .pipe(gulp.dest('./dist/css'))
}

const fontsHandler = () => {
  return gulp.src("./src/fonts/**")
             .pipe(gulp.dest("./dist/fonts"));
}

const dataHandler = () => {
  return gulp.src("./src/data/*.json")
             .pipe(gulp.dest("./dist/data"));
}

// 9. 自动监控文件
//    监控 src 下下面的文件, 只要一修改, 就执行对应的任务
//    比如 src 下面的 css 文件夹, 只要里面的文件以修改, 我就执行以下 cssHandler 这个任务
const watchHandler = () => {
  // 监控着 src 下的 css 下的所有 .css 文件, 只要一发生变化, 就会自动执行一遍 cssHandler 任务
  gulp.watch('./src/css/*.css', cssHandler)
  gulp.watch('./src/js/*.js', jsHandler)
  gulp.watch('./src/pages/*.html', htmlHandler)
  gulp.watch('./src/lib/**', libHandler)
  gulp.watch('./src/images/**', imgHandler)
  gulp.watch('./src/sass/*.scss', sassHandler)
  gulp.watch("./src/fonts/**", fontsHandler)
  gulp.watch("./src/data/**", dataHandler);
}



// 导出一个默认任务
// 当我将来在命令行执行 gulp default 的时候, 就会自动把我写在 parallel 里面的五个任务给一起执行了
//   小细节: 当你在命令行执行 gulp default 的时候, 可以不写 default
//           你在命令行执行 gulp 这个指令, 就是在执行 gulp default
// module.exports.default = gulp.parallel(cssHandler, jsHandler, htmlHandler, libHandler, imgHandler)

// 就应该在压缩 css/js/html 之前先把 dist 目录删除了
//   要在删除完毕 dist 以后, 在执行 css/js/html/... 之类的压缩转移任务
module.exports.default = gulp.series(
  delHandler,
  gulp.parallel(cssHandler, jsHandler, htmlHandler, imgHandler, libHandler, sassHandler, fontsHandler, dataHandler),
  serverHandler,
  watchHandler
)







// 最后在文件里面导出我准备号的这个方法
// 导出以后, 我们只能一个任务一个任务的执行
//   这个方式不好, 我们最好是准备一个任务
//   这个任务做的事情, 就是把我准备号的五个任务都给我执行了
// 不需要导出这五个任务了
// module.exports.css = cssHandler
// module.exports.js = jsHandler
// module.exports.html = htmlHandler
// module.exports.image = imgHandler
// module.exports.lib = libHandler
