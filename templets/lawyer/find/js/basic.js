
/*方法扩展*/
//合并对象属性
function extend(oDest, aSrc) {
    if (arguments.length > 0) {
        var sKey;
        var i;
        if (oDest instanceof Array) {
            for (i = 1; i < arguments.length; i++) {
                if (typeof(arguments[i]) == "undefined") {
                    continue;
                } else if (arguments[i] instanceof Array) {
                    oDest = oDest.concat(arguments[i]);
                } else {
                    for (sKey in arguments[i]) {
                        oDest[sKey] = arguments[i][sKey];
                    }
                }
            }
        } else {
            if (typeof oDest != "object" && typeof oDest != "function") {
                oDest = new Object();
            }
            if (aSrc instanceof Array) {
                for (i = 0; i < aSrc.length; i++) {
                    if (typeof(aSrc[i]) == "undefined") {
                        continue;
                    }
                    for (sKey in aSrc[i]) {
                        oDest[sKey] = aSrc[i][sKey];
                    }
                }
            } else {
                for (i = 1; i < arguments.length; i++) {
                    if (typeof(arguments[i]) == "undefined") {
                        continue;
                    }
                    for (sKey in arguments[i]) {
                        oDest[sKey] = arguments[i][sKey];
                    }
                }
            }
        }
        return oDest;
    } else {
        return null;
    }
}

//比较属性是否相等
function equals(o1, o2, aIgnoreAttribute) {
    if (!equals._initialize) {
        extend(equals, {
            //是否存在某值
            contains: function(aContainer, oValue) {
                for (var iK in aContainer) {
                    if (oValue == aContainer[iK]) {
                        return true;
                    }
                }
                return false;
            }
        });
        equals._initialize = true;
    }
    if (typeof o1 == "object" && typeof o2 == "object") {
        if (o1 == null) {
            if (o2 == null) {
                return true;
            } else {
                return false;
            }
        } else {
            if (o2 == null) {
                return false;
            } else {
                for (var i in o1) {
                    if (aIgnoreAttribute) {
                        if (equals.contains(aIgnoreAttribute, i)) {
                            continue;
                        }
                    }
                    if (!o2.hasOwnProperty(i)) {
                        return false;
                    }
                    if (!equals(o1[i], o2[i], aIgnoreAttribute)) {
                        return false;
                    }
                }
                for (var j in o2) {
                    if (aIgnoreAttribute) {
                        if (equals.contains(aIgnoreAttribute, j)) {
                            continue;
                        }
                    }
                    if (!o1.hasOwnProperty(j)) {
                        return false;
                    }
                    if (!equals(o2[j], o1[j], aIgnoreAttribute)) {
                        return false;
                    }
                }
                return true;
            }
        }
    } else {
        return o1 == o2;
    }
}

/*接口基类*/
//数据基类
function IDataClass() {};
extend(IDataClass, {
    isIData: true,
    get: function (sKey, bIsExecute) {
        var _ = this;
        if (!_._dataList) {
            _._dataList = new Object();
        }
        var oValue = typeof _._dataList[sKey] == "undefined" ? _._parameter ? _._parameter[sKey] : _._parameter : _._dataList[sKey];
        if (bIsExecute && oValue && typeof oValue == "function") {
            if (arguments.length > 2) {
                var arg = extend(new Array(), arguments);
                arg.splice(0, 2);
                return oValue.apply(this, arg);
            }
            return oValue.call(this);
        }
        return oValue;
    },
    set: function (sKey, oValue) {
        var _ = this;
        if (!_._dataList) {
            _._dataList = new Object();
        }
        var oData = new Object();
        if (typeof sKey == "string" || sKey instanceof String) {
            oData[sKey] = oValue;
            if (typeof oValue == "undefined") {
                delete _._dataList[sKey];
                if (_.isIEvent) {
                    _.trigger("removeEnd", sKey);
                }
            }
        } else {
            extend(oData, extend(new Array(), arguments));
        }
        _._dataList = extend(_._dataList, oData);
        if (_.isIEvent) {
            _.trigger("setEnd", oData);
        }
        return this;
    }
});

