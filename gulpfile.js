var gulp         = require('gulp'),
    server       = require('gulp-server-livereload'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    useref       = require('gulp-useref'),
    gulpif       = require('gulp-if'),
    uglify       = require('gulp-uglify'),
    minifyCss    = require('gulp-csso');

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.+(scss|sass)')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function(){
   browserSync({
       server: {
           baseDir: 'app'
       },
       notify: false
   }); 
});

gulp.task('serv', function() {
  gulp.src('./app')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      open: true
    }));
});

gulp.task('clean', function(){
    return del.sync('dist'); 
});

gulp.task('clear', function(){
    return cache.clearAll();
});

gulp.task('img', function(){
    return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins:  [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync'], function(){
    gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/css/**/*.css', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function () {
    var buildImg = gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));
    var buildFonts = gulp.src('app/libs/font-awesome/fonts/*.+(otf|eot|ttf|woff|woff2)')
       .pipe(gulp.dest('dist/fonts'));
    var build = gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});
