$.i18n().load({
  'en': 'i18n/en.json',
  'de': 'i18n/de.json',
  'es': 'i18n/es.json',
  'fa': 'i18n/fa.json',
  'fr': 'i18n/fr.json',
  'id': 'i18n/id.json',
  'ko': 'i18n/ko.json',
  'ja': 'i18n/ja.json',
  'pl': 'i18n/pl.json',
  'pt-BR': 'i18n/pt-BR.json',
  'ru': 'i18n/ru.json',
  'th': 'i18n/th.json',
  'tr': 'i18n/tr.json',
  'uk': 'i18n/uk.json',
  'uk': 'i18n/uk.json',
  'vi': 'i18n/vi.json',
  'zh-CN': 'i18n/zh-CN.json',
  'zh-TW': 'i18n/zh-TW.json'
});

const i18n = {
  set: function(nation_code) {

    if (nation_code != null) { // 언어 설정
      $.i18n().locale = nation_code;
      i18n.message.set(true, m.type.code);
    } else {
      i18n.message.set(false, m.type.code);
    }

    $('.description').removeClass('on');
    $('.description.' + $.i18n().locale.substring(0, 2)).addClass('on');
    if ($('.description.on').length == 0) $('.description.en').addClass('on');

    $('html').attr('lang', $.i18n().locale);

    $('[data-i18n]').i18n();

    if (m.type.code == CODE_MORSE)
      $('#output_textarea .placeholder').text($.i18n('card__output_0', $.i18n('morse')));
    else if (m.type.code == CODE_BRAILLE)
      $('#output_textarea .placeholder').text($.i18n('card__output_0', $.i18n('braille')));

    $('#input_textarea').attr('placeholder', $.i18n('card__input_textarea_placeholder_0'));
    $("meta[name='description']").attr("content", $.i18n('app_promotion') + ' ' + $.i18n('translator') + ' + ' + $.i18n('analyzer'));

    // module(ex nav.html) 안에 있는 요소 중 하나를 체크해야함.
    if ($('#i18n_checker').text() == '#morse' || $('#i18n_checker').length == 0) {
      setTimeout(function() {
        console.log('ERROR: i18n was not activated because DOM is not ready.');
        i18n.set();
      }, 100);
    } else {
      console.log('i18n was activated.');
    }
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
    set: function(reset, code) {
      if ($('#message .quote').text() == "MESSAGE" || reset) {
        if (code === undefined || code == CODE_MORSE) {
          for (var i = 0; i < 99; i++) {
            var m = $.i18n('message_' + i);
            var s = $.i18n('message_' + i + '_source');
            if (m != 'message_' + i) {
              // console.log('ddd: ' + i);
              this.list.quote.m[i] = m;
              this.list.source.m[i] = s;
            } else {
              break;
            }
          }
          this.i.m = this.i.m || Math.floor(Math.random() * (this.list.quote.m.length));
          $('#message .quote').html(this.list.quote.m[this.i.m])
          $('#message .source').html(this.list.source.m[this.i.m])
          $('#message').removeClass('hide');
        } else if (code == CODE_BRAILLE) {
          for (var i = 0; i < 99; i++) {
            var m = $.i18n('messagb_' + i);
            var s = $.i18n('messagb_' + i + '_source');
            if (m != 'messagb_' + i) {
              // console.log('ddd: ' + i);
              this.list.quote.b[i] = m;
              this.list.source.b[i] = s;
            } else {
              break;
            }
          }
          this.i.b = this.i.b || Math.floor(Math.random() * (this.list.quote.b.length));
          $('#message .quote').html(this.list.quote.b[this.i.b])
          $('#message .source').html(this.list.source.b[this.i.b])
          $('#message').removeClass('hide');
        }
      }
    }
  }
}

$(document).ready(function() {
  i18n.set();
});
