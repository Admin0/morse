const is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function url_check() {

  if (window.location.href.substring(window.location.href.length - 8, window.location.href.length) != window.location.pathname.substring(window.location.pathname.length - 8, window.location.pathname.length)) {
    setTimeout(function() {
      var target_pre = window.location.href.substring(window.location.href.indexOf("#") + 1);
      var target = (target_pre.substring(0, target_pre.length));
      if (target == "b") {
        history.replaceState(null, null, "../braille/");
        $('.lang_box.lang .card_header').removeClass('selected');
        m.type.code = CODE_BRAILLE;
        window.localStorage.type_code = CODE_BRAILLE;
        $('body').addClass('braille');
        $('link[rel="icon"]').attr('href', "image/favicon_b.ico");
        $('.card_header.braille').addClass('selected');
        i18n.message.set(true, CODE_BRAILLE);
        console.log("#braille ACTIVATE");
      }

      // GoogleAnalyticsObject
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        dataLayer.push(arguments);
      }

      gtag('js', new Date());
      gtag('config', 'UA-39552694-1', {
        // 'page_title': $.i18n('braille'),
        'page_path': '/braille/'
      });

    }, 0)
  } else {
    // console_event(",.");
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
      toast("Coming soon.")
    }
  })
}
