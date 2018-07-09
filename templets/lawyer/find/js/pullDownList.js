;

function PullDownList(oParameter) {
    if (!PullDownList._initialize) {
        $.extend(PullDownList.prototype, IDataClass, IEventClass, {
            change: function () {
                var _ = this;
                var oValue = _.get("value");
                if (oValue == null) {
                    if (_.get("relevance")) {
                        for (var i in _.get("relevance")) {
                            _.get("relevance")[i].empty();
                        }
                    }
                } else {
                    if (_.get("relevance")) {
                        if (_.get("staticData")) {
                            var aData = null;
                            for (var i2 in _.get("staticData")) {
                                var oM = _.get("staticData")[i2];
                                if (oM.Value == oValue) {
                                    aData = oM.Subordinate ? oM.Subordinate : null;
                                }
                            }
                            for (var iK in _.get("relevance")) {
                                _.get("relevance")[iK].set("staticData", aData);
                            }
                        }
                        for (var i3 in _.get("relevance")) {
                            _.get("relevance")[i3].load(oValue);
                        }
                    }
                }
                _.trigger("changeEnd");
                return this;
            },
            close: function () {
                var _ = this;
                if (!_._configuration.onOff) {
                    _.trigger("errorClose");
                    return _;
                }
                _.trigger("closeEnd");
                _._configuration.onOff = false;
                return _;
            },
            empty: function () {
                var _ = this;
                _._configuration.empty = true;
                _.set("text", _.get("defaultText")).set("value", undefined);
                _.trigger("emptyEnd");
                return _;
            },
            initialize: function () {
                var _ = this;
                //_.get("$",true).on("click", function(event) {
                //    event.stopPropagation();
                //    _.open();
                //    //if (_.get("$container",true).is(":visible")) {
                //    //    _.close();
                //    //} else {
                //    //    if (_._configuration.empty) {
                //    //        return;
                //    //    }
                //    //    _.open();
                //    //}
                //});
                if (!_._configuration.onOff) {
                    _.open();
                }
                _.get("$", true).on("click", function () {
                    if (_._configuration.empty || !_._configuration.onOff) {
                        return;
                    }
                    _.trigger("clickElement", $(this));
                });
                _.get("$container", true).on("click", function () {
                    if (_._configuration.empty || !_._configuration.onOff) {
                        return;
                    }
                    _.trigger("clickContainer", $(this));
                }).on("click", _.get("listSelector"), function (event) {
                    event.stopPropagation();
                    if (_._configuration.empty || !_._configuration.onOff) {
                        return;
                    }
                    _.trigger("click", $(this));
                    _.trigger("clickOption", $(this));
                });
                _.trigger("initEnd");
                return _;
            },
            load: function (oValue) {
                var _ = this;
                _.empty();
                _._configuration.isLoad = true;
                if (_._configuration.isFirstLoad) {
                    _.trigger("firstLoad").off("firstLoad");
                    _._configuration.isFirstLoad = false;
                }
                _.trigger("loadBefore");
                if (_.get("staticData")) {
                    _.setOption(_.get("staticData"));
                } else {
                    _.trigger("loadData", oValue);
                }
                _.trigger("loadEnd");
                return _;
            },
            open: function () {
                var _ = this;
                if (_._configuration.empty || _._configuration.onOff) {
                    _.trigger("errorOpen");
                    return _;
                }
                _.trigger("openEnd");
                _._configuration.onOff = true;
                return _;
            },
            select: function (oSelect, fnCallback) {
                var _ = this;
                _.one("selectOption", function () {
                    var $option = oSelect == null ? null : _.get("$list", true).filter($.isFunction(oSelect) ? function () {
                        return oSelect.apply(this, arguments);
                    } : $.isNumeric(oSelect) ? function () {
                        return $(this).data("value") == oSelect;
                    } : oSelect);
                    if ($option && $option.length > 0) {
                        _.trigger("click", $option);
                    } else {
                        _.set("text", _.get("defaultText")).set("value", undefined);
                    }
                    if ($.isFunction(fnCallback)) {
                        fnCallback.call(_, $option);
                    }
                    _.trigger("selectEnd", $option);
                });
                if (!_._configuration.isLoad) {
                    _.trigger("selectOption");
                }
                return _;
            },
            setOption: function (aData) {
                var _ = this;
                if (aData && aData.length > 0) {
                    _.trigger("setOptionBegin", aData);
                    for (var i in aData) {
                        _.trigger("setOptionItemEnd", aData[i], i);
                    }
                    _._configuration.empty = false;
                    _._configuration.isLoad = false;
                    _.trigger("selectOption");
                } else {
                    _.empty();
                    _._configuration.isLoad = false;
                }
                _.trigger("setOptionEnd", aData);
                return _;
            },
            toggle: function (bIsShow) {
                var _ = this;
                var aPdl = $(window).data("pdl");
                if (bIsShow == null) {
                    bIsShow = !this.get("isShow", true);
                }
                var arg = $.extend([], arguments);
                arg.splice(0, 1);
                if (!this._configuration.empty && this._configuration.onOff && bIsShow) {
                    arg.unshift("windowOpen");
                    if (!aPdl) {
                        $(window).data("pdl", []);
                    }
                    window.setTimeout(function () {
                        $(window).data("pdl").push(_);
                    }, 1);
                } else {
                    arg.unshift("windowClose");
                    if (aPdl) {
                        window.setTimeout(function () {
                            for (var iK in aPdl) {
                                if (aPdl[iK] == _) {
                                    delete aPdl[iK];
                                    break;
                                }
                            }
                        }, 1);
                    }
                }
                this.trigger.apply(this, arg);
                this.trigger("toggleEnd", !this._configuration.empty && this._configuration.onOff && bIsShow, bIsShow);
                return this;
            }
        });
        PullDownList._initialize = true;
    }
    var obj = this;
    //参数
    obj._parameter = $.extend({
        //默认文本
        defaultText: "",
        //是否显示标识
        isShow: function () {
            return this.get("$container", true).is(":visible");
        },
        //列表选择器
        listSelector: ">",
        //最小下标[加载数据时移除之后选项][大于或等于0的整数]
        minIndex: 0,
        //关联[PullDownList实例对象]
        relevance: undefined,
        //静态数据
        staticData: undefined,
        //元素
        $: undefined,
        //容器
        $container: function () {
            return this.get("$", true);
        },
        //列表
        $list: function () {
            return this.get("$container", true).find(this.get("listSelector"));
        }

        //changeEnd[Function]{explain:值更改成功结束}
        //click[Function]{explain:选项选择成功结束}
        //clickContainer[Function]{explain:容器点击成功结束}
        //clickElement[Function]{explain:元素点击成功结束}
        //clickOption[Function]{explain:选项点击成功结束}
        //closeEnd[Function]{explain:选项关闭成功结束}
        //emptyEnd[Function]{explain:选项清空成功结束}
        //errorClose[Function]{explain:选项关闭错误}
        //errorOpen[Function]{explain:选项打开错误}
        //firstLoad[Function]{explain:首次加载成功结束}
        //initEnd[Function]{explain:初始化成功结束}
        //loadBefore[Function]{explain:加载成功开始}
        //loadData[Function]{explain:加载数据成功开始}
        //loadEnd[Function]{explain:加载成功结束}
        //openEnd[Function]{explain:选项打开成功结束}
        //selectEnd[Function]{explain:选中成功结束}
        //setOptionBegin[Function]{explain:设置选项开始}
        //setOptionEnd[Function]{explain:设置选项成功结束}
        //setOptionItemEnd[Function]{explain:设置选项一项成功结束}
        //toggleEnd[Function]{explain:切换容器显示结束}
        //windowAutomaticClose[Function]{explain:窗口自动关闭}
        //windowClose[Function]{explain:窗口关闭}
        //windowOpen[Function]{explain:窗口打开}
    }, oParameter);
    obj._configuration = {
        empty: false,
        isFirstLoad: true,
        isLoad: false,
        onOff: false
    };
    obj.on("click", function ($item) {
        this.set("$selected", $item);
        this.set("text", $item.data("text") ? $item.data("text") : $item.text()).set("value", $item.data("value"));
        this.get("$", true).data({ value: this.get("value"), text: this.get("text") });
        this.trigger("toggle", false);
    }).on("clickElement", function () {
        this.trigger("toggle");
    }).on("emptyEnd", function () {
        this.get("$list", true).filter(this.get("minIndex") > 0 ? ":gt(" + (this.get("minIndex") - 1) + ")" : "*").remove();
        this.trigger("toggle", false, true);
    }).on("setEnd", function (oData) {
        if (oData) {
            for (var sK in oData) {
                if (sK == "value") {
                    this.change();
                    this.trigger("setValue", oData[sK]);
                } else if (sK == "text") {
                    this.trigger("setText", oData[sK]);
                }
            }
        }
    });
    if (obj._parameter.relevance && !(obj._parameter.relevance instanceof Array)) {
        obj._parameter.relevance = new Array(obj._parameter.relevance);
    }
    return obj;
}

