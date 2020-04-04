// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp')
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const standard = require('gulp-standard')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const terser = require('gulp-terser')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
// var replace = require('gulp-replace')
var browserSync = require('browser-sync').create()

// SETTINGS
var cfg = {
  scripts: {
    src: './frontend/assets/js/**/*',
    dist: './public/assets/js/',
    filename: 'bundle.js',
    entrypoint: './frontend/assets/js/main.js'
  },
  styles: {
    src: './frontend/assets/scss/**/*',
    dist: './public/assets/css/'
  },
  index: {
    src: './public/index.html'
  }
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){
  return src(cfg.styles.src)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
    .pipe(sourcemaps.write('./maps')) // write sourcemaps file in current directory
    .pipe(dest(cfg.styles.dist)
  ); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
  return src([
    cfg.scripts.entrypoint,
    cfg.scripts.src
    //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
    ])
    .pipe(concat(cfg.scripts.filename))
    .pipe(babel({
      // Transpile the JS code using Babel's preset-env.
      presets: [
        ['@babel/env', {
          modules: false
        }]
      ]
    }))
    .pipe(terser())
    .pipe(dest(cfg.scripts.dist)
  );
}

// Cachebust
// function cacheBustTask(){
//   var cbString = new Date().getTime();
//   return src(['index.html'])
//     .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
//     .pipe(dest('.'));
// }

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
  watch([cfg.styles.src, cfg.scripts.src, cfg.index.src],
    {interval: 1000, usePolling: true}, //Makes docker work
    series(
      parallel(scssTask, jsTask),
      // cacheBustTask,
      reloadServer
    )
  );
}

// Server setup and reload
function reloadServer(done) {
  browserSync.reload()
  done()
}

function serve(done) {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  })
  done()
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
  parallel(scssTask, jsTask),
  // cacheBustTask,
  serve,
  watchTask
);
