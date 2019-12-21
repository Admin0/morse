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
        console.log("#braille ACTIVATE");
      }

      // target.addClass("targeted");// target_by_class.addClass("targeted");
      //
      // // very important
      // load($(target).attr("name"), $(target).attr("round"));
      // console.log("load at open: " + $(target).attr("name") + ", " + $(target).attr("round"));
    }, 0)
  } else {
    // console_event(",.");
  }
}

function keyboard_shortcuts() {
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
}

function ft_icon() {
  $('.ft-icon').on('click', function() {
    if ($(this).hasClass('info')) {
      if ($(this).hasClass('on')) {
        $(this).removeClass('on');
        $('.description').removeClass('on')
      } else {
        $(this).addClass('on');
        if ($('.description.' + $.i18n.locale).length == 0)
          $('.description.en').addClass('on');
        else
          $('.description.' + $.i18n.locale).addClass('on');
      }
    } else if ($(this).hasClass('history')) {
      if ($(this).hasClass('on')) {
        $(this).removeClass('on');
        $('#history_wrap').removeClass('on')
      } else {
        $(this).addClass('on');
        $('#history_wrap').addClass('on')
      }
    } else if ($(this).hasClass('code')) {
      toast("Coming soon.")
    }
  })
}
