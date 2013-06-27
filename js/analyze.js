/*******************************************
 * MORSE CODE ANALYZER                     *
 * Original Code by JinH(jinh.tistory.com) *
 *******************************************/

function analyze() {
	
	var j,k,output = '';
	var text = $('#input_textarea').val();
	var space_char = new RegExp($('#space_char').val(), 'g');
	var space_string = new RegExp($('#space_string').val()+'|\n|\r', 'g');
	text = text.replace(space_string,"_/_"); //문자열공백
	text = text.replace(space_char,"_"); //문자사이공백
	text = text.replace(/\s/g,""); //공백 제거
	text = text.replace(/1|－|-|ㅡ/g,"–");
	text = text.replace(/0|ㆍ|\.|\*|`|'/g,"·");
	
	var input = text.split('_');
	
	/*var input = new Array();
	for (i=0; i<text.length; i++) {
		input[i] = text.charAt(i);
	} //모스 부호 입력 코드*/
	function translate_en() {
		for (i=0; i<$('#input_textarea').val().length; i++) {
			if (input[i] == '·–') {//로마자
				input[i] = 'a';
			}else if (input[i] == '–···') {
				input[i] = 'b';
			}else if (input[i] == '–·–·') {
				input[i] = 'c';
			}else if (input[i] == '–··') {
				input[i] = 'd';
			}else if (input[i] == '·') {
				input[i] = 'e';
			}else if (input[i] == '··–·') {
				input[i] = 'f';
			}else if (input[i] == '––·') {
				input[i] = 'g';
			}else if (input[i] == '····') {
				input[i] = 'h';
			}else if (input[i] == '··') {
				input[i] = 'i';
			}else if (input[i] == '·–––') {
				input[i] = 'j';
			}else if (input[i] == '–·–') {
				input[i] = 'k';
			}else if (input[i] == '·–··') {
				input[i] = 'l';
			}else if (input[i] == '––') {
				input[i] = 'm';
			}else if (input[i] == '–·') {
				input[i] = 'n';
			}else if (input[i] == '–––') {
				input[i] = 'o';
			}else if (input[i] == '·––·') {
				input[i] = 'p';
			}else if (input[i] == '––·–') {
				input[i] = 'q';
			}else if (input[i] == '·–·') {
				input[i] = 'r';
			}else if (input[i] == '···') {
				input[i] = 's';
			}else if (input[i] == '–') {
				input[i] = 't';
			}else if (input[i] == '··–') {
				input[i] = 'u';
			}else if (input[i] == '···–') {
				input[i] = 'v';
			}else if (input[i] == '·––') {
				input[i] = 'w';
			}else if (input[i] == '–··–') {
				input[i] = 'x';
			}else if (input[i] == '–·––') {
				input[i] = 'y';
			}else if(input[i] == '––··') {
				input[i] = 'z';
			}
		}
	}
	function translate_nm() {
		for (i=0; i<$('#input_textarea').val().length; i++) {
			if ((input[i] == '–––––')||(input[i] == '–')) {//숫자
				input[i] = '0';
			}else if ((input[i] == '·––––')||(input[i] == '·–')) {
				input[i] = '1';
			}else if ((input[i] == '··–––')||(input[i] == '··–')) {
				input[i] = '2';
			}else if ((input[i] == '···––')||(input[i] == '···–')) {
				input[i] = '3';
			}else if (input[i] == '····–') {
				input[i] = '4';
			}else if (input[i] == '·····') {
				input[i] = '5';
			}else if (input[i] == '–····') {
				input[i] = '6';
			}else if ((input[i] == '––···')||(input[i] == '–···')) {
				input[i] = '7';
			}else if ((input[i] == '–––··')||(input[i] == '–·')) {
				input[i] = '8';
			}else if ((input[i] == '––––·')||(input[i] == '–·')) {
				input[i] = '9';
			}else if (input[i] == '/') {//기호
				input[i] = ' ';
			}else if (input[i] == '·–·–·–') {
				input[i] = '.';
			}else if (input[i] == '––··––') {
				input[i] = ',';
			}else if (input[i] == '··––··') {
				input[i] = '?';
			}else if (input[i] == '·––––·') {
				input[i] = "'";
			}else if (input[i] == '–·–·––') {
				input[i] = '!';
			}else if (input[i] == '–··–·') {
				input[i] = '/';
			}else if (input[i] == '–·––·') {
				input[i] = '(';
			}else if (input[i] == '–·––·–') {
				input[i] = ')';
			}else if (input[i] == '·–···') {
				input[i] = '&';
			}else if (input[i] == '–––···') {
				input[i] = ':';
			}else if (input[i] == '–·–·–·') {
				input[i] = ';';
			}else if (input[i] == '–···–') {
				input[i] = '=';
			}else if (input[i] == '·–·–·') {
				input[i] = '+';
			}else if (input[i] == '–····–') {
				input[i] = '-';
			}else if (input[i] == '··––·–') {
				input[i] = '_';
			}else if (input[i] == '·–··–·') {
				input[i] = '"';
			}else if (input[i] == '···–··–') {
				input[i] = '$';
			}else if (input[i] == '·––·–·') {
				input[i] = '@';
			}
		}
	}
	function translate_kr() {
		for (i=0; i<$('#input_textarea').val().length; i++) {	
			if (input[i] == '·') {//모음
				input[i] = 'ㅏ';
			}else if (input[i] == '––·–') {
				input[i] = 'ㅐ';
			}else if (input[i] == '··') {
				input[i] = 'ㅑ';
			}else if (input[i] == '····–') {
				input[i] = 'ㅒ';
			}else if (input[i] == '–') {
				input[i] = 'ㅓ';
			}else if (input[i] == '–·––') {
				input[i] = 'ㅔ';
			}else if (input[i] == '···') {
				input[i] = 'ㅕ';
			}else if (input[i] == '···　··–') {
				input[i] = 'ㅖ';
			}else if (input[i] == '·–') {
				input[i] = 'ㅗ';
			}else if (input[i] == 'ㅘ') {
				input[i] = '·–　·';
			}else if (input[i] == 'ㅙ') {
				input[i] = '·–　––·–';
			}else if (input[i] == 'ㅚ') {
				input[i] = '·–　··–';
			}else if (input[i] == '–·') {
				input[i] = 'ㅛ';
			}else if (input[i] == '····') {
				input[i] = 'ㅜ';
			}else if (input[i] == '····　–') {
				input[i] = 'ㅝ';
			}else if (input[i] == '····　–·––') {
				input[i] = 'ㅞ';
			}else if (input[i] == 'ㅟ') {
				input[i] = '····　··–';
			}else if (input[i] == '·–·') {
				input[i] = 'ㅠ';
			}else if (input[i] == '–··') {
				input[i] = 'ㅡ';
			}else if (input[i] == '–··　··–') {
				input[i] = 'ㅢ';
			}else if (input[i] == '··–') {
				input[i] = 'ㅣ';
			}else if (input[i] == '·–··') {//자음
				input[i] = 'ㄱ';
			}else if (input[i] == '·–··　·–··') {
				input[i] = 'ㄲ';
			}else if (input[i] == 'ㄳ') {
				input[i] = '·–··　––·';
			}else if (input[i] == '··–·') {
				input[i] = 'ㄴ';
			}else if (input[i] == 'ㄵ') {
				input[i] = '··–·　·––·';
			}else if (input[i] == 'ㄶ') {
				input[i] = '··–·　·–––';
			}else if (input[i] == '–···') {
				input[i] = 'ㄷ';
			}else if (input[i] == 'ㄸ') {
				input[i] = '–···　–···';
			}else if (input[i] == '···–') {
				input[i] = 'ㄹ';
			}else if (input[i] == 'ㄺ') {
				input[i] = '···–　·–··';
			}else if (input[i] == 'ㄻ') {
				input[i] = '···–　––';
			}else if (input[i] == 'ㄼ') {
				input[i] = '···–　·––';
			}else if (input[i] == 'ㄽ') {
				input[i] = '···–　––·';
			}else if (input[i] == 'ㄾ') {
				input[i] = '···–　––··';
			}else if (input[i] == 'ㄿ') {
				input[i] = '···–　–––';
			}else if (input[i] == 'ㅀ') {
				input[i] = '···–　·–––';
			}else if (input[i] == '––') {
				input[i] = 'ㅁ';
			}else if (input[i] == '·––') {
				input[i] = 'ㅂ';
			}else if (input[i] == 'ㅃ') {
				input[i] = '·––　·––';
			}else if (input[i] == '––·') {
				input[i] = 'ㅅ';
			}else if (input[i] == 'ㅆ') {
				input[i] = '––·　––·';
			}else if (input[i] == '–·–') {
				input[i] = 'ㅇ';
			}else if (input[i] == '·––·') {
				input[i] = 'ㅈ';
			}else if (input[i] == 'ㅉ') {
				input[i] = '·––·　·––·';
			}else if (input[i] == '–·–·') {
				input[i] = 'ㅊ';
			}else if (input[i] == '–··–') {
				input[i] = 'ㅋ';
			}else if (input[i] == '––··') {
				input[i] = 'ㅌ';
			}else if (input[i] == '–––') {
				input[i] = 'ㅍ';
			}else if (input[i] == '·–––') {
				input[i] = 'ㅎ';
			}
		}
	} 
	function assemble() {//한글 음소 결합
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
		output = output.replace(/ㅗㅣ/g,"ㅚ");//이중모음 조합
		output = output.replace(/ㅜㅣ/g,"ㅟ");
		output = output.replace(/ㅡㅣ/g,"ㅢ");
		output = output.replace(/ㅗㅏ/g,"ㅘ");
		output = output.replace(/ㅜㅓ/g,"ㅝ");
		output = output.replace(/ㅏㅣ/g,"ㅐ");
		output = output.replace(/ㅓㅣ/g,"ㅣ");
		output = output.replace(/ㅑㅣ/g,"ㅒ");
		output = output.replace(/ㅕㅣ/g,"ㅖ");
		output = output.replace(/ㅜㅔ/g,"ㅞ");
		output = output.replace(/ㅗㅐ/g,"ㅙ");
		/*var ChoSeong2 = new Array ( //쌍자음으로 결합 가능한 초성 집합
			0x3131, 0x3137, 0x3142, 0x3145, 0x3148 
		);*/
		for (var i=0; i<ChoSeong.length; i++) {//쌍자음 조합
			var hangeul = new RegExp(
				String.fromCharCode(ChoSeong[i])+"{2}(?=[ㅏ-ㅣ])|" +
				String.fromCharCode(ChoSeong[i])+"{2}(?=[ㄱ-ㅎ][ㅏ-ㅣ])"
			,"g");
			output = output.replace(hangeul,String.fromCharCode(ChoSeong[i+1]));
			if ((i==1)||(i==10)) {i++;} //[ㄴㄴ->ㄷ], [ㅇㅇ->ㅈ] 방지
			else if (i==4) {i=i+2;} //[ㄹㄹ->ㅁ], [ㅁㅁ->ㅂ] 방지
			else if (i==13) {i=i+6;} //[ㅊㅊ->ㅋ]-[ㅎㅎ->""] 방지
		}
		output = output.replace(/ㄱㅅ(?=[ㄱ-ㅎ])/g,"ㄳ"); //이중종성 조합
		output = output.replace(/ㄴㅎ(?=[ㄱ-ㅎ])/g,"ㄶ");
		output = output.replace(/ㄴㅈ(?=[ㄱ-ㅎ])/g,"ㄵ");
		output = output.replace(/ㄹㄱ(?=[ㄱ-ㅎ])/g,"ㄺ");
		output = output.replace(/ㄹㅁ(?=[ㄱ-ㅎ])/g,"ㄻ");
		output = output.replace(/ㄹㅂ(?=[ㄱ-ㅎ])/g,"ㄼ");
		output = output.replace(/ㅂㅅ(?=[ㄱ-ㅎ])/g,"ㅄ");
		for	(i=0; i<JungSeong.length; i++) {//모음 앞에 자음있으면 무조건 결합.
			for (j=0; j<ChoSeong.length; j++) {
				var hangeul = new RegExp(String.fromCharCode(ChoSeong[j]) + String.fromCharCode(JungSeong[i]), 'g');
				output = output.replace(hangeul,String.fromCharCode(j*21*28+i*28+0xAC00));
			}
		}
		
		for	(i=0; i<JungSeong.length; i++) {//문자 뒤에 자음이 있으면 받침으로 결합.
			for (j=0; j<ChoSeong.length; j++) {
				for (k=0; k<JongSeong.length; k++) {
					var hangeul = new RegExp(String.fromCharCode(j*21*28+i*28+0xAC00) + String.fromCharCode(JongSeong[k]), 'g');
					output = output.replace(hangeul,String.fromCharCode(j*21*28+i*28+k+0xAC00));
				}
			}
		}
	}
	
	var lang = $(":input:radio[name=type]:checked").val();//라디오 체크 먼저 실행 후 한번 씩 실행.
	if (lang == "kr") {
		translate_kr();
		text = "";
		for (var i=0; i<input.length; i++) {
			text = text + input[i];
		}
	} else if (lang == "en") {
		translate_en();
	} else if (lang == "nm") {
		translate_nm();
	}
	translate_en();translate_nm();translate_kr();
	
	//변환 코드
	//output = '<div>문자열공백:[' + $('#space_string').val() + '] 문자공백:[' + $('#space_char').val() + ']으로 해독.</div>';
	for (var i=0; i<input.length; i++) {
		output = output + input[i] + '';
	}
	if ((lang == "kr")&&($('#assemble:checked').val() == "on")) {assemble();}
	//$('#output').html(output).css('text-transform', ($('#capital:checked').val() == "on") ? "uppercase" : "none");//for div element
	$('#output').val(output).css('text-transform', ($('#capital:checked').val() == "on") ? "uppercase" : "none");//for textarea element
}
