; function Verification(sValue) {
    if (!Verification._initialize) {
        extend(Verification.prototype, IDataClass, IEventClass, {
            change: function (value) {
                var fn = this;
                fn.valueOf = typeof value == "undefined" || value == null ? null : value;
                fn.value = fn.valueOf == null ? "" : fn.valueOf.toString();
                return fn;
            },
            getType: function (sType) {
                if ($.isNumeric(sType)) {
                    switch (sType) {
                        case 1:
                            sType = ".";
                            break;
                        case 2:
                            sType = "\\s";
                            break;
                        case 3:
                            sType = "\\d";
                            break;
                        case 4:
                            sType = "[a-z]";
                            break;
                        case 5:
                            sType = "[a-zA-Z]";
                            break;
                        case 6:
                            sType = "[a-zA-Z0-9]";
                            break;
                        case 7:
                            sType = "[a-zA-Z0-9_]";
                            break;
                        case 8:
                            sType = "[\\u4e00-\\u9fa5]";
                            break;
                        case 9:
                            sType = "[~!@#\\$%\\^&*！#￥%……\\|]";
                            break;
                        default:
                            sType = "[\\s\\S]";
                            break;
                    }
                }
                return sType ? sType : "[\\s\\S]";
            },

            isAll: function (sType) {
                return new RegExp("^{0}+$".format(this.getType(sType))).test(this.valueOf);
            },
            isContinuous: function (iMin, iMax, sType) {
                iMin = iMin ? iMin : 0;
                iMax = iMax ? iMax : "";
                return new RegExp("{0}{{1},{2}}".format(this.getType(sType), iMin, iMax)).test(this.valueOf);
            },
            isCount: function (iMin, iMax, sType) {
                var fn = this;
                iMin = iMin ? iMin : 0;
                var reType = new RegExp(fn.getType(sType), "g");
                var iCount = 0;
                while (reType.exec(fn.valueOf) != null) {
                    iCount++;
                }
                return iCount >= iMin && (!iMax || (iMax && iCount <= iMax));
            },
            isDateTime: function () {
                var date = new Date(this.valueOf);
                return date.valueOf() > 0;
            },
            isEmail: function (bContain) {
                return (bContain ? /\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/ : /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(this.valueOf);
            },
            isEmpty: function () {
                return this.valueOf == "";
            },
            isHtml: function (bContain) {
                return (bContain ? /<.+(?:\/\s*>|>.*<\s*\/.+>)/ : /^<.+(?:\/\s*>|>.*<\s*\/.+>)$/).test(this.valueOf);
            },
            isMatch: function(sPattern) {
                return new RegExp(sPattern).test(this.valueOf);
            },
            //***
            isGuid: function (bContain) {
                return new RegExp(bContain ? "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}" : "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", "i").test(this.valueOf);
            },
            isIdentityCard: function (bContain) {
                return (bContain ? /(\d{6})(?!0{4})((?:\d{2})?\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))\d{2}(\d)(?:[0-9]|x|X)?/ : /^(\d{6})(?!0{4})((?:\d{2})?\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))\d{2}(\d)(?:[0-9]|x|X)?$/).test(this.valueOf);
            },
            isInteger: function (bContain) {
                return (bContain ? /[+-]?\d+/ : /^[+-]?\d+$/).test(this.valueOf);
            },
            isLength: function (iMin, iMax) {
                iMin = iMin ? iMin : 0;
                iMax = iMax ? iMax : "";
                return new RegExp("^[\\s\\S]{{0},{1}}$".format(iMin, iMax)).test(this.valueOf);
            },
            isMobilePhone: function (bContain) {
                return (bContain ? /([0\+]\d{2,3}-)?(1[3|4|5|8|7]\d{9})/ : /^([0\+]\d{2,3}-)?(1[3|4|5|8|7]\d{9})$/).test(this.valueOf);
            },
            isRepeat: function (iLength) {
                return new RegExp("([\\S]{{0},}).*\\1".format(iLength)).test(this.valueOf);
            },
            //***
            isTelPhone: function (bContain) {
                return (bContain ? /(([0\+]\d{2,3}-)?([0|4|8]\d{2,3})-?)([\d|-]{7,9})(-(\d{3,}))?/ : /^(([0\+]\d{2,3}-)?([0|4|8]\d{2,3})-?)([\d|-]{7,9})(-(\d{3,}))?$/).test(this.valueOf);
            },
            //***
            isUrl: function (bContain) {
                return (bContain ? /(http|ftp|https)(:\/\/)([-a-zA-Z0-9]+)(.[-a-zA-Z0-9]+)(.[a-zA-Z]{2,3}){1,2}\/{0,1}/ : /^(http|ftp|https)(:\/\/)([-a-zA-Z0-9]+)(.[-a-zA-Z0-9]+)(.[a-zA-Z]{2,3}){1,2}\/{0,1}$/).test(this.valueOf);
            },
            isVacancy: function () {
                return new RegExp("^\\s*&").test(this.valueOf);
            },
        });
        Verification._initialize = true;
    }
    var _ = this;
    _.change(sValue);
    return _;
};

