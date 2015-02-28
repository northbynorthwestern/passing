'use strict';

var $active = null;
var $slides = null;
var $arrows = null;
var $startButton = null;

var $player = null;
var $playerGUI = null;
var $audioPlayer = null;
var $progressBar = null;
var $progressMarker = null;
var $play = null;
var $pause = null;
var $previous = null;
var $next = null;
var $duration = null;
var $currentTime = null;
var hovering = null;

$(document).ready(function() {

  $active = $('.active');
  $slides = $('.slide');
  $startButton = $('.begin');

  $player = $('.player');
  $playerGUI = $('#audio-player .gui');
  $audioPlayer = $('#jp_container');
  $play = $('.controls .play');
  $pause = $('.controls .pause');
  $progressBar = $('.jp-progress-container');
  $progressMarker = $('.jp-progress-marker');
  $duration = $('.duration');
  $currentTime = $('.current-time');
  hovering = false;

  $arrows = $('.arrows');
  $previous = $('.arrow.previous');
  $next = $('.arrow.next');

  $arrows.hide();
  $player.hide();

  $audioPlayer.jPlayer({
    ended: onAudioEnded,
    canplay: onCanPlay,
    seeking: onSeeking,
    seeked: onSeeked,
    supplied: 'mp3',
    loop: false,
    timeupdate: onTimeUpdate,
    swfPath: '/bower_components/jplayer/dist/jplayer/jquery.jplayer.swf'
  });

  // $player.mousemove(function() {
  //   hovering = true;
  // }).mouseleave(function() {
  //   hovering = false;
  // });

  $player.bind($.jPlayer.event.seeking, 'mousemove');

  $player.click(function(e) { onPlayerClick(e); });


  $startButton.click(function() {
    $active = setActiveSlide();
  });

  function setActiveSlide(direction) {
    if (direction === 'previous') {
      $active = $active.prev();
    } else {
      $active = $active.next();
    }

    for (var i = $slides.length - 1; i >= 0; i--) {
      $($slides[i]).removeClass('active');
    }

    $active.addClass('active');

    hideOrShowAudioPlayer();
    updateArrows();
    playActiveAudio();

    return $active;
  }

  $pause.click(function() { pauseOrPlayAudio(); });
  $play.click(function() { pauseOrPlayAudio(); });

  $previous.click(function() { $active = setActiveSlide('previous'); });
  $next.click(function() { $active = setActiveSlide(); });



  function hideOrShowAudioPlayer() {
    if ($active.hasClass('title')) {
      $player.hide();
    } else {
      $player.show();
    }
  }

  function updateArrows() {
    if ($active.prev().hasClass('slide')) {
      $previous.show();
    } else {
      $previous.hide();
    }

    if ($active.next().hasClass('slide')) {
    } else {
      $('.arrow.next').hide();
    }

    if ($active.hasClass('title')) {
      $('.arrows').hide();
    } else {
      $('.arrows').show();
    }
  }

  function onAudioEnded() { deBlurActive(); }

  function playActiveAudio() {
    var audioUrl = $active.data('audiourl');

    if (audioUrl) {
      $audioPlayer.jPlayer('setMedia', {
        mp3: audioUrl
      }).jPlayer('play');
    }
  }

  function onCanPlay(e) {
    var durationText = $.jPlayer.convertTime(e.jPlayer.status.duration);
    $duration.text(durationText);
  }

  function deBlurActive() {
    $('.active > .bg-img').toggleClass('blur');
  }

  function onSeeking(e) {
    console.log('seeking yay')
    console.log(e);
    moveDurationMarker(e);
  }

  function onSeeked(e) {

  }

  function moveDurationMarker(e) {
    var leftPixels = e.pageX - $playerGUI.offset().left;
    var leftPercent = (leftPixels / $playerGUI.width()) * 100;
    $progressMarker.css({'left': leftPixels + 'px'});
    console.log(e);
  }

  function onPlayerClick(e) {

  }

  function onTimeUpdate(e) {
    var percent = (e.jPlayer.status.currentTime / e.jPlayer.status.duration) * 100;

    $progressBar.css({'width': percent + '%'});

    if (!hovering) {
      $progressMarker.css({'left': percent + '%'});
    }

    var currentTimeText = $.jPlayer.convertTime(e.jPlayer.status.currentTime);
    $currentTime.text(currentTimeText);
  }

  function pauseOrPlayAudio() {
    if ($audioPlayer.data('jPlayer').status.paused) {
        $audioPlayer.jPlayer('play');
        $pause.show();
        $play.hide();
    } else {
        $audioPlayer.jPlayer('pause');
        $pause.hide();
        $play.show();
    }
  }

  document.addEventListener('keydown', function(e) {
    var key = e.which || e.keyCode;
    if (key === 32) { pauseOrPlayAudio(); }
    if (key === 37) { setActiveSlide('previous'); }
    if (key === 39) { setActiveSlide(); }
  });

});