//事件基类
function IEventClass() {};
extend(IEventClass, {
    isIEvent: true,
    off: function (event) {
        var _ = this;
        if (!_._eventList) {
            _._eventList = new Object();
        }
        delete _._eventList[event];
        return this;
    },
    on: function (event, oData, fn) {
        var _ = this;
        if (typeof oData == "function") {
            fn = oData;
            oData = undefined;
        }
        if (!_._eventList) {
            _._eventList = new Object();
        }
        if (!_._eventList[event]) {
            _._eventList[event] = new Array();
        }
        _._eventList[event].push(function () {
            var arg = extend(new Array(), arguments);
            if (typeof oData != "undefined") {
                arg.unshift(oData);
            }
            return fn.apply(this, arg);
        });
        return this;
    },
    one: function (event, oData, fn) {
        var _ = this;
        if (typeof oData == "function") {
            fn = oData;
            oData = undefined;
        }
        if (!_._eventList) {
            _._eventList = new Object();
        }
        if (!_._eventList[event]) {
            _._eventList[event] = new Array();
        }
        var e = function () {
            var arg = extend(new Array(), arguments);
            if (typeof oData != "undefined") {
                arg.unshift(oData);
            }
            return fn.apply(this, arg);
        };
        e.isOne = true;
        _._eventList[event].push(e);
        return this;
    },
    trigger: function (event) {
        var arg = extend(new Array(), arguments);
        arg.shift();
        var _ = this;
        var oResult;
        if (_[event] && typeof _[event] == "function") {
            oResult = _[event].apply(this, arg);
        } else {
            if (!_._eventList) {
                _._eventList = new Object();
            }
            if (_._eventList[event]) {
                var aDelete = new Array();
                for (var i in _._eventList[event]) {
                    var e = _._eventList[event][i];
                    if (e && typeof e == "function") {
                        oResult = e.apply(this, arg);
                        if (e.isOne) {
                            aDelete.push(i);
                            delete _._eventList[event][i];
                        }
                    }
                }
                aDelete.reverse();
                for (var iK in aDelete) {
                    _._eventList[event].splice(aDelete[iK], 1);
                }
            }
        }
        return typeof oResult == "undefined" ? this : oResult;
    }
});

//String类方法扩展
extend(String.prototype, {
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
                    if (typeof (aParameter[key]) == "undefined") {
                        continue;
                    }
                    if (aParameter[key] == null) {
                        aParameter[key] = "";
                    }
                    sResult = sResult.replace(new RegExp("\\{" + key + "\\}", "g"), aParameter[key].toString());
                }
            } else {
                for (var i = 0; i < arguments.length; i++) {
                    if (typeof (arguments[i]) == "undefined") {
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
    },
    replaceIndex: function (sReplace, iIndex, iLength) {
        var fn = this.toString();
        if (fn || iIndex >= fn.length) {
            return fn;
        }
        iLength = iLength <= 0 ? (iIndex >= 0 ? fn.length - iIndex : -iIndex) : iLength;
        iIndex = iIndex < 0 ? fn.Length + iIndex : iIndex;
        var aString = new Array();
        var bFlag = false;
        for (var i in fn) {
            if (i <= iIndex || i >= iIndex + iLength) {
                if (!bFlag) {
                    aString.push(sReplace);
                    bFlag = true;
                }
                continue;
            }
            aString.push(fn.charAt(i));
        }
        return aString.join("");
    },
    trim: function() {
        var fn = this;
        var re = new RegExp("(?:^\\s+)|(?:\\s+$)", "gm");
        return fn.replace(re, "");
    }
});
//Number类方法扩展
//[toFixed, toExponential, toPrecision]
extend(Number.prototype, {
    /*
    //处理数字
    //iLength:数字长度
    //iFixed:小数位长度
    */
    dispose: function (iLength, iFixed) {
        var oF = new Format(this);
        return oF.dispose(iLength, iFixed);
    },
    format: function (sFormat) {
        var oF = new Format(this);
        return oF.toString(sFormat);
    },
    number: function (sSymbol, iLength) {
        var oF = new Format(this);
        return oF.number(sSymbol, iLength);
    }
});

/*对象扩充*/
//数据
function Data() {}
extend(Data, {
    arrayClear: function(aData, iK, fnChick) {
        if (aData == null || aData.length <= 0 || iK >= aData.length) {
            return false;
        }
        if (typeof fnChick == "function" ? fnChick.call(aData, aData[iK], iK) : aData[iK] == null) {
            aData.splice(iK, 1);
            this.arrayClear(aData, iK, fnChick);
            return true;
        }
        return false;
    },
    arrayEmpty: function(aData, fnChick) {
        for (var iK in aData) {
            this.arrayClear(aData, iK, fnChick);
        }
        return aData;
    },
    isNull: function(oData, oDefault) {
        return oData == null ? oDefault : oData;
    }
});

//字符串缓冲
function StringBuffer(sString) {
    if (!StringBuffer._initialize) {
        extend(StringBuffer.prototype, {
            append: function (sValue) {
                var fn = this;
                sValue = sValue.toString();
                fn._aString.push(sValue);
                fn.length += sValue.length;
                return fn;
            },
            appendFormat: function (sFormat, oValue) {
                var fn = this;
                var sValue;
                if (arguments.length == 2) {
                    sValue = sFormat.format(oValue);
                    fn._aString.push(sValue);
                    fn.length += sValue.length;
                } else {
                    var aValue = new Array();
                    for (var i = 0; i < arguments.length - 1; i++) {
                        aValue[i] = arguments[i + 1];
                    }
                    sValue = String.prototype.format.apply(sFormat, aValue);
                    fn._aString.push(sValue);
                    fn.length += sValue.length;
                }
                return fn;
            },
            toString: function () {
                var fn = this;
                return fn._aString.join("");
            }
        });
        StringBuffer._initialize = true;
    }
    this._aString = new Array();
    this.length = 0;
    if (typeof sString != "undefined") {
        this.append(sString);
    }
    return this;
}

