import './lib/css/bootstrap.my-mod.min.css';
import './lib/css/bootstrap-responsive.min.css';
import './index.css';
import './global.css';

import './lib/js/jquery-1.8.3.js';
import './lib/js/jquery-ui-1.9.1.js';
import './lib/js/bootstrap.min.js';

import './lib/js/ascensor.min.js';
import './lib/js/jquery.scrollTo-1.4.3.1-min.js';

import './lib/js/fancybox/source/jquery.fancybox.css';
import './lib/js/fancybox/source/helpers/jquery.fancybox-buttons.css';
import './lib/js/fancybox/source/helpers/jquery.fancybox-thumbs.css';

import './lib/js/jquery.easing-1.3.js';
import './lib/js/fancybox/lib/jquery.mousewheel-3.0.6.pack.js';
import './lib/js/fancybox/source/jquery.fancybox.pack.js';
import './lib/js/fancybox/source/helpers/jquery.fancybox-buttons.js';
import './lib/js/fancybox/source/helpers/jquery.fancybox-media.js';
import './lib/js/fancybox/source/helpers/jquery.fancybox-thumbs.js';

import { isMobile } from './lib/js/is-mobile.js';

export const GlobalJS = (() => {
    let theUsername = "",
        theMessage,
        hideThis;

    function init() {
        bottomPadding();
        checkCookie();
        hideLoader();
        myPlugins();
        plugins();

        $("#input-name").keypress(function(e) {
            if (e.which == 13) {
                e.preventDefault();
                theUsername = $(this).val();
                checkCookie();
                $(this).val('').attr('readonly', 'readonly');
                $('.typeText').typeText('Thank you ' + theUsername + '. Click on the logo to navigate.');
                setInputWidth(0);
                hideThis = true;
            }
        });

        $('.typeText').typeText(theMessage);

        $(window).resize(function() {
            bottomPadding();
        });

        if (isMobile.any()) {
            $('.remove-hover').removeClass('remove-hover');
            $('#footer, #picard').css('padding-bottom', 0);
            $('.thumbnails, #picard').css('margin-bottom', 0);
        }

        $(".fancybox").fancybox({
            prevEffect: "none",
            nextEffect: "none",
            helpers: {
                title: {
                    type: "outside"
                },
                overlay: {
                    opacity: 0.8,
                    css: {
                        "background-color": "#000"
                    }
                },
                thumbs: {
                    width: 50,
                    height: 50
                }
            }
        });
    }

    function myPlugins() {
        $.fn.typeText = function(theMessage) {
            let strValue = theMessage,
                parseItLetter = strValue.split(''),
                letterArray = [],
                l,
                i = 0;

            $(this).empty();

            for (let j = 0; j < parseItLetter.length; j++) {
                letterArray += parseItLetter[j];
            }

            l = letterArray.length;

            function f() {
                $('.typeText').append(letterArray[i]);
                i++;
                if (i < l){
                  setTimeout(f, 40);
                } else {
                    if (hideThis != true) {
                        $('.loopThis').show().loopThis(600, 600, 0.4);
                    } else {
                        $('.loopThis').removeClass('loopThis');
                        $('#input-name').blur().hide();
                        $('body').animate({
                            scrollTop: 0
                        });
                    }
                    inputHere();
                }
            }
            f();
        };

        $.fn.loopThis = function(duration1, duration2, op) {
            var runThis = {
                repeatThis: function() {
                    $('.loopThis').animate({
                        opacity: op
                    }, duration1, function() {
                        $(this).animate({
                            opacity: 1
                        }, duration2, runThis.repeatThis());
                    });
                }
            };
            runThis.repeatThis();
        };
    }

    function plugins() {
        $(".fancybox").fancybox({
            prevEffect: "none",
            nextEffect: "none",
            helpers: {
                title: {
                    type: "outside"
                },
                overlay : {
                    opacity : 0.8,
                    css : {
                        "background-color" : "#000"
                    }
                },
                thumbs  : {
                    width : 50,
                    height  : 50
                }
            }
        });

        // ascensor options
        $('#ascensorBuilding').ascensor({
            AscensorName: 'ascensor',
            ChildType: 'section',
            AscensorFloorName: 'section1 | section2 | section3 | section4 | section5',
            Time: 1000,
            WindowsOn: 1,
            Direction: 'chocolate',
            AscensorMap: '1|1 & 1|2 & 2|1 & 2|2 & 3|1',
            Easing: 'easeInOutCubic',
            KeyNavigation: false
        });
    }

    function hideLoader() {
        $('#loader').hide();
    }

    function inputHere() {
        const $inputName = $('#input-name');

        $('#name-form h1').click(function(){
            $inputName.removeAttr('readonly');
            $('.loopThis').stop();
            $(this).hide();
            $inputName.focus();
        });
        $inputName.blur(function(){
            if ($(this).val() == '') {
                $('.loopThis').show().loopThis(600, 600, 0.4);
            }
        });
    }

    function bottomPadding() {
        if (!isMobile.any() && $(window).width() > 767){
            $('.thumbnails li:last-child').css({
                'padding-bottom': '200px'
            });
            $('#qual-box').css('padding-bottom', '400px');
        } else {
            $('#ascensorFloor2 .thumbnails li:last-child, #ascensorFloor3 .thumbnails li:first-child, #qual-box').css({
                'padding-bottom': 0
            });
        }
    }

    function setInputWidth(multiple) {
        const $inputName = $('#input-name');

        if ($inputName.val()) {
            var inputText = $inputName.val(),
                inputTextLength;

            if (inputText.length < 20){
                inputTextLength = inputText.length + 2;
            } else {
                inputTextLength = inputText.length + 1;
            }
            $inputName.width(inputTextLength * multiple);
        }
    }

    // Cookie
    function getCookie(c_name) {
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++){
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x==c_name) {
                return unescape(y);
            }
        }
    }

    function setCookie(c_name,value,exdays) {
        const exdate=new Date();

        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value;
    }

    function checkCookie() {
        let username = getCookie("username");

        if (username) {
            theMessage = "Welcome back " + username + ". Click on the logo to navigate.";
            setInputWidth(0);
            $('#input-name').attr('readonly', 'readonly');
            hideThis = true;
        } else {
            theMessage = "Welcome. Please state your name.";
            username = theUsername;
            if (username !== null && username !== "") {
                setCookie("username", username, 365);
            }
        }
    }

    return {
        init: init
    };
})();
