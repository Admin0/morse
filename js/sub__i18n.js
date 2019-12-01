$.i18n().load({
  'en': 'i18n/en.json',
  'ko': 'i18n/ko.json',
  'ja': 'i18n/ja.json'
});

const i18n = {
  set: function() {
    // $.i18n().locale = "ja";

    $('[data-i18n]').i18n();
    $('#input_textarea').attr('placeholder', $.i18n('card__input_textarea_placeholder_0'));
    $('#html').attr('placeholder', $.i18n('card__input_textarea_placeholder_0'));

    $("meta[name='description']").attr("content", $.i18n('info__descript') + ' ' + $.i18n('translator') + ' + ' + $.i18n('analyzer'));

    i18n.message.set();

    // if ($('.card_header.auto').text() == 'lang_auto') {
    if ($('#i18n_checker').text() == '#morse' || $('#i18n_checker').length == 0) {
      setTimeout(function() {
        console.log('ERROR: i18n was not activated because DOM is not ready.');
        i18n.set();
      }, 100);
    } else {
      console.log('i18n was activated.');
    }
  },
  message: {
    list: [],
    set: function() {
      if ($('#message').text() == "MESSAGE") {
        for (var i = 0; i < 99; i++) {
          var m = $.i18n('message_' + i);
          if (m != 'message_' + i) {
            // console.log('ddd: ' + i);
            this.list.push(m);
          } else {
            break;
          }
        }
        $('#message')
          .html(this.list[Math.floor(Math.random() * (this.list.length))])
          .removeClass('hide');
      }
    }
  }
}

$(document).ready(function() {
  i18n.set();
});