//日期时间
function DateTime(dDate) {
    if (!DateTime._initialize) {
        extend(DateTime, {
            _oRegExFormat: {
                year: new RegExp("y+", "mg"),
                month: new RegExp("M+", "mg"),
                day: new RegExp("d+", "mg"),
                Hour: new RegExp("H+", "mg"),
                hour: new RegExp("h+", "mg"),
                minute: new RegExp("m+", "mg"),
                second: new RegExp("s+", "mg"),
                millisecond: new RegExp("f+", "mg")
            },
            now: function() {
                return new DateTime();
            },
            toDate: function (sSource, sFormat) {
                var dResult = new Date(sSource);
                if (dResult.valueOf() > 0) {
                    return dResult;
                }
                sFormat = sFormat ? sFormat : "yyyy/M/d H:m:s";
                var aKeyIndex = new Array();
                var sRegExp = sFormat.replace(/[\*\.\?\+\$\^\[\]\(\)\{\}\|\\\/]/g, "\\$&");
                if ((aMate = DateTime._oRegExFormat["day"].exec(sFormat)) != null) {
                    aKeyIndex[2] = aMate.index;
                    sRegExp = sRegExp.replace(DateTime._oRegExFormat["day"], "(\\d{1,2})");
                } else {
                    aKeyIndex[2] = null;
                }
                if ((aMate = DateTime._oRegExFormat["year"].exec(sFormat)) != null) {
                    aKeyIndex[0] = aMate.index;
                    sRegExp = sRegExp.replace(DateTime._oRegExFormat["year"], "(\\d{1,4})");
                } else {
                    aKeyIndex[0] = null;
                }
                if ((aMate = DateTime._oRegExFormat["month"].exec(sFormat)) != null) {
                    aKeyIndex[1] = aMate.index;
                    sRegExp = sRegExp.replace(DateTime._oRegExFormat["month"], "(\\d{1,2})");
                } else {
                    aKeyIndex[1] = null;
                }
                if ((aMate = DateTime._oRegExFormat["Hour"].exec(sFormat)) != null) {
                    aKeyIndex.push(aMate.index);
                    sRegExp = sRegExp.replace(DateTime._oRegExFormat["Hour"], "(\\d{1,2})");
                } else {
                    if ((aMate = DateTime._oRegExFormat["hour"].exec(sFormat)) != null) {
                        aKeyIndex.push(aMate.index);
                        sRegExp = sRegExp.replace(DateTime._oRegExFormat["hour"], "(\\d{1,2})");
                    } else {
                        aKeyIndex.push(null);
                    }
                }
                if ((aMate = DateTime._oRegExFormat["minute"].exec(sFormat)) != null) {
                    aKeyIndex.push(aMate.index);
                    sRegExp = sRegExp.replace(DateTime._oRegExFormat["minute"], "(\\d{1,2})");
                } else {
                    aKeyIndex.push(null);
                }
                if ((aMate = DateTime._oRegExFormat["second"].exec(sFormat)) != null) {
                    aKeyIndex.push(aMate.index);
                    sRegExp = sRegExp.replace(DateTime._oRegExFormat["second"], "(\\d{1,2})");
                } else {
                    aKeyIndex.push(null);
                }
                if ((aMate = DateTime._oRegExFormat["millisecond"].exec(sFormat)) != null) {
                    aKeyIndex.push(aMate.index);
                    sRegExp = sRegExp.replace(DateTime._oRegExFormat["millisecond"], "(\\d{1,3})");
                } else {
                    aKeyIndex.push(null);
                }
                var aKeySort = new Array().concat(aKeyIndex).sort(function (iA, iB) {
                    return iA == null ? true : iB == null ? false : iA - iB;
                });
                var aResult = new RegExp(sRegExp).exec(sSource);
                if (aResult == null) {
                    return null;
                }
                var aParameter = new Array();
                for (var iK in aKeyIndex) {
                    if (aKeyIndex[iK] == null) {
                        aParameter.push(null);
                        continue;
                    }
                    for (var iL in aKeySort) {
                        if (aKeySort[iL] == aKeyIndex[iK]) {
                            aParameter.push(iK == 1 ? +aResult[+iL + 1] - 1 : +aResult[+iL + 1]);
                            break;
                        }
                    }
                }
                return new Date(aParameter[0], aParameter[1], aParameter[2], aParameter[3], aParameter[4], aParameter[5], aParameter[6]);
            }
        });
        extend(DateTime.prototype, {
            add: function (iTimeSpan) {
                if (typeof iTimeSpan == "number" || iTimeSpan instanceof Number) {
                    return new DateTime(this.valueOf() + iTimeSpan);
                }
                return null;
            },
            addDay: function(iDay) {
                return this.add(24 * 60 * 60 * 1000 * iDay);
            },
            getDate: function () {
                var fn = this;
                return fn._date;
            },
            toJson: function () {
                var fn = this;
                return "/Date(" + fn._value + ")/";
            },
            toString: function (sFormat) {
                var fn = this;
                if (!sFormat) {
                    sFormat = "yyyy/M/d H:m:s";
                }
                var sResult = sFormat;
                var aResult;
                var sMatch;
                var iValue;
                iValue = fn["year"];
                while ((aResult = DateTime._oRegExFormat["year"].exec(sResult)) != null) {
                    sMatch = aResult[0];
                    if (sMatch.length == 1 || sMatch.length == 2 || sMatch.length == 4) {
                        sResult = sResult.replace(sMatch, new Format(iValue).dispose(sMatch.length));
                    }
                }
                iValue = fn["month"];
                while ((aResult = DateTime._oRegExFormat["month"].exec(sResult)) != null) {
                    sMatch = aResult[0];
                    switch (sMatch.length) {
                        case 1:
                            sResult = sResult.replace(sMatch, iValue.toString());
                            break;
                        case 2:
                            sResult = sResult.replace(sMatch, new Format(iValue).dispose(2));
                            break;
                    }
                }
                iValue = fn["day"];
                while ((aResult = DateTime._oRegExFormat["day"].exec(sResult)) != null) {
                    sMatch = aResult[0];
                    switch (sMatch.length) {
                        case 1:
                            sResult = sResult.replace(sMatch, iValue.toString());
                            break;
                        case 2:
                            sResult = sResult.replace(sMatch, new Format(iValue).dispose(2));
                            break;
                    }
                }
                iValue = fn["hour"];
                while ((aResult = DateTime._oRegExFormat["Hour"].exec(sResult)) != null) {
                    sMatch = aResult[0];
                    switch (sMatch.length) {
                        case 1:
                            sResult = sResult.replace(sMatch, iValue.toString());
                            break;
                        case 2:
                            sResult = sResult.replace(sMatch, new Format(iValue).dispose(2));
                            break;
                    }
                }
                iValue = fn["hour"] > 12 ? fn["hour"] - 12 : fn["hour"];
                while ((aResult = DateTime._oRegExFormat["hour"].exec(sResult)) != null) {
                    sMatch = aResult[0];
                    switch (sMatch.length) {
                        case 1:
                            sResult = sResult.replace(sMatch, iValue.toString());
                            break;
                        case 2:
                            sResult = sResult.replace(sMatch, new Format(iValue).dispose(2));
                            break;
                    }
                }
                iValue = fn["minute"];
                while ((aResult = DateTime._oRegExFormat["minute"].exec(sResult)) != null) {
                    sMatch = aResult[0];
                    switch (sMatch.length) {
                        case 1:
                            sResult = sResult.replace(sMatch, iValue.toString());
                            break;
                        case 2:
                            sResult = sResult.replace(sMatch, new Format(iValue).dispose(2));
                            break;
                    }
                }
                iValue = fn["second"];
                while ((aResult = DateTime._oRegExFormat["second"].exec(sResult)) != null) {
                    sMatch = aResult[0];
                    switch (sMatch.length) {
                        case 1:
                            sResult = sResult.replace(sMatch, iValue.toString());
                            break;
                        case 2:
                            sResult = sResult.replace(sMatch, new Format(iValue).dispose(2));
                            break;
                    }
                }
                iValue = fn["millisecond"] / 1000.0;
                while ((aResult = DateTime._oRegExFormat["minute"].exec(sResult)) != null) {
                    sMatch = aResult[0];
                    if (sMatch.length > 0 && sMatch.length <= 3) {
                        sResult = sResult.replace(sMatch, new Format(iValue).dispose(undefined, sMatch.length));
                    }
                }
                return sResult;
            },
            valueOf: function () {
                var fn = this;
                return fn._value;
            }
        });
        DateTime._initialize = true;
    }

    if (!dDate) {
        dDate = new Date();
    } else if (typeof dDate == "number" || dDate instanceof Number) {
        dDate = new Date(dDate);
    } else if (typeof dDate == "string" || dDate instanceof String) {
        var aMate;
        if ((aMate = new RegExp("^\\/Date\\((.+?)\\)\\/$").exec(dDate)) != null) {
            dDate = new Date(parseInt(aMate[1], 10));
        } else {
            dDate = DateTime.toDate(dDate, arguments[1]);
        }
    }
    this._date = dDate;
    this._value = dDate.getTime();
    this.year = dDate.getFullYear();
    this.month = dDate.getMonth() + 1;
    this.day = dDate.getDate();
    this.dayOfWeek = dDate.getDay();
    this.hour = dDate.getHours();
    this.minute = dDate.getMinutes();
    this.second = dDate.getSeconds();
    this.millisecond = dDate.getMilliseconds();

    return this;
}

