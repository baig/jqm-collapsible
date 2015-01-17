var gulp = require('gulp');
var help = require('gulp-help');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');

/** gulp tasks */

help(gulp);

gulp.task('clean', 'Cleans the build folder.', [], function () {
    "use strict";
    
    del([
        'temp/**',
        'dist/**',
    ]);
    
}, {
    aliases: ['c', 'C']
});

gulp.task("concat", 'Joins all the script files putting them in build folder.', [], function () {
    "use strict";
    gulp.src(['js/**/*.js'])
        .pipe(concat('jqm.collapsible.concat.js'))
        .pipe(gulp.dest('temp/'));
}, {
    aliases: ['j', 'J']
});

gulp.task("minify", 'Minifies all the script files.', ['concat'], function () {
    "use strict";
    gulp.src(['temp/*.concat.js'])
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(rename('jqm.collapsible.min.js'))
        .pipe(gulp.dest('dist/'));
}, {
    aliases: ['m', 'M']
});

gulp.task("min-css", 'Minifies the CSS stylesheets.', [], function() {
    "use strict";
    gulp.src('css/**/*.css')
        .pipe(concat('jqm.collapsible.min.css'))
        .pipe(minifyCss({
            noAdvanced: false
        }))
        .pipe(gulp.dest('dist/'));
}, {
    aliases: ['s', 'S']
});

gulp.task("assets", 'Copies all assets (css stylesheets, images etc.) to the build folder.', [], function(){
    "use strict";
    gulp.src("css/**/*")
        .pipe(concat("jqm.collapsible.css"))
        .pipe(gulp.dest(DEST));
}, {
    aliases: ['a', 'A']
});

gulp.task("build", '(default task) Cleans, concatenates and minifies all script files into build folder.', [], function () {
    "use strict";
    gulp.run('clean');
    gulp.run('concat');
    gulp.run('minify');
//    gulp.run('assets');
//    gulp.run('minify-css');
}, {
    aliases: ['b', 'B']
});

gulp.task('default', function () {
    "use strict";
    gulp.run('build');
});

