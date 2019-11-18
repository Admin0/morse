/*
Copyright 2012 KAKAO
*/

(function (window, undefined) {
    var kakao = {};
    window.kakao = window.kakao || kakao;
    
    var uagent = navigator.userAgent.toLocaleLowerCase();
    if (uagent.search("android") > -1) {
        kakao.os = "android";
    
    } else if (uagent.search("iphone") > -1 || uagent.search("ipod") > -1 || uagent.search("ipad") > -1) {
        kakao.os = "ios";
    }

    var app = {
        talk : {
            base_url : "kakaolink://sendurl?",
            apiver : "2.0.1",
            store : {
                android : "market://details?id=com.kakao.talk",
                ios : "http://itunes.apple.com/app/id362057947"
            }
        },
        story : {
            base_url : "storylink://posting?",
            apiver : "1.0",
            store : {
                android : "market://details?id=com.kakao.story",
                ios : "http://itunes.apple.com/app/id486244601"
            }    
        }
    };
    
    kakao.link = function(name) {
        var link_app = app[name];
        if ( !link_app ) return { send : function() { throw "No App exists"; }};
        return {
            send : function (params) {
                var _app = this.app;
                params['apiver'] = _app.apiver;
                var full_url = _app.base_url + serialized(params);

                var install_block = (function (os){
                    return function () {
                        window.location = _app.store[os];
                    };
                })(this.os);
                
                if (this.os == "ios") {
                    setTimeout(install_block, 35);
                    window.location = full_url;
                } else if (this.os == "android") {
                    var iframe = document.createElement('iframe');
                    iframe.style.visibility = 'hidden';
                    iframe.src = full_url;
                    iframe.onload = install_block;
                    document.body.appendChild(iframe);
                }
            },
            app : link_app,
            os : kakao.os
        };

        function serialized(params) {
            var stripped = [];
            for ( var k in params) {
                stripped.push(k + "=" + encodeURIComponent(params[k]));
            }
            return stripped.join("&");
        }

    };

}(window));