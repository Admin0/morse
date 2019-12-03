/*******************************************
 * MORSE CODE ANALYZER                     *
 * Original Code by JinH(jinh.tistory.com) *
 *******************************************/

function analyze(lang) {

  var j, k, output = '';
  var text = $('#input_textarea').val();
  var space_char = new RegExp($('#space_char').text(), 'g');
  // var space_string = new RegExp($('#space_string').text() + '|\n|\r', 'g');
  var space_string = new RegExp($('#space_string').text(), 'g');
  text = text.replace(/\n|\r/g, "_///_"); //줄바꿈
  text = text.replace(space_string, "_/_"); //문자열공백
  text = text.replace(space_char, "_"); //문자사이공백
  text = text.replace(/\s/g, ""); //공백 제거
  text = text.replace(/1|－|-|ㅡ/g, "–");
  text = text.replace(/0|ㆍ|\.|\*|`|'/g, "·");

  var input = text.split('_');

  function analyze_sub(key_set) {
    var v = input;
    for (var i = 0; i < v.length; i++) {
      for (var j = 0; j < key_set.length; j++) {
        if (v[i] == key_set[j][1]) {
          v[i] = key_set[j][0];
          break;
        }
      }
    }
    return v;
  }

  /*var input = new Array();
  for (i=0; i<text.length; i++) {
  	input[i] = text.charAt(i);
  } //모스 부호 입력 코드*/

  function assemble() { //한글 음소 결합
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
    output = output.replace(/ㅗㅣ/g, "ㅚ"); //이중모음 조합
    output = output.replace(/ㅜㅣ/g, "ㅟ");
    output = output.replace(/ㅡㅣ/g, "ㅢ");
    output = output.replace(/ㅗㅏ/g, "ㅘ");
    output = output.replace(/ㅜㅓ/g, "ㅝ");
    output = output.replace(/ㅏㅣ/g, "ㅐ");
    output = output.replace(/ㅓㅣ/g, "ㅣ");
    output = output.replace(/ㅑㅣ/g, "ㅒ");
    output = output.replace(/ㅕㅣ/g, "ㅖ");
    output = output.replace(/ㅜㅔ/g, "ㅞ");
    output = output.replace(/ㅗㅐ/g, "ㅙ");
    /*var ChoSeong2 = new Array ( //쌍자음으로 결합 가능한 초성 집합
    	0x3131, 0x3137, 0x3142, 0x3145, 0x3148
    );*/
    for (var i = 0; i < ChoSeong.length; i++) { //쌍자음 조합
      var hangeul = new RegExp(
        String.fromCharCode(ChoSeong[i]) + "{2}(?=[ㅏ-ㅣ])|" +
        String.fromCharCode(ChoSeong[i]) + "{2}(?=[ㄱ-ㅎ][ㅏ-ㅣ])", "g");
      output = output.replace(hangeul, String.fromCharCode(ChoSeong[i + 1]));
      if ((i == 1) || (i == 10)) {
        i++;
      } //[ㄴㄴ->ㄷ], [ㅇㅇ->ㅈ] 방지
      else if (i == 4) {
        i = i + 2;
      } //[ㄹㄹ->ㅁ], [ㅁㅁ->ㅂ] 방지
      else if (i == 13) {
        i = i + 6;
      } //[ㅊㅊ->ㅋ]-[ㅎㅎ->""] 방지
    }
    output = output.replace(/ㄱㅅ(?=[ㄱ-ㅎ])/g, "ㄳ"); //이중종성 조합
    output = output.replace(/ㄴㅎ(?=[ㄱ-ㅎ])/g, "ㄶ");
    output = output.replace(/ㄴㅈ(?=[ㄱ-ㅎ])/g, "ㄵ");
    output = output.replace(/ㄹㄱ(?=[ㄱ-ㅎ])/g, "ㄺ");
    output = output.replace(/ㄹㅁ(?=[ㄱ-ㅎ])/g, "ㄻ");
    output = output.replace(/ㄹㅂ(?=[ㄱ-ㅎ])/g, "ㄼ");
    output = output.replace(/ㄹㅎ(?=[ㄱ-ㅎ])/g, "ㅀ");
    output = output.replace(/ㅂㅅ(?=[ㄱ-ㅎ])/g, "ㅄ");
    for (i = 0; i < JungSeong.length; i++) { //모음 앞에 자음있으면 무조건 결합.
      if (output.indexOf(String.fromCharCode(JungSeong[i])) !== -1) {
        for (j = 0; j < ChoSeong.length; j++) {
          if (output.indexOf(String.fromCharCode(ChoSeong[j])) !== -1) {
            var hangeul = new RegExp(String.fromCharCode(ChoSeong[j]) + String.fromCharCode(JungSeong[i]), 'g');
            output = output.replace(hangeul, String.fromCharCode(j * 21 * 28 + i * 28 + 0xAC00));
          }
        }
      }
    }

    for (i = 0; i < JungSeong.length; i++) { //문자 뒤에 자음이 있으면 받침으로 결합.
      for (j = 0; j < ChoSeong.length; j++) {
        if (output.indexOf(String.fromCharCode(j * 21 * 28 + i * 28 + 0xAC00)) !== -1) {
          for (k = 0; k < JongSeong.length; k++) {
            if (output.indexOf(String.fromCharCode(JongSeong[k])) !== -1) {
              var hangeul = new RegExp(String.fromCharCode(j * 21 * 28 + i * 28 + 0xAC00) + String.fromCharCode(JongSeong[k]), 'g');
              output = output.replace(hangeul, String.fromCharCode(j * 21 * 28 + i * 28 + k + 0xAC00));
            }
          }
        }
      }
    }
  }

  if (lang == LANG_KO) {
    input = analyze_sub(key.kr);
    text = "";
    for (var i = 0; i < input.length; i++) {
      text = text + input[i];
    }
    assemble();
  } else if (lang == LANG_EN) {
    input = analyze_sub(key.en);
  } else if (lang == LANG_JA) {
    input = analyze_sub(key.jp);
  } else if (lang == LANG_RU) {
    input = analyze_sub(key.ru);
  } else if (lang == LANG_GR) {
    input = analyze_sub(key.gr);
  } else if (lang == LANG_TH) {
    input = analyze_sub(key.th);
  } else if (lang == LANG_HE) {
    input = analyze_sub(key.he);
  } else if (lang == LANG_AR) {
    input = analyze_sub(key.ar);
  } else if (lang == LANG_PR) {
    input = analyze_sub(key.pr);
  }
  input = analyze_sub(key.nm);

  //변환 코드
  //output = '<div>문자열공백:[' + $('#space_string').val() + '] 문자공백:[' + $('#space_char').val() + ']으로 해독.</div>';
  for (var i = 0; i < input.length; i++) {
    output = output + input[i] + '';
  }
  if (lang == LANG_KO && $('#kr_assemble').prop("checked")) {
    assemble();
  }

  output = $('#en_capital').prop("checked") ? output.toUpperCase() : output.toLowerCase();

  output = output
    .replace(/\/\/\//g, '\n')
    .replace(/\//g, " ");

  return output;
}