//格式化
function Format(sSource) {
    if (!Format._initialize) {
        extend(Format.prototype, {
            /*
            //处理
            //iLength:数字长度
            //iFixed:小数位长度
            */
            dispose: function (iLength, iFixed) {
                var fn = this;
                if (iLength === 0) {
                    return "";
                }
                var aNumber = fn.source.toString().split(".");
                var sNumber = fn.source.toString().replace(".", "");
                if (aNumber.length < 2) {
                    aNumber[1] = "";
                }
                if (iFixed !== 0 && (!iFixed || iFixed <= 0)) {
                    iFixed = aNumber[1].length;
                }
                if (!iLength || iLength <= 0) {
                    iLength = aNumber[0].length + iFixed;
                }
                if (iLength - iFixed < aNumber[0].length) {
                    iFixed = iLength - aNumber[0].length;
                    if (iFixed < 0) {
                        iFixed = 0;
                    }
                }
                var iNLength = iLength - iFixed;
                var aN = new Array(iNLength);
                var aF = new Array(iFixed);
                for (var i = 0; i < iLength; i++) {
                    if (i < iNLength) {
                        if (i < aNumber[0].length) {
                            aN[iNLength - 1 - i] = aNumber[0].charAt(aNumber[0].length - 1 - i);
                        } else {
                            aN[iNLength - 1 - i] = "0";
                        }
                    } else {
                        aF[i] = aNumber[1].charAt(i - iNLength);
                        if (!aF[i]) {
                            aF[i] = "0";
                        }
                    }
                }
                var sResult = aF.length > 0 ? new Array(aN.join(""), ".", aF.join("")).join("") : aN.join("");
                if (sNumber.length > iLength) {
                    var iV = parseInt(sNumber.charAt(iLength - 1));
                    if (parseInt(sNumber.charAt(iLength)) >= 5) {
                        sResult[sResult.length - 1] = (iV + 1).toString();
                    }
                }
                return sResult;
            },
            division: function (sSymbol, iLength) {
                var fn = this;
                var sString = fn.source.toString();
                if (!sSymbol) {
                    sSymbol = " ";
                }
                if (!iLength) {
                    iLength = 4;
                }
                var aString = new Array();
                for (var i = 0; i < sString.length; i++) {
                    aString.push(sString.charAt(sString.length - i - 1));
                    if ((i + 1) % iLength == 0 && i != sString.length - 1) {
                        aString.push(sSymbol);
                    }
                }
                return aString.reverse().join("");
            },
            //格式化替换
            format: function () {
                var fn = this;
                return fn.source.toString().format.apply(fn.source.toString(), arguments);
            },
            /*
            //数字千分位分割
            */
            number: function (sSymbol, iLength) {
                var fn = this;
                var sString = fn.source.toString();
                var aString = sString.split(".");
                if (!sSymbol) {
                    sSymbol = ",";
                }
                if (!iLength) {
                    iLength = 3;
                }
                return aString.length == 1 ? new Format(aString[0]).division(sSymbol, iLength) : new Array(new Format(aString[0]).division(sSymbol, iLength), ".", aString[1]).join("");
            },
            toDate: function (sFormat) {
                var fn = this;
                return new DateTime(fn.source, sFormat)._date;
            },
            toString: function (sFormat) {
                var fn = this;
                if (fn.source instanceof Date) {
                    return new DateTime(fn.source).toString(sFormat);
                }
                if (fn.source instanceof DateTime) {
                    return fn.source.toString(sFormat);
                }
                var iNumber = parseFloat(fn.source);
                var sNumber = fn.source.toString();
                if (!sFormat) {
                    return sNumber;
                }
                var rgFormat = new RegExp("(.*?[a-z](?=\\d|$))(\\d+)?(?:,(\\d+))?", "i");
                var aMatch = rgFormat.exec(sFormat);
                if (aMatch == null) {
                    return sNumber;
                }
                var sResult;
                var iLength1 = aMatch[2] ? parseInt(aMatch[2]) : undefined;
                var iLength2 = aMatch[3] ? parseInt(aMatch[3]) : undefined;
                switch (aMatch[1].toString().toLocaleUpperCase()) {
                    case "C":
                        sResult = "¥" + new Format(fn.dispose(undefined, iLength1 ? iLength1 : 2)).number();
                        break;
                    case "D":
                        sResult = iNumber.toPrecision(iLength1);
                        break;
                    case "DI":
                        sResult = fn.dispose(iLength1, iLength2);
                        break;
                    case "E":
                        sResult = iNumber.toExponential(iLength1 >= 0 ? iLength1 : 2);
                        break;
                    case "F":
                        sResult = iNumber.toFixed(iLength1 >= 0 ? iLength1 : 2);
                        break;
                    case "N":
                        sResult = new Format(fn.dispose(undefined, iLength1)).number();
                        break;
                    case "P":
                        sResult = new Format(new Format(iNumber * 100).dispose(undefined, iLength1)).number() + "%";
                        break;
                    case "X":
                        sResult = iNumber.toString(16);
                        break;
                    default:
                        sResult = sNumber;
                }
                return sResult;
            }
        });
        Format._initialize = true;
    }
    this.source = (typeof sSource == "undefined" || sSource == null) ? "" : sSource;
}

