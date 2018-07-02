if (window.Ajax) {
    window.AjaxCompatibility = window.Ajax;
}
window.Ajax = function (sUrl, oData, fnCallback, oParameter, fnPreventCallback) {
    if (!window.Ajax._initialize) {
        $.extend(window.Ajax, {
            PostTimeout: 60000,
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
                            (oRequestData.Signature == oPostAjax.Data.Signature && oRequestParameter.Signature == oPostAjax.Signature &&
                                oRequestData.Type == oPostAjax.Data.Type && window.equals(oRequestData.Parameter, oPostAjax.Data.Parameter))) {
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
            },
        });
        window.Ajax._initialize = true;
    }
    var up = new window.UrlParam(sUrl).set("_", Math.random(0, 1));
    var parameter = {
        TypeName: "Type",
        url: up.href,
        dataType: "jsonp",
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
        },
    };
    if (oParameter == null) {
        oParameter = new Object();
    }
    oParameter.Signature = up.url;
    $.extend(parameter, oParameter);
    var type = parameter.data[parameter.TypeName];
    delete parameter.data[parameter.TypeName];
    delete parameter.TypeName;
    var data = { Type: type, Parameter: parameter.data, Url: new window.UrlParam().url, DateTime: new Date() };
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