$.i18n().load({
  'en': 'i18n/en.json',
  'ko': 'i18n/ko.json',
  'ja': 'i18n/ja.json'
});

$(window).on('load', function() {
  // $.i18n().locale = "ja";
  $('[data-i18n]').i18n();
  $('#input_textarea').attr('placeholder', $.i18n('input_textarea_placeholder_0'));

  message();
});

// $(document).ready(function(){
//   // $.i18n().locale = "ja";
//   $('[data-i18n]').i18n();
//   $('#input_textarea').attr('placeholder', $.i18n('input_textarea_placeholder_0'));
// });
