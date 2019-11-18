/*******************************************
 * MORSE CODE TRANSLATOR                   *
 * Original Code by JinH(jinh.tistory.com) *
 *******************************************/

var hangulToJaso = function(text) {
  var ChoSeong = new Array(
    0x3131, 0x3132, 0x3134, 0x3137, 0x3138, 0x3139,
    0x3141, 0x3142, 0x3143, 0x3145, 0x3146, 0x3147,
    0x3148, 0x3149, 0x314a, 0x314b, 0x314c, 0x314d, 0x314e
  );
  var JungSeong = new Array(
    0x314f, 0x3150, 0x3151, 0x3152, 0x3153, 0x3154,
    0x3155, 0x3156, 0x3157, 0x3158, 0x3159, 0x315a,
    0x315b, 0x315c, 0x315d, 0x315e, 0x315f, 0x3160,
    0x3161, 0x3162, 0x3163
  );
  var JongSeong = new Array(
    0x0000, 0x3131, 0x3132, 0x3133, 0x3134, 0x3135,
    0x3136, 0x3137, 0x3139, 0x313a, 0x313b, 0x313c,
    0x313d, 0x313e, 0x313f, 0x3140, 0x3141, 0x3142,
    0x3144, 0x3145, 0x3146, 0x3147, 0x3148, 0x314a,
    0x314b, 0x314c, 0x314d, 0x314e
  );
  var chars = new Array();
  /*var*/
  v = new Array(); //전역 함수로 만들어 버립시당.  아 나도 빨리 전역하고 싶당 ㅠㅠ
  for (var i = 0; i < text.length; i++) {
    chars[i] = text.charCodeAt(i);
    if (chars[i] >= 0xAC00 && chars[i] <= 0xD7A3) {
      var i1, i2, i3;
      i3 = chars[i] - 0xAC00;
      i1 = i3 / (21 * 28);
      i3 = i3 % (21 * 28);
      i2 = i3 / 28;
      i3 = i3 % 28;
      v.push(String.fromCharCode(ChoSeong[parseInt(i1)]));
      v.push(String.fromCharCode(JungSeong[parseInt(i2)]));
      if (i3 != 0x0000)
        v.push(String.fromCharCode(JongSeong[parseInt(i3)]));
    } else {
      v.push(String.fromCharCode(chars[i]));
    }
  }
  return v;
};

////////////////////////////////////////////
// 한글 및 로마자 그리고 기타등등 모스부호 변환                                         //
// Orignal Code by JinH(jinh.tistory.com) //
////////////////////////////////////////////

function translate() {
  var input = hangulToJaso($('#input_textarea').val());
  /*		var input = new Array();
  	for (i=0; i<$('#input_textarea').value.length; i++) {
  		input[i] = $('#input_textarea').value.charAt(i);
  	} */ //한글 입력 코드

  for (var i = 0; i < v.length; i++) {

    if (input[i].charCodeAt() >= 0xFF01 && input[i].charCodeAt() <= 0xFF5E) { // "FF01:！" ~ "FF5E:～"에 속한 글자면 반각기호로
      input[i] = String.fromCharCode(input[i].charCodeAt() - 0xFEE0);
    } else if (input[i].charCodeAt() >= 0x0041 && input[i].charCodeAt() <= 0x005D) { // "FF41:A" ~ "005D:]"에 속한 글자면 소문자로
      input[i] = String.fromCharCode(input[i].charCodeAt() + 0x0020);
    } else if (input[i].charCodeAt() >= 0x3041 && input[i].charCodeAt() <= 0x3096) { // "3041:ぁ" ~ "3096:ゖ"에 속한 글자면 가타카나로
      input[i] = String.fromCharCode(input[i].charCodeAt() + 0x0060);
    }

    for (var j = 0; j < tranlyze_list.length; j++) {
      for (var k = 0; k < tranlyze_list[j].length; k++) {
        if (input[i] == tranlyze_list[j][k][0]) {
          input[i] = tranlyze_list[j][k][1];
          break;
        }
      }
    }
  }

  var output = '';
  for (i = 0; i < v.length; i++) {
    output = output + input[i] + '　';
  }
  //$('#output').text(output);//for div element
  $('#output').text(output); //for textarea element
}
