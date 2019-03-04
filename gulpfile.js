/**
 * Gulp Packages
 */

var pkg          = require('./package.json');

var gulp         = require('gulp');
var concat       = require('gulp-concat');
var minify       = require('gulp-minify');
var cleancss     = require('gulp-clean-css');
var useref       = require('gulp-useref');
var jshint       = require('gulp-jshint');
var csslint      = require('gulp-csslint');
var rev          = require('gulp-rev');
var revreplace   = require('gulp-rev-rewrite');
var revdelete    = require('gulp-rev-delete-original');
var gm           = require('gulp-gm');
var newer        = require('gulp-newer');
var imagemin     = require('gulp-imagemin');
var smartcrop    = require('smartcrop-gm');
var imagesize    = require('image-size');
var exec         = require('gulp-fn');
var es           = require('event-stream');
var wait         = require('gulp-wait');
var logger       = require("gulp-logger");
var count        = require('gulp-count');
var flatmap      = require('gulp-flatmap');
var del          = require('del');

/**
 * Gulp Tasks
 */

// Make a new revision of build css/js files
gulp.task('revision', function() {
  return gulp.src(['./build/assets/*.js','./build/assets/*.css'], {base: 'build'})
    .pipe(logger({
        before: 'Starting revisioning ...',
        after: 'Revisioning complete!',
        showChange: true
    }))
    .pipe(gulp.dest('./build/'))
    .pipe(rev())
    .pipe(revdelete()) // Remove the unrevved files
    .pipe(gulp.dest('./build/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build/assets/'));
});

// Replace build css/js assets with current revision
gulp.task('revRewrite', function() {
  const manifest = gulp.src('./build/assets/rev-manifest.json');
  return gulp.src('./build/index.php')
    .pipe(logger({
        before: 'Rewriting revisioning ...',
        after: 'Rewriting complete!',
        showChange: true
    }))
    .pipe(revreplace({
      manifest: manifest,
      replaceInExtensions: ['.php']
    }))
    .pipe(gulp.dest('./build/'));
});


// Clean up js build
gulp.task('clean:js', function () {
  return del('./build/assets/*.js');
});

// Clean up css build
gulp.task('clean:css', function () {
  return del('./build/assets/*.css');
});

// Clean up files in build
gulp.task('clean:static', function () {
  return del([
    './build/*.php',
    './build/images/**',
    './build/assets/rev-manifest.json'
  ]);
});

// Copy static php files into build folder
gulp.task('copy:php', function () {
  return gulp
    .src([
      './source/index.php',
      './source/images.php'
    ])
    .pipe(logger({
        before: 'Copying vinyls ...',
        after: 'Copying vinyls complete!',
        showChange: true
    }))
    .pipe(useref())
    .pipe(gulp.dest('./build/'))
    .pipe(count('## files copied'));
});

// Copy static webfonts files into build folder
gulp.task('copy:webfonts', function () {
  return gulp
    .src(['./source/assets/vendor/webfonts/**'])
    .pipe(gulp.dest('./build/webfonts/'))
    .pipe(count('## webfonts copied'));
});

// Copy static favicon files into build folder
gulp.task('copy:favicon', function () {
  return gulp
    .src(['./source/assets/favicon/**'])
    .pipe(gulp.dest('./build/assets/favicon/'))
    .pipe(count('## favicons copied'));
});

// Copy images into build folder
gulp.task('copy:images', function () {
  return gulp
    .src(['./source/images/**'])
    .pipe(gulp.dest('./build/images/'))
    .pipe(count('## images copied'));
});

