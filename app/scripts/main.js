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
var $controls = null;
var $play = null;
var $pause = null;
var $previous = null;
var $next = null;
var $duration = null;
var $currentTime = null;
var hovering = null;
var currentTimeText = null;
var currentTimePercent = null;
var deblurred = null;

$(document).ready(function() {

  $active = $('.active');
  $slides = $('.slide');
  $startButton = $('.begin');

  $player = $('.player');
  $playerGUI = $('#audio-player .gui');
  $audioPlayer = $('#jp_container');
  $controls = $('.controls');
  $play = $('.controls .play');
  $pause = $('.controls .pause');
  $progressBar = $('.jp-progress-container');
  $progressMarker = $('.jp-progress-marker');
  $duration = $('.duration');
  $currentTime = $('.current-time');
  hovering = false;
  deblurred = false;

  $arrows = $('.arrows');
  $previous = $('.arrow.previous');
  $next = $('.arrow.next');
  currentTimePercent = 0;
  currentTimeText = '';


  if ($active.hasClass('noaudio')) { $player.hide(); updateArrows(); }
  if ($active.hasClass('title')) { $arrows.hide(); }

  $audioPlayer.jPlayer({
    ended: onAudioEnded,
    canplay: onCanPlay,
    supplied: 'mp3',
    loop: false,
    timeupdate: onTimeUpdate,
    swfPath: '/bower_components/jplayer/dist/jplayer/jquery.jplayer.swf'
  });

  $player.mousemove(function(e) {
    hovering = true;

    if ($play.is(':hover') || $pause.is(':hover')) {
      $progressMarker.find('.text').hide();
      $progressMarker.css({'border-left-color': '#7F57AB'});
    } else {
      $progressMarker.find('.text').show();
      $progressMarker.css({'border-left-color': '#501F84'});
    }

    $progressBar.addClass('with-border');
    moveDurationMarker(e);

    $player.click(function(e) { onPlayerClick(e); });
    $play.click(function(e) { e.stopPropagation(); });
    $pause.click(function(e) { e.stopPropagation(); });

  }).mouseleave(function() {
    resetSlider();
  });

  $startButton.click(function() {
    $active = setActiveSlide();
  });

  function resetSlider() {
    $currentTime.text(currentTimeText);
    $progressMarker.css({'left': currentTimePercent + '%'});
    $progressBar.removeClass('with-border');
    hovering = false;
  }

  function setActiveSlide(direction) {
    if (direction === 'previous') {
      if ($active.prev().hasClass('slide')) {
        $active = $active.prev();
      } else {
        return $active;
      }
    } else {
      if ($active.next().hasClass('slide')) {
        $active = $active.next();
      } else {
        return $active;
      }
    }

    for (var i = $slides.length - 1; i >= 0; i--) {
      $($slides[i]).removeClass('active');
    }

    $active.addClass('active');

    deblurred = false;

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
    if ($active.hasClass('title') || $active.hasClass('final')) {
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
      $next.show();
    } else {
      $next.hide();
    }

    if ($active.hasClass('title')) {
      $('.arrows').hide();
    } else {
      $('.arrows').show();
    }
  }

  function onAudioEnded() {
    $pause.hide();
    $play.show();
  }

  function playActiveAudio() {
    var audioUrl = $active.data('audiourl');
    console.log(audioUrl);
    $pause.show();
    $play.hide();

    if (audioUrl) {
      $audioPlayer.jPlayer('setMedia', {
        mp3: audioUrl
      }).jPlayer('play');
    } else {
      $audioPlayer.jPlayer('stop');
    }
  }

  function onCanPlay(e) {
    var durationText = $.jPlayer.convertTime(e.jPlayer.status.duration);
    $duration.text(durationText);
  }

  function deBlurActive() {
    $('.active > .bg-img').toggleClass('blur');
  }

  function moveDurationMarker(e) {
    if (hovering) {
      var leftPixels = e.pageX - $playerGUI.offset().left;
      $progressMarker.css({'left': leftPixels + 'px'});

      var leftPercent = (leftPixels / $playerGUI.width());
      var newAudioPosition = leftPercent * $audioPlayer.data().jPlayer.status.duration;
      var currentTimeText = $.jPlayer.convertTime(newAudioPosition);
      $currentTime.text(currentTimeText);
    } else {
      resetSlider();
    }
  }

  function onPlayerClick(e) {
    var leftPixels = e.pageX - $playerGUI.offset().left;
    var leftPercent = (leftPixels / $playerGUI.width());
    var newAudioPosition = leftPercent * $audioPlayer.data().jPlayer.status.duration;
    $audioPlayer.jPlayer('play', newAudioPosition);
  }

  function onTimeUpdate(e) {
    var percent = (e.jPlayer.status.currentTime / e.jPlayer.status.duration) * 100;
    currentTimePercent = percent;

    $progressBar.css({'width': percent + '%'});

    if (!hovering) {
      $progressMarker.css({'left': percent + '%'});
      currentTimeText = $.jPlayer.convertTime(e.jPlayer.status.currentTime);
      $currentTime.text(currentTimeText);
    }

    if (currentTimePercent > 50 && !deblurred) {
      deblurred = true;
      deBlurActive();
    }

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
