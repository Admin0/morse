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

  function assemble_kr() { //한글 음소 결합
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
    output = output.replace(/ㅗㅣ/g, "ㅚ"); //이중모음 조합
    output = output.replace(/ㅜㅣ/g, "ㅟ");
    output = output.replace(/ㅡㅣ/g, "ㅢ");
    output = output.replace(/ㅗㅏ/g, "ㅘ");
    output = output.replace(/ㅜㅓ/g, "ㅝ");
    output = output.replace(/ㅏㅣ/g, "ㅐ");
    output = output.replace(/ㅓㅣ/g, "ㅔ");
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
    input = analyze_sub(m.tranlyze.key.kr);
    text = "";
    for (var i = 0; i < input.length; i++) {
      text = text + input[i];
    }
  } else if (lang == LANG_EN) {
    input = analyze_sub(m.tranlyze.key.en);
  } else if (lang == LANG_JA) {
    input = analyze_sub(m.tranlyze.key.jp);
  } else if (lang == LANG_RU) {
    input = analyze_sub(m.tranlyze.key.ru);
  } else if (lang == LANG_GR) {
    input = analyze_sub(m.tranlyze.key.gr);
  } else if (lang == LANG_TH) {
    input = analyze_sub(m.tranlyze.key.th);
  } else if (lang == LANG_HE) {
    input = analyze_sub(m.tranlyze.key.he);
  } else if (lang == LANG_AR) {
    input = analyze_sub(m.tranlyze.key.ar);
  } else if (lang == LANG_PR) {
    input = analyze_sub(m.tranlyze.key.pr);
  }
  input = analyze_sub(m.tranlyze.key.nm);

  //변환 코드
  //output = '<div>문자열공백:[' + $('#space_string').val() + '] 문자공백:[' + $('#space_char').val() + ']으로 해독.</div>';
  // for (var i = 0; i < input.length; i++) {
  //   output = output + input[i] + '';
  // }
  output = input.join("");

  if (lang == LANG_KO && $('#kr_assemble').prop("checked")) {
    assemble_kr();
  }
  if (lang == LANG_JA) {
    output = improve_jp(output);
    output = hiragana_jp(output);
    output = assemble_jp(output);
  }
  if (lang == LANG_EN) {
    output = $('#en_capital').prop("checked") ? output.toUpperCase() : output.toLowerCase();
  }

  output = output
    .replace(/\/\/\//g, '\n')
    .replace(/\//g, " ");

  return output;
}

function hiragana_jp(input) {
  var output = input.split("");
  for (var i = 0; i < output.length; i++) {
    if (output[i].match(new RegExp("[\u30a1-\u30f6]")) != null) { //ァ-ヶ
      output[i] = String.fromCharCode(output[i].charCodeAt(0) - 0x0060);
    }
  }
  return output.join("");
}

function improve_jp(input) {
  var text = input;
  text = text.replace(new RegExp("(?<=[ア-ヿ])[ツ](?=[ア-ヿ])(?!([ア-ヿ][\u3099])|[ア-オヤユヨ]|\s)"), "ッ"); //촉음
  text = text //요음
    .replace(new RegExp("(?<=([キシチニヒミリ])|([キシチヒ][\u3099]))[ヤ]"), "ャ")
    .replace(new RegExp("(?<=([キシチニヒミリ])|([キシチヒ][\u3099]))[ユ]"), "ュ")
    .replace(new RegExp("(?<=([キシチニヒミリ])|([キシチヒ][\u3099]))[ヨ]"), "ョ");
  return text;
}

function assemble_jp(input) { //why assemble? : 정작 일본어 환경에서 u3099이 병신이 되는 문제가 발생하기 때문
  const Dakuten = new Array(
    0x304B, 0x304D, 0x304F, 0x3051, 0x3053, //히라가나 카키쿠케코
    0x3055, 0x3057, 0x3059, 0x305B, 0x305D, //히라가나 사
    0x305F, 0x3061, 0x3063, 0x3066, 0x3068, //히라가나 타
    0x306F, 0x3072, 0x3075, 0x3078, 0x307B, //히라가나 하
    0x30AB, 0x30AD, 0x30AF, 0x30B1, 0x30B3, //카타카나 카키쿠케코
    0x30B5, 0x30B7, 0x30B9, 0x30BB, 0x30BD, //카타카나 사
    0x30BF, 0x30C1, 0x30C3, 0x30C6, 0x30C8, //카타카나 타
    0x30CF, 0x30D2, 0x30D5, 0x30D8, 0x30DB, //카타카나 하
    0x309E, 0x30FD //나머지}
  );
  const Handakuten = new Array(
    0x306F, 0x3072, 0x3075, 0x3078, 0x307B, //히라가나 하히후헤호
    0x30CF, 0x30D2, 0x30D5, 0x30D8, 0x30DB //카타카나 하히후헤호
  );

  var text = input;
  text = text
    .replace(new RegExp("[ウ][゛\u3099]"), "ヴ")
    .replace(new RegExp("[ワ][゛\u3099]"), "ヷ")
    .replace(new RegExp("[ヰ][゛\u3099]"), "ヸ")
    .replace(new RegExp("[ヱ][゛\u3099]"), "ヹ")
    .replace(new RegExp("[ヲ][゛\u3099]"), "ヺ");
  Dakuten.forEach( //탁점
    function(item, index) {
      text = text.replace(new RegExp(String.fromCharCode(item) + "[゛\u3099]"), String.fromCharCode(item + 0x0001));
    });
  Handakuten.forEach( //반탁점
    function(item, index) {
      text = text.replace(new RegExp(String.fromCharCode(item) + "[゜\u309A]"), String.fromCharCode(item + 0x0002));
    });
  return text;
}


// BRAILLE

function analyze_b(lang) {
  var j, k, output = '';
  var text = $('#input_textarea').val();
  var space_char = new RegExp($('#space_char').text(), 'g');
  // var space_string = new RegExp($('#space_string').text() + '|\n|\r', 'g');
  var space_string = new RegExp($('#space_string').text(), 'g');
  text = text.replace(/\n|\r/g, "_///_"); //줄바꿈
  // text = text.replace(space_string, "_/_"); //문자열공백
  // text = text.replace(space_char, "_"); //문자사이공백
  // text = text.replace(/\s/g, ""); //공백 제거
  // text = text.replace(/1|－|-|ㅡ/g, "–");
  // text = text.replace(/0|ㆍ|\.|\*|`|'/g, "·");

  var input = text.split('');

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

  function assemble() {
    output = output
      .replace(/⠀/g, " ") // 문장부호
      .replace(/ᇁ\s/g, ". ")
      .replace(/ᇁ$/g, ". ")
      .replace(/ᄉᇀ/g, "\'")
      .replace(/ᇂᆺ/g, "\'")
      .replace(/🔢ᄒ/g, "0") // 숫자
      .replace(/🔢ᄀ/g, "1")
      .replace(/🔢ᄇ/g, "2")
      .replace(/🔢ᄂ/g, "3")
      .replace(/🔢ㅍ/g, "4")
      .replace(/🔢ᄆ/g, "5")
      .replace(/🔢ᄏ/g, "6")
      .replace(/🔢ᄋ/g, "7")
      .replace(/🔢ᅮ/g, "8")
      .replace(/🔢ᄃ/g, "9")
      .replace(/ᅮᅢ/g, "ᅱ") // 이중모음
      .replace(/ᅣᅢ/g, "ᅤ")
      .replace(/ᅯᅢ/g, "ᅰ")
      .replace(/ᅪᅢ/g, "ᅫ")
      .replace(/ᄉᄀ/g, "ᄁ") // 된소리 초성
      .replace(/ᄉᄃ/g, "ᄄ")
      .replace(/ᄉᄇ/g, "ᄈ")
      .replace(/ᄉᄉ/g, "ᄊ")
      .replace(/ᄉᄌ/g, "ᄍ")
      .replace(/ᆨᆨ/g, "ᆩ") // 받침 조합
      .replace(/ᆨᆺ/g, "ᆪ")
      .replace(/ᆫᆽ/g, "ᆬ")
      .replace(/ᆫᇂ/g, "ᆭ")
      .replace(/ᆯᆨ/g, "ᆰ")
      .replace(/ᆯᆷ/g, "ᆱ")
      .replace(/ᆯᆸ/g, "ᆲ")
      .replace(/ᆯᆺ/g, "ᆳ")
      .replace(/ᆯᇀ/g, "ᆴ")
      .replace(/ᆯᇁ/g, "ᆵ")
      .replace(/ᆯᇂ/g, "ᆶ")
      .replace(/ᆸᆺ/g, "ᆹ")
      .replace(/ᆺᆺ/g, "ᆻ")
      .replace(/([\u1161-\u11A7])ᅨ/g, "$1ᆻ")
      .replace(/([\u1100-\u115E])(?=[^\u1161-\u11A7])/g, "$1ᅡ") // ㅏ 생략된거 복원
      .replace(/(?<=[^\u1100-\u115E])([\u1161-\u11A7])/g, "ᄋ$1") // 초성 없는거에 ㅇ 붙임
      .replace(/(^[\u1161-\u11A7])/g, "ᄋ$1") // 중성 먼저 시작하면 ㅇ 붙임
      .replace(/([ᄉᄊᄌᄍᄎ])ᅧ/g, "$1ᅥ") // 경우에 따라 ㅕ, ㅓ 변환
      .replace(/([\u1161-\u11A7])ᅨ/g, "$1ᆻ"); // 쌍시옷 받침 약자
  }

  if (lang == LANG_KO) {
    input = analyze_sub(m.tranlyze.key_b.kr);
  } else if (lang == LANG_EN) {
    input = analyze_sub(m.tranlyze.key_b.en);
  } else if (lang == LANG_JA) {
    input = analyze_sub(m.tranlyze.key_b.jp);
  }
  input = analyze_sub(m.tranlyze.key_b.nm);

  output = input.join("")
    .replace(/\/\/\//g, '\n')
    .replace(/\//g, " ");

  if (lang == LANG_KO) assemble()
  
  if (lang == LANG_JA) {
    output = improve_jp(output);
    output = hiragana_jp(output);
    output = assemble_jp(output);
  }

  $(".lang_box.code .detected").text("");
  return output;
}
