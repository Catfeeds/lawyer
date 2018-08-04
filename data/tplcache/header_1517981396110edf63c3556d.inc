<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><script>
$(function(){
	$(".nh-nav-container .nh-nav-item").hover(function() {
		/* Stuff to do when the mouse enters the element */
		$(this).children('.nh-nav-item-hide').addClass('nh-nav-item-show');
		$(this).siblings('.nh-nav-item').children('.nh-nav-item-hide').removeClass('nh-nav-item-show');
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		$(this).children('.nh-nav-item-hide').removeClass('nh-nav-item-show');
	});
})
</script>
<script type="text/javascript" src="/templets/lawyer/js/jquery.pin.min.js"></script>
<script language="javascript" type="text/javascript" src="<?php echo $GLOBALS['cfg_cmsurl']; ?>/include/dedeajax2.js"></script>
<script language="javascript" type="text/javascript">
<!--
	function CheckLogin(){
	  var taget_obj = document.getElementById('_userlogin');
	  myajax = new DedeAjax(taget_obj,false,false,'','','');
	  myajax.SendGet2("<?php echo $GLOBALS['cfg_cmspath']; ?>/member/ajax_loginsta.php");
	  DedeXHTTP = null;
	}
-->
</script>
   <header class="new-header">
    <!--<div class="new-header-jianhangdingbu"> <a href="/" target="_blank"><img src="/templets/lawyer/images/zhaoluyetop.jpg" alt="农行"></a> </div>-->
    <div class="nh-info">
        <div class="inner-box o-h">
            <div class="nh-info-logo fl"> <a href="/"><img height="60" src="/templets/lawyer/images/yifatonglogo_whithout_word.png" alt="全网法律服务"></a>  </div>
            <div class="nh-info-items fr" id="_userlogin"> 
                <!-- 未登录 --> 
                <img class="link-flgw" width="189" height="26" src="/templets/lawyer/images/400.png" alt="服务热线" />
				<a class="link" rel="nofollow" href="/member/login.php" class="load">登录</a> <a class="link" rel="nofollow" href="/member/reg_new.php" class="regist">注册</a>
                <!-- 登录 --> 
                <script language="javascript" type="text/javascript">CheckLogin();</script>
       		</div>
        </div>
    </div>
    <nav class="nh-nav">
        <div class="inner-box p-r">
            <div class="nh-nav-container"> <span class="diwei-dizhi"><span class="ico-font"></span><span id="spCurrentCity">上海市</span></span>
                <div class="nh-nav-item"> <a class="daohang" target="_blank" href="/" class="click">首页</a> </div>
                <div class="nh-nav-item p-r"> <a class="daohang" target="_blank" href="/flgw/">法律顾问<span style="position:absolute;right:0;top:-5px;display:block;width:30px;"><img style="width:100%;" src="/templets/lawyer/images/mark-down.gif" alt="降价"></span></a>
                    <ol class="p-a">
                        <li><a class="yaobianse" href="/flgw/">企业法律顾问</a></li>
                        <li><a class="yaobianse" href="/flgw/">个人法律顾问</a></li>
                    </ol>
                </div>
                <div class="nh-nav-item"> <a class="daohang youbiankuang" target="_blank" href="/nsht/">拟审合同</a>
                    <div class="nh-nav-item-hide">
                        <div class="nnih-inner">
                            <h2>创业经营</h2>
                            <?php
$atts = array();
$atts['tagname'] = 'arclist';
$atts['typeid'] = '11';
$atts['row'] = '6';
$blockValue = MakePublicTag($atts,$this->refObj,$fields); 
if(is_array($blockValue) && count($blockValue) > 0){
foreach( $blockValue as $key=>$fields )
{
?>
                            <p><a href="[field:arcurl/]" class="lianjie" target="_blank">[field:title/]</a></p>
                            <?php
}
}
?> </div>
                        <div class="nnih-inner">
                            <h2>劳动人事</h2>
                            <?php
$atts = array();
$atts['tagname'] = 'arclist';
$atts['typeid'] = '12';
$atts['row'] = '6';
$blockValue = MakePublicTag($atts,$this->refObj,$fields); 
if(is_array($blockValue) && count($blockValue) > 0){
foreach( $blockValue as $key=>$fields )
{
?>
                            <p><a href="[field:arcurl/]" class="lianjie" target="_blank">[field:title/]</a></p>
                            <?php
}
}
?> </div>
                        <div class="nnih-inner">
                            <h2>婚姻家庭</h2>
                            <?php
