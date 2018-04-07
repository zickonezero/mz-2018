import React, {Component} from 'react';
import axiosConfig from '../axiosConfig';
import MainHOC from '../hoc/MainHOC';
import Nav from '../components/Nav';
import isMobile from '../lib/js/is-mobile.js';

class Home extends Component {
    state = {
        workData: null
    };

    funcs = () => {
        const nameInput = $('#input-name');
        let theUsername = "",
            theMessage,
            hideThis;

        function init() {
            bottomPadding();
            checkCookie();
            hideLoader();
            myPlugins();
            plugins();

            $("#input-name").keypress(function (e) {
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

            $(window).resize(function () {
                bottomPadding();
            });

            if (isMobile.any()) {
                $('.remove-hover').removeClass('remove-hover');
                $('#footer, #picard').css('padding-bottom', 0);
                $('.thumbnails, #picard').css('margin-bottom', 0);
            }
        }

        function myPlugins() {
            $.fn.typeText = function (theMessage) {
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
                    if (i < l) {
                        setTimeout(f, 40);
                    } else {
                        if (hideThis != true) {
                            $('.loopThis').show().loopThis(600, 600, 0.4);
                        } else {
                            $('.loopThis').removeClass('loopThis');
                            nameInput.blur().hide();
                            $('body').animate({
                                scrollTop: 0
                            });
                        }
                        inputHere();
                    }
                }
                f();
            };

            $.fn.loopThis = function (duration1, duration2, op) {
                var runThis = {
                    repeatThis: function () {
                        $('.loopThis').animate({
                            opacity: op
                        }, duration1, function () {
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
            $('#name-form h1').click(function () {
                nameInput.removeAttr('readonly');
                $('.loopThis').stop();
                $(this).hide();
                nameInput.focus();
            });
            nameInput.blur(function () {
                if ($(this).val() == '') {
                    $('.loopThis').show().loopThis(600, 600, 0.4);
                }
            });
        }

        function bottomPadding() {
            if (!isMobile.any() && $(window).width() > 767) {
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
            if (nameInput.val()) {
                var inputText = nameInput.val(),
                    inputTextLength;

                if (inputText.length < 20) {
                    inputTextLength = inputText.length + 2;
                } else {
                    inputTextLength = inputText.length + 1;
                }
                nameInput.width(inputTextLength * multiple);
            }
        }

        // Cookie
        function getCookie(c_name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) {
                    return unescape(y);
                }
            }
        }

        function setCookie(c_name, value, exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
            document.cookie = c_name + "=" + c_value;
        }

        function checkCookie() {
            var username = getCookie("username");
            if (username) {
                theMessage = "Welcome back " + username + ". Click on the logo to navigate.";
                setInputWidth(0);
                nameInput.attr('readonly', 'readonly');
                hideThis = true;
            } else {
                theMessage = "Welcome. Please state your name.";
                username = theUsername;
                if (username !== null && username !== "") {
                    setCookie("username", username, 365);
                }
            }
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

        init();
    }

    componentDidMount() {
        axiosConfig.get('/all.json')
            .then(resp => {
                const sortedWorkData = resp.data.work.sort((a, b) => {
                    return a.order_num - b.order_num;
                });
                this.setState({
                    workData: sortedWorkData
                });

                this.funcs();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render () {
        let works = !this.state.workData ?
            null : <MainHOC dataFeed={this.state.workData} />;

        return (
            <div className="content">
                <div className="row-fluid">
                    <div className="span12">

                        <Nav />

                        <h1 id="my-name">michael zick</h1>

                        <div id="subclass">
                            <p>ui engineer : class a : v 3.1.0</p>
                            <p>this site is built on nodejs // express // ejs // react // mongodb</p>
                        </div>

                        <div id="socialwell">
                            <span><a href="http://www.linkedin.com/in/michaelzick" target="_blank">linkedin</a></span>
                            <span>&nbsp;:&nbsp;</span>
                            <span><a href="http://zickonezero.tumblr.com/" target="_blank">blog</a></span>
                            <span>&nbsp;:&nbsp;</span>
                            <span><a href="https://github.com/zickonezero?tab=repositories" target="_blank">github</a></span>
                        </div>

                        <div id="ascensorBuilding">
                            <section>
                                <div id="loader"></div>

                                <h1 id="intro" className="typeText"></h1>
                                <br></br>
                                <form id="name-form">
                                    <input id="input-name" maxLength="20" readOnly="readonly" />
                                    <h1 className="loopThis">Input Here</h1>
                                </form>
                            </section>

                            <section className="add-border">
                                <h1 id="section2-title">Corporate Entities</h1>
                                <div id="work" className="row-fluid">
                                    {works}
                                </div>
                            </section>

                            <section className="add-border large-img">
                                <h1 id="section3-title">Cultural Artifacts</h1>
                                <div id="art" className="row-fluid">
                                </div>
                            </section>

                            <section className="add-border large-img">
                                <h1 id="section4-title">Personnel</h1>
                                <div id="pics" className="row-fluid">
                                </div>
                            </section>

                            <section>
                                <h1 id="section5-title">Captain's Log</h1>
                                <div id="bio-box">
                                </div>
                                <div id="qual-box">
                                    <h1 id="qual-header">Qualifications</h1>
                                    <div id="skills-box">
                                    </div>
                                </div>
                            </section>

                            <div id="proj_img_links">
                                <div id="proj-imgs-1"></div>
                                <div id="proj-imgs-2"></div>
                                <div id="proj-imgs-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
};

export default Home;
