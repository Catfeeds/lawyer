(function ($, window, undefined) {
    var isUnsupported = false;
    if (isIE()) {
        var vers = [5, 6, 7, 8, 9, 10];
        for (var i in vers) {
            if (isIE(vers[i])) {
                isUnsupported = true;
                break;
            }
        }
    }
    if (isUnsupported) {
        return;
    }
    $(function () {
        $("body").on("click", "[data-pjax]", function (event) {
            event.preventDefault();
            var $this = $(this);
            var oPjax = $.extend({}, $this.data("pjax") || {});
            var url = oPjax.url || $this.attr("data-pjax") || $this.attr("href") || location.href;
            var oState = $.extend(oPjax.state || {}, {
                url: url
            });
            delete oPjax.state;
            var oConfig = $.extend({
                resource: function ($content) {
                    var selector = "link,script";
                    return $content.filter(selector).add($content.find(selector));
                },
                separationResource: function ($content) {
                    if (!$content || $content.length <= 0) {
                        return null;
                    }
                    var $resource = oConfig.resource($content).remove();
                    $content = $content.not($resource);
                    return {
                        $resource: $resource,
                        $content: $content
                    };
                },
                queueLoad: function ($gather) {
                    var $item = $gather.eq(0).remove();
                    $gather = $gather.not($item);
                    if ($item.is("script") && $item.is("[src]")) {
                        $.getScript($item.attr("src"), function (data, status, jqxhr) {
                            oConfig.queueLoad($gather);
                        });
                        return;
                    }
                    if ($gather.length > 0) {
                        $item.load(function (e) {
                            oConfig.queueLoad($gather);
                        });
                    }
                    $item.appendTo($item.is("link") ? "head" : "body");
                    /*$($item.is("link") ? "head" : "body").append($item);*/
                    /*var documentItem = $item.get(0);
                    if ($gather.length > 0) {
                        documentItem.onload = function () {
                            oConfig.queueLoad($gather);
                        };
                    }
                    var $container = $($item.is("link") ? "head" : "body");
                    $container.get(0).insertBefore(documentItem, $container.children(":last").get(0));*/
                },
                resourceLoad: function ($resource) {
                    if (!$resource || $resource.length <= 0) {
                        return;
                    }
                    oConfig.queueLoad($resource);
                },
                contentLoad: function ($content) {
                }
            }, oPjax.config || {});
            delete oPjax.config;
            $.ajax(
                $.extend({
                    dataType: "text",
                    type: "POST"
                },
                    oPjax,
                    {
                        url: url,
                        success: function (oResult) {
                            if (oPjax.success) {
                                oPjax.success.apply(this, arguments);
                            }
                            oState.contents = oResult;
                            var $content = $(oResult);
                            if ($content.length > 0) {
                                var oSeparationResource = oConfig.separationResource($content);
                                if (oSeparationResource) {
                                    if (oSeparationResource.$content && oSeparationResource.$content.length > 0) {
                                        oConfig.contentLoad(oSeparationResource.$content);
                                    }
                                    if (oSeparationResource.$resource && oSeparationResource.$resource.length > 0) {
                                        oConfig.resourceLoad(oSeparationResource.$resource);
                                    }
                                }
                            }
                            history.replaceState(oState, null, url);
                        },
                        error: function () {
                            if (oPjax.error) {
                                oPjax.error.apply(this, arguments);
                            }
                        },
                        beforeSend: function () {
                            history.pushState(oState, null, url);
                            if (oPjax.beforeSend) {
                                oPjax.beforeSend.apply(this, arguments);
                            }
                        },
                        complete: function () {
                            if (oPjax.complete) {
                                oPjax.complete.apply(this, arguments);
                            }
                        }
                    })
            );
        });
        window.onpopstate = function (event) {
            if (!event.state) {
                return;
            }
            var sLoadEventName = "onpopstateload";
            if (event.state.contents && window[sLoadEventName] && typeof window[sLoadEventName] == "function") {
                window[sLoadEventName].call(this, event.state);
                return;
            }
            if (event.state.url) {
                location.href = event.state.url;
                return;
            }
        };
    });
})(jQuery, window);