//闭包匿名函数
;
(function ($, window, undefined) {

    $("body").on("click", function () {
        var aPdl = $(window).data("pdl");
        if (aPdl) {
            for (var iK in aPdl) {
                if (aPdl[iK].get("isShow", true)) {
                    aPdl[iK].trigger("windowClose");
                    aPdl[iK].trigger("windowAutomaticClose");
                }
                delete aPdl[iK];
            }
        }
    });
    $.fn.pullDownList = function (oParameter, iType, bNotInit) {
        var _ = $(this);
        var pdl = _.data("PullDownList");
        if (pdl) {
            return pdl;
        }
        pdl = new PullDownList($.extend({ $: _, $container: _, valueAttr: "value" }, oParameter));
        switch (iType) {
            //Ul-Li形式
            case 1:
                pdl.set("$container", function () {
                    return this.get("$", true).next();
                }).set("isShow", function () {
                    return this.get("$container", true).closest('.u-pn').is(".u-pn-click");
                }).set("optionsHeight", 216)
                    .on("changeEnd", function () {
                        var fn = this;
                        fn.get("$", true).each(function () {
                            $(this).contents().filter(function () {
                                return this.nodeType == 3;
                            }).get(0).nodeValue = fn.get("text");
                        });
                    }).on("clickElement", function () {
                        var fn = this;
                        if (fn.get("optionsHeight")) {
                            fn.get("$container", true).each(function () {
                                if ($(this).css("height", "auto").outerHeight() > fn.get("optionsHeight")) {
                                    $(this).css({ overflow: "auto", height: fn.get("optionsHeight") }).parent().css({ height: "auto" });
                                } else {
                                    $(this).css({ overflow: "hidden", height: "auto" }).parent().css({ height: "auto" });
                                }
                            });
                        }
                    }).on("initEnd", function () {
                        var fn = this;
                        this.get("$list", true).each(function () {
                            var __ = $(this);
                            __.data({
                                value: __.attr(fn.get("valueAttr")),
                                text: __.text(),
                            });
                        });
                        this.select(":first");
                    }).on("setOptionItemEnd", function (oM) {
                        if (!oM) {
                            return;
                        }
                        this.get("$container", true).append($("<li></li>").html(oM.Text).data($.extend(oM.Data, { value: oM.Value, text: oM.Text })).attr(oM.Attr ? oM.Attr : {}));
                    }).on("windowClose", function () {
                        this.get("$container", true).closest('.u-pn').removeClass('u-pn-click');
                    }).on("windowOpen", function () {
                        this.get("$container", true).closest('.u-pn').addClass('u-pn-click');
                    });

                pdl.get("$", true).closest('.u-pn').off("click");
                break;
                //Div形式
            case 2:
                pdl.set("$container", function () {
                    if (this.get("$", true).next().length <= 0) {
                        this.get("$", true).after('<div class="pull-down"><div class="pull-more"></div></div>');
                    }
                    return this.get("$", true).next().children();
                }).set("isShow", function () {
                    return this.get("$container", true).closest('.pull').is(".pull-click");
                }).on("changeEnd", function () {
                    this.get("$", true).find("i:last").html(this.get("text"));
                }).on("initEnd", function () {
                    var fn = this;
                    this.get("$list", true).each(function () {
                        var __ = $(this);
                        __.data({
                            value: __.attr(fn.get("valueAttr")),
                            text: __.text()
                        });
                    });
                    this.select(":first");
                }).on("setOptionBegin", function () {
                    var aSupplement = this.get("supplement", true);
                    if (aSupplement) {
                        for (var iK in aSupplement) {
                            this.trigger("setOptionItemEnd", aSupplement[iK], -1 - iK);
                        }
                    }
                }).on("setOptionItemEnd", function (oM) {
                    this.get("$container", true).append($("<p></p>").html(oM.Text).data($.extend(oM.Data, { value: oM.Value, text: oM.Text })).attr(oM.Attr ? oM.Attr : {}));
                }).on("windowClose", function () {
                    this.get("$container", true).closest('.pull').removeClass('pull-click');
                }).on("windowOpen", function () {
                    this.get("$container", true).closest('.pull').addClass('pull-click');
                });

                pdl.get("$", true).closest('.u-pn').off("click");
                break;
                //admin后台形式
            case 3:
                pdl.set("isHide", true)
                    .set("isShow", function () {
                        return this.get("$container", true).closest(".pull").is(".pull-click");
                    })
                    .set("listSelector", ".pull-down>")
                    .set("optionsHeight", 216)
                    .set("$container", function () {
                        return this.get("$", true).next();
                    })
                    .set("$list", function () {
                        return this.get("$container", true).find(".pull-down").children();
                    }).on("changeEnd", function () {
                        this.get("$", true).val(this.get("value"));
                        this.get("$container", true).children().first().children(":first").html(this.get("text"));
                    }).on("clickElement", function () {
                        var fn = this;
                        if (fn.get("optionsHeight")) {
                            fn.get("$container", true).children(".pull-down").each(function () {
                                if ($(this).css("height", "auto").outerHeight() > fn.get("optionsHeight")) {
                                    $(this).css({ overflow: "auto", height: fn.get("optionsHeight") });
                                } else {
                                    $(this).css({ overflow: "hidden", height: "auto" });
                                }
                            });
                        }
                    }).on("emptyEnd", function () {
                        this.get("$", true).children().filter(this.get("minIndex") > 0 ? ":gt(" + (this.get("minIndex") - 1) + ")" : "*").remove();
                        this.get("$container", true).toggle(this.get("isHide") ? false : true);
                    }).on("initEnd", function () {
                        var fn = this;
                        fn.get("$list", true).remove();
                        fn.get("$", true).hide().children().each(function () {
                            var __ = $(this);
                            fn.trigger("setOptionItemEnd", { Value: __.attr(fn.get("valueAttr")), Text: __.text() }, __.index());
                        });
                        this.select(":first");
                    }).on("setOptionBegin", function () {
                        this.get("$container", true).show();
                    }).on("setOptionEnd", function () {
                        var fn = this;
                        fn.get("$", true).children().remove();
                        fn.get("$list", true).each(function () {
                            fn.get("$", true).append($("<option></option>").attr("value", $(this).data("value")).html($(this).data("text")));
                        });
                    }).on("setOptionItemEnd", function (oM) {
                        this.get("$container", true).children(".pull-down").append($('<p><a href="javascript:void(0);"></a></p>').data($.extend(oM.Data, { value: oM.Value, text: oM.Text })).attr(oM.Attr ? oM.Attr : {}).each(function () {
                            $(this).children().html(oM.Text);
                        }));
                    }).on("windowClose", function () {
                        this.get("$container", true).removeClass('pull-click').children(".pull-down").hide();
                    }).on("windowOpen", function () {
                        this.get("$container", true).addClass('pull-click').children(".pull-down").show();
                    });

                pdl.get("$", true).on("change", function () {
                    if ($(this).val() != pdl.get("value")) {
                        pdl.trigger("change");
                    }
                }).each(function () {
                    if ($(this).next().length <= 0 || !$(this).next().is(".pull")) {
                        $(this).after($('<div class="pull w150"><div style="z-index:88" class="pull-on"><i></i><em></em></div><div style="z-index: 90; height: auto; overflow: hidden; display: none;" class="pull-down"></div></div>'));
                    }
                });
                pdl.get("$container", true).off("mouseenter").on("mouseenter", function () {
                    $(this).addClass("pull-hover");
                }).off("mouseleave").on("mouseleave", function () {
                    $(this).removeClass("pull-hover");
                }).off("click").children(".pull-on").on("click", function () {
                    if (pdl._configuration.empty || !pdl._configuration.onOff) {
                        return false;
                    }
                    pdl.trigger("clickElement", pdl.get("$", true));
                    return true;
                });
                break;
                //M站弹窗(固定)
                //SetListHtml
            case 4:
                pdl.set("isShow", function () {
                    return this.get("$container", true).is(":visible");
                }).set("listSelector", "span a")
                    .set("slh", new window.SetListHtml({
                        $list: function () {
                            return this.get("$", true).find("span");
                        }
                    }).on("setListEnd", function (aData) {
                        this.get("$list", true).filter(":gt({0})".format(aData.length - 1)).hide();
                    }).on("setListItem", function ($item, oM, index) {
                        if (index % 3 == 0) {
                            $item.parent().removeAttr("style");
                        }
                        if ($item.children("a").length <= 0) {
                            $item.append('<a href="javascript:void(0);"></a>');
                        }
                        $item.removeAttr("style").children("a").removeAttr("style").data($.extend(oM.Data, { value: oM.Value, text: oM.Text })).attr(oM.Attr ? oM.Attr : {}).html(oM.Text);
                        if (oM.Value == this.get("value")) {
                            $item.children("a").css({ "background-color": "#34d188", "color": "#fff" });
                            pdl.set("$option", $item.children("a"));
                        }
                        if ((index + 1) % 3 == 0) {
                            if (this.get("$list", true).length <= index + 1) {
                                $item.parent().after($item.parent().clone().hide());
                            }
                        }
                    }))
                    .set("$container", function () {
                        var $container = $('<div class="pop-area" style="z-index: 500;display: none;"><p class="p-a-title2"><i class="imooc-icon pop-area-off">&#xe665;</i></p><div class="p-a-nr"><div class="p-a-item"><p><span><a href="javascript:void(0);"></a></span></p></div></div></div>').appendTo($("body"));
                        this.set("$container", $container);
                        return $container;
                    })
                    .set("$list", function () {
                        return this.get("$container", true).find("a");
                    }).on("changeEnd", function () {
                        var fn = this;
                        fn.get("$", true).each(function () {
                            var aNode = $(this).contents().filter(function () {
                                return this.nodeType == 3;
                            });
                            if (aNode.length > 0) {
                                aNode.last().get(0).nodeValue = fn.get("text");
                            } else {
                                $(this).html(fn.get("text"));
                            }
                        });
                    }).on("click", function ($option) {
                        if (this.get("$option")) {
                            this.get("$option").removeAttr("style");
                        }
                        $option.css({ "background-color": "#34d188", "color": "#fff" });
                        this.set("$option", $option);
                    }).on("emptyEnd", function () {
                        this.get("slh").setData([], true);
                    }).on("initEnd", function () {
                        this.select(":first");
                    }).on("setOptionBegin", function (aData) {
                        this.get("slh").set("$", this.get("$container", true)).setData(aData, true);
                    }).on("windowClose", function (isImmediate) {
                        if (isImmediate) {
                            this.get("$container", true).hide();
                            return;
                        }
                        this.get("$container", true).fadeOut();
                    }).on("windowOpen", function (isImmediate) {
                        if (isImmediate) {
                            this.get("$container", true).show();
                            return;
                        }
                        this.get("$container", true).fadeIn();
                    });

                pdl.get("slh").set("$", pdl.get("$container", true).off("click").on("click", function (event) {
                    event.stopPropagation();
                })).get("$", true).children(":first").children().off("click").on("click", function () {
                    pdl.trigger("toggle", false);
                    pdl.trigger("windowManualClose");
                });
                break;
                //M站弹窗(活动)
                //SetListHtml
            case 5:
                pdl.set("isShow", function () {
                    return this.get("$container", true).is(":visible");
                }).set("listSelector", "span a")
                    .set("slh", new window.SetListHtml({
                        $list: function () {
                            return this.get("$", true).find("span");
                        }
                    }).on("setListItem", function ($item, oM) {
                        if ($item.children("a").length <= 0) {
                            $item.append('<a href="javascript:void(0);"></a>');
                        }
                        $item.children("a").removeClass("lei-on").html(oM.Text).data($.extend(oM.Data, { value: oM.Value, text: oM.Text })).attr(oM.Attr ? oM.Attr : {}).html(oM.Text);
                    }))
                    .set("$container", function () {
                        var $container = $('<div style="display: none;" class="pop-lei"><span style="display: none;"><a href="javascript:void(0);"></a></span></div>').appendTo($("body"));
                        this.set("$container", $container);
                        return $container;
                    })
                    .set("$list", function () {
                        return this.get("$container", true).find("a");
                    }).on("changeEnd", function () {
                        var fn = this;
                        fn.get("$", true).each(function () {
                            var aNode = $(this).contents().filter(function () {
                                return this.nodeType == 3;
                            });
                            if (aNode.length > 0) {
                                aNode.last().get(0).nodeValue = fn.get("text");
                            } else {
                                $(this).html(fn.get("text"));
                            }
                        });
                    }).on("click", function ($option) {
                        $option.addClass("lei-on").parent().siblings().find(".lei-on").removeClass("lei-on");
                    }).on("emptyEnd", function () {
                        this.get("slh").setData([], true);
                    }).on("initEnd", function () {
                        this.select(":first");
                    }).on("setOptionBegin", function (aData) {
                        this.get("slh").set("$", this.get("$container", true)).setData(aData, true);
                    }).on("windowClose", function (isImmediate) {
                        if (isImmediate) {
                            this.get("$container", true).hide();
                            return;
                        }
                        this.get("$container", true).fadeOut();
                    }).on("windowOpen", function (isImmediate) {
                        if (isImmediate) {
                            this.get("$container", true).show();
                            return;
                        }
                        this.get("$container", true).fadeIn();
                    });

                pdl.get("slh").set("$", pdl.get("$container", true));
                break;
                //select
            default:
                pdl.on("changeEnd", function () {
                    this.get("$", true).val(this.get("value"));
                }).on("emptyEnd", function () {
                    this.get("$", true).hide();
                }).on("initEnd", function () {
                    this.select(":first");
                }).on("setOptionEnd", function () {
                    if (this._configuration.empty) {
                        this.get("$", true).hide();
                    } else {
                        this.select(":first").get("$", true).show();
                    }
                }).on("setOptionItemEnd", function (oM) {
                    this.get("$container", true).append($("<option></option>").attr("value", oM.Value).html(oM.Text).data($.extend(oM.Data, { value: oM.Value, text: oM.Text })).attr(oM.Attr ? oM.Attr : {}));
                });
                //    .on("loadData", function () {
                //    this.setOption(undefined); //[{ Value: 0, Text: "不限", Subordinate: undefined }]
                //});
                break;
        }
        _.data("PullDownList", pdl);
        return bNotInit ? pdl : pdl.initialize();
    };

})(jQuery, window);