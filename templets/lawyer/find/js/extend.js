;
(function ($, window, undefined) {
    /*
    //居中
    //isLevel:是否水平居中[default:true]
    //isVertical:是否垂直居中[default:true]
    //isImmobilization:是否固定[default:false]
    //skew:偏移[dataType:json][property:top,right,bottom,left]
    */
    $.fn.centering = function(isLevel, isVertical, isImmobilization, skew) {
        isLevel = isLevel == undefined ? true : isLevel;
        isVertical = isVertical == undefined ? true : isVertical;
        return $(this).each(function() {
            var $this = $(this);
            if (isLevel || isVertical) {
                if (isImmobilization) {
                    $this.css({ position: 'absolute' });
                    var $window = $(window);
                    if (isLevel) {
                        $this.css('left', '0').css({ 'margin-left': 0 }).css('left', ((skew && skew.left) ? skew.left : 0) +
                            $window.scrollLeft() + ($window.width() - $this.width() - parseInt($this.css('padding-left').replace('px', ''))
                                - parseInt($this.css('padding-right').replace('px', ''))) / 2);
                    }
                    if (isVertical) {
                        $this.css('top', '0').css({ 'margin-top': 0 }).css('top', ((skew && skew.top) ? skew.top : 0) +
                            $window.scrollTop() + ($window.height() - $this.height() - parseInt($this.css('padding-top').replace('px', ''))
                                - parseInt($this.css('padding-bottom').replace('px', ''))) / 2);
                    }
                    if (skew) {
                        $this.css({ 'margin-right': skew.right, 'margin-bottom': skew.bottom });
                    }
                } else {
                    $this.css({ position: 'fixed' });
                    if (isLevel) {
                        $this.css('left', '0').css({ 'margin-left': 0 }).css('margin-left', ((skew && skew.left) ? skew.left : 0)
                            - ($this.width() + parseInt($this.css('padding-left').replace('px', ''))
                                + parseInt($this.css('padding-right').replace('px', ''))) / 2).css({ left: '50%' });
                    }
                    if (isVertical) {
                        $this.css('top', '0').css({ 'margin-top': 0 }).css('margin-top', ((skew && skew.top) ? skew.top : 0)
                            - ($this.height() + parseInt($this.css('padding-top').replace('px', ''))
                                + parseInt($this.css('padding-bottom').replace('px', ''))) / 2).css({ top: '50%' });
                    }
                    if (skew) {
                        $this.css({ 'margin-right': skew.right, 'margin-bottom': skew.bottom });
                    }
                }
            }
        });
    };

    //判断元素是否在可视范围内
    $.fn.isOnScreen = function () {
        var win = $(window);
        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();
        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };

    /*
    取得元素位置
    //top:相对于文档顶部的偏移
    //left:相对于文档左侧的偏移
    //width:范围宽度
    //height:范围高度
    */
    $.fn.getLocation = function () {
        var location = { left: 0, top: 0, width: 0, height: 0 };
        $.extend(location, $(this).offset());
        location.width = $(this).outerWidth();
        location.height = $(this).outerHeight();
        return location;
    };

    /*
    是否在范围内
    //top:相对于文档顶部的偏移
    //left:相对于文档左侧的偏移
    //width:范围宽度
    //height:范围高度
    */
    $.fn.isConfineTo = function (args) {
        var location = { left: 0, top: 0, width: 0, height: 0 };
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == 'object') {
                $.extend(location, args);
            } else if (arguments.length == 2) {
                location.left = arguments[0] ? arguments[0] : 0;
                location.top = arguments[1] ? arguments[1] : 0;
            } else {
                location.left = arguments[0] ? arguments[0] : 0;
                location.top = arguments[1] ? arguments[1] : 0;
                location.width = arguments[2] ? arguments[2] : 0;
                location.height = arguments[3] ? arguments[3] : 0;
            }
        }
        var elementLocation = {};
        $.extend(elementLocation, $(this).offset());
        elementLocation.width = $(this).outerWidth();
        elementLocation.height = $(this).outerHeight();
        return location.left >= elementLocation.left && location.left + location.width <= elementLocation.left + elementLocation.width && location.top >= elementLocation.top && location.top + location.height <= elementLocation.top + elementLocation.height;
    };
})(jQuery, window);

/*
//显示信息
//msg:信息
//msgType:消息类型，为2为询问框(将无效透明度样式)，为1展示正确图标，为-1展示错误图标，0不展示图标[default:-1]
//isShield:是否遮蔽[default:false]
//time:显示时间(秒)[default:1.5s]
//transparency:透明度(0-1)[default:0.9]
//fadeTime:淡入淡出速度(js值:"slow"、"fast" 或毫秒)[default:1000ms]
//fnCallback:消失回调函数/询问执行回调，{parameter:[bool(是否确定)]}
*/

