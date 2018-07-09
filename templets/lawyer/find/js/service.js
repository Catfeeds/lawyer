$(function () {
    $(".tel-f .btn-oe2").hover(function () {
        $(".tel-f-pop").toggleClass("block");
    });

    $(".lawmore-ts").hover(function () {
        $(this).find(".law-e-pop").toggleClass("block");
    });
});

//选择专长预约见面
var s_zc;
$(".pn-more li").bind("click", function () {
    $(".pn-on").text($(this).text());
    s_zc = $(this).val();
    $("#a_Search").attr("href", function (i, origValue) {
        return origValue.substring(0, origValue.lastIndexOf('&')) + "&cateid=" + s_zc;
    });
});

//收藏网址
function addFavorite() {
    var iserror = 0;
    try {
        if (document.all) {
            window.external.addFavorite(document.URL, document.title);
        }
        else if (window.sidebar) {
            window.sidebar.addPanel(document.title, document.URL, "");
        } else iserror = 1;
    } catch (e) { iserror = 1; }
    if (iserror > 0) {
        alert("请按Ctrl+D添加到收藏夹!");
    }
}

//包装AJAX请求
function doAjax(url, data, callback, type) {
    $.ajax({
        url: url + '?_=' + Math.random(0, 1),
        dataType: type ? type : 'xml',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        cache: false,
        type: 'POST',
        data: data,
        success: function (response) {
            if (callback && $.isFunction(callback)) callback(response);
        },
        error: function () {
            console.log("网络繁忙，请稍后再试");
        }
    });
}