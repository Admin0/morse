$.i18n().load({
  'en': 'i18n/en.json',
  'ko': 'i18n/ko.json',
  'ja': 'i18n/ja.json'
});

function i18n_message() {
  const list_message = [];
  for (var i = 0; i < 99; i++) {
    var m = $.i18n('message_' + i);
    if (m != 'message_' + i) {
      // console.log('ddd: ' + i);
      list_message.push(m);
    } else {
      break;
    }
  }
  $('#message').html(list_message[Math.floor(Math.random() * (list_message.length))]);
}

function i18n_set() {
  // $.i18n().locale = "ja";

  $('[data-i18n]').i18n();
  $('#input_textarea').attr('placeholder', $.i18n('input_textarea_placeholder_0'));
  $('#html').attr('placeholder', $.i18n('input_textarea_placeholder_0'));

  $("meta[name='description']").attr("content", $.i18n('descript') + ' ' + $.i18n('translator') + ' + ' + $.i18n('analyzer'));

  i18n_message();

  if ($('.card_header.auto').text() == 'LANG_AUTO') {
    setTimeout(function() {
      console.log('ERROR: i18n was not activated because DOM is not ready.');
      i18n_set();
    }, 100);
  } else {
    console.log('i18n was activated.');
  }
}

// $(window).on('load', function() {
//   // $.i18n().locale = "ja";
//   $('[data-i18n]').i18n();
//   $('#input_textarea').attr('placeholder', $.i18n('input_textarea_placeholder_0'));
//   $('#html').attr('placeholder', $.i18n('input_textarea_placeholder_0'));
//
//   $("meta[name='description']").attr("content", $.i18n('descript') + ' ' + $.i18n('translator') + ' + ' + $.i18n('analyzer'));
//
//   message();
// });

$(document).ready(function() {
  i18n_set();
});
