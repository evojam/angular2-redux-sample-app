'use strict';

var gulp = require('gulp');
var tsc = require('typescript');
var typescript = require('gulp-typescript');

gulp.task('ts-build-app', () => gulp.src([
    'typings/tsd.d.ts',
    'own_typings/**/*.d.ts',
    'src/**/*.ts',
    'node_modules/reflect-metadata/reflect-metadata.d.ts'
]).pipe(typescript({
    target: 'ES5',
    module: 'system',
    moduleResolution: 'node',
    sourceMap: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    removeComments: false,
    noImplicitAny: false,
    typescript: tsc
})).js.pipe(gulp.dest('dist/app/')));

gulp.task('ts-build-lib', () => gulp.src([
    'typings/tsd.d.ts',
    'own_typings/**/*.d.ts',
    'node_modules/reflect-metadata/reflect-metadata.d.ts'
]).pipe(typescript({
    target: 'ES5',
    module: 'system',
    moduleResolution: 'node',
    sourceMap: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    removeComments: false,
    noImplicitAny: false,
    typescript: tsc
})).js.pipe(gulp.dest('dist/todo-lib/')));

gulp.task('ts-build', ['ts-build-app', 'ts-build-lib']);
