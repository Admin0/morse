var input_type = {
  'tel': 'Tel',
  'text': 'Aa'
}; //input type value
var margin = {
  "ad": 48,
  "footer": 50,
  "n_b": 25, //notification_bar
  "body": 128 //tested at jnu
};
var color = {
  'toggle_bg0': '#ffffff',
  'toggle_color0': '#aaaaaa',
  'toogle_border0': '#aaaaaa',
  'toggle_bg1': '#4d90fe',
  'toggle_color1': '#ffffff',
  'toogle_border1': '#3079ed'
};

const TRANSLATE_MODE = 0;
const ANALYZE_MODE = 1;

const LANG_KO = 0;
const LANG_EN = 1;
const LANG_JA = 2;
const LANG_RU = 3;
const LANG_GR = 4;
const LANG_HE = 5;
const LANG_AR = 6;
const LANG_PR = 7;

var lang = LANG_EN;

function tranlyze(type) {
  if (type == TRANSLATE_MODE) {
    translate("·", "–");
  } else if (type == ANALYZE_MODE) {
    analyze();
  }
  if ($(input_textarea).val() != "") {
    $('#output_menu, #input_del').removeClass('hide');
    $('#output').addClass('on');
  } else {
    $('#output_menu, #input_del').addClass('hide');
    $('#output').removeClass('on');
  }
}

function mode() { // this method for change type (toggle)
  if (type == TRANSLATE_MODE) {
    type = ANALYZE_MODE;
    $('body').addClass('analyze');
    $('body').removeClass('translate');

    $('#input_textarea').attr('placeholder', $.i18n('input_textarea_placeholder_1', 'tel')).attr('type', 'tel');

    $('#input_toggle').show().attr('value', input_type['tel']);
    $('#menu_toggle div').text($.i18n('translator'));
    $('#menu_toggle img').attr('src', 'image/menu_back.png');

    $('.lang_box.lang .card_header').removeClass('selected');
    setTimeout(function() {
      $('.lang_box.lang .card_header').addClass('selected');
    }, 0);

    if ($('.lang_box.code .selected.auto').length != 0) {
      $('.lang_box.code .auto').removeClass('selected');
      if (lang == LANG_EN) {
        $('.lang_box.code .en').addClass('selected');
      } else if (lang == LANG_JA) {
        $('.lang_box.code .ja').addClass('selected');
      } else if (lang == LANG_KO) {
        $('.lang_box.code .ko').addClass('selected');
      } else if (lang == LANG_RU) {
        $('.lang_box.code .ru').addClass('selected');
      } else if (lang == LANG_GR) {
        $('.lang_box.code .gr').addClass('selected');
      } else if (lang == LANG_HE) {
        $('.lang_box.code .he').addClass('selected');
      } else if (lang == LANG_AR) {
        $('.lang_box.code .ar').addClass('selected');
      } else if (lang == LANG_PR) {
        $('.lang_box.code .pr').addClass('selected');
      } else {
        $('.lang_box.code .en').addClass('selected');
      }
    }

  } else if (type == ANALYZE_MODE) {
    type = TRANSLATE_MODE;
    $('body').removeClass('analyze');
    $('body').addClass('translate');

    $('#input_textarea').attr('placeholder', $.i18n('input_textarea_placeholder_0')).attr('type', 'text');

    $('#input_toggle').hide();
    $('#menu_toggle div').text($.i18n('analyzer'));
    $('#menu_toggle img').attr('src', 'image/menu_forward.png');

    $('.lang_box.lang .card_header').removeClass('selected');
    setTimeout(function() {
      $('.lang_box.lang .card_header').addClass('selected');
    }, 0);

    if ($('.lang_box.code .selected.auto').length == 0) {
      $('.lang_box.code .selected').removeClass('selected');
      $('.lang_box.code .auto').addClass('selected');
    }

  }
}

