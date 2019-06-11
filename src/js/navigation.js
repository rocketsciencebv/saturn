export const init = $ => {
  /**
   * Navigation and menu
   */
  const Collapse = $.fn.collapse.Constructor;
  const navbarEl = $('#mainNav');
  const menuToggleEl = $('#menuIcon');
  const menuLabel = $('.btn__label--menu');
  const closeLabel = $('.btn__label--close');
  $.extend(Collapse.Default, { navbarClass: 'open' });
  /**
   * Handles showing of the menu
   */
  const _show = Collapse.prototype.show;
  Collapse.prototype.show = function() {
    _show.apply(this, Array.prototype.slice.apply(arguments));

    const navbarClass = this._config.navbarClass;
    if (navbarClass && !navbarEl.hasClass(navbarClass)) {
      navbarEl.addClass(navbarClass);
      menuToggleEl.addClass('open');
      menuLabel.addClass('hide');
      closeLabel.removeClass('hide');
      $('body').addClass('lock-scroll');
    }
  };

  /**
   * Handles hiding of the menu
   */
  var _hide = Collapse.prototype.hide;
  Collapse.prototype.hide = function() {
    _hide.apply(this, Array.prototype.slice.apply(arguments));

    const navbarClass = this._config.navbarClass;

    if (navbarClass && navbarEl.hasClass(navbarClass)) {
      menuToggleEl.removeClass('open');
      menuLabel.removeClass('hide');
      closeLabel.addClass('hide');
      navbarEl
        .one('bsTransitionEnd', function() {
          navbarEl.removeClass(navbarClass);
          $('body').removeClass('lock-scroll');
        })
        .emulateTransitionEnd(300); // Collapse.TRANSITION_DURATION / 2
    }
  };

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 100,
  });

  // Collapse Navbar
  var navbarCollapse = () => {
    if ($('#mainNav').offset().top > $('.main-header').height() - 255) {
      $('#mainNav').addClass('navbar-shrink');
    } else {
      $('#mainNav').removeClass('navbar-shrink');
    }
  };

  // Collapse now if page is not at top
  navbarCollapse();

  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
};
