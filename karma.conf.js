// Karma configuration
var path = require('path');
var webpackConfig = require('./webpack.config');
var vendor_entry = path.resolve(webpackConfig.entry.vendor);
var app_entry = path.resolve(webpackConfig.entry.app);
var components_entry = path.resolve(webpackConfig.entry.components)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'https://www.gstatic.com/firebasejs/4.1.5/firebase.js',
      vendor_entry,
      './node_modules/angularfire/dist/angularfire.js',
      app_entry,
      components_entry,
      './node_modules/angular-mocks/angular-mocks.js',
      'src/index.html',
      'src/**/*.spec.js'
    ],
    webpack:webpackConfig,

    // list of files to exclude
    exclude: [
      'src/components/**/index.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['webpack', 'coverage'],
      'src/**/*.spec.js': ['webpack']
    },

    
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage', 'progress'],

    coverageReporter: {
      reporters: [
        {
          type: 'text-summary',
        },
        {
          type: 'html',
          dir: 'coverage/',
        }
      ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    plugins:[
      require('karma-webpack'),
      ('karma-chrome-launcher'),
      ('karma-babel-preprocessor'),
      ('karma-coverage'),
      ('karma-jasmine'),
      ('karma-spec-reporter')
    ]
  })
}
