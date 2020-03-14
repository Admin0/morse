const TRANSLATE_MODE = 0;
const ANALYZE_MODE = 1;

const CODE_MORSE = 0;
const CODE_BRAILLE = 1;

const LANG_AUTO = 0;
const LANG_EN = 1;
const LANG_JA = 2;
const LANG_RU = 3;
const LANG_GR = 4;
const LANG_HE = 5;
const LANG_AR = 6;
const LANG_PR = 7;
const LANG_KO = 8;
const LANG_TH = 9;

const m = {
  tranlyze: {
    key: {},
    list: {}
  },
  type: {
    code: CODE_MORSE,
    lang: LANG_AUTO,
    mode: TRANSLATE_MODE,
    play: {
      isOn: false,
      sound: true,
      vibration: true,
      flash: false
    }
  },
  toggle: {
    code: function(code) {
      m.play(false);

      if (code == CODE_MORSE) {
        m.type.code = CODE_MORSE;
      } else if (code == CODE_BRAILLE) {
        m.type.code = CODE_BRAILLE;
      }

      keyboard_shortcuts(SHORTCUT_RESET);
      i18n.message.set(true, m.type.code);

      $('.lang_box.lang .card_header').removeClass('selected');
      if (m.type.code == CODE_MORSE) {
        $('body').removeClass('braille');
        $('.lang_box .morse').addClass('selected');
        $('link[rel="shortcut icon"]').attr('href', "image/favicon.ico");
        $('link[rel="icon"]').attr('href', "image/favicon.ico");
        // history.pushState(null, null, "../morse/");
      }
      if (m.type.code == CODE_BRAILLE) {
        $('body').addClass('braille');
        $('.lang_box .braille').addClass('selected');
        $('link[rel="shortcut icon"]').attr('href', "image/favicon_b.ico");
        $('link[rel="icon"]').attr('href', "image/favicon_b.ico");
        // history.pushState(null, null, "../braille/");
      }
      $('#input_textarea').attr("readonly", false); // 키보드 팝업 방지의 방지
      if (m.type.mode == ANALYZE_MODE) {
        if (m.type.code == CODE_MORSE) {
          $('#input_textarea').attr('placeholder', $.i18n('card__input_textarea_placeholder_1', $.i18n('morse')));
          keyboard_shortcuts(SHORTCUT_MORSE);
        } else if (m.type.code == CODE_BRAILLE) {
          $('#input_textarea').attr('placeholder', $.i18n('card__input_textarea_placeholder_1', $.i18n('braille')));
          $('#input_textarea').attr("readonly", true); // 키보드 팝업 방지
          keyboard_shortcuts(SHORTCUT_BRAILLE);
        }
      }
    },
    lang: function(target) {
      m.play(false);

      var lang = LANG_EN;
      $('.lang_box.code .card_header, .card_lang').removeClass('selected');
      if ($(target).hasClass('auto')) {
        lang = LANG_EN; //TODO
        $('.card_header.en, .card_lang.en').addClass('selected');
        if ($(target).hasClass('card_lang')) $('.card_header.en').insertAfter('.card_header.auto');
      } else if ($(target).hasClass('ko')) {
        lang = LANG_KO;
        $('.card_header.ko, .card_lang.ko').addClass('selected');
        if ($(target).hasClass('card_lang')) $('.card_header.ko').insertAfter('.card_header.auto');
      } else if ($(target).hasClass('en')) {
        lang = LANG_EN;
        $('.card_header.en, .card_lang.en').addClass('selected');
        if ($(target).hasClass('card_lang')) $('.card_header.en').insertAfter('.card_header.auto');
      } else if ($(target).hasClass('ja')) {
        lang = LANG_JA;
        $('.card_header.ja, .card_lang.ja').addClass('selected');
        if ($(target).hasClass('card_lang')) $('.card_header.ja').insertAfter('.card_header.auto');
      } else if ($(target).hasClass('ru')) {
        lang = LANG_RU;
        $('.card_header.ru, .card_lang.ru').addClass('selected');
        if ($(target).hasClass('card_lang')) $('.card_header.ru').insertAfter('.card_header.auto');
      } else if ($(target).hasClass('gr')) {
        lang = LANG_GR;
        $('.card_header.gr, .card_lang.gr').addClass('selected');
        if ($(target).hasClass('card_lang')) $('.card_header.gr').insertAfter('.card_header.auto');
      } else if ($(target).hasClass('th')) {
        lang = LANG_TH;
        $('.card_header.th, .card_lang.th').addClass('selected');
        if ($(target).hasClass('card_lang')) $('.card_header.th').insertAfter('.card_header.auto');
      } else if ($(target).hasClass('he')) {
        lang = LANG_HE;
        $('.card_header.he, .card_lang.he').addClass('selected');
        if ($(target).hasClass('card_lang')) $('.card_header.he').insertAfter('.card_header.auto');
      } else if ($(target).hasClass('ar')) {
        lang = LANG_AR;
        $('.card_header.ar, .card_lang.ar').addClass('selected');
        if ($(target).hasClass('card_lang')) $('.card_header.ar').insertAfter('.card_header.auto');
      } else if ($(target).hasClass('pr')) {
        lang = LANG_PR;
        $('.card_header.pr, .card_lang.pr').addClass('selected');
        if ($(target).hasClass('card_lang')) $('.card_header.pr').insertAfter('.card_header.auto');
      }
      m.type.lang = lang;
    },
    mode: function() {
      m.play(false);

      keyboard_shortcuts(SHORTCUT_RESET);
      if (m.type.mode == TRANSLATE_MODE) {
        m.type.mode = ANALYZE_MODE;
        $('body').addClass('analyze');
        $('body').removeClass('translate');
        if (m.type.code == CODE_MORSE) {
          $('#input_textarea').attr('placeholder', $.i18n('card__input_textarea_placeholder_1', $.i18n('morse')));
          keyboard_shortcuts(SHORTCUT_MORSE);
        } else if (m.type.code == CODE_BRAILLE) {
          $('#input_textarea').attr('placeholder', $.i18n('card__input_textarea_placeholder_1', $.i18n('braille')));
          keyboard_shortcuts(SHORTCUT_BRAILLE);
        }

        if ($('.selected.auto').length != 0) {
          $('.auto').removeClass('selected');
          if (m.type.lang == LANG_EN) {
            $('.en').addClass('selected');
          } else if (m.type.lang == LANG_JA) {
            $('.ja').addClass('selected');
          } else if (m.type.lang == LANG_KO) {
            $('.ko').addClass('selected');
          } else if (m.type.lang == LANG_RU) {
            $('.ru').addClass('selected');
          } else if (m.type.lang == LANG_GR) {
            $('.gr').addClass('selected');
          } else if (m.type.lang == LANG_TH) {
            $('.th').addClass('selected');
          } else if (m.type.lang == LANG_HE) {
            $('.he').addClass('selected');
          } else if (m.type.lang == LANG_AR) {
            $('.ar').addClass('selected');
          } else if (m.type.lang == LANG_PR) {
            $('.pr').addClass('selected');
          } else {
            $('.en').addClass('selected');
            m.type.lang = LANG_EN;
          }
        }
      } else if (m.type.mode == ANALYZE_MODE) {
        m.type.mode = TRANSLATE_MODE;
        $('body').removeClass('analyze');
        $('body').addClass('translate');

        $('#input_textarea').attr('placeholder', $.i18n('card__input_textarea_placeholder_0'));

        if ($('.lang_box.code .selected.auto').length == 0) {
          $('.lang_box.code .selected, #card_lang .selected').removeClass('selected');
          $('.lang_box.code .auto, #card_lang .auto').addClass('selected');
        }
        $('#ck_lang_list').prop("checked", false);
        $('#card_lang').removeClass('on');
      }
      this.code();
    },
  },
  history: {
    set: function(standalone) {
      for (var i = 0; i < 50; i++) {
        if (typeof window.localStorage["history_input_" + i] !== "undefined") {
          $("#history").append("<div class='item' onclick='m.history.recall(" + i + ");'><div class='i'>" + window.localStorage["history_input_" + i] + "</div><div class='o'>" + window.localStorage["history_output_" + i] + "</div></div>");
        } else {
          break;
        }
      }
      $("#history_wrap .info").text($.i18n("history_i", $("#history .item").length));
      if (standalone) {
        console.log("history was loaded.");
      }
    },
    reset: function() {
      $("#history").html("");
    },
    push: function() {
      // var m.type.lang = $("#input_textarea").val();
      var input = $("#input_textarea").val();
      var output = $("#output_textarea").text();
      if (input != "" && input != window.localStorage["history_input_0"]) {
        for (var i = 0; i < 50; i++) {
          if (typeof window.localStorage["history_input_" + (49 - i)] !== "undefined") {
            // window.localStorage["history_lang_" + (49 - i + 1)] = window.localStorage["history_lang_" + (49 - i)];
            window.localStorage["history_input_" + (49 - i + 1)] = window.localStorage["history_input_" + (49 - i)];
            window.localStorage["history_output_" + (49 - i + 1)] = window.localStorage["history_output_" + (49 - i)];
          }
        }
        // window.localStorage["history_lang_0"] = lang;
        window.localStorage["history_input_0"] = input;
        window.localStorage["history_output_0"] = output;
        this.reset();
        this.set();
      }
    },
    recall: function(position) {

      $('#input_textarea').val(window.localStorage["history_input_" + position]);
      tranlyze(m.type.mode);

      // scrolling
      $('html, body').animate({
        scrollTop: $('#input').offset().top - event.pageY + pageYOffset + $('#input').height() / 2
      }, 500);
      console.log(position);
    }
  },
  input: {
    key: {
      dit: function() {},
      dah: function() {},
      space: function() {},
      del: function() {
        if (m.type.mode == ANALYZE_MODE && m.type.code == CODE_BRAILLE) {
          var t = $("#input_textarea").val();
          t = t.substring(0, t.length - 1);
          $("#input_textarea").val(t);
        }
      },
      delAll: function() {},
      braille: function(dot) {
        if (dot == undefined) {
          var t = $("#input_textarea").val();
          var c = 0x2800;
          for (var i = 0; i < 6; i++) {
            if ($('#key_b_' + (i + 1)).prop("checked")) c += Math.pow(2, i); // c += 2 ** i <-- 이렇게 하면 ie에서 오류가 나네요...
            $('#key_b_' + (i + 1)).prop("checked", false);
          }
          $("#input_textarea").val(t += String.fromCharCode(c));
          tranlyze(m.type.mode);
          $("#input_textarea").focus().setCursorPosition(t.length)
        } else {
          if ($('#key_b_' + dot).prop("checked")) {
            $('#key_b_' + dot).prop("checked", false)
          } else {
            $('#key_b_' + dot).prop("checked", true)
          }
        }
      }
    }

  },
  play: function(true_mean_i_wanna_play) {
    let time_origin = $('#s_t_speak_length .input').text();
    let time = time_origin;
    let position = 0;
    let dit = $('#s_output_style_dit .input').text();
    let dah = $('#s_output_style_dah .input').text();
    let code; // 점인지 선인지
    let text = $('#output_textarea').text();
    let index = $('#index');
    let flash = $('#index');
    let vibration_type = 'shake';
    let flash_type = 'flash';


    // text pre-decoration
    $('#output_textarea').html('<span>' + text.split("").join('</span><span>') + '</span>');

    // sound
    var audio = new AudioContext();
    var o = audio.createOscillator();
    o.type = "sine";
    o.frequency.value = $('#s_t_beep .input').text();
    o.start();

    function engine() {
      let isSoundOn = m.type.play.sound; // 시간차로 발생하는 오류 때문에 변수 하나 생성.
      if (m.type.play.isOn) {
        code = text.substring(position, position + 1);
        if (code == dit || code == dah) {
          if (code == dit) {
            time = time_origin;
            vibration_type = 'shake';
            flash_type = 'flash'
          } else {
            time = time_origin * 2;
            vibration_type = 'shake-hard';
            flash_type = 'flash-hard'
          }
          if (isSoundOn) o.connect(audio.destination);
          if (m.type.play.vibration) {
            if (document.body.offsetWidth > 1280 && !is_mobile) {
              index.addClass(vibration_type);
            } else {
              index.addClass('shake-vertical');
              window.navigator.vibrate(time);
            }
          }
          if (m.type.play.flash) flash.addClass(flash_type);
        } else if (code == "　") {
          time = time_origin * 2;
        } else {
          time = time_origin;
        }

        // text decoration
        $('#output_textarea > span:nth(' + ((position - 1) < 0 ? "" : (position - 1)) + ')').addClass('on');
        $('#output_textarea > span:nth(' + position + ')').addClass('on');
        $('#output_textarea > span:nth(' + (position + 1) + ')').addClass('on');

        // console.log(code + " " + time);

        if (position < text.length) {
          setTimeout(function() {
            if (code == dit || code == dah) {
              if (isSoundOn) o.disconnect(audio.destination);
              index.removeClass('shake shake-hard shake-vertical');
              flash.removeClass('flash flash-hard');
            }
            $('#output_textarea > span').removeClass('on');
            engine();
          }, time);
        } else {
          m.type.play.isOn = false;
          // if (m.type.play.sound) o.stop(0);
          $('#output_textarea > span').removeClass('on');
          toast($.i18n('bt_speak_stop', $.i18n('morse')), "stop");
          $('#output_menu .play i').text('play_arrow');
        }
        position++;
      }
    }
    if (m.type.play.isOn || (true_mean_i_wanna_play != undefined && !true_mean_i_wanna_play)) {
      if (m.type.play.isOn) toast($.i18n('bt_speak_stop', $.i18n('morse')), "stop");
      m.type.play.isOn = false;
      $('#output_menu .play i').text('play_arrow');
    } else {
      m.type.play.isOn = true;
      setTimeout(function() {
        engine();
        toast($.i18n('bt_speak', $.i18n('morse')), "play_arrow");
        $('#output_menu .play i').text('stop');
      }, time);
    }
  },
  test: function() {
    console.log('hello');
    return this;
    // console.log(this);
  }
}