$atts = array();
$atts['tagname'] = 'arclist';
$atts['typeid'] = '13';
$atts['row'] = '6';
$blockValue = MakePublicTag($atts,$this->refObj,$fields); 
if(is_array($blockValue) && count($blockValue) > 0){
foreach( $blockValue as $key=>$fields )
{
?>
                            <p><a href="[field:arcurl/]" class="lianjie" target="_blank">[field:title/]</a></p>
                            <?php
}
}
?> </div>
                        <div class="nnih-inner">
                            <h2>打官司</h2>
                            <?php
$atts = array();
$atts['tagname'] = 'arclist';
$atts['typeid'] = '14';
$atts['row'] = '6';
$blockValue = MakePublicTag($atts,$this->refObj,$fields); 
if(is_array($blockValue) && count($blockValue) > 0){
foreach( $blockValue as $key=>$fields )
{
?>
                            <p><a href="[field:arcurl/]" class="lianjie" target="_blank">[field:title/]</a></p>
                            <?php
}
}
?> </div>
                        <div class="nnih-tupian"> <a href="/nsht/"><img src="/templets/lawyer/images/ldht.png" alt="劳动合同"></a> </div>
                    </div>
                </div>
                <div class="nh-nav-item p-r"> <a class="daohang" target="_blank" href="/ask/?ct=question&ac=ask_complete">法律咨询</a>
                    <ol class="p-a">
                        <li><a class="yaobianse" href="/ask/?ct=question&ac=ask_complete">在线法律咨询</a></li>
                        <li><a class="yaobianse" href="/nsht/dgs/8.html">电话法律咨询</a></li>
                    </ol>
                </div>
                <div class="nh-nav-item"> <a class="daohang youbiankuang" target="_blank" href="/zls/">找律师</a>
                    <div class="nh-nav-item-hide nh-nav-item-kuan">
                        <div class="nnih-inner width144"> <?php
$atts = array();
$atts['tagname'] = 'channelartlist';
$atts['typeid'] = '17,18,19';
$atts['row'] = '3';
$blockValue = MakePublicTag($atts,$this->refObj,$fields); 
if(is_array($blockValue) && count($blockValue) > 0){
foreach( $blockValue as $key=>$fields )
{
?>
                            <p><a href="<?php echo $fields['typeurl']; ?>" class="lianjie" target="_blank"><?php echo $fields['typename']; ?></a></p>
                            <?php
}
}
?> </div>
                        <div class="nnih-inner width144"> <?php
$atts = array();
$atts['tagname'] = 'channelartlist';
$atts['typeid'] = '20,21,22';
$atts['row'] = '3';
$blockValue = MakePublicTag($atts,$this->refObj,$fields); 
if(is_array($blockValue) && count($blockValue) > 0){
foreach( $blockValue as $key=>$fields )
{
?>
                            <p><a href="<?php echo $fields['typeurl']; ?>" class="lianjie" target="_blank"><?php echo $fields['typename']; ?></a></p>
                            <?php
}
}
?> </div>
                        <div class="nnih-inner width144"> <?php
$atts = array();
$atts['tagname'] = 'channelartlist';
$atts['typeid'] = '23,24,25';
$atts['row'] = '3';
$blockValue = MakePublicTag($atts,$this->refObj,$fields); 
if(is_array($blockValue) && count($blockValue) > 0){
foreach( $blockValue as $key=>$fields )
{
?>
                            <p><a href="<?php echo $fields['typeurl']; ?>" class="lianjie" target="_blank"><?php echo $fields['typename']; ?></a></p>
                            <?php
}
}
?> </div>
                        <div class="nnih-inner width144">
                            <p><a href="/zls/qtjf/" class="lianjie" target="_blank">其他纠纷</a></p>
                        </div>
                        <div class="nnih-tupian nnih-tupian-xiao"> <a href="/zls/"><img src="/templets/lawyer/images/zhaolvshi.png" alt="找律师"></a> </div>
                    </div>
                </div>
                <div class="nh-nav-item p-r"> <a class="daohang" target="_blank" href="/flbk/">法律百科</a></div>
            </div>
            <div class="nh-nav-search p-a">
                <form target="_blank" action="/plus/search.php" method="get">
                    <input type="text" placeholder="搜索法律问题"  name="keyword" />
                    <input type="submit" value="" />
                    <b class="p-a ico-font">&#xf02e;</b>
                </form>
            </div>
        </div>
    </nav>
</header>