function showMsg(msg, msgType, isShield, time, transparency, fadeTime, fnCallback) {
    var $msg = $("div[key=notifications]:first");
    if (!fnCallback) {
        var aParameter = [isShield, time, transparency, fadeTime];
        for (var iK in aParameter) {
            var item = aParameter[iK];
            if (item && $.isFunction(item)) {
                fnCallback = item;
                break;
            }
        }
    }
    fadeTime = typeof (fadeTime) == "number" ? fadeTime : 1000;
    transparency = typeof (transparency) == "number" ? transparency : 0.9;
    time = typeof (time) == "number" ? time : 1.5;
    msgType = msgType != undefined ? msgType : -1;
    var $shield = $(".bg-black:first");
    var shieldFlag = $shield.is(":visible");
    if (isShield == true) {
        if ($shield.length > 0) {
            $shield.show();
        } else {
            var shieldhtml = "<div class=\"bg-black\"></div>";
            if (!$("html").children('body').children("script:first").before(shieldhtml)) {
                $("html").children("body").append(shieldhtml);
            }
            $shield = $(".bg-black:first").removeClass("none");
        }
    }
    if ($msg.length > 0) {
        if ($msg.is(":visible")) {
            $msg.fadeOut(fadeTime);
        }
    } else {
        $msg = $("<div><i></i><span></span></div>");
        $msg.attr({
            key: "notifications"
        }).css({
            "background-color": "#fff",
            border: "1px solid #eee",
            "border-radius": "3px",
            "box-shadow": "0 10px 20px rgba(0, 0, 0, 0.15)",
            display: "none",
            padding: "50px",
            top: "30%",
            "z-index": 20000
        }).children("i").css({
            background: "rgba(0, 0, 0, 0) url(http://image.64365.com/images/communal/ico-m.png) no-repeat scroll",
            display: "inline-block",
            height: "24px",
            "margin-right": "10px",
            overflow: "hidden",
            "vertical-align": "middle",
            width: "24px"
        }).end().children("span").css({
            color: "#333 !important",
            "font-size": "14px"
        });
        if (!$('html').children('body').children('script:first').before($msg)) {
            $('html').children('body').append($msg);
        }
    }
    $msg.children("i").css(msgType == 1 || msgType == -1 ? {
            "background-position": msgType == 1 ? "0 0" : "0 -60px"
        } : {
            height: 0,
            width: 0,
            display: "none",
        });
    $msg.children("span").html(msg);
    $msg.centering(true, false);
    var $inquiry = $msg.children("p");
    if (msgType == 2) {
        if ($inquiry.length <= 0) {
            $inquiry = $("<p><a href=\"javascript:void(0);\">取消</a><a href=\"javascript:void(0);\" data-value=\"success\">确定</a></p>");
            $inquiry.css({
                "margin-top": "20px !important",
            }).children().first().css({
                "float": "left",
                "font-size": "12px",
                "height": "30px",
                "line-height": "30px",
                "padding": 0,
                "text-align": "center",
                "width": "48%",
                "background-color": "#aaaaaa",
                "border": "1px solid #aaaaaa",
                "border-radius": "22px",
                "box-sizing": "border-box",
                "color": "#fff",
                "display": "inline-block",
                "text-decoration": "none"
            }).end().last().css({
                "float": "right",
                "font-size": "12px",
                "height": "30px",
                "line-height": "30px",
                "padding": 0,
                "text-align": "center",
                "width": "48%",
                "background-color": "#0eb77e",
                "border-color": "#0eb77e",
                "color": "#fff",
                "border-radius": "22px",
                "box-sizing": "border-box",
                "display": "inline-block",
                "text-decoration": "none"
            });
            $msg.append($inquiry);
        }
        $inquiry.show().off("click").on("click","a", function() {
            var isConfirm = $(this).attr("data-value") == "success";
            if (fnCallback && $.isFunction(fnCallback)) {
                fnCallback(isConfirm);
            }
            $msg.fadeOut(fadeTime);
            if (isShield && !shieldFlag) {
                $shield.fadeOut(fadeTime);
            }
        });
        $msg.css({ opacity: 1 }).show();
    } else {
        $inquiry.hide();
        $msg.fadeTo(fadeTime, transparency);
        if (time > 0) {
            window.setTimeout(function () {
                $msg.fadeOut(fadeTime, fnCallback);
                if (isShield && !shieldFlag) {
                    $shield.fadeOut(fadeTime);
                }
            }, time * 1000);
        }
    }
    return $msg;
}