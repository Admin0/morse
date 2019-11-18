/*******************************************
 * MORSE CODE TRANSLATOR                   *
 * Original Code by JinH(jinh.tistory.com) *
 *******************************************/

var hangulToJaso = function (text) {
	var ChoSeong = new Array ( 
		0x3131, 0x3132, 0x3134, 0x3137, 0x3138, 0x3139, 
		0x3141, 0x3142, 0x3143, 0x3145, 0x3146, 0x3147, 
		0x3148, 0x3149, 0x314a, 0x314b, 0x314c, 0x314d, 0x314e 
	);
	var JungSeong = new Array ( 
		0x314f, 0x3150, 0x3151, 0x3152, 0x3153, 0x3154, 
		0x3155, 0x3156, 0x3157, 0x3158, 0x3159, 0x315a, 
		0x315b, 0x315c, 0x315d, 0x315e, 0x315f, 0x3160, 
		0x3161, 0x3162, 0x3163 
	);
	var JongSeong = new Array ( 
		0x0000, 0x3131, 0x3132, 0x3133, 0x3134,0x3135, 
		0x3136, 0x3137, 0x3139, 0x313a, 0x313b, 0x313c, 
		0x313d, 0x313e, 0x313f, 0x3140, 0x3141, 0x3142, 
		0x3144, 0x3145, 0x3146, 0x3147, 0x3148, 0x314a, 
		0x314b, 0x314c, 0x314d, 0x314e 
	);
	var chars = new Array();
	/*var*/ v = new Array(); //전역 함수로 만들어 버립시당.  아 나도 빨리 전역하고 싶당 ㅠㅠ
	for (var i = 0; i < text.length; i++) 
	{
		chars[i] = text.charCodeAt(i);
		if (chars[i] >= 0xAC00 && chars[i] <= 0xD7A3) 
		{
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
		}
		else {
			v.push(String.fromCharCode(chars[i] ));
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
	for (var i=0; i<v.length; i++) {
		if (input[i] == 'ㄱ') {//자음
			input[i] = ' · – · ·';
		}else if (input[i] == 'ㄲ') {
			input[i] = ' · – · ·　 · – · ·';
		}else if (input[i] == 'ㄳ') {
			input[i] = ' · – · ·　 – – ·';
		}else if (input[i] == 'ㄴ') {
			input[i] = ' · · – ·';
		}else if (input[i] == 'ㄵ') {
			input[i] = ' · · – ·　 · – – ·';
		}else if (input[i] == 'ㄶ') {
			input[i] = ' · · – ·　 · – – –';
		}else if (input[i] == 'ㄷ') {
			input[i] = ' – · · ·';
		}else if (input[i] == 'ㄸ') {
			input[i] = ' – · · ·　 – · · ·';
		}else if (input[i] == 'ㄹ') {
			input[i] = ' · · · –';
		}else if (input[i] == 'ㄺ') {
			input[i] = ' · · · –　 · – · ·';
		}else if (input[i] == 'ㄻ') {
			input[i] = ' · · · –　 – –';
		}else if (input[i] == 'ㄼ') {
			input[i] = ' · · · –　 · – –';
		}else if (input[i] == 'ㄽ') {
			input[i] = ' · · · –　 – – ·';
		}else if (input[i] == 'ㄾ') {
			input[i] = ' · · · –　 – – · ·';
		}else if (input[i] == 'ㄿ') {
			input[i] = ' · · · –　 – – –';
		}else if (input[i] == 'ㅀ') {
			input[i] = ' · · · –　 · – – –';
		}else if (input[i] == 'ㅁ') {
			input[i] = ' – –';
		}else if (input[i] == 'ㅂ') {
			input[i] = ' · – –';
		}else if (input[i] == 'ㅃ') {
			input[i] = ' · – –　 · – –';
		}else if (input[i] == 'ㅄ') {
			input[i] = ' · – –　 – – ·';
		}else if (input[i] == 'ㅅ') {
			input[i] = ' – – ·';
		}else if (input[i] == 'ㅆ') {
			input[i] = ' – – ·　 – – ·';
		}else if (input[i] == 'ㅇ') {
			input[i] = ' – · –';
		}else if (input[i] == 'ㅈ') {
			input[i] = ' · – – ·';
		}else if (input[i] == 'ㅉ') {
			input[i] = ' · – – ·　 · – – ·';
		}else if (input[i] == 'ㅊ') {
			input[i] = ' – · – ·';
		}else if (input[i] == 'ㅋ') {
			input[i] = ' – · · –';
		}else if (input[i] == 'ㅌ') {
			input[i] = ' – – · ·';
		}else if (input[i] == 'ㅍ') {
			input[i] = ' – – –';
		}else if (input[i] == 'ㅎ') {
			input[i] = ' · – – –';
		}else if (input[i] == 'ㅏ') {//모음
			input[i] = ' ·';
		}else if (input[i] == 'ㅐ') {
			input[i] = ' – – · –';
		}else if (input[i] == 'ㅑ') {
			input[i] = ' · ·';
		}else if (input[i] == 'ㅒ') {
			input[i] = ' · ·  · · –';
		}else if (input[i] == 'ㅓ') {
			input[i] = ' –';
		}else if (input[i] == 'ㅔ') {
			input[i] = ' – · – –';
		}else if (input[i] == 'ㅕ') {
			input[i] = ' · · ·';
		}else if (input[i] == 'ㅖ') {
			input[i] = ' · · ·　 · · –';
		}else if (input[i] == 'ㅗ') {
			input[i] = ' · –';
		}else if (input[i] == 'ㅘ') {
			input[i] = ' · –　 ·';
		}else if (input[i] == 'ㅙ') {
			input[i] = ' · –　 – – · –';
		}else if (input[i] == 'ㅚ') {
			input[i] = ' · –　 · · –';
		}else if (input[i] == 'ㅛ') {
			input[i] = ' – ·';
		}else if (input[i] == 'ㅜ') {
			input[i] = ' · · · ·';
		}else if (input[i] == 'ㅝ') {
			input[i] = ' · · · ·　 –';
		}else if (input[i] == 'ㅞ') {
			input[i] = ' · · · ·　 – · – –';
		}else if (input[i] == 'ㅟ') {
			input[i] = ' · · · ·　 · · –';
		}else if (input[i] == 'ㅠ') {
			input[i] = ' · – ·';
		}else if (input[i] == 'ㅡ') {
			input[i] = ' – · ·';
		}else if (input[i] == 'ㅢ') {
			input[i] = ' – · ·　 · · –';
		}else if (input[i] == 'ㅣ') {
			input[i] = ' · · –';
		}else if (input[i] == '0') {//숫자
			input[i] = ' – – – – –';
		}else if (input[i] == '1') {
			input[i] = ' · – – – –';
		}else if (input[i] == '2') {
			input[i] = ' · · – – –';
		}else if (input[i] == '3') {
			input[i] = ' · · · – –';
		}else if (input[i] == '4') {
			input[i] = ' · · · · –';
		}else if (input[i] == '5') {
			input[i] = ' · · · · ·';
		}else if (input[i] == '6') {
			input[i] = ' – · · · ·';
		}else if (input[i] == '7') {
			input[i] = ' – – · · ·';
		}else if (input[i] == '8') {
			input[i] = ' – – – · ·';
		}else if (input[i] == '9') {
			input[i] = ' – – – – ·';
		}else if ((input[i] == 'A')||(input[i] == 'a')) {//로마자
			input[i] = ' · –';
		}else if ((input[i] == 'B')||(input[i] == 'b')) {
			input[i] = ' – · · ·';
		}else if ((input[i] == 'C')||(input[i] == 'c')) {
			input[i] = ' – · – ·';
		}else if ((input[i] == 'D')||(input[i] == 'd')) {
			input[i] = ' – · ·';
		}else if ((input[i] == 'E')||(input[i] == 'e')) {
			input[i] = ' ·';
		}else if ((input[i] == 'F')||(input[i] == 'f')) {
			input[i] = ' · · – ·';
		}else if ((input[i] == 'G')||(input[i] == 'g')) {
			input[i] = ' – – ·';
		}else if ((input[i] == 'H')||(input[i] == 'h')) {
			input[i] = ' · · · ·';
		}else if ((input[i] == 'I')||(input[i] == 'i')) {
			input[i] = ' · ·';
		}else if ((input[i] == 'J')||(input[i] == 'j')) {
			input[i] = ' · – – –';
		}else if ((input[i] == 'K')||(input[i] == 'k')) {
			input[i] = ' – · –';
		}else if ((input[i] == 'L')||(input[i] == 'l')) {
			input[i] = ' · – · ·';
		}else if ((input[i] == 'M')||(input[i] == 'm')) {
			input[i] = ' – –';
		}else if ((input[i] == 'N')||(input[i] == 'n')) {
			input[i] = ' – ·';
		}else if ((input[i] == 'O')||(input[i] == 'o')) {
			input[i] = ' – – –';
		}else if ((input[i] == 'P')||(input[i] == 'p')) {
			input[i] = ' · – – ·';
		}else if ((input[i] == 'Q')||(input[i] == 'q')) {
			input[i] = ' – – · –';
		}else if ((input[i] == 'R')||(input[i] == 'r')) {
			input[i] = ' · – ·';
		}else if ((input[i] == 'S')||(input[i] == 's')) {
			input[i] = ' · · ·';
		}else if ((input[i] == 'T')||(input[i] == 't')) {
			input[i] = ' –';
		}else if ((input[i] == 'U')||(input[i] == 'u')) {
			input[i] = ' · · –';
		}else if ((input[i] == 'V')||(input[i] == 'v')) {
			input[i] = ' · · · –';
		}else if ((input[i] == 'W')||(input[i] == 'w')) {
			input[i] = ' · – –';
		}else if ((input[i] == 'X')||(input[i] == 'x')) {
			input[i] = ' – · · –';
		}else if ((input[i] == 'Y')||(input[i] == 'y')) {
			input[i] = ' – · – –';
		}else if ((input[i] == 'Z')||(input[i] == 'z')) {
			input[i] = ' – – · ·';
		}else if (input[i] == ' ') {//기호
			input[i] = '　';
		}else if (input[i] == '.') {
			input[i] = ' · – · – · –';
		}else if (input[i] == ',') {
			input[i] = ' – – · · – –';
		}else if (input[i] == '?') {
			input[i] = ' · · – – · ·';
		}else if ((input[i] == "'")||(input[i] == "‘")||(input[i] == "’")) {
			input[i] = ' · – – – – ·';
		}else if (input[i] == '!') {
			input[i] = ' – · – · – –';
		}else if (input[i] == '/') {
			input[i] = ' – · · – ·';
		}else if ((input[i] == '(')||(input[i] == '[')||(input[i] == '{')||(input[i] == '<')) {
			input[i] = ' – · – – ·';
		}else if ((input[i] == ')')||(input[i] == ']')||(input[i] == '}')||(input[i] == '>')) {
			input[i] = ' – · – – · –';
		}else if (input[i] == '&') {
			input[i] = ' · – · · ·';
		}else if (input[i] == ':') {
			input[i] = ' – – – · · ·';
		}else if (input[i] == ';') {
			input[i] = ' – · – · – ·';
		}else if (input[i] == '=') {
			input[i] = ' – · · · –';
		}else if (input[i] == '+') {
			input[i] = ' · – · – ·';
		}else if (input[i] == '-') {
			input[i] = ' – · · · · –';
		}else if (input[i] == '_') {
			input[i] = ' · · – – · –';
		}else if ((input[i] == '"')||(input[i] == '“')||(input[i] == '”')) {
			input[i] = ' · – · · – ·';
		}else if (input[i] == '$') {
			input[i] = ' · · · – · · –';
		}else if (input[i] == '@') {
			input[i] = ' · – – · – ·';
		}
	} //변환 코드
	var output = '';
	for (i=0; i<v.length; i++) {
		output = output + input[i] + '　';
	}
	//$('#output').text(output);//for div element
	$('#output').val(output);//for textarea element
}