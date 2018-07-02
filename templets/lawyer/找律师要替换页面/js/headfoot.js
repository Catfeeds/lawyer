// JavaScript Document
$(document).ready(function () {

    // top 会员菜单
    $(".user-login").hover(function () {
        $(this).toggleClass("s-l-hover");
    });

    // footer 二维码
    $(".f-td-n").hover(function () {
        $(this).next('.f-td-ew ').toggleClass('none');
    });

    // 快捷入口
    $(".sk-saix").click(function() {
        $(this).toggleClass("sk-saix-click");
        $(".sk-lei").toggleClass("none");
    });

    // 发需求
    $(".fa-xq").hover(function() {
        $(this).find(".down-list").toggleClass("none");
    });

    // 主导航
    $(".g-nv li").hover(function () {
        $(this).addClass("ft-nv-hover");
        $(this).find(".down-list").removeClass("none");
    }, function () {
        $(this).removeClass("ft-nv-hover");
        $(this).find(".down-list").addClass("none");
    });

    // 主导航 二维码
    $(".i-nv-er").hover(function() {
        $(this).next(".nv-er-pop").removeClass("none");
    }, function() {
        $(this).next(".nv-er-pop").addClass("none");
    });

    $(".sk-k").hover(function () {
        $(".sk-tip").toggleClass("none");
    });

    // 2017 头部 新年广告
    setTimeout(actMove, 5000);
    function actMove() {
        $('.bg-act').find('.act-img').animate({
            height: 0
        }, 500, function () {
            $('.bg-act').removeClass('bg-act-unfold');
            $('.bg-act').find('.act-tips').fadeIn(200);
            // console.log(parent.hasClass('bg-act-unfold'));
        });
    }

    $('.bg-act').on('click', '.act-tips-close', function () {
        $(this).parent('.act-tips').fadeOut(200);
    }).on('click', '.act-btn', function () {
        var parent = $(this).parents('.bg-act');

        if (parent.hasClass('bg-act-unfold')) {
            $(this).prevAll('.act-img').animate({
                height: 0
            }, 500, function () {
                parent.removeClass('bg-act-unfold');
                parent.find('.act-tips').fadeIn(200);
                // console.log(parent.hasClass('bg-act-unfold'));
            });
        } else {
            $(this).prevAll('.act-img').animate({
                height: 240
            }, 500, function () {
                parent.addClass('bg-act-unfold');
                // console.log(parent.hasClass('bg-act-unfold'));
            });
        }
    });
    //地区切换
    $('.s-diqu-box').hover(function () {
        $(this).toggleClass('s-diqu-hover');
    });
    $(".s-n-tab span").hover(function () {
        $(this).addClass("tab-click").siblings().removeClass("tab-click");
        var index = $(this).index();
        $(".s-n-citylist").eq(index).removeClass('none').siblings().addClass('none');
    });
    
    //网站导航
    $('.s-n-down').hover(function () {
        $(this).toggleClass('s-n-hover');
    });
});