import '../vendor/bootstrap/css/bootstrap.min.css';
import '../vendor/fontawesome-free/css/all.min.css';
import '../scss/main.scss';
import '../vendor/jquery/jquery.min.js';
import '../vendor/jquery-easing/jquery.easing.min.js';
import '../vendor/bootstrap/js/bootstrap.bundle.min.js';

import * as analytics from './analytics';
import * as navigation from './navigation';
import * as scrollTo from './scroll-to';

(function($) {
  'use strict'; // Start of use strict
  analytics.init();
  navigation.init($);
  scrollTo.init($);
})(jQuery); // End of use strict
