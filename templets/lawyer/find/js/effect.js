//效果相关
//闭包匿名函数
;
(function ($, window, undefined) {

    //根据url路径名称，匹配菜单，并选中
    function effect() {
        this.lawyerAdminLeftMenu = function () {
            if ($('#menu-left').length > 0) {
                var pathname = window.location.pathname; // http://user.64365.com/order-details/419/ 中的 /order-details/419/ 部分
                var pageName = null; //页面名称
                if (pathname.length > 0) {
                    var list = pathname.split('/');
                    if (list.length > 1) {
                        pageName = list[1];
                    }
                };

                var index = null;
                (function () {
                    index = 0;
                    switch (pageName) {
                        case "order-details":
                        case "question":
                        case "push":
                        case "order":
                        case "question-details":
                            return; //线索接洽(本省在线咨询)
                    }
                    index++;
                    switch (pageName) {
                        case "zhenduan":
                        case "push-details":
                            return; //律师诊断
                    }
                    index++;
                    switch (pageName) {
                        case "case":
                        case "source":
                            return; //案源跟进(案源跟进系统)
                    }
                    index++;
                    switch (pageName) {
                        case "authentication":
                            return; //三重认证
                    }
                    index++;
                    switch (pageName) {
                        case "comment":
                            return; //我的评价
                    }
                    index++;
                    switch (pageName) {
                        case "myinfo":
                            return; //个人资料
                    }
                    index++;
                    switch (pageName) {
                        case "article":
                            return; //成功案例
                    }
                    index++;
                    switch (pageName) {
                        case "wenji":
                            return; //律师文集
                    }
                    index++;
                    switch (pageName) {
                        case "speciality":
                            return; //服务报价
                    }
                    index++;
                    switch (pageName) {
                        case "earnings":
                            return; //我的收益
                    }
                    index++;
                    switch (pageName) {
                        case "gold":
                            return; //我的金币
                    }
                    index++;
                    switch (pageName) {
                        case "password":
                            return; //修改密码
                    }
                    index++;
                    switch (pageName) {
                        case "message":
                            return; //消息提醒
                    }
                    index = null;
                })();
                if (index != null) {
                    $("#menu-left").find("dd").eq(index).children().addClass('dq-hover');
                }
            }
            this.lawyerAdminLeftMenu = function () { };
            return this;
        };
        this.publicLeftMenu = function () {
            if ($('#menu-left').length > 0) {
                var pathname = window.location.pathname; // http://public.64365.com/myinfo/ 中的 myinfo/ 部分
                var pageName = null; //页面名称
                if (pathname.length > 0) {
                    var list = pathname.split('/');
                    if (list.length > 1) {
                        pageName = list[1];
                    }
                };
                switch (pageName) {
                    case "question":
                        $('#menu_wdzx').addClass('sub-nv-ct');
                        break;
                    case "caselist":
                        $('#menu_wdaj').addClass('sub-nv-ct');
                        break;
                    case "order":
                        $('#menu_wdyu').addClass('sub-nv-ct');
                        break;
                    case "myaccount":
                        $('#menu_wdzh').addClass('sub-nv-ct');
                        break;
                    case "gold":
                        $('#menu_jb').addClass('sub-nv-ct');
                        break;
                    case "myinfo":
                        $('#menu_xgzl').addClass('sub-nv-ct');
                        break;
                    case "message":
                        $('#menu_xxtx').addClass('sub-nv-ct');
                        break;
                    case "yhj":
                        $('#menu_yhj').addClass('sub-nv-ct');
                        break;
                    default:
                        break;
                }
            }
            this.publicLeftMenu = function () { };
            return this;
        };
        this.pageTop = function () {
            $('.u-page').filter(function () {
                if ($(this).closest('.u-page:first').length > 0) {
                    return false;
                } else {
                    return true;
                }
            }).parent().delegate('.u-page a', 'click', function () {
                $(window.document).scrollTop(0);
            });
            this.pageTop = function () { };
            return this;
        };
        this.emptyFormValue = function () {
            $('input,textarea').val('');
            $('.pn-more').children(':first').click().closest('.u-pn').removeClass('u-pn-click');
            $('.pull-down').find('a:first');
        };

        //下拉列表隐藏效果
        this.selectClick = function () {
            var $bg = $('[name="selectBackground"]:first');
            if ($bg.length <= 0) {
                var bgHtml = '<div name="selectBackground" style="position:fixed;width:100%;height:100%;opacity:0;top:0;z-index:500;display:none;"></div>';
                if (!$('html').children('body').children('script:first').before(bgHtml)) {
                    $('html').children('body').append(bgHtml);
                }
                $bg = $('[name="selectBackground"]:first');
            }
            $bg.off("click").on("click", function () {
                $('.u-pn-click').removeClass('u-pn-click u-pn-hover');
                $('.pn-more:visible').hide();
                $(this).hide();
            });
            var index = parseInt($bg.css('z-index')) + 1;
            $(document).on("click", ".u-pn", function () {
                var _ = $(this);
                $bg.toggle(_.find('.pn-more').is(':visible'));
                if (_.is(".u-pn-click")) {
                    _.css({ 'z-index': index + $(".u-pn-click").length });
                } else {
                    _.css({ 'z-index': index });
                }
            });
            return this;
        };
        this.removeSelectClick = function () {
            $('[name="selectBackground"]:first').remove();
            $(document).off("click", ".u-pn");
        };
        this.topNavigation = function () {
            var $this = $(".all-nv:first");
            if ($this.length > 0) {
                if ($this.next().is(":hidden")) {
                    $this.on("click", function () {
                        var _ = $(this);
                        if (!_.data("isClick") || _.next().is(":hidden")) {
                            _.data("isClick", true).next().slideDown();
                        } else {
                            _.next().hide();
                        }
                    }).on("mouseenter", function () {
                        var _ = $(this);
                        if (_.next().is(":hidden")) {
                            _.data("isClick", false).next().slideDown();
                        }
                    }).parent().on("mouseleave", function () {
                        var _ = $(this).children(":first");
                        if (!_.data("isClick")) {
                            _.next().hide();
                        }
                    });
                }
                $(".nv2-list").on("mouseenter", ".list-tab", function () {
                    var _ = $(this);
                    if (!_.parent().data("setTimeout")) {
                        _.parent().data("setTimeout", []);
                    }
                    _.parent().data("setTimeout").push(window.setTimeout(function () {
                        $(".nv2-list-nr").show().children().fadeOut(0).eq(_.index()).fadeIn(0);
                    }, 100));
                }).parent().on("mouseleave", function () {
                    $(".nv2-list-nr").hide().children().hide();
                });
                $(".nv2-list-nr").on("mouseenter", function () {
                    var aSetTimeout = $(this).prev().data("setTimeout");
                    if (aSetTimeout) {
                        for (var iK in aSetTimeout) {
                            window.clearTimeout(aSetTimeout[iK]);
                        }
                    }
                });
            }
            return this;
        };
        this.topSearch = function () {
            var _ = this;
            var $this = $(".seek:first");
            if ($this.length > 0) {
                var $pdlNsid = $this.find(".sk-saix").off("click").nextAll("a").on("click", function () {
                    var __ = $(this);
                    var value = __.prev().val();
                    if (!value || value.length <= 0) {
                        window.showMsg("请填写搜索内容");
                        return;
                    }
                    window.open("http://so.64365.com/cse/search?q=" + value + "&s=2146768754797879512&nsid=" + $pdlNsid.get("value") + "&");
                }).end().next().on("keydown", function (event) {
                    if (event.which == 13) {
                        $(this).next().trigger("click");
                    }
                }).end().children(":first").pullDownList({
                    valueAttr: "data-nsid",
                }, 1).set("isShow", function () {
                    return this.get("$container", true).parent().is(".sk-saix-click");
                }).on("click", function ($item) {
                    var placeholder = $item.data("placeholder");
                    $item.closest('.sk-saix').next().attr("placeholder", placeholder);
                }).on("windowClose", function () {
                    this.get("$container", true).hide().closest('.sk-saix').removeClass('sk-saix-click');
                }).on("windowOpen", function () {
                    this.get("$container", true).show().closest('.sk-saix').addClass('sk-saix-click');
                }).off("setOptionItemEnd").on("setOptionItemEnd", function (oM) {
                    if (!oM) {
                        return;
                    }
                    this.get("$container", true).append($('<a href="javascript:void(0);"></a>').html(oM.Text).data($.extend(oM.Data, { value: oM.Value, text: oM.Text })).attr(oM.Attr ? oM.Attr : {}));
                }).set("staticData", [
                    { Value: "1", Text: "全部", Data: { "placeholder": "请输入关键词" } },
                    { Value: "3", Text: "问题", Data: { "placeholder": "请简要描述您的问题" } },
                    { Value: "2", Text: "律师", Data: { "placeholder": "请输入律师姓名查找" } },
                    { Value: "4", Text: "知识", Data: { "placeholder": "请输入您想了解的内容" } }
                ]).load().select(1);
            }
            return this;
        };
    }

    window.effect = new effect();
    $(window.document).ready(function () {
        switch (window.location.host) {
            case "www.64365.com":
            case "wenji.64365.com":
            case "test.www.64365.com":
            case "test.wenji.64365.com":
                window.effect.selectClick().topNavigation().topSearch();
                break;
            
            case "user.64365.com":
            case "test.user.64365.com":
                window.effect.lawyerAdminLeftMenu().pageTop().selectClick();
                break;
            case "public.64365.com":
            case "test.public.64365.com":
                window.effect.publicLeftMenu().pageTop().selectClick();
                break;
            case "admin.64365.com":
            case "test.admin.64365.com":
                window.effect.selectClick();
                break;
            case "city.64365.com":
            case "city2.64365.com":
            case "zt.64365.com":
                window.effect.topNavigation().topSearch();
                break;
            default:
        }
    });
})(jQuery, window);