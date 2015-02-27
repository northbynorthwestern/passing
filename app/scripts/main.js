'use strict';

$(document).ready(function() {

  var active;
  var slides = $('.slide');
  $('.arrows').hide();
  $('.audio-player').hide();

  $('.begin').click(function() {
    active = setActiveSlide('next');
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

    updateAudioPlayer();
    updateArrows();
    playActiveAudio();

    return active;
  }

  $('.arrow.previous').click(function(){ active = setActiveSlide('previous'); });
  $('.arrow.next').click(function(){ active = setActiveSlide(); });


  function updateAudioPlayer() {
    if ($(active).hasClass('title')) {
      $('.audio-player').hide();
    } else {
      $('.audio-player').show();
    }

  }

  function updateArrows() {
    if ($(active).prev().hasClass('slide')) {
      $('.arrow.previous').show();
    } else {
      $('.arrow.previous').hide();
    }

    if ($(active).next().hasClass('slide')) {
    } else {
      $('.arrow.next').hide();
    }

    if ($(active).hasClass('title')) {
      $('.arrows').hide();
    } else {
      $('.arrows').show();
    }
  }

  function onAudioEnded() {
    deBlurActive();
  }

  var $audioPlayer = $('#jp_container');
  $audioPlayer.jPlayer({
    ended: onAudioEnded,
    supplied: 'mp3',
    loop: false,
    timeupdate: onTimeUpdate,
    swfPath: '/bower_components/jplayer/dist/jplayer/jquery.jplayer.swf'
  });

  function playActiveAudio() {
    var audioUrl = $(active).data('audiourl');
    if (audioUrl) {
      $audioPlayer.jPlayer('setMedia', {
        mp3: audioUrl
      }).jPlayer('play');
    }
  }

  function deBlurActive() {
    $('.active > .bg-img').toggleClass('blur');
  }

  function onTimeUpdate() { }
});
