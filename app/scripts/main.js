'use strict';

$(document).ready(function() {

  var active;
  var slides = $('.slide');


  $('.begin').click(function() {
    setActiveSlide('next');
  });

  function setActiveSlide(direction) {

    if (direction === 'previous') {
      active = $('.active').prev();
    } else {
      active = $('.active').next();
    }

    for (var i = slides.length - 1; i >= 0; i--) {
      $(slides[i]).removeClass('active');
    }

    $(active).addClass('active');

    return active;
  }

});
