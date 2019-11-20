function message() {
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