//Cookie类
function Cookie() {
    if (!Cookie._initialize) {
        extend(Cookie.prototype, {
            /*
            //创建Cookie对象
            //name:cookie名称
            //value:cookie值
            //expires:cookie过期时间(秒)
            //path:cookie路径
            //domain:cookie域
            */
            _creation: function (name, value, domain, path, expires) {
                var fn = this;
                var oCookie = new Object();
                if (!name) {
                    return null;
                }
                if (typeof value == "undefined" || value == null) {
                    value = "";
                }
                domain = domain ? domain : fn.domain;
                if (domain) {
                    domain = domain.replace(new RegExp("^\\.*"), ".");
                }
                path = path == null ? fn.path : (path == "" ? "/" : path);
                if (expires != null) {
                    if (typeof expires == "number") {
                        var dNow = new Date();
                        dNow.setTime(dNow.getTime() + expires * 1000);
                        expires = dNow;
                    }
                } else {
                    expires = "";
                }
                var trim = new RegExp("(?:^\\s+)|(?:\\s+$)", "gm");
                oCookie.name = name.toString().replace(trim, "");
                oCookie.value = value.toString().replace(trim, "");
                oCookie.domain = domain;
                oCookie.path = path;
                oCookie.expires = expires.toString();
                return oCookie;
            },
            _init: function () {
                var fn = this;
                fn.cookie = new Array();
                if (window.document.cookie.length > 0) {
                    var aList = window.document.cookie.split(";");
                    for (var index in aList) {
                        var sCookie = aList[index];
                        var aKv = sCookie.split("=");
                        fn.cookie.push(fn._creation(aKv[0], sCookie.slice(aKv[0].length + 1)));
                    }
                }
                return fn;
            },
            /*
            //获取Cookie
            //name:cookie名称
            */
            get: function(name) {
                var fn = this;
                fn._init();
                for (var i in fn.cookie) {
                    var oCookie = fn.cookie[i];
                    if (oCookie.name == name) {
                        return oCookie.value;
                    }
                }
                return null;
            },
            /*
            //移除Cookie
            //name:cookie名称
            //path:cookie路径
            //domain:cookie域
            */
            remove: function (name, path, domain) {
                var fn = this;
                var dNow = new Date();
                var oCookie;
                if (name) {
                    oCookie = fn._creation(name, "", domain, path, 0);
                } else {
                    for (var i in fn.cookie) {
                        var oC = fn.cookie[i];
                        if (typeof oC == "undefined" || oC == null) {
                            continue;
                        }
                        if (oC.name != name) {
                            continue;
                        }
                        if (oC.path != path && path && oC.path) {
                            continue;
                        }
                        if (oC.domain != domain && domain && oC.domain) {
                            continue;
                        }
                        fn.cookie[i].value = "";
                        fn.cookie[i].expires = dNow;
                        oCookie = fn.cookie[i];
                    }
                }
                if (oCookie) {
                    window.document.cookie = "{name}={value};domain={domain};path={path};expires={expires};".format(oCookie);
                }
                return fn;
            },
            /*
            //设置Cookie
            //name:cookie名称
            //value:cookie值
            //expires:cookie过期时间(秒)/Data
            //path:cookie路径
            //domain:cookie域
            */
            set: function(name, value, expires, path, domain) {
                var fn = this;
                var oCookie = fn._creation(name, value, domain, path, expires);
                if (oCookie != null) {
                    var bFlag = false;
                    for (var i in fn.cookie) {
                        var oItem = fn.cookie[i];
                        if (typeof oItem == "undefined" || oItem == null) {
                            continue;
                        }
                        if (oItem.name != name) {
                            continue;
                        }
                        if (oItem.path != path && path && oItem.path) {
                            continue;
                        }
                        if (oItem.domain != domain && domain && oItem.domain) {
                            continue;
                        }
                        fn.cookie[i].value = oCookie.value;
                        fn.cookie[i].expires = oCookie.expires;
                        bFlag = true;
                    }
                    if (!bFlag) {
                        fn.cookie.push(oCookie);
                    }
                    window.document.cookie = "{name}={value};domain={domain};path={path};expires={expires};".format(oCookie);
                }
                return fn;
            }
        });
        Cookie._initialize = true;
    }
    this._cookie = window.document.cookie;
    this.cookie = new Array();
    this.domain = "";
    this.path = "";
    this._init();
    return this;
};

