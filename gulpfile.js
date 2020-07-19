const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
 
const env = process.env.NODE_ENV;
 
const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');
 
sass.compiler = require('node-sass');
 
task('clean', () => {
 return src(`${DIST_PATH}/**/*`, { read: false })
   .pipe(rm())
})
 
task('copy:html', () => {
 return src(`${SRC_PATH}/*.html`)
   .pipe(dest(DIST_PATH))
   .pipe(reload({ stream: true }));
})

task('video', () => {
  return src(`${SRC_PATH}/video/*.mp4`)
    .pipe(dest(`${DIST_PATH}/video`))
    .pipe(reload({ stream: true }));
 })

task('copy:images', () => {
  // return src([`${SRC_PATH}/img/**/*`,`!${SRC_PATH}/img/**/*.svg`])
  return src([`${SRC_PATH}/img/**/*`])
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(reload({ stream: true }));
 })
 
 task('sass', () => {
  return src([`${SRC_PATH}/scss/main.scss`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(`${SRC_PATH}/scss`))
    .pipe(reload({ stream: true }));
 });

task('styles', () => {
 return src([...STYLE_LIBS, 'src/scss/main.css'])
   .pipe(gulpif(env === 'dev', sourcemaps.init()))
   .pipe(concat('main.css'))

  //  .pipe(px2rem())
   .pipe(gulpif(env === 'prod', autoprefixer({
       browsers: ['last 2 versions'],
       cascade: false
     })))
   .pipe(gulpif(env === 'prod', gcmq()))
   .pipe(gulpif(env === 'prod', cleanCSS()))
   .pipe(gulpif(env === 'dev', sourcemaps.write()))
   .pipe(dest(`${DIST_PATH}/css`))
   .pipe(reload({ stream: true }));
});


 
 
task('scripts', () => {
 return src([...JS_LIBS, 'src/js/*.js'])
   .pipe(gulpif(env === 'dev', sourcemaps.init()))
   .pipe(concat('main.min.js', {newLine: ';'}))
   .pipe(gulpif(env === 'prod', babel({
       presets: ['@babel/env']
     })))
   .pipe(gulpif(env === 'prod', uglify()))
   .pipe(gulpif(env === 'dev', sourcemaps.write()))
   .pipe(dest(DIST_PATH))
   .pipe(reload({ stream: true }));
});
 
task('icons', () => {
 return src('src/img/icons/*.svg')
   .pipe(svgo({
     plugins: [
       {
         removeAttrs: {
           attrs: '(fill|stroke|style|width|height|data.*)'
         }
       }
     ]
   }))
   .pipe(svgSprite({
     mode: {
       symbol: {
         sprite: '../sprite.svg'
       }
     }
   }))
   .pipe(dest(`${DIST_PATH}/img/icons`));
});
 
task('server', () => {
 browserSync.init({
     server: {
         baseDir: "./dist"
     },
     open: false
 });
});
 
task('watch', () => {
 watch('./src/scss/**/*.scss', series('sass','styles'));
 watch('./src/*.html', series('copy:html'));
 watch('./src/**/*', series('copy:images'));
 watch('./src/js/*.js', series('scripts'));
 watch('./src/img/icons/*.svg', series('icons'));
});
 
 
task('default',
 series(
   'clean','copy:images','sass',
   parallel('copy:html', 'video', 'styles', 'scripts', 'icons'),
   parallel('watch', 'server')
 )
);
 
task('build',
 series(
   'clean','copy:images','sass',
   parallel('copy:html', 'video', 'styles', 'scripts', 'icons'))
);