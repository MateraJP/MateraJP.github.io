$(document).ready(function () {
  var nav = document.querySelector('nav');
  var links = document.querySelectorAll('nav a');

  console.log('e aí cara', nav, links);

  $('.scroll').click(function() {
    var target = $(this.hash);

    $('html, body').animate({
      scrollTop: target.offset().top
    }, 500);

    return false;
  });


  var getaudio = $('#player')[0];
  var audiostatus = 'off';

  $(document).on('mouseenter', '.speaker', function() {
    /* Bonus feature, if the mouse hovers over the speaker image for more than 1 second the audio will start playing */
    if (!mouseovertimer) {
      mouseovertimer = window.setTimeout(function() {
        mouseovertimer = null;
        if (!$('.speaker').hasClass("speakerplay")) {
          getaudio.load();
          /* Loads the audio */
          getaudio.play();
          /* Play the audio (starting at the beginning of the track) */
          $('.speaker').addClass('speakerplay');
          return false;
        }
      }, 1000);
    }
  });

  $(document).on('mouseleave', '.speaker', function() {
    /* If the mouse stops hovering on the image (leaves the image) clear the timer, reset back to 0 */
    if (mouseovertimer) {
      window.clearTimeout(mouseovertimer);
      mouseovertimer = null;
    }
  });

  $(document).on('click touchend', '.speaker', function() {
    /* Touchend is necessary for mobile devices, click alone won't work */
    if (!$('.speaker').hasClass("speakerplay")) {
      $('.speaker').removeClass("fa-volume-off");
      $('.speaker').addClass("fa-volume-up");
      if (audiostatus == 'off') {
        $('.speaker').addClass('speakerplay');
        getaudio.load();
        getaudio.play();
        window.clearTimeout(mouseovertimer);
        audiostatus = 'on';
        return false;
      } else if (audiostatus == 'on') {
        $('.speaker').addClass('speakerplay');
        getaudio.play()
      }
    } else if ($('.speaker').hasClass("speakerplay")) {
      $('.speaker').removeClass("fa-volume-up");
      $('.speaker').addClass("fa-volume-off");
      getaudio.pause();
      $('.speaker').removeClass('speakerplay');
      window.clearTimeout(mouseovertimer);
      audiostatus = 'on';
    }
  });

  $('#player').on('ended', function() {
    $('.speaker').removeClass('speakerplay');
    /*When the audio has finished playing, remove the class speakerplay*/
    audiostatus = 'off';
    /*Set the status back to off*/
  });
});
