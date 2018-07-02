//闭包匿名函数
;
(function ($, window, undefined) {
    /*
    //单次执行事件
    //element:执行事件的DOM元素 
    //event:执行的事件
    //method:事件执行的方法（this：jQuery对象）
    //time:事件执行间隔时间（毫秒），默认1000毫秒
    //hint:间隔时间内执行事件所执行的方法（默认不执行任何操作）（this：执行事件的DOM元素）
    */
    $.fn.disabledEvent = function (event, method, time, hint) {
        return this.each(function () {
            var element = $(this);
            element.off(event).on(event, function () {
                recursion();
                method.call(element);
            });

            function recursion() {
                time = time ? time : 1000;
                var execute = function () {
                    element.off(event).on(event, function () {
                        method.call(element);
                        recursion();
                    });
                };
                element.off(event).on(event, function () {
                    if (hint && $.isFunction(hint)) hint.call(element);
                    execute = undefined;
                    recursion();
                });
                window.setTimeout(function () {
                    if (execute && $.isFunction(execute)) execute();
                }, time);
            }

        });
    };
    /*
    //居中
    //isLevel:是否水平居中[default:true]
    //isVertical:是否垂直居中[default:true]
    //skew:偏移[dataType:json][property:top,right,bottom,left]
    */
    $.fn.centering = function (isLevel, isVertical, skew) {
        isLevel = isLevel == undefined ? true : isLevel;
        isVertical = isVertical == undefined ? true : isVertical;
        return $(this).each(function () {
            var $this = $(this);
            if (isLevel || isVertical) {
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

    //统计代码
    this.statisticsCode = function () {
        var baiduAnalytics = function (id) {
            //百度统计代码
            var _hmt = _hmt || [];
            (function () {
                var hm = document.createElement("script");
                hm.src = "//hm.baidu.com/hm.js?" + id;
                hm.onload = function () {
                    delete window["_bdhm_loaded_" + id];
                };
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        };
        var googleAnalytics = function () {
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments);
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m);
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-60141999-1', 'auto');
            ga('send', 'pageview');
        };

        if (window.location.hostname.match(/^(?:test\.)?(?:(www|city)\.64365\.com)|(?:m\.64365\.com)$/)) {
            baiduAnalytics('f06668799ed94ad46948b9df10e66316');
            //googleAnalytics();   //主站注释掉Google统计代码
        }
        if (window.location.hostname.match(/^(?:user\.64365\.com)$/)) {
            baiduAnalytics('0063ca2847018fd4edfe38a89d96b719');
        }
        if (window.location.hostname.match(/^(?:public\.64365\.com)$/)) {
            baiduAnalytics('a3fa49eca35a0a107222f3d0167061a5');
        }
        if (window.location.hostname.match(/^(?:login\.64365\.com)$/)) {
            baiduAnalytics('12ad77292d8248b6fb692f9dc5a2fc9e');
        }
        if (window.location.hostname.match(/^(?:wenji\.64365\.com)$/)) {
            baiduAnalytics('4dd4a49d90e08c3bf3a9a26bff087c54');
        }

        var bp = document.createElement('script');

        bp.src = 'http://push.zhanzhang.baidu.com/push.js';

        var s = document.getElementsByTagName("script")[0];

        s.parentNode.insertBefore(bp, s);
    };

    //string类方法扩充
    $.extend(String.prototype, {
        /*
        //按照字节长度截取字符串
        //index:开始下标
        //length:截取长度
        */
        subString: function (index, length) {
            for (var i = 0; i < length; i++) {
                var c = this.charCodeAt(i);
                if (!((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f))) {
                    length--;
                }
            }
            return this.substring(index, index + length);
        },
        //计算字符数 1个汉字为2个字符 其他为1个
        countCharacters: function () {
            var totalCount = 0;
            for (var i = 0; i < this.length; i++) {
                var c = this.charCodeAt(i);
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                    totalCount++;
                } else {
                    totalCount += 2;
                }
            }
            return totalCount;
        },
        //格式化替换
        format: function (aParameter) {
            var fn = this;
            var sResult = fn;
            if (arguments.length > 0) {
                if (arguments.length == 1 && aParameter instanceof Object) {
                    for (var key in aParameter) {
                        if (typeof (aParameter[key]) == 'undefined') {
                            continue;
                        }
                        if (aParameter[key] == null) {
                            aParameter[key] = "";
                        }
                        sResult = sResult.replace(new RegExp("\\{" + key + "\\}", "g"), aParameter[key].toString());
                    }
                } else {
                    for (var i = 0; i < arguments.length; i++) {
                        if (typeof (arguments[i]) == 'undefined') {
                            continue;
                        }
                        if (arguments[i] == null) {
                            arguments[i] = "";
                        }
                        sResult = sResult.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i].toString());
                    }
                }
            }
            return sResult;
        }
    });
})(jQuery, window);
/*
//Ajax请求
//url:请求地址
//data;传递数据
//callback:成功回调函数（携带参数：响应对象-this,响应对象）
//type:响应数据类型（默认xml）
//error:错误回调函数（携带参数：当前对象-this）
*/
function doAjax(url, data, callback, type, error) {
    $.ajax({
        url: url + '?_=' + Math.random(0, 1),
        dataType: type ? type : 'xml',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        cache: false,
        type: 'POST',
        data: data,
        success: function (response) {
            if (callback && $.isFunction(callback)) callback.call(response, response);
        },
        error: function () {
            if (error && $.isFunction(error)) {
                error.call(this);
            } else {
                console.log('网络繁忙，请稍后再试');
            }
        }
    });
}

/*
//单次执行事件
//element:执行事件的DOM元素
//event:执行的事件
//method:事件执行的方法（this：jQuery对象）
//time:事件执行间隔时间（毫秒），默认1000毫秒
//hint:间隔时间内执行事件所执行的方法（默认不执行任何操作）（this：执行事件的DOM元素）
*/
function DisabledEvent(element, event, method, time, hint) {
    $(element).each(function () {
        $(this).off(event).on(event, function () {
            recursion(this);
            method.call(this);
        });
    });
    function recursion(e) {
        time = time ? time : 1000;
        var execute = function () {
            $(e).off(event).on(event, function () {
                method.call(e);
                recursion();
            });
        };
        $(e).off(event).on(event, function () {
            if (hint && $.isFunction(hint)) hint.call(e);
            execute = undefined;
            recursion();
        });
        window.setTimeout(function () {
            if (execute && $.isFunction(execute)) execute();
        }, time);
    }
}
/*
//秒钟计时
//time:初始时间（秒）
//element:DOM元素
//callback:回调函数（this：jQuery对象）
*/
function Timeout(time, element, callback) {
    $(element).html(time);
    window.setTimeout(function () {
        time -= 1;
        if (time > 0) {
            Timeout(time, element, callback);
        } else {
            if (callback && $.isFunction(callback)) {
                callback.call($(element));
            }
        }
    }, 1000);
}
/*
//取得JSON日期格式
//date:json日期对象
//format:日期格式（形如yyyy-MM-dd HH:mm:ss）
*/
function GetJsonDate(date, format) {
    if (!date) {
        return '';
    }
    var d = new Date(parseInt(date.match(/^\/Date\((.+?)\)\/$/)[1], 10));
    return FormatDateTime(d, format);
}
/*
//格式化日期时间对象(仅支持年、月、日、时、分、秒和毫秒的格式替换)
//date:日期对象
//format:日期格式（形如yyyy-MM-dd HH:mm:ss）
*/
function FormatDateTime(date, format) {
    return (format ? format : 'yyyy-MM-dd HH:mm:ss')
        .replace('yyyy', date.getFullYear()).replace('yy', date.getFullYear().toString().substring(2))
        .replace('MM', AddZero(date.getMonth() + 1)).replace('M', date.getMonth() + 1)
        .replace('dd', AddZero(date.getDate())).replace('d', date.getDate())
        .replace('HH', AddZero(date.getHours())).replace('H', date.getHours())
        .replace('hh', AddZero(date.getHours() > 12 ? date.getHours() - 12 : date.getHours()))
        .replace('h', date.getHours() > 12 ? date.getHours() - 12 : date.getHours())
        .replace('mm', AddZero(date.getMinutes())).replace('m', date.getMinutes())
        .replace('ss', AddZero(date.getSeconds())).replace('s', date.getSeconds())
        .replace('SSS', AddZero(date.getMilliseconds(), 3)).replace('SS', AddZero(date.getMilliseconds())).replace('S', date.getMilliseconds());
}
function AddZero(value, length, padding, isTail) {
    var result = value.toString();
    length = (length ? length : 2) - result.length;
    for (var i = 0; i < length; i++) {
        if (isTail == true) {
            result += padding ? padding : '0';
        } else {
            result = (padding ? padding : '0') + result;
        }
    }
    return result;
}
/*
//分享
//type:类型
*/
function Share(type) {
    //分享到新浪
    if (type == 1) {
        window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(document.location.href));
        return false;
    }
    //分享到QQ空间
    if (type == 2) {
        window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(document.location.href) + '&desc=' + encodeURI(document.title));
        return false;
    }
    //分享到腾讯微博
    if (type == 3) {
        var _t = encodeURI(document.title);
        var _url = encodeURI(document.location);
        var _appkey = encodeURI('appkey'); //腾讯appkey，无
        var _pic = encodeURI(''); //（列如：var _pic='图片url1|图片url2|图片url3....）
        var _site = 'm.64365.com';
        var _u = 'http://v.t.qq.com/share/share.php?title=' + _t + '&url=' + _url + '&appkey=' + _appkey + '&site=' + _site + '&pic=' + _pic;
        window.open(_u, '转播到腾讯微博', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
    }
};
/*
//闪烁警告
//element:DOM元素
//number:闪烁次数
interval:间隔时间（毫秒）（默认100毫秒）
*/
function flickerCaution(element, number, interval) {
    var color = $(element).data("Color");
    if (!color) {
        color = $(element).css('color');
        $(element).data("Color", color);
    }
    $(element).css('color', color == 'rgb(255, 0, 0)' ? 'blue' : 'red');
    window.setTimeout(function () {
        $(element).css('color', color);
        number--;
        if (number > 0) {
            window.setTimeout(function () {
                flickerCaution(element, interval, number);
            }, interval > 0 ? interval : 100);
        }
    }, interval > 0 ? interval : 100);
}

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
            display: "none"
        });
    $msg.children("span").html(msg);
    $msg.centering(true, false);
    var $inquiry = $msg.children("p");
    if (msgType == 2) {
        if ($inquiry.length <= 0) {
            $inquiry = $("<p><a href=\"javascript:void(0);\">取消</a><a href=\"javascript:void(0);\" data-value=\"success\">确定</a></p>");
            $inquiry.css({
                "margin-top": "20px !important"
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
        $inquiry.show().off("click").on("click", "a", function () {
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
$(window.document).ready(function () {
    //统计代码
    window.statisticsCode();
    //访客统计
    $.getScript("https://hm.hualv.com/dc.js");
    //设置游客GUID
    var cookie = new Cookie();
    var guid = cookie.get("hl.guid");
    if (guid == null)
    {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = "hl.guid=" + escape(GUID()) + ";path=/;domain=.64365.com;expires=" + exp.toGMTString();
    }
});

function GUID() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

