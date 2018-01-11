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


  $(document).on('click touchend', '.speaker', function() {
    /* Touchend is necessary for mobile devices, click alone won't work */
    if (!$('.speaker').hasClass("speakerplay")) {
      if (audiostatus == 'off') {
        $('.speaker').addClass('speakerplay');
        $('.speaker').removeClass("fa-volume-off");
        $('.speaker').addClass("fa-volume-up");
        getaudio.load();
        getaudio.play();
        audiostatus = 'on';
        return false;
      } else if (audiostatus == 'on') {
        $('.speaker').addClass('speakerplay');
        $('.speaker').removeClass("fa-volume-off");
        $('.speaker').addClass("fa-volume-up");
        getaudio.play()
      }
    } else if ($('.speaker').hasClass("speakerplay")) {
      getaudio.pause();
      $('.speaker').removeClass("fa-volume-up");
      $('.speaker').addClass("fa-volume-off");
      $('.speaker').removeClass('speakerplay');
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