;function ElementVerification(oParameter) {
    if (!ElementVerification._initialize) {
        $.extend(ElementVerification, {
            getObject: function (aElementVerification, oData, fnCallback, oParam) {
                var fn = this;
                oParam = $.extend({
                    "isKey": false,
                    "ignoreNotChange": true,
                }, oParam);
                var oResult = null;
                var bResult = true;
                var bTraversal;
                var iElementCount = aElementVerification.length;
                var iEventFlag = 0;
                for (var iK in aElementVerification) {
                    iElementCount--;
                    var ev = aElementVerification[iK];
                    var $this = ev.get("$", true);
                    var sName = ev.get("name");
                    if ($this && sName) {
                        var oValue = ev.get("getValue", true);
                        bTraversal = true;
                        if (ev.get("required")) {
                            if (oValue == null || oValue === "") {
                                bResult = false;
                            }
                        }
                        if (ev.get("writeOnce")) {
                            if (oData && oData[sName] != null && oData[sName] !== "") {
                                iEventFlag--;
                                bTraversal = false;
                            }
                        }
                        if (bTraversal) {
                            iEventFlag++;
                            ev.check(function (v, bFlag) {
                                var _ = this;
                                var sItemName = _.get("name");
                                var oItemValue = _.get("getValue", true);
                                iEventFlag--;
                                if (bFlag) {
                                    if (oData == null || (oParam.ignoreNotChange && oItemValue != oData[sItemName])) {
                                        if (!oResult) {
                                            oResult = {};
                                            if (oParam.isKey) {
                                                oResult.Key = [];
                                            }
                                            oResult.Value = {};
                                        }
                                        if (oResult.Key) {
                                            oResult.Key.push(sItemName);
                                        }
                                        oResult.Value[sItemName] = oItemValue;
                                    }
                                } else {
                                    if (!ev.get("errorSkip")) {
                                        bResult = false;
                                    }
                                }
                                if (iElementCount == 0 && iEventFlag == 0) {
                                    if (fnCallback && $.isFunction(fnCallback)) {
                                        fnCallback.call(fn, bResult ? oResult : null, bResult);
                                        fnCallback = undefined;
                                    }
                                }
                            });
                        }
                    }
                    if (!bResult) {
                        break;
                    }
                }
                if (!bResult) {
                    if (fnCallback && $.isFunction(fnCallback)) {
                        fnCallback.call(fn, false, false);
                        fnCallback = undefined;
                    }
                }
                return this;
            },
            getResult: function (aElementVerification, fnCallback) {
                var fn = this;
                var bResult = true;
                var iElementCount = aElementVerification.length;
                var iEventFlag = 0;
                for (var iK in aElementVerification) {
                    var ev = aElementVerification[iK];
                    iElementCount--;
                    iEventFlag++;
                    ev.check(function (v, bFlag) {
                        iEventFlag--;
                        if (!bFlag) {
                            bResult = false;
                        }
                        if (iElementCount == 0 && iEventFlag == 0) {
                            if (fnCallback && $.isFunction(fnCallback)) {
                                fnCallback.call(fn, bResult);
                                fnCallback = undefined;
                            }
                        }
                    });
                    if (!bResult) {
                        break;
                    }
                }
                if (!bResult) {
                    if (fnCallback && $.isFunction(fnCallback)) {
                        fnCallback.call(fn, false);
                        fnCallback = undefined;
                    }
                }
                return this;
            }
        });
        $.extend(ElementVerification.prototype, IDataClass, IEventClass, {
            check: function(fnCallback) {
                var _ = this;
                var oValue = _.get("getValue", true);
                _.one("verificationEnd", oValue, function() {
                    if (fnCallback && $.isFunction(fnCallback)) {
                        fnCallback.apply(_, arguments);
                    }
                }).get("verification").call(_, new Verification(oValue));
                return this;
            },
        });
        ElementVerification._initialize = true;
    }
    var obj = this;
    //参数
    obj._parameter = $.extend({
        //错误跳过
        errorSkip: false,
        //获取值
        getValue: function () {
            return this.get("$", true).val();
        },
        //名称
        name: null,
        //必填
        required: true,
        verification: function () {
            this.trigger("verificationEnd", true);
        },
        //只写一次
        writeOnce: false,
        //元素
        $: undefined,
        
        //verificationEnd[Function]{explain:验证结束事件,parameter:[结果布尔值]}
    }, oParameter);
    obj._configuration = {};
    obj._dataList = {};
    obj._eventList = {};
    return obj;
}

;
(function($, window, undefined) {

    /*
        oParameter[set]:{
            "writeOnce"[只写一次]: false,
            "required"[必填]: true,
            "errorSkip"[错误跳过]:false,
            "getValue"[获取值]: function() {
                return this.get("$", true).val();
            }
        }
        oParameter[get]:{
            "isKey"[是否返回Key]: false,
            "ignoreNotChange"[忽略没有改变项]: true,
        }
        VerificationEnd:回调事件
    */
    $.fn.verification = function(sName, fnEvent, oParameter) {
        var _ = $(this);
        var aResult = [];
        if (arguments.length <= 0 || typeof arguments[0] == "string" || arguments[0] instanceof String) {
            _.each(function() {
                var $this = $(this);
                var ev = $this.data("Verification");
                if (!ev) {
                    var o = { $: $this, name: sName };
                    if (fnEvent && $.isFunction(fnEvent)) {
                        o.verification = fnEvent;
                    }
                    ev = new ElementVerification($.extend(o, oParameter));
                    $this.data("Verification", ev);
                }
                aResult.push(ev);
            });
            return aResult.length == 1 ? aResult[0] : aResult;
        }
        _.each(function() {
            var ev = $(this).data("Verification");
            if (ev) {
                aResult.push(ev);
            }
        });
        if ($.isFunction(arguments[0])) {
            ElementVerification.getResult(aResult, arguments[0]);
            return _;
        }
        ElementVerification.getObject(aResult, arguments[0], fnEvent, oParameter);
        return _;
    };
})(jQuery, window);
