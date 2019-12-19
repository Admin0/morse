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
    if ($("body").is(".analyze.braille")) m.input.key_b();
  }, {
    "disable_in_input": true
  });

  shortcut.add("1", function() {
    if ($("body").is(".analyze.braille")) m.input.key.b1();
  }, {
    "disable_in_input": true
  });

  shortcut.add("F", function() {
    if ($("body").is(".analyze.braille")) m.input.key.b1();
  }, {
    "disable_in_input": true
  });
  shortcut.add("2", function() {
    if ($("body").is(".analyze.braille")) m.input.key.b2();
  }, {
    "disable_in_input": true
  });
  shortcut.add("D", function() {
    if ($("body").is(".analyze.braille")) m.input.key.b2();
  }, {
    "disable_in_input": true
  });
  shortcut.add("3", function() {
    if ($("body").is(".analyze.braille")) m.input.key.b3();
  }, {
    "disable_in_input": true
  });
  shortcut.add("S", function() {
    if ($("body").is(".analyze.braille")) m.input.key.b3();
  }, {
    "disable_in_input": true
  });
  shortcut.add("4", function() {
    if ($("body").is(".analyze.braille")) m.input.key.b4();
  }, {
    "disable_in_input": true
  });
  shortcut.add("J", function() {
    if ($("body").is(".analyze.braille")) m.input.key.b4();
  }, {
    "disable_in_input": true
  });
  shortcut.add("5", function() {
    if ($("body").is(".analyze.braille")) m.input.key.b5();
  }, {
    "disable_in_input": true
  });
  shortcut.add("K", function() {
    if ($("body").is(".analyze.braille")) m.input.key.b5();
  }, {
    "disable_in_input": true
  });
  shortcut.add("6", function() {
    if ($("body").is(".analyze.braille")) m.input.key.b6();
  }, {
    "disable_in_input": true
  });
  shortcut.add("L", function() {
    if ($("body").is(".analyze.braille")) m.input.key.b6();
  }, {
    "disable_in_input": true
  });
}
