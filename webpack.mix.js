let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/assets/js/test.js', 'react-js')
   // .sass('resources/assets/sass/app.scss', 'public/css');

mix.setPublicPath('./')

mix.react('react-js/src/index.js', 'react-js/public/bundle.js')
   .sass('resources/assets/sass/app.scss', 'public/css');
