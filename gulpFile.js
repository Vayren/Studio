const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function style() {
	return gulp.src('./scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./css/'))
		.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
	gulp.watch('./scss/**/*.scss', style);
	gulp.watch('./**/*.html').on('change', browserSync.reload);
	gulp.watch('./*.js').on('change', browserSync.reload);
}

exports.default = watch;