/*
//url参数类
//uniformResourceLocator[default:(默认当前地址)]:url地址
*/
function UrlParam(uniformResourceLocator) {
    if (!UrlParam._initialize) {
        extend(UrlParam, {
            _oRegExUrl: {
                hash: new RegExp("(#.*?$)"),
                host: new RegExp("(?:\\/\\/)(.*?)(?=[\\/\\?&#]|$)"),
                hostname: new RegExp("(?:\\/\\/)(.*?)(?=[:\\/\\?&#]|$)"),
                pathname: new RegExp("(?:\\/\\/.*?)?(\\/.*?)(?=[\\?&#]|$)"),
                port: new RegExp("(?:\\/\\/.*:)(\d+)"),
                protocol: new RegExp("(^.*?)(?=\\/\\/)"),
                search: new RegExp("(\\?.*?)(?=[#]|$)")
            },
            _reParam: new RegExp("(?:^|[\\?&])([_a-z]+)=(.*?)(?=[&#]|$)", "gi")
        });
        extend(UrlParam.prototype, {
            _init: function() {
                var fn = this;
                var sb = new StringBuffer();
                for (var sName in fn.param) {
                    var sValue = fn.param[sName];
                    if (typeof sValue == "undefined" || sValue == null) {
                        continue;
                    }
                    if (sb.length > 0) {
                        sb.appendFormat("&{0}={1}", sName, sValue);
                    } else {
                        sb.appendFormat("?{0}={1}", sName, sValue);
                    }
                }
                fn.search = sb.toString();
                fn.href = "{0}//{1}{2}{3}{4}{5}".format(fn.protocol, fn.hostname, fn.port ? (":" + fn.port) : "", fn.pathname, fn.search, fn.hash);
                return fn;
            },
            get: function(name) {
                var fn = this;
                return fn.param[name];
            },
            reload: function(bForceGet) {
                var fn = this;
                window.location.reload(bForceGet);
                return fn;
            },
            remove: function(name) {
                var fn = this;
                delete fn.param[name];
                fn._init();
                return this;
            },
            replace: function() {
                var fn = this;
                window.location.replace(fn.href);
                return fn;
            },
            set: function(name, value) {
                var fn = this;
                if (typeof name == "string" || name instanceof String) {
                    try {
                        fn.param[name] = decodeURI(value);
                    } catch(exception) {
                        fn.param[name] = value;
                    }
                } else {
                    extend(fn.param, extend(new Array(), arguments));
                }
                fn._init();
                return this;
            },
            toString: function() {
                var fn = this;
                return fn.href;
            }
        });
        UrlParam._initialize = true;
    }
    uniformResourceLocator = uniformResourceLocator ? uniformResourceLocator : window.location.href;
    this.href = uniformResourceLocator;
    this.hash = "";
    this.host = window.location.host;
    this.hostname = window.location.hostname;
    this.pathname = "/";
    this.port = window.location.port;
    this.protocol = window.location.protocol;
    this.search = "";
    this.url = "";
    this.param = new Object();

    var aResult;
    for (var sKey in UrlParam._oRegExUrl) {
        if ((aResult = UrlParam._oRegExUrl[sKey].exec(this.href)) != null) {
            this[sKey] = aResult[1];
        }
    }
    if (this.search) {
        while ((aResult = UrlParam._reParam.exec(this.search)) != null) {
            try {
                this.param[aResult[1]] = decodeURI(aResult[2]);
            } catch (e) {
                this.param[aResult[1]] = aResult[2];
            }
        }
    }
    this.url = "{0}//{1}{2}{3}".format(this.protocol, this.hostname, this.port ? (":" + this.port) : "", this.pathname);
    return this;
}

