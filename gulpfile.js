var gulp = require('gulp');
var help = require('gulp-help');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

/* gulp CONSTANTS */
var MIN_JS_NAME = 'jqm.extended.collapsible.min.js';
var MIN_CSS_NAME = 'jqm.extended.collapsible.min.css';
var DIST_PATH = 'dist/';
var TEMP_PATH = 'temp/';
var CLEAN_PATHS = ['temp/**', 'dist/**'];

/* gulp tasks */

help(gulp);

gulp.task('clean', 'Cleans the build folder.', [], function () {
    "use strict";
    
    del(CLEAN_PATHS);
    
}, { aliases: ['c', 'C'] });

gulp.task("concat", 'Joins all the script files putting them in build folder.', [], function () {
    "use strict";
    gulp.src(['js/**/*.js'])
        .pipe(concat('jqm.extended.collapsible.js'))
        .pipe(gulp.dest(DIST_PATH));
}, { aliases: ['j', 'J'] });

gulp.task("minify", 'Minifies all the script files.', ['concat'], function () {
    "use strict";
    gulp.src(['dist/*.js'])
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(rename(MIN_JS_NAME))
        .pipe(gulp.dest(DIST_PATH));
}, { aliases: ['m', 'M'] });

gulp.task(  'default',
            '(default task) Cleans, concatenates and minifies all script files into build folder.',
            ['clean', 'concat', 'minify'],
            function () {},
            { aliases: ['d', 'D'] } );