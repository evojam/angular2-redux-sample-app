'use strict';

var gulp = require('gulp');
var tsd = require('gulp-tsd');

gulp.task('tsd', (done) => tsd({command: 'reinstall', config: 'tsd.json'}, done));
