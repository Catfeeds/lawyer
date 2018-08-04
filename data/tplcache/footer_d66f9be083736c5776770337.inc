<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><div class="cpgb-fixed"> <a id="BizQQBottomCommon" class="cpgb-fixed-zixun">
    <p><img src="/templets/lawyer/images/qq.png" alt="QQ"><br>
        在线咨询</p>
    </a> <a class="cpgb-fixed-zixun cpgb-fixed-dianhua">
    <p><span class="ico-font tubiao">&#xea89;</span><br>
        联系电话</p>
    <span class="zx-haoma"> 13666297870 <img src="/templets/lawyer/images/jiantou.png" alt="箭头"> </span> </a> <a class="cpgb-fixed-zixun cpgb-fixed-dingbu">
    <p><img src="/templets/lawyer/images/dingbu.png" alt="QQ"><br>
        返回顶部</p>
    </a> </div>
<footer class="new-foot">
    <div class="nf-main">
        <div class="inner-box p-r">
            <div class="nf-message p-a">
                <h2 class="nf-message-telephone">全国服务热线</h2>
                <h2 class="nf-message-telephonenumber">13666297870</h2>
               <!-- <h2 class="nf-message-address"> <span>地址：</span><a style="margin-left:0;" target="_blank" href="/contact">北京</a>|<a target="_blank" href="/contact">上海</a>|<a target="_blank" href="/contact">厦门</a>|<a target="_blank" href="/contact">深圳</a>|<a target="_blank" href="/contact">重庆</a>|<a target="_blank" href="/contact">苏州</a>|<a target="_blank" href="/contact">杭州</a>|<a target="_blank" href="/contact">全国</a> </h2>-->
            </div>
            <div class="nf-items">
                <section class="nf-item fl">
                    <h2 class="title">平台保障</h2>
                    <a>赔付保障</a> <a>执业认证</a> <a>网站认证</a> </section>
                <section class="nf-item fl">
                    <h2 class="title">关于我们</h2>
                    <a class="link-hover" target="_blank" href="/about/">关于全网法律服务</a> <a class="link-hover" target="_blank" href="/zls/">全网法律服务团队</a> <a class="link-hover" target="_blank" href="/flzs">全网法律服务新闻</a> </section>
                <section class="nf-item fl">
                    <h2 class="title">加入我们</h2>
                    <a class="link-hover" target="_blank" href="/about/">加入全网法律服务</a>  <a class="link-hover" target="_blank" href="/about/">联系我们</a> </section>
                <section class="nf-item fl">
                    <h2 class="title">关注我们</h2>
                    <div class="nf-item-code"> <img src="/templets/lawyer/images/code.jpg" alt=""> </div>
                </section>
            </div>
        </div>
    </div>
    <div class="nf-link">
        <div class="inner-box">
            <h5> <span>友情链接：</span> <?php
$atts = array();
$atts['tagname'] = 'flink';
$atts['row'] = '24';
$atts['titlelen'] = '24';
$atts['typeid'] = '0';
$blockValue = MakePublicTag($atts,$this->refObj,$fields); 
if(is_array($blockValue) && count($blockValue) > 0){
foreach( $blockValue as $key=>$fields )
{
?> [field:link /] <?php
}
}
?> </h5>
            <h4> <a rel="nofollow" target="_blank" href="http://www.miitbeian.gov.cn/">闽ICP备09042048号-2</a> <a rel="nofollow" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35020602000086">闽公网安备35020602000086号</a> <span>版权：全网法律服务股份</span> </h4>
        </div>
    </div>
</footer>