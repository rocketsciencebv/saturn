export const init = $ => {
  /**
   * Scroll to with smooth scroll
   */
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function() {
    if (
      location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
      location.hostname === this.hostname
    ) {
      let target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate(
          {
            scrollTop: target.offset().top - 70,
          },
          1000,
          'easeInOutExpo',
        );
        return false;
      }
    }
  });

  /**
   * Closes responsive menu when a scroll trigger link is clicked
   */
  $('.js-scroll-trigger').on('click', () => {
    $('.navbar-collapse').collapse('hide');
    $('.hamburger').removeClass('open');
  });
};
