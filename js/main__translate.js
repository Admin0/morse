/*******************************************
 * MORSE CODE TRANSLATOR                   *
 * Original Code by JinH (https://jinh.kr) *
 *******************************************/

m.tranlyze.t = {
  lang: {
    count: {
      kr: 0,
      en: 0,
      jp: 0,
      get: function() {
        if (this.kr > this.en && this.kr > this.jp) {
          m.tranlyze.t.lang.val = "ko";
        } else if (this.jp > this.en && this.jp > this.kr) {
          m.tranlyze.t.lang.val = "ja";
        } else {
          m.tranlyze.t.lang.val = "en";
        }
      }
    }
  }
};

var v;

var hangulToJaso = function(text) {
  const ChoSeong = new Array(
    0x3131, 0x3132, 0x3134, 0x3137, 0x3138, 0x3139,
    0x3141, 0x3142, 0x3143, 0x3145, 0x3146, 0x3147,
    0x3148, 0x3149, 0x314a, 0x314b, 0x314c, 0x314d, 0x314e
  );
  const JungSeong = new Array(
    0x314f, 0x3150, 0x3151, 0x3152, 0x3153, 0x3154,
    0x3155, 0x3156, 0x3157, 0x3158, 0x3159, 0x315a,
    0x315b, 0x315c, 0x315d, 0x315e, 0x315f, 0x3160,
    0x3161, 0x3162, 0x3163
  );
  const JongSeong = new Array(
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

///////////////////////////////////////////////
// 한글 및 로마자 그리고 기타등등 모스부호 변환 //
// Orignal Code by JinH(jinh.kr)             //
///////////////////////////////////////////////

function translate(dit, dah) {

  // m.tranlyze.t = {
  //   lang: {
  //     count: {
  //       kr: 0,
  //       en: 0,
  //       jp: 0,
  //       get: function() {
  //         if (this.kr > this.en && this.kr > this.jp) {
  //           m.tranlyze.t.lang.val = "ko";
  //         } else if (this.jp > this.en && this.jp > this.kr) {
  //           m.tranlyze.t.lang.val = "ja";
  //         } else {
  //           m.tranlyze.t.lang.val = "en";
  //         }
  //       }
  //     }
  //   }
  // };

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

    for (var j = 0; j < Object.keys(m.tranlyze.key).length; j++) {
      for (var k = 0; k < m.tranlyze.key[Object.keys(m.tranlyze.key)[j]].length; k++) {
        if (input[i] == m.tranlyze.key[Object.keys(m.tranlyze.key)[j]][k][0]) {
          input[i] = m.tranlyze.key[Object.keys(m.tranlyze.key)[j]][k][1];
          m.tranlyze.t.lang.count[Object.keys(m.tranlyze.key)[j]]++;
          break;
        }
      }
    }
  }

  var output = '';
  for (i = 0; i < v.length; i++) {
    output = output + input[i] + '　';
  }

  output = output.split("·").join(dit + " ");
  output = output.split("–").join(dah + " ");

  m.tranlyze.t.lang.count.get();
  $(".lang_box.code .detected").text(" - " + $.i18n("lang_"+m.tranlyze.t.lang.val));

  $('#output_textarea').text(output);
}

var hangulToJaso_b = function(text) {
  function iSound(a) {
    var r = ((a - parseInt('0xac00', 16)) / 28) / 21;
    var t = String.fromCharCode(r + parseInt('0x1100', 16));
    // if (t == "ᄋ" || t == "ㅇ") t = ""; // 점자체계에선 ㅇ을 생략한다. key 모음에서 처리했다.
    return t;
  }

  function mSound(a) {
    var r = ((a - parseInt('0xac00', 16)) / 28) % 21;
    var t = String.fromCharCode(r + parseInt('0x1161', 16));
    return t;
  }

  function tSound(a) {
    var r = (a - parseInt('0xac00', 16)) % 28;
    if (r == 0) {
      var t = ""
    } else {
      var t = String.fromCharCode(r + parseInt('0x11A8') - 1);
    }
    return t;
  }
  var chars = new Array();
  v = new Array();
  for (var i = 0; i < text.length; i++) {
    chars[i] = text.charCodeAt(i);
    if (chars[i] >= 0xAC00 && chars[i] <= 0xD7A3) {
      v.push(iSound(chars[i]));
      v.push(mSound(chars[i]));
      v.push(tSound(chars[i]));
    } else {
      v.push(String.fromCharCode(chars[i]));
    }
  }
  return v;
};

function translate_b() {

  // m.tranlyze.t = {
  //   lang: {
  //     count: {
  //       kr: 0,
  //       en: 0,
  //       jp: 0,
  //       get: function() {
  //         if (this.kr > this.en && this.kr > this.jp) {
  //           m.tranlyze.t.lang.val = "ko";
  //         } else if (this.jp > this.en && this.jp > this.kr) {
  //           m.tranlyze.t.lang.val = "ja";
  //         } else {
  //           m.tranlyze.t.lang.val = "en";
  //         }
  //       }
  //     }
  //   }
  // };

  var input = hangulToJaso_b($('#input_textarea').val());
  for (var i = 0; i < v.length; i++) {

    if (input[i].charCodeAt() >= 0xFF01 && input[i].charCodeAt() <= 0xFF5E) { // "FF01:！" ~ "FF5E:～"에 속한 글자면 반각기호로
      input[i] = String.fromCharCode(input[i].charCodeAt() - 0xFEE0);
    } else if (input[i].charCodeAt() >= 0x0041 && input[i].charCodeAt() <= 0x005D) { // "FF41:A" ~ "005D:]"에 속한 글자면 소문자로
      input[i] = String.fromCharCode(input[i].charCodeAt() + 0x0020);
    } else if (input[i].charCodeAt() >= 0x3041 && input[i].charCodeAt() <= 0x3096) { // "3041:ぁ" ~ "3096:ゖ"에 속한 글자면 가타카나로
      input[i] = String.fromCharCode(input[i].charCodeAt() + 0x0060);
    }

    for (var j = 0; j < Object.keys(m.tranlyze.key_b).length; j++) {
      for (var k = 0; k < m.tranlyze.key_b[Object.keys(m.tranlyze.key_b)[j]].length; k++) {
        if (input[i] == m.tranlyze.key_b[Object.keys(m.tranlyze.key_b)[j]][k][0]) {
          input[i] = m.tranlyze.key_b[Object.keys(m.tranlyze.key_b)[j]][k][1];

          m.tranlyze.t.lang.count[Object.keys(m.tranlyze.key_b)[j]]++;
          // if (Object.keys(m.tranlyze.key_b)[j] == "kr") {
          //   언어별 분기 처리의 예시
          // }
          break;
        }
      }
    }
  }

  // 언어 인식
  m.tranlyze.t.lang.count.get();
  $(".lang_box.code .detected").text(" - " + $.i18n("lang_"+m.tranlyze.t.lang.val));
  // console.log(m.tranlyze.t.lang.val);

  // 결과 출력
  $('#output_textarea').text(input.join(""));
}
