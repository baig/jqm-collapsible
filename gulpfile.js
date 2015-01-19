var gulp = require('gulp');
var help = require('gulp-help');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');

/* gulp CONSTANTS */
var MIN_JS_NAME = 'jqm.extended.collapsible.min.js';
var MIN_CSS_NAME = 'jqm.extended.collapsible.min.css';
var DIST_PATH = 'dist/';
var TEMP_PATH = 'temp/';
var CLEAN_PATHS = ['temp/**', 'dist/**'];

help(gulp);

var noop = function(cb) { return cb };

/* gulp tasks */

gulp.task(  'default',
            '(default task) Cleans, concatenates and minifies all script files into build folder.',
            ['minify'],
            noop,
            { aliases: ['d', 'D'] }  );

gulp.task('clean', 'Cleans the build folder.', [], function (cb) {
    "use strict";
    del(CLEAN_PATHS);
    return cb;
}, { aliases: ['c', 'C'] });

gulp.task("concat",
          'Joins (concatenates) all JS and CSS files into corresponding single file and puts them in the dist/ folder.',
          ['clean', 'concat:js', 'concat:css'],
          noop,
          { aliases: ['j', 'J'] });

gulp.task("concat:js", 'Joins (concatenates) all JS files into a single file and puts it in the dist/ folder.', [], function () {
    "use strict";
    return gulp.src(['js/**/*.js'])
               .pipe(concat('jqm.extended.collapsible.js'))
               .pipe(gulp.dest(DIST_PATH));
});

gulp.task("concat:css", 'Joins (concatenates) all CSS files into a single file and puts it in the dist/ folder.', [], function () {
    "use strict";
    return gulp.src(['css/**/*.css'])
               .pipe(concat('jqm.extended.collapsible.css'))
               .pipe(gulp.dest(DIST_PATH));
});

gulp.task("minify",
          'Minifies all JS and CSS files and puts them in the dist/ folder.',
          ['minify:js', 'minify:css'],
          noop,
          { aliases: ['m', 'M'] });

gulp.task("minify:js", 'Minifies all JS files.', ['concat:js'], function () {
    "use strict";
    return gulp.src(['dist/*.js'])
              .pipe(uglify(UGLIFY_OPTIONS))
              .pipe(rename(MIN_JS_NAME))
              .pipe(gulp.dest(DIST_PATH));
});

gulp.task("minify:css", 'Minifies all CSS files.', ['concat:css'], function () {
    "use strict";
    return gulp.src(['dist/*.css'])
               .pipe(minifyCSS(MINIFY_CSS_OPTIONS))
               .pipe(rename(MIN_CSS_NAME))
               .pipe(gulp.dest(DIST_PATH))
});




var UGLIFY_OPTIONS = {
    preserveComments: 'some'
};

var MINIFY_CSS_OPTIONS = {
    /* set to false to disable advanced optimizations - selector & property merging, reduction, etc. */
    //advanced: true,
    
    /* set to false to disable aggressive merging of properties */
    //aggressiveMerging: true,

    /* turns on benchmarking mode measuring time spent on cleaning up (run `npm run bench` to see example) */
    //benchmark: true,

    /* enables compatibility mode
     * Following values are allowed:
     *   - "ie7" - Internet Explorer 7 compatibility mode
     *   - "ie8" - Internet Explorer 8 compatibility mode
     *   - "" or "*" (default) - Internet Explorer 9+ compatibility mode
     */
    //compatibility: "*",
    
    /* set to true to get minification statistics under stats property (see test/custom-test.js for examples) */
    //debug: true,

    /* a hash of options for `@import` inliner, see test/protocol-imports-test.js for examples */
    //inliner: true,

    /* whether to keep line breaks (default is false) */
    //keepBreaks: true,

    /* "*" for keeping all (default)
     * "1" for keeping first one only
     * "0" for removing all
     */
    //keepSpecialComments: "*",

    /* whether to process `@import` rules */
    //processImport: true,

    /* set to false to skip URL rebasing */
    //rebase: true,

    /* path to resolve relative @import rules and URLs */
    //relativeTo: true,

    /* path to resolve absolute @import rules and rebase relative URLs */
    //root: true,

    /* rounding precision; defaults to 2; -1 disables rounding */
    //roundingPrecision: true,

    /* set to false to skip shorthand compacting (default is true unless sourceMap is set when it's false) */
    //shorthandCompacting: true,

    /* exposes source map under sourceMap property, e.g. new CleanCSS().minify(source).sourceMap
     * (default is false)
     * If input styles are a product of CSS preprocessor (LESS, SASS) an input source map can be passed as a string
     */
    //sourceMap: true,

    /* path to a folder or an output file to which rebase all URLs */
    //target: true,
};
