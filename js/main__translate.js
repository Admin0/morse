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
      morse: 0,
      braille: 0,
      get: function() {
        if (this.morse > this.en && this.morse > this.jp && this.morse > this.kr) {
          m.tranlyze.t.lang.val = "morse";
          if (this.morse >= 10 && this.morse / (this.en + this.jp + this.kr + 1) >= 3) {
            console.log("ERROR: morse2morse");
            m.toggle.code(CODE_MORSE);
            m.toggle.mode();
            tranlyze(ANALYZE_MODE);
            toast($.i18n('output_error__translate_to_morse'), "autorenew");
          }
        } else if (this.braille > this.en && this.braille > this.jp && this.braille > this.kr) {
          m.tranlyze.t.lang.val = "braille";
          if (this.braille >= 10 && this.braille / (this.en + this.jp + this.kr + 1) >= 3) {
            m.toggle.code(CODE_BRAILLE);
            m.toggle.mode();
            tranlyze(ANALYZE_MODE);
          }
        } else if (this.kr > this.en && this.kr > this.jp) {
          m.tranlyze.t.lang.val = "ko";
          m.type.lang = LANG_KO;
        } else if (this.jp > this.en && this.jp > this.kr) {
          m.tranlyze.t.lang.val = "ja";
          m.type.lang = LANG_JA;
        } else if (this.en == 0) {
          m.tranlyze.t.lang.val = "";
        } else {
          m.tranlyze.t.lang.val = "en";
          m.type.lang = LANG_EN;
        }
        // console.log(this); // 감지 언어 로그
      },
      reset: function() {
        this.kr = 0;
        this.jp = 0;
        this.en = 0;
        this.morse = 0;
        this.braille = 0;
      },
      m2m: function(char) {
        if (char.match(/[·–1－\-ㅡ_0ㆍ\.\*`']/) != null) { // morse2morse check
          this.morse++;
          // console.log(input[i]);
        }
        if (char.match(/[⠁-⣿]/) != null) { // braille2morse check
          this.braille++;
          // console.log(input[i]);
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

function translate(dit, dah) {

  var input = hangulToJaso($('#input_textarea').val());
  /*		var input = new Array();
  	for (i=0; i<$('#input_textarea').value.length; i++) {
  		input[i] = $('#input_textarea').value.charAt(i);
  	} */ //한글 입력 코드

  m.tranlyze.t.lang.count.reset();
  for (var i = 0; i < v.length; i++) {

    // 일본어 번환
    if (input[i].charCodeAt() >= 0xFF01 && input[i].charCodeAt() <= 0xFF5E) { // "FF01:！" ~ "FF5E:～"에 속한 글자면 반각기호로
      input[i] = String.fromCharCode(input[i].charCodeAt() - 0xFEE0);
    } else if (input[i].charCodeAt() >= 0x0041 && input[i].charCodeAt() <= 0x005D) { // "FF41:A" ~ "005D:]"에 속한 글자면 소문자로
      input[i] = String.fromCharCode(input[i].charCodeAt() + 0x0020);
    } else if (input[i].charCodeAt() >= 0x3041 && input[i].charCodeAt() <= 0x3096) { // "3041:ぁ" ~ "3096:ゖ"에 속한 글자면 가타카나로
      input[i] = String.fromCharCode(input[i].charCodeAt() + 0x0060);
    }

    m.tranlyze.t.lang.count.m2m(input[i]); // morse2morse check

    // 언어 인식
    for (var j = 0; j < Object.keys(m.tranlyze.key).length; j++) {
      for (var k = 0; k < m.tranlyze.key[Object.keys(m.tranlyze.key)[j]].length; k++) {
        if (input[i] == m.tranlyze.key[Object.keys(m.tranlyze.key)[j]][k][0]) {
          input[i] = m.tranlyze.key[Object.keys(m.tranlyze.key)[j]][k][1].replace(/·/g, dit + " ").replace(/–/g, dah + " ");
          m.tranlyze.t.lang.count[Object.keys(m.tranlyze.key)[j]]++;
          // console.log(m.tranlyze.key[Object.keys(m.tranlyze.key)[j]][k][0]); // a
          // console.log(input[i]); // ·–
          // console.log(Object.keys(m.tranlyze.key)[j]); // en
          break;
        }
      }
    }
    // console.log(m.tranlyze.t.lang.count);
  }

  var output = '';
  for (i = 0; i < v.length; i++) {
    output = output + input[i] + '　';
  }

  // output = output
  // .replace(/(?!　)(.)/g, "$1 ")
  // .replace(/·/g, dit + " ")
  // .replace(/–/g, dah);
  // output = output.split("·").join(dit + " ");
  // output = output.split("–").join(dah + " ");

  $('#output_textarea').text(output);

  m.tranlyze.t.lang.count.get(); // 언어 인식 코드인데, 결과 출력 다음에 와야한다. 일단은.
  if (!!m.tranlyze.t.lang.val) {
    $(".lang_box.code .detected").attr("data-i18n", "lang_" + m.tranlyze.t.lang.val).text($.i18n("lang_" + m.tranlyze.t.lang.val)).addClass("on");
  } else {
    $(".lang_box.code .detected").removeClass("on");
  }

}



///////////////////////////////////////////////
// 한글, 영어, 일어 <--> 점자 변환              //
// Orignal Code by JinH(jinh.kr)             //
///////////////////////////////////////////////

var hangulToJaso_b = function(text) { // 조합형 음소 유니코드로 쪼갠다 종성이 없어도 ""를 포함한 3개로 쪼개짐.
  function iSound(a) {
    var r = ((a - parseInt('0xac00', 16)) / 28) / 21;
    var t = String.fromCharCode(r + parseInt('0x1100', 16));
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
      if (tSound(chars[i]) != "") v.push(tSound(chars[i]));
    } else {
      v.push(String.fromCharCode(chars[i]));
    }
  }
  return v;
};

function translate_b() {

  var input = hangulToJaso_b($('#input_textarea').val());
  m.tranlyze.t.lang.count.reset();
  for (var i = 0; i < v.length; i++) {

    if (input[i].charCodeAt() >= 0xFF01 && input[i].charCodeAt() <= 0xFF5E) { // "FF01:！" ~ "FF5E:～"에 속한 글자면 반각기호로
      input[i] = String.fromCharCode(input[i].charCodeAt() - 0xFEE0);
    } else if (input[i].charCodeAt() >= 0x0041 && input[i].charCodeAt() <= 0x005D) { // "FF41:A" ~ "005D:]"에 속한 글자면 소문자로
      input[i] = String.fromCharCode(input[i].charCodeAt() + 0x0020);
    } else if (input[i].charCodeAt() >= 0x3041 && input[i].charCodeAt() <= 0x3096) { // "3041:ぁ" ~ "3096:ゖ"에 속한 글자면 가타카나로
      input[i] = String.fromCharCode(input[i].charCodeAt() + 0x0060);
    }

    m.tranlyze.t.lang.count.m2m(input[i]); // morse2morse check

    for (var j = 0; j < Object.keys(m.tranlyze.key_b).length; j++) {
      for (var k = 0; k < m.tranlyze.key_b[Object.keys(m.tranlyze.key_b)[j]].length; k++) {
        if (Object.keys(m.tranlyze.key_b)[j] == "en2") {
          if (localStorage.s_braille_en_grade2 != "true") {
            break;
          } else if (input[i] == m.tranlyze.key_b.en2[k][0][0]) {
            // console.log([input[i], input[i] == m.tranlyze.key_b.en2[k][0][0]]);
            if (m.tranlyze.key_b.en2[k][0].length == 4 && input[i + 1] == m.tranlyze.key_b.en2[k][0][1] && input[i + 2] == m.tranlyze.key_b.en2[k][0][2] && input[i + 3] == m.tranlyze.key_b.en2[k][0][3]) { // grade2 tetra-
              // console.log(["네 글자 약자: ", input[i], input[i + 1], input[i + 2], input[i + 3]]);
              input[i] = m.tranlyze.key_b.en2[k][1];
              input[i + 1] = "";
              input[i + 2] = "";
              input[i + 3] = "";
              break;
            } else if (m.tranlyze.key_b.en2[k][0].length == 3 && input[i + 1] == m.tranlyze.key_b.en2[k][0][1] && input[i + 2] == m.tranlyze.key_b.en2[k][0][2]) { // grade2 tri-
              // console.log(["세 글자 약자: ", input[i], input[i + 1], input[i + 2]]);
              input[i] = m.tranlyze.key_b.en2[k][1];
              input[i + 1] = "";
              input[i + 2] = "";
              break;
            } else if (m.tranlyze.key_b.en2[k][0].length == 2 && input[i + 1] == m.tranlyze.key_b.en2[k][0][1]) { // grade2 di-
              // console.log(["두 글자 약자: ", input[i], input[i + 1]]);
              input[i] = m.tranlyze.key_b.en2[k][1];
              input[i + 1] = "";
              break;
            }
          }
        } else if (Object.keys(m.tranlyze.key_b)[j] == "en") {

        } else if (Object.keys(m.tranlyze.key_b)[j] == "kr") { // 한글 예외 항목
          // console.log(input);
          if (input[i] == m.tranlyze.key_b.kr[k][0][0]) {
            if (m.tranlyze.key_b.kr[k][0].length == 8 && input[i + 1] == m.tranlyze.key_b.kr[k][0][1] && input[i + 2] == m.tranlyze.key_b.kr[k][0][2] && input[i + 3] == m.tranlyze.key_b.kr[k][0][3] && input[i + 4] == m.tranlyze.key_b.kr[k][0][4] && input[i + 5] == m.tranlyze.key_b.kr[k][0][5] && input[i + 6] == m.tranlyze.key_b.kr[k][0][6] && input[i + 7] == m.tranlyze.key_b.kr[k][0][7]) { // 한글약자 8글자(그러므로) 등
              // console.log("여덟 글자 약자: " + input[i] + '/' + input[i + 1] + '/' + input[i + 2]);
              input[i] = m.tranlyze.key_b.kr[k][1];
              input[i + 1] = "";
              input[i + 2] = "";
              input[i + 3] = "";
              input[i + 4] = "";
              input[i + 5] = "";
              input[i + 6] = "";
              input[i + 7] = "";
              break;
            } else if (m.tranlyze.key_b.kr[k][0].length == 7 && input[i + 1] == m.tranlyze.key_b.kr[k][0][1] && input[i + 2] == m.tranlyze.key_b.kr[k][0][2] && input[i + 3] == m.tranlyze.key_b.kr[k][0][3] && input[i + 4] == m.tranlyze.key_b.kr[k][0][4] && input[i + 5] == m.tranlyze.key_b.kr[k][0][5] && input[i + 6] == m.tranlyze.key_b.kr[k][0][6]) { // 한글약자 7글자(그런데 등)
              // console.log("일곱 글자 약자: " + input[i] + '/' + input[i + 1] + '/' + input[i + 2]);
              input[i] = m.tranlyze.key_b.kr[k][1];
              input[i + 1] = "";
              input[i + 2] = "";
              input[i + 3] = "";
              input[i + 4] = "";
              input[i + 5] = "";
              input[i + 6] = "";
              break;
            } else if (m.tranlyze.key_b.kr[k][0].length == 6 && input[i + 1] == m.tranlyze.key_b.kr[k][0][1] && input[i + 2] == m.tranlyze.key_b.kr[k][0][2] && input[i + 3] == m.tranlyze.key_b.kr[k][0][3] && input[i + 4] == m.tranlyze.key_b.kr[k][0][4] && input[i + 5] == m.tranlyze.key_b.kr[k][0][5]) { // 한글약자  6글자(그래서) 등
              // console.log([m.tranlyze.key_b.kr[k][0], input[i], input[i + 1], input[i + 2], input[i + 3], input[i + 4], input[i + 5], input[i + 6], input[i + 7], input[i + 8]]);
              // console.log(input);
              input[i] = m.tranlyze.key_b.kr[k][1];
              input[i + 1] = "";
              input[i + 2] = "";
              input[i + 1] = "";
              input[i + 2] = "";
              input[i + 3] = "";
              input[i + 4] = "";
              input[i + 5] = "";
              break;
            } else if (m.tranlyze.key_b.kr[k][0].length == 3 && input[i + 1] == m.tranlyze.key_b.kr[k][0][1] && input[i + 2] == m.tranlyze.key_b.kr[k][0][2]) { // 한글 약자 ("것")
              // console.log("세 글자 약자: "+input[i] + '/' + input[i + 1] + '/' + input[i + 2]);
              input[i] = m.tranlyze.key_b.kr[k][1];
              input[i + 1] = "";
              input[i + 2] = "";
              break;
            } else if (m.tranlyze.key_b.kr[k][0].length == 2 && input[i + 1] == m.tranlyze.key_b.kr[k][0][1]) { // 한글 약자 (음소조합까지만 구현)
              // console.log("두 글자 약자: "+input[i] + '/' + input[i + 1]);
              input[i] = m.tranlyze.key_b.kr[k][1];
              input[i + 1] = "";
              break;
            } else if (input[i].match(/[ᄉᄊᄌᄍᄎ]/) && input[i + 2] == "ᆼ") { // ["성", "⠠⠻"], ["썽", "⠠⠠⠻"], ["정", "⠨⠻"], ["쩡", "⠠⠨⠻"], ["청", "⠰⠻"],
              // console.log("세 글자 약자: "+input[i] + '/' + input[i + 1] + '/' + input[i + 2]);
              if (input[i + 1] == "ᅥ") {
                input[i + 1] = "⠻";
                input[i + 2] = "";
              } else if (input[i + 1] == "ᅧ") {
                input[i + 1] = "⠱";
              }
            }
          } else if (input[i].match(/[ᅡ-ᅵ]/) != null && input[i + 1] == "" && input[i + 2] == "ᄋ" && input[i + 3] == "ᅨ") { // 모음 뒤에 ㅖ 올 때 붙임표. 붙임표를 넣지 않으면 ㅆ 받침과 헷갈릴 수 있기 때문이다.
            console.log("모음 뒤에 ㅖ: " + input[i] + '/' + input[i + 1]);
            input[i + 1] = "⠤";
          } else if (input[i].match(/[ᅣᅪᅮᅯ]/) != null && input[i + 1] == "" && input[i + 2] == "ᄋ" && input[i + 3] == "ᅢ") { // 모음 ㅑ, ㅘ, ㅜ, ㅝ 뒤에 '애'가 올 때 붙임표. 붙임표를 넣지 않으면 ㅒ/ㅙ/ㅟ/ㅞ와 헷갈릴 수 있기 때문이다.
            console.log("ㅑㅘㅜㅝ 뒤에 애: " + input[i] + '/' + input[i + 1]);
            input[i + 1] = "⠤";
          } else if (input[i].match(/[ᄂ-ᄄᄆ-ᄇᄊᄌᄍᄏ-ᄒ]/) != null && input[i + 1] == "ᅡ" && input[i + 3] != "ᄋ") { // 모음 ㅏ 붙을 때 생략. '나', '다', '마', '바', '자', '카', '타', '파', '하' 다음에 모음이 올 경우는 혼동의 우려가 있으므로 약자로 쓰지 않는다.
            if (input[i] != "ᄑ" || input[i + 1] != "ᅡ" || input[i + 2] != "ᆻ") // '팠'을 쓸 때는 ㅏ를 생략하지 않는다. ㅏ를 생략하면 '폐'로 잘못 읽을 수 있기 때문이다.
              input[i + 1] = "";
          } else if (input[i].match(/[ᄋ]/)) { // 초성 ㅇ 생략.
            input[i] = "";
          }
        }

        if (input[i] == m.tranlyze.key_b[Object.keys(m.tranlyze.key_b)[j]][k][0]) {
          input[i] = m.tranlyze.key_b[Object.keys(m.tranlyze.key_b)[j]][k][1]; // main translation
          m.tranlyze.t.lang.count[Object.keys(m.tranlyze.key_b)[j]]++; // add counter
          break;
        }
      }
    }
  }

  // 결과 출력
  $('#output_textarea').text(input.join(""));

  // 언어 인식
  m.tranlyze.t.lang.count.get();
  if (!!m.tranlyze.t.lang.val) {
    $(".lang_box.code .detected").attr("data-i18n", "lang_" + m.tranlyze.t.lang.val).text($.i18n("lang_" + m.tranlyze.t.lang.val)).addClass("on");
  } else {
    $(".lang_box.code .detected").removeClass("on");
  }
}
