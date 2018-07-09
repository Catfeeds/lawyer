$(function () {
    switch (window.location.host) {
        case "www.64365.com":
        case "test.www.64365.com":
            window.UrlPathAppend = window.UrlPathAppend || "";
            /*
            //            var script = document.createElement('script');
            //            script.src = 'http://image.64365.com/js/uaredirect.js';
            //            var s = document.getElementsByTagName("script")[0];
            //            s.parentNode.insertBefore(script, s);
            //            $(script).on("load", function() {
            //                script = document.createElement('script');
            //                script.innerHTML = "uaredirect(\"http://m.64365.com\" + \"" + window.UrlPathAppend + "\" + window.location.pathname);";
            //                s = document.getElementsByTagName("script")[0];
            //                s.parentNode.insertBefore(script, s); 
            //            });
            */
            $.getScript("http://image.64365.com/js/uaredirect.js", function () {
                $("script:last").after("<script type=\"text/javascript\">uaredirect(\"http://m.64365.com\" + \"" + window.UrlPathAppend + "\" + window.location.pathname);</script>");
                /*$("script:last").after("<script type=\"text/javascript\">console.log(\"http://m.64365.com\" + \"" + window.UrlPathAppend + "\" + window.location.pathname);</script>");*/
            });
            break;
        case "user.64365.com":
        case "public.64365.com":
            break;
    }
});