function tranlyze(type) {

  m.play(false);

  if (m.type.code == CODE_MORSE) {
    if (type == TRANSLATE_MODE) {
      translate($('#s_output_style_dit .input').text(), $('#s_output_style_dah .input').text());
    } else if (type == ANALYZE_MODE) {
      $('#output_textarea').text(analyze(m.type.lang, $('#s_output_style_dit .input').text(), $('#s_output_style_dah .input').text()));
    }
  } else if (m.type.code == CODE_BRAILLE) {
    if (type == TRANSLATE_MODE) {
      translate_b();
    } else if (type == ANALYZE_MODE) {
      $('#output_textarea').text(analyze_b(m.type.lang));
    }
  }

  if ($(input_textarea).val() != "") {
    $('#output_menu, #input_del').removeClass('hide');
    $('#output').addClass('on');
  } else {
    $('#output_menu, #input_del').addClass('hide');
    $('#output').removeClass('on');
    if (m.type.mode == TRANSLATE_MODE && m.type.code == CODE_MORSE)
      $('#output_textarea').html('<span class="placeholder">' + $.i18n('card__output_0', $.i18n('morse')) + '</span>')
    else if (m.type.mode == TRANSLATE_MODE && m.type.code == CODE_BRAILLE)
      $('#output_textarea').html('<span class="placeholder">' + $.i18n('card__output_0', $.i18n('braille')) + '</span>')
    else if (m.type.mode == ANALYZE_MODE)
      $('#output_textarea').html('<span class="placeholder">' + $.i18n('card__output_1', $('.lang_box.code .card_header.selected').text()) + '</span>')
  }

  if (m.type.mode == ANALYZE_MODE && m.type.code == CODE_BRAILLE) { // 점자 해석일 때도 입력창 클릭하면 편집가능
    $('#input_textarea').on("focus, click", function() {
      console.log('good!');
      setTimeout(function() {
        $('#input_textarea').attr("readonly", false);
      }, 10);
    });
    $('#input_textarea').on("focusout, blur", function() {
      $('#input_textarea').attr("readonly", true);
    })
  }
}

