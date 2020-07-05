// time.log('sub__i18n.js load start.');

$.i18n().load({ // 처음엔 영어만 불러온다.
  'en': 'i18n/en.json'
});

// let wait_until = 0;
const i18n = {
  set: function(nation_code) {

    if (nation_code != null) { // 언어 설정
      $.i18n().locale = (nation_code == "default") ? $.i18n().options.locale : nation_code;
    }

    let l = $.i18n().locale;
    if ($.i18n().messageStore.messages[l] == undefined) { // load가 되지 않았을 경우만 불러오기.
      l = !!(l == "zh-CN" | "zh-TW" | "pt-BR") ? l : l.substring(0, 2); // 경우의 수 빼고 앞에 두글자만 끊음.
      $.i18n().load({
        [l]: "../morse/i18n/" + l + ".json"
      }).done(function() {
        subset(l);
      });
    } else {
      subset(l);
    }

    function subset(locale) {

      $('.description').removeClass('on');
      $('.description.' + locale).addClass('on');
      if ($('.description.on').length == 0) $('.description.en').addClass('on');

      $('html').attr('lang', locale);
      $('[property="og:title"]').attr('content', $.i18n('app_name_full'));
      $('[property="og:description"]').attr('content', $.i18n('app_promotion'));

      $('[data-i18n]').i18n();

      if (m.type.code == CODE_MORSE)
        $('#output_textarea .placeholder').text($.i18n('card__output_0', $.i18n('morse')));
      else if (m.type.code == CODE_BRAILLE)
        $('#output_textarea .placeholder').text($.i18n('card__output_0', $.i18n('braille')));

      $('#input_textarea').attr('placeholder', $.i18n('card__input_textarea_placeholder_0'));

      i18n.message.set(m.type.code, m.type.lang, false);

      gtag('config', 'UA-39552694-1', {
        'page_title': $.i18n('app_name_full')
      });

      // time.log('i18n was activated. code: ' + $.i18n().locale);
      $("#splash").addClass("off");
    }


    // time.log('i18n was activated. code: ' + $.i18n().locale);

  },
  message: { // 메세지 로딩을 위해 추가로 만든 코드
    list: {
      quote: {
        m: [],
        b: []
      },
      source: {
        m: [],
        b: []
      }
    },
    i: {
      m: null,
      b: null
    },
    lang: 0,
    set: function(code, lang, reset) { // m or b, language, want new string?
      // if ($('#message .quote').text() == "MESSAGE" || reset) {
      if (code === undefined || code == CODE_MORSE) { // morse
        if (this.list.quote.m.length == 0 || this.lang != lang) { // 리스트가 없을 때 || 언어가 다를 때
          this.lang = lang;
          for (var i = 0; i < 99; i++) {
            var m = $.i18n('message_' + i);
            var s = $.i18n('message_' + i + '_source');
            if (m != 'message_' + i) {
              // console.log('message_' + i);
              // time.log('message_' + i);
              this.list.quote.m[i] = m;
              this.list.source.m[i] = s;
            } else {
              // console.log('message_' + i + " was breaked.");
              break;
            }
          }
        }
        this.i.m = reset ? Math.floor(Math.random() * (this.list.quote.m.length)) : this.i.m || Math.floor(Math.random() * (this.list.quote.m.length));
        $('#message .quote').html(this.list.quote.m[this.i.m])
        $('#message .source').html(this.list.source.m[this.i.m])
        $('#message').removeClass('hide');

      } else if (code == CODE_BRAILLE) { // braille
        if (this.list.quote.b.length == 0 || this.lang != lang) {
          this.lang = lang;
          for (var i = 0; i < 99; i++) {
            var m = $.i18n('messagb_' + i);
            var s = $.i18n('messagb_' + i + '_source');
            if (m != 'messagb_' + i) {
              // console.log('messageb_' + i);
              this.list.quote.b[i] = m;
              this.list.source.b[i] = s;
            } else {
              // console.log('messageb_' + i + " was breaked.");
              break;
            }
          }
        }
        this.i.b = reset ? Math.floor(Math.random() * (this.list.quote.b.length)) : this.i.b || Math.floor(Math.random() * (this.list.quote.b.length));
        $('#message .quote').html(this.list.quote.b[this.i.b])
        $('#message .source').html(this.list.source.b[this.i.b])
        $('#message').removeClass('hide');
      }
      // }
    }
  }
}
// time.log('sub__i18n.js load done.');

i18n.set();
