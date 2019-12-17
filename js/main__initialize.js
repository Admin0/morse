function url_check() {

  if (window.location.href.substring(window.location.href.length - 8, window.location.href.length) != window.location.pathname.substring(window.location.pathname.length - 8, window.location.pathname.length)) {
    setTimeout(function() {
      var target_pre = window.location.href.substring(window.location.href.indexOf("#") + 1);
      var target = (target_pre.substring(0, target_pre.length));
      if (target=="b"){
        history.pushState(null, null, "../braille");
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