function initialize() {

  function clear() {
    $('#input_textarea').val('');
    tranlyze(m.type.mode);
    $('#input_textarea').focus();
    console.log('all cleared');
  }

  $('#input_del').on('click', function() {
    clear();
  });

  $('#re_anaylze').on('change', function() {
    if ($('#input_textarea').val() != "") {
      $('#input_textarea').val($('#output_textarea').text());
    }
    m.toggle.mode();
    tranlyze(m.type.mode);
  });

  $('#card_option input').on('change', function() {
    tranlyze(m.type.mode);
  });

  $('.lang_box.code .card_header, .card_lang').on('click', function() {
    if (m.type.mode == ANALYZE_MODE) {
      m.toggle.lang(this);
    }

    //card_body
    $('#lang_list input').prop("checked", false);
    $('#card_lang').removeClass('on');

    // all after
    tranlyze(m.type.mode);
  });
  $('.lang_box.lang .card_header').on('click', function() {
    if (!this.classList.contains('selected')) {
      if (this.classList.contains('morse')) {
        m.toggle.code(CODE_MORSE);
      } else if (this.classList.contains('braille')) {
        m.toggle.code(CODE_BRAILLE);
      }
      tranlyze(m.type.mode);
    }
  });

  m.history.set(true);
}

function detect_input() {

  $('#input_textarea').keyup(function() {
    tranlyze(m.type.mode);
  }).keydown(function(event) {
    if (event.which == 13) {
      // event.preventDefault();
      m.history.push();
      return false;
    }
  });

}

function load_modules() {
  $("#info").load("info.html");
  $("#license").load("license.html");
  $("#nav_menu").load("nav_menu.html");
}

function initialize_langDropDown() {
  $('#lang_list').on('click', function() {
    if ($('#lang_list input').prop("checked")) {
      $('#card_lang').addClass('on');
    } else {
      $('#card_lang').removeClass('on');
    }
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

$(function() {
  initialize();
  initialize_langDropDown();
  url_check();
  ft_icon();
  codebook();
  detect_input();
  title_tooltip();
  load_modules();

  $('#input_textarea').focus();

  var clipboard = new ClipboardJS('.copy');
  clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    e.clearSelection();
  });

});
