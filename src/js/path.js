var path = {
  // template markups
  HTML: [
    'src/*.html',
    'src/views/**/*.html',
    'src/views/*.html'
  ],
  // my js source code
  JS: [
    'src/js/**/*.js',
    'src/js/*.js'
  ],
  // all less files (for changes monitoring purpose)
  LESS_ALL: [
    'src/less/*.less'
  ],
  // main less file (others are imported in style.less)
  LESS: [
    'src/less/style.less'
  ],
  // images
  IMG: [
    'src/img/**'
  ],
  // vendor css
  CSS: [
    'src/css/*.css'
  ],
  // vendor js
  VENDOR: [
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-aria.js',
    // ...and more
  ],
  DIST: [
    './dist'
  ]
};