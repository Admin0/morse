$.i18n().load({
  'en': 'i18n/en.json',
  'ko': 'i18n/ko.json',
  'ja': 'i18n/ja.json'
});

const i18n = {
  set: function(nation_code) {

    if (nation_code != null) { // 언어 설정
      $.i18n().locale = nation_code;
      i18n.message.set(true);
    } else {
      i18n.message.set();
    }

    $('[data-i18n]').i18n();
    $('#input_textarea').attr('placeholder', $.i18n('card__input_textarea_placeholder_0'));
    $('#html').attr('placeholder', $.i18n('card__input_textarea_placeholder_0'));

    $("meta[name='description']").attr("content", $.i18n('info__descript') + ' ' + $.i18n('translator') + ' + ' + $.i18n('analyzer'));

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
    list: [],
    i: null,
    set: function(reset) {
      if ($('#message').text() == "MESSAGE" || reset) {
        for (var i = 0; i < 99; i++) {
          var m = $.i18n('message_' + i);
          if (m != 'message_' + i) {
            // console.log('ddd: ' + i);
            this.list[i] = m;
          } else {
            break;
          }
        }
        this.i = this.i || Math.floor(Math.random() * (this.list.length));
        $('#message')
          .html(this.list[this.i])
          .removeClass('hide');
      }
    }
  }
}

$(document).ready(function() {
  i18n.set();
});
