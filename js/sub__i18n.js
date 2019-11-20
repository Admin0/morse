$.i18n().load({
  'en': 'i18n/en.json',
  'ko': 'i18n/ko.json',
  'ja': 'i18n/ja.json'
});

$(window).on('load', function() {
  // $.i18n().locale = "ja";
  $('[data-i18n]').i18n();
  $('#input_textarea').attr('placeholder', $.i18n('input_textarea_placeholder_0'));
  $('#html').attr('placeholder', $.i18n('input_textarea_placeholder_0'));

  $("meta[name='description']").attr("content", $.i18n('descript') + ' ' + $.i18n('translator') + ' + ' + $.i18n('analyzer'));

  message();
});

// $(document).ready(function(){
//   // $.i18n().locale = "ja";
//   $('[data-i18n]').i18n();
//   $('#input_textarea').attr('placeholder', $.i18n('input_textarea_placeholder_0'));
// });
