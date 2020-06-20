const time = {
  log: function(msg) {
    console.log(msg + ' (' + (-time.start + Date.now()) + ' ms)');
  }
};

time.start = Date.now();
// time.log('main__init.js load start');

const is_ie = navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1); // ie check
const is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); // mobile check

if (is_ie) location.replace('/morse/v3'); // if ie

// GoogleAnalyticsObject
window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-39552694-1');
// end of google analytics

function url_check() {
  let hash = location.hash;
  if (!!hash) {
    let is_b = (hash.substring(0, 2) == "#b");
    let search_b = (hash.length > 2) ? hash.substring(2, hash.length) : "";
    if (is_b) {
      history.replaceState(null, null, "../braille/" + search_b);
      m.type.code = CODE_BRAILLE;
      $('.lang_box.lang .card_header').removeClass('selected');
      window.localStorage.type_code = CODE_BRAILLE;
      $('body').addClass('braille');
      $('link[rel="icon"]').attr('href', "image/favicon_b.ico");
      $('.card_header.braille').addClass('selected');
      i18n.message.set(true, CODE_BRAILLE);

      gtag('config', 'UA-39552694-1', {
        'page_path': '/braille/'
      });

      console.log("#braille ACTIVATE");
    }
  }
  let search = location.search;
  if (!!search) {
    // $(window).on('load', function() {
    $('#input_textarea').val(decodeURI(search.substring(1, search.length)));
    tranlyze(m.type.mode);

    gtag('config', 'UA-39552694-1', {
      'page_path': '/morse/'
    });
    // });
  }
}

const SHORTCUT_RESET = 0;
const SHORTCUT_MORSE = 1;
const SHORTCUT_BRAILLE = 2;

function keyboard_shortcuts(type) {
  switch (type) {
    case SHORTCUT_RESET:
      //braille
      shortcut.remove("space");
      shortcut.remove("enter");

      shortcut.remove("1");
      shortcut.remove("2");
      shortcut.remove("3");
      shortcut.remove("4");
      shortcut.remove("5");
      shortcut.remove("6");
      shortcut.remove("F");
      shortcut.remove("D");
      shortcut.remove("S");
      shortcut.remove("J");
      shortcut.remove("K");
      shortcut.remove("L");
      shortcut.remove("backspace");
      break;
    case SHORTCUT_MORSE:
      break;
    case SHORTCUT_BRAILLE:
      shortcut.add("space", function() {
        if ($("body").is(".analyze.braille")) m.input.key.braille();
      });
      shortcut.add("enter", function() {
        if ($("body").is(".analyze.braille")) m.input.key.braille();
      });

      shortcut.add("1", function() {
        if ($("body").is(".analyze.braille")) m.input.key.braille(1);
      });
      shortcut.add("F", function() {
        if ($("body").is(".analyze.braille")) m.input.key.braille(1);
      });
      shortcut.add("2", function() {
        if ($("body").is(".analyze.braille")) m.input.key.braille(2);
      });
      shortcut.add("D", function() {
        if ($("body").is(".analyze.braille")) m.input.key.braille(2);
      });
      shortcut.add("3", function() {
        if ($("body").is(".analyze.braille")) m.input.key.braille(3);
      });
      shortcut.add("S", function() {
        if ($("body").is(".analyze.braille")) m.input.key.braille(3);
      });
      shortcut.add("4", function() {
        if ($("body").is(".analyze.braille")) m.input.key.braille(4);
      });
      shortcut.add("J", function() {
        if ($("body").is(".analyze.braille")) m.input.key.braille(4);
      });
      shortcut.add("5", function() {
        if ($("body").is(".analyze.braille")) m.input.key.braille(5);
      });
      shortcut.add("K", function() {
        if ($("body").is(".analyze.braille")) m.input.key.braille(5);
      });
      shortcut.add("6", function() {
        if ($("body").is(".analyze.braille")) m.input.key.braille(6);
      });
      shortcut.add("L", function() {
        if ($("body").is(".analyze.braille")) m.input.key.braille(6);
      });
      shortcut.add("backspace", function() {
        if ($("body").is(".analyze.braille")) m.input.key.del();
      });
      break;
    default:

  }
}

function ft_icon() {
  $('.ft-icon').on('click', function() {
    if ($(this).hasClass('info')) {
      if ($(this).hasClass('on')) {
        $(this).removeClass('on');
        $('.description').removeClass('on');
      } else {
        $(this).addClass('on');
        $('.description').insertAfter($('#ft-section'));
        if ($('.description.' + $.i18n().locale).length == 0)
          $('.description.en').addClass('on');
        else
          $('.description.' + $.i18n().locale).addClass('on');
      }
    } else if ($(this).hasClass('history')) {
      if ($(this).hasClass('on')) {
        $(this).removeClass('on');
        $('#history_wrap').removeClass('on')
      } else {
        $(this).addClass('on');
        $('#history_wrap').insertAfter($('#ft-section'));
        $('#history_wrap').addClass('on')
      }
    } else if ($(this).hasClass('code')) {
      if ($(this).hasClass('on')) {
        $(this).removeClass('on');
        $('.codebook').removeClass('on')
      } else {
        $(this).addClass('on');
        $('.codebook').insertAfter($('#ft-section'));
        $('.codebook').addClass('on')
      }
    }
  })
}

function codebook() {
  let list = "";
  list += '<div class="title" data-i18n="codebook">codebook</div>';
  list += '<div class="morse">';
  for (var j = 0; j < Object.keys(m.tranlyze.key).length; j++) {
    list += '<div class="title" data-i18n="' + 'lang_' + Object.keys(m.tranlyze.key)[j] + '"> ' + Object.keys(m.tranlyze.key)[j] + ' </div>';
    for (var k = 0; k < m.tranlyze.key[Object.keys(m.tranlyze.key)[j]].length; k++) {
      list += '<div class="code_wrap">';
      list += '<span class="letter">' + m.tranlyze.key[Object.keys(m.tranlyze.key)[j]][k][0] + "</span>";
      list += '<span class="code">' + m.tranlyze.key[Object.keys(m.tranlyze.key)[j]][k][1].split("").join(" ") + "</span>";
      list += '</div>';
    }
  }
  list += '</div><div class="braille">';
  for (var l = 0; l < Object.keys(m.tranlyze.key_b).length; l++) {
    list += '<div class="title">' + $.i18n('lang_' + Object.keys(m.tranlyze.key_b)[l]) + '</div>';
    for (var n = 0; n < m.tranlyze.key_b[Object.keys(m.tranlyze.key_b)[l]].length; n++) {
      list += '<div class="code_wrap">';
      list += '<span class="letter">' + m.tranlyze.key_b[Object.keys(m.tranlyze.key_b)[l]][n][0] + "</span>";
      list += '<span class="code">' + m.tranlyze.key_b[Object.keys(m.tranlyze.key_b)[l]][n][1].split("").join(" ") + "</span>";
      list += '</div>';
    }
  }
  list += '</div>';

  $('.codebook').html(list);

}