/*
//是否是IE浏览器
//ver:验证的版本号
*/
var isIE = function (ver) {
    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
}

/*
//Ajax请求
//sUrl:请求地址
//oData;传递数据
//fnCallback:成功回调函数(携带参数：this,响应对象)
//oParameter:参数对象{
    options[Object](AJAX 请求设置),
    beforeSend(XHR)[Function](在发送请求之前调用),
    error(XHR,String,Exception)[Function](在请求出错时调用),
    dataFilter[Function](在请求成功之后调用),
    success(Object,String)[Function](当请求之后调用),
    complete(XHR, TS)[Function](请求完成后回调函数(请求成功或失败之后均调用)),

    async[Boolean][default:true],
    cache[Boolean][default:dataType==("script"||"jsonp")?false:true],
    contentType[String][default:"application/x-www-form-urlencoded"],
    context[Object][default:options],
    data[String],
    dataType[String]["xml","html","script","json","jsonp","text"],
    global[Boolean][default:true],
    ifModified[Boolean][default:false],
    jsonp[String][default:"callback"],
    jsonpCallback[String][default:(自动生成的随机函数名)],
    password[String],
    processData[Boolean][default:true],
    scriptCharset[Boolean][where:dataType==("jsonp"||"script")&&type=="GET"],
    traditional[Boolean][default:false],
    timeout[Number][毫秒],
    type[String]["POST","GET","PUT","DELETE"][default:"GET"],
    url[String][default:(当前页地址)],
    username[String],
    xhr[Function][return:XMLHttpRequest][default:IE?ActiveXObject:XMLHttpRequest]
    }
//fnPreventCallback:阻止请求回调
*/

