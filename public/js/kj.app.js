// Mobile Browser
$(function () {
  if (detectMobileBrowser()) {
    mobile = true;
    $('body').addClass('touch-device');
  }
});

// Layout
$(function () {
  var metaHeight = 0;
  $('#content li .meta').each(function () {
    if ($(this).children('div').height() > metaHeight) {
      metaHeight = $(this).children('div').height();
    }
  });
  $('#content li .meta').height(metaHeight);
});
$(window).resize(function () {
  var metaHeight = 0;
  $('#content li .meta').each(function () {
    if ($(this).children('div').height() > metaHeight) {
      metaHeight = $(this).children('div').height();
    }
  });
  $('#content li .meta').height(metaHeight);
});

// ScrollMagic
$(function () {
  var controller = new ScrollMagic.Controller();

  var logo = new ScrollMagic.Scene({
    triggerElement: '.trig1',
    triggerHook: 'onLeave',
    duration: $(window).height() + 300
  })
    .setTween('.largeImg', { y: 150 })
    .addTo(controller);
});

// Nav Drawer
var drawerWidth;
$(function () {
  $('nav div.oc').click(function (e) {
    e.preventDefault();
    if ($(this).is('.fa-caret-left')) {
      drawerWidth = $(this).parent().width();
      $(this).parent().animate({ width: $('nav #logo').width() + 20 }, 200, 'swing');
      $(this).removeClass('fa-caret-left').addClass('fa-caret-right');
    } else {
      $(this).parent().animate({ width: drawerWidth }, 200, 'swing', function () {
        $(this).width('auto');
      });
      $(this).removeClass('fa-caret-right').addClass('fa-caret-left');
    }
  });
});
$(window).resize(function () {
  $('.fa-caret-right').parent().css({ width: $('nav #logo').width() + 20 });
});

// Open Video
$(function () {
  if ($("#player").length) {
    const player = new Plyr('#player', {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      settings: [],
    });
  }
});

// Voiceover Demo Reel Video
$(function () {
  const demo = new Plyr('#demo', {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    settings: [],
  });
});

// Portfolio Open Video
$(function () {
  $('ul.portfolio a').click(function (e) {
    e.preventDefault();
    changePageInfo('/' + $(this).data('slug'), $(this).data('pagetitle'), $(this).data('thumbnail'))
    $(this).addClass('active');
    $('#overlay > div .video').append('<div id="player" class="plyr__video-embed"><iframe src="' + $(this).attr('href') + '?autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay; fullscreen; picture-in-picture"></iframe></div>');
    const player = new Plyr('#player', {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      settings: [],
    });
    $('#overlay > div .title').html($(this).data('title'));
    $('#overlay > div .meta').html($(this).data('meta'));
    player.on('ready', (event) => {
      if (!$('#player').hasClass('active')) {
        $('#player').addClass('active');
        $('#overlay').css({ 'top': '-' + $(window).height() + 'px', height: $(window).height() }).addClass('active');
        $('#overlay').animate({ 'top': 0 }, 400, 'swing', function () {
          $('ul.portfolio a').removeClass('active');
        });
      }
    });
  });
  $('#overlay .close').click(function (e) {
    e.preventDefault();
    changePageInfo('/');
    $('ul.portfolio a').removeClass('active');
    $('#overlay').animate({ 'top': '-' + $(window).height() + 'px' }, 300, 'swing', function () {
      $('#overlay').removeAttr('style').removeClass('active');
      $('#overlay > div .video').empty();
    });
  });
});
$(window).resize(function () {
  if ($('#overlay').hasClass('active')) {
    overlayResize($('#overlay > div'));
    $('#overlay').css({ height: $(window).height() });
  }
});
window.addEventListener("orientationchange", function () {
  if ($('#overlay').hasClass('active')) {
    overlayResize($('#overlay > div'));
    $('#overlay').css({ height: $(window).height() });
  }
}, false);

// Contact
$(function () {
  $('nav a.contact').click(function (e) {
    e.preventDefault();
    console.log(parseInt($('nav #menu').css('top')));
    if (parseInt($('nav #menu').css('top')) >= 40) {
      $('nav #menu').animate({ 'top': -menuHeight }, 200, 'swing', function () {
        $(this).css({ 'opacity': 0 });
      });
    }
    $("html, body").animate({ scrollTop: $(document).height() }, 'slow', 'swing', function () {
      $('footer .contact, footer .agent').addClass('hiLite');
      setTimeout(function () {
        $('footer .contact, footer .agent').removeClass('hiLite');
      }, 2000);
    });
    return false;
  });
});

// menu
var menuHeight;
$(function () {
  $('nav a.menu').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    if ($(this).is('.active')) {
      menuHeight = $('nav #menu').outerHeight();
      $('nav #menu').css({ 'top': -menuHeight, 'opacity': 1 });
      $('nav #menu').animate({ 'top': '40px' }, 200, 'swing');
    } else {
      $('nav #menu').animate({ 'top': -menuHeight }, 200, 'swing', function () {
        $(this).css({ 'opacity': 0 });
      });
    }
  });
});

function overlayResize(element) {
  $(element).removeAttr("style");
  while ($(element).height() > $(window).height()) {
    $(element).width($(element).width() * 0.9);
  }
}

function changePageInfo(slug, title = '', thumbnail = '') {
  if (!title) {
    title = $('#meta .title').text();
    $('meta[property="og:title"]').attr('content', title);
    $('meta[property="og:image"]').attr('content', $('#meta .image').text());
    $('meta[property="og:image:width"]').attr('content', $('#meta .imageWidth').text());
    $('meta[property="og:image:height"]').attr('content', $('#meta .imageHeight').text());
    $('meta[property="og:url"]').attr('content', $('#meta .url').text());
  } else {
    originalImage = $('meta[property="og:image"]').attr('content');
    originalHeight = $('meta[property="og:image:height"]').attr('content');
    originalWidth = $('meta[property="og:image:width"]').attr('content');
    originalURL = $('meta[property="og:url"]').attr('content');
    $('meta[property="og:title"]').attr('content', title);
    $('meta[property="og:url"]').attr('content', $('#meta .url').text() + slug);
    if (thumbnail) {
      $('meta[property="og:image"]').attr('content', thumbnail);
      getMeta(
        thumbnail,
        (width, height) => {
          $('meta[property="og:image:width"]').attr('content', width);
          $('meta[property="og:image:height"]').attr('content', height);
        }
      );
    }
  }
  window.history.pushState({ additionalInformation: 'Updated URL' }, title, slug);
  document.title = title;
}

function getMeta(url, callback) {
  const img = new Image();
  img.src = url;
  img.onload = function () { callback(this.width, this.height); }
}