// Crop, resize and minify images
gulp.task('images:resize', function () {
  return gulp.src('./source/uploads/*.jpg')
    .pipe(wait(3500))
    .pipe(newer('./source/images/'))
    .pipe(flatmap(function(stream, file) {
      return gulp.src(file.path)
        .pipe(logger({
            before: 'Resizing ' + file.path + ' ...',
            after: 'Resizing complete!',
            showChange: false
        }))
        .pipe(exec(function(file, enc) {
          var dimensions = imagesize(file.path);
          smartcrop.crop(file.path, { width: 540, height: 960 }).then(function(result) {
            var crop = result.topCrop;
            logger({
                before: "Crop: " + file.path + " => " + crop.width + "x" + crop.height + "," + crop.x + "x" + crop.y,
                showChange: true
            });
            //console.log();
            var gmfile = file.path;
            gm(function(gmfile) {
              gmfile.setFormat('jpg').quality(100);
              gmfile.crop(crop.width, crop.height, crop.x, crop.y);
              return gmfile.resize(1920, null)
            },{
              progress: true,
              imageMagick: true
            })
          });
        }))
    }))
    .pipe(gm(function(gmfile) {
      gmfile.setFormat('jpg').quality(80);
      return gmfile.resize(1920);
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('./source/images/'));
});

// Crop and resize images with smartcrop
var applyTopCrop = function(file, enc) {
  return new Promise(function(resolve, reject) {

    var dimensions = imagesize(file.path);
    smartcrop.crop(file.path, { width: 540, height: 960 }).then(function(result) {
      var crop = result.topCrop;
      console.log("Crop: " + file.path + " => " + crop.width + "x" + crop.height + "," + crop.x + "x" + crop.y);
      var gmfile = file.path;
      gm(function(gmfile) {
        gmfile.setFormat('jpg').quality(100);
        gmfile.crop(crop.width, crop.height, crop.x, crop.y);
        var cropped = gmfile.resize(1920, null)
        resolve(cropped);
      },{
        progress: true,
        imageMagick: true
      })
    });


  });
}

// Concatenate and minify JS
gulp.task('build:js', function () {    
  return gulp.src([
      './source/assets/vendor/js/jquery.min.js',
      './source/assets/vendor/js/bootstrap.min.js',
      './source/assets/js/*.js'
    ])
    .pipe(logger({
        before: 'Building js ...',
        after: 'Building js complete!',
        showChange: true
    }))
    .pipe(concat('bundle.js'))
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        noSource: true
    }))
    .pipe(gulp.dest('./build/assets/'));
});

// Concatenate and minify CSS
gulp.task('build:css', function () {    
  return gulp.src([
      './source/assets/vendor/css/bootstrap.min.css',
      './source/assets/vendor/css/font-awesome.min.css',
      './source/assets/vendor/css/animate.css',
      './source/assets/css/*.css'
    ])
    .pipe(logger({
        before: 'Building css ...',
        after: 'Building css complete!',
        showChange: true
    }))
    .pipe(concat('styles.css'))
    .pipe(cleancss())
    .pipe(gulp.dest('./build/assets/'));
});

// Lint javascript
gulp.task('lint:js', function () {    
  return gulp.src(['./source/assets/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Lint CSS
gulp.task('lint:css', function () {    
  return gulp.src(['./source/assets/css/*.css'])
    .pipe(csslint())
    .pipe(csslint.formatter());
});

// Watch css changes
gulp.task('watch:css', function () {
  gulp.watch("./source/assets/css/**/*.css", styles);
});

// Watch js changes
gulp.task('watch:js', function () {
  gulp.watch("./source/assets/js/**/*.js", scripts);
});

// Watch php changes
gulp.task('watch:php', function () {
  gulp.watch("./source/*.php", gulp.series('copy:php'));
});

// Watch images changes
gulp.task('watch:images', function () {
  gulp.watch("./source/uploads/*.jpg", gulp.series('images:resize'));
});

// Define complex tasks
const images    = gulp.series('images:resize');
const lints     = gulp.series('lint:css', 'lint:js');
const files     = gulp.series('copy:php', 'copy:favicon', 'copy:webfonts', 'copy:images');
const styles    = gulp.series('clean:css', 'build:css');
const scripts   = gulp.series('clean:js', 'build:js');
const clean     = gulp.series('clean:static', 'clean:css', 'clean:js');
const build     = gulp.series('clean:static', styles, scripts, files, 'revision', 'revRewrite');
const watch     = gulp.parallel('watch:css','watch:js','watch:php','watch:images');

// Export tasks
exports.default = watch;
exports.watch = watch;
exports.check = lints;
exports.clean = clean;
exports.build = build;