window.Ajax = function (sUrl, oData, fnCallback, oParameter, fnPreventCallback) {
    if (!window.Ajax._initialize) {
        $.extend(window.Ajax, {
            PostTimeout: 3000,
            fnRequestPrevent: function (oRequestData, oRequestParameter, sRequestType) {
                if (!window.Ajax.fnRequestPrevent._initialize) {
                    $.extend(window.Ajax.fnRequestPrevent, {
                        PostAjaxArray: new Array()
                    });
                    window.Ajax.fnRequestPrevent._initialize = true;
                }
                if (sRequestType.toLocaleUpperCase() != "POST") {
                    return true;
                }
                if (oRequestParameter == null) {
                    oRequestParameter = new Object();
                }
                if (!oRequestParameter["PostTimeout"]) {
                    oRequestParameter["PostTimeout"] = window.Ajax.PostTimeout;
                }
                window.Data.arrayEmpty(Ajax.fnRequestPrevent.PostAjaxArray, function (oM) {
                    return oM == null || (oRequestData.DateTime - oM.Data.DateTime >= oM["PostTimeout"]);
                });
                var bPostFlag = true;
                for (var iK in Ajax.fnRequestPrevent.PostAjaxArray) {
                    var oPostAjax = Ajax.fnRequestPrevent.PostAjaxArray[iK];
                    if (bPostFlag) {
                        if ((oRequestData["CompareId"] && oRequestData["CompareId"] == oPostAjax["CompareId"]) ||
                            (oRequestData.Url == oPostAjax.Data.Url && oRequestParameter.Url == oPostAjax.Url &&
                                oRequestData.Type == oPostAjax.Data.Type && equals(oRequestData.Data, oPostAjax.Data.Data))) {
                            oPostAjax.Data.DateTime = oRequestData.DateTime;
                            bPostFlag = false;
                        }
                    }
                }
                if (bPostFlag) {
                    oRequestParameter.Data = oRequestData;
                    Ajax.fnRequestPrevent.PostAjaxArray.push(oRequestParameter);
                }
                return bPostFlag;
            }
        });
        window.Ajax._initialize = true;
    }
    var up = new UrlParam(sUrl).set("_", Math.random(0, 1));
    var parameter = {
        TypeName: "Type",
        url: up.href,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        cache: false,
        type: "GET",
        data: oData,
        error: function () {
            console.log("网络繁忙，请稍后再试");
        },
        success: function (oResponse) {
            if (fnCallback && $.isFunction(fnCallback)) {
                fnCallback.call(this, oResponse);
            }
        }
    };
    if (oParameter == null) {
        oParameter = new Object();
    }
    oParameter.Url = up.url;
    $.extend(parameter, oParameter);
    var type = parameter.data[parameter.TypeName];
    delete parameter.data[parameter.TypeName];
    delete parameter.TypeName;
    var data = { Type: type, Data: parameter.data, Url: new UrlParam().url, DateTime: new Date() };
    if (window.Ajax.fnRequestPrevent(data, oParameter, parameter.type)) {
        delete parameter["CompareId"];
        delete parameter["PostTimeout"];
        parameter.data = { request: JSON.stringify(data) };
        $.ajax(parameter);
    } else {
        if (parameter.complete && $.isFunction(parameter.complete)) {
            parameter.complete();
        }
        if (fnPreventCallback && $.isFunction(fnPreventCallback)) {
            fnPreventCallback.call(this, parameter);
        } else {
            alert("操作频繁，请稍后再试");
        }
    }
};
