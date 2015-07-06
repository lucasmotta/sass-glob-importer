# sass-glob-importer

Simple importer for [node-sass](https://github.com/sass/node-sass) to allow importing Sass files using glob patterns

```sass
@import "settings/*.scss";
@import "components/*.scss";
```

The files will always be sorted alphabetically when imported.


## How-to

### install

```sh
npm install sass-glob-importer --save-dev
```

### use the importer with [node-sass](https://github.com/sass/node-sass) `>= v3.0.0`

```js
var sass = require('node-sass');
var globImporter = require('sass-glob-importer');

sass.render({
  file: './source/css/app.scss',
  importer: globImporter()
}, cb);
```

### use the importer with [gulp-sass](https://github.com/dlmanning/gulp-sass)

```js
var gulp = require('gulp');
var sass = require('gulp-sass');
var globImporter = require('sass-glob-importer');

gulp.task('style', function() {
  return gulp.src('./source/css/app.scss')
    .pipe(sass({ importer: globImporter() }))
    .pipe(gulp.dest('./public/css'));
});
```

## Tests
Use `npm test` to run the tests.

## Issues
If you discover a bug, please raise an issue on Github. https://github.com/lucasmotta/sass-glob-importer/issues

## Contributors
The source code and the test are written in ES6 (ECMAScript 2015).  
[Babel](https://babeljs.io) is being used to compile to ES5 before the package is published to npm.
