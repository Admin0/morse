function setting() {

  var item = [
    "s_braille_en_grade2",
    "dev__login"
  ];

  function check_setting() {

    $("#setting .setting_item input").prev("i").remove();

    for (i = 0; i < item.length; i++) {
      if (localStorage[item[i]] == "true") {
        $("#" + item[i] + " input").attr("checked", true);
      } else {
        $("#" + item[i] + " input").attr("checked", false);
      }
    };

    $("#setting input[checked]").before("<i class='material-icons'>check_box</i>");
    $("#setting input:not([checked]):not([failed])").before("<i class='material-icons'>check_box_outline_blank</i>");

    $("#setting input").next().next().next(".off").removeClass("hide");
    $("#setting input").next().next(".on").removeClass("hide");
    $("#setting input[checked]").next().next().next(".off").addClass("hide");
    $("#setting input:not([checked])").next().next(".on").addClass("hide");

    // function css_option() {
    //   for (var i = 0; i < arguments.length; i++) {
    //     if (localStorage[arguments[i]] == "true") {
    //       $('body').addClass(arguments[i]);
    //     } else {
    //       $('body').removeClass(arguments[i]);
    //     }
    //   }
    // }
    // // 개별 적용
    // css_option("general__dark", "answer__serif", "answer__quiz");
    //
    // if (localStorage.general__dark == "true") {
    //   $("meta[name='theme-color']").attr("content", "rgba(50, 54, 57, 1)");
    // } else {
    //   $("meta[name='theme-color']").attr("content", "#ffffff");
    // }

    $("#s_output_style_dit span.input").text(localStorage.dit || $("#s_output_style_dit span.input").text());
    $("#s_output_style_dah span.input").text(localStorage.dah || $("#s_output_style_dah span.input").text());
  }
  check_setting();

  $("#setting_bt").on("click", function() {
    // $(this).css("color",color.material_500[color.i]);
    $('#tooltip_nav').css({
      'visibility': 'hidden',
      'opacity': "0"
    });
    $("#setting, #setting_bg").toggleClass("on");
    $("#setting").css({
      "top": $("#setting_bt").offset().top - pageYOffset,
      "left": $("#nav").width() - 16
    });
    check_setting();
  });

  localStorage.dit = localStorage.dit || $("#s_output_style_dit span.input").text();
  localStorage.dah = localStorage.dah || $("#s_output_style_dah span.input").text();

  $("#setting .setting_item.auto_save span.input").on("input", function() { // checkbox
    let i = $("#s_output_style_dit span.input").text();
    let a = $("#s_output_style_dah span.input").text();
    localStorage.dit = (i == "") ? "·" : i;
    localStorage.dah = (a == "") ? "–" : a;

    if (m.type.code == CODE_MORSE && m.type.mode == TRANSLATE_MODE) {
      tranlyze(TRANSLATE_MODE);
    }

    // console.log({
    //   "i": localStorage.dit,
    //   "a": localStorage.dah
    // });
  });

  $("#setting .setting_item.auto_save").on("click", function() { // checkbox
    // console.log($(this).hasClass("disabled"));
    if (!$(this).hasClass("disabled")) {
      var i = $(this).attr("id");
      console.log(i);
      if (localStorage[i] == "true") {
        localStorage[i] = "false"
      } else {
        localStorage[i] = "true"
      }
      toast("설정이 저장되었습니다.", "save");

      tranlyze(m.type.mode);
      check_setting();
    }
  });

  // header > action bar
  $('.actionbar .item').on('click', function() {
    $(this).toggleClass('disabled');
    if ($(this).hasClass('sound')) {
      if (m.type.play.sound) {
        m.type.play.sound = false;
      } else {
        m.type.play.sound = true
      }
    }
    if ($(this).hasClass('vibration')) {
      if (m.type.play.vibration) {
        m.type.play.vibration = false;
      } else {
        m.type.play.vibration = true
      }
    }
    if ($(this).hasClass('flash')) {
      if (m.type.play.flash) {
        m.type.play.flash = false;
      } else {
        m.type.play.flash = true
      }
    }
  });

}

$(document).ready(function() {
  // browser_alert();
  // contextmenu();
  setting();

});