function initialize() {

  function clear() {
    $('#input_textarea').val('');
    tranlyze(type);
    $('#input_textarea').focus();
    console.log('all cleared');
  }

  $('#input_del').on('click', function() {
    clear();
  });

  $('#re_anaylze').on('change', function() {
    $('#input_textarea').val($('#output_textarea').text());
    mode();
    tranlyze(type);
  });

  $('.lang_box.code .card_header').on('click', function() {
    $('.lang_box.code .card_header').removeClass('selected');
    $(this).addClass('selected');

    if ($('.selected').hasClass('ko')) {
      lang = LANG_KO;
    } else if ($('.selected').hasClass('en')) {
      lang = LANG_EN;
    } else if ($('.selected').hasClass('ja')) {
      lang = LANG_JA;
    }else if ($('.selected').hasClass('ru')) {
      lang = LANG_RU;
    }else if ($('.selected').hasClass('gr')) {
      lang = LANG_GR;
    }else if ($('.selected').hasClass('he')) {
      lang = LANG_HE;
    }else if ($('.selected').hasClass('ar')) {
      lang = LANG_AR;
    }else if ($('.selected').hasClass('pr')) {
      lang = LANG_PR;
    }
    tranlyze(type);
  });
}

var type = TRANSLATE_MODE;

function button_swipe() {

  $('#menu_toggle').click(function() { //menu toggle translator <-> analyzer 1.6.0
    mode();
    $('#input_textarea').val('');
    tranlyze(type);
    $('#input_textarea').focus();
  });
}

function button_click() {

  // $('#option').swipe({
  //   swipeUp: function() {
  //     $('#option').slideUp();
  //   },
  //   threshold: 25
  // });

  $('#input_toggle').click(function() {
    if ($(this).attr('value') == input_type['tel']) {
      $('#input_textarea').attr({
        'type': 'text',
        'placeholder': $.i18n('input_textarea_placeholder_1', 'text')
      });
      $(this).attr('value', input_type['text']);
    } else {
      $('#input_textarea').attr({
        'type': 'tel',
        'placeholder': $.i18n('input_textarea_placeholder_1', 'tel')
      });
      $(this).attr('value', input_type['tel']);
    }
  });

  $('#input_textarea').keyup(function() {
    tranlyze(type);
  }).keydown(function(event) {
    if (event.which == 13) {
      // event.preventDefault();
      return false;
    }
  });

  $('#menu_share').click(function() {
    $('.footer_output').slideUp();
    $('#footer_output_share').slideDown();
    //$('footer').css('margin-bottom','0');
    $('footer').mouseleave(function() {
      $('.footer_output').slideUp();
    });
  });
  $('#share_facebook').click(function() {
    window.open("http://www.facebook.com/sharer/sharer.php?u=http://admin0.github.com/morse/", '', 'height=260,width=550').focus();
    return false;
  });
  $('#share_google').click(function() {
    window.location = "https://plus.google.com/share?url=http://admin0.github.com/morse/";
  });
  $('#share_kakaotalk').click(function() {
    kakao.link("talk").send({
      msg: $('#output').val(),
      url: "market://details?id=com.morsecode.translator.jinh",
      appid: "com.morsecode.translator.jinh",
      appver: "2.0",
      appname: "모스 부호",
      metainfo: JSON.stringify({
        metainfo: [{
          os: "android",
          devicetype: "phone",
          installurl: "market://details?id=com.morsecode.translator.jinh",
          executeurl: "market://details?id=com.morsecode.translator.jinh"
        }, {
          os: "ios",
          devicetype: "pad",
          installurl: "market://details?id=com.morsecode.translator.jinh",
          executeurl: "market://details?id=com.morsecode.translator.jinh"
        }]
      }),
      type: "app"
    });
  });
  $('#share_mail').click(function() {
    window.location = "mailto:?subject=[모스 부호] 앱으로 만든 부호를 보냅니다.&body=" + $('#output').val() + " http://admin0.github.com/morse/";
  });
  $('#share_twitter').click(function() {
    window.open("https://twitter.com/share?url=http://admin0.github.com/morse/%C2%A0@Bloger_JinH&text=", '', 'height=260,width=550').focus();
    return false;
  });

  $('#menu_review').click(function() {
    window.open("https://chrome.google.com/webstore/detail/cobccnllippnmgibbgdnkdaljjpcppjl/reviews", "_blank");
  });

  $('#menu_setting').click(function() {
    $('.footer_output').slideUp();
    $('#footer_output_setting').slideDown();
    //$('footer').css('margin-bottom','0');
    $('footer').mouseleave(function() {
      $('.footer_output').slideUp();
    });
  });
}

$(function() {
  initialize();
  button_swipe();
  button_click();
  title_tooltip();

  $('#input_textarea').focus();

  var clipboard = new ClipboardJS('.copy');
  clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    e.clearSelection();
  });

});
