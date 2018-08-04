<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php echo $navtitle;?>-<?php echo $cfg_ask_sitename;?></title>
<meta name="keywords" content="法律咨询  律师咨询  免费法律咨询" />
<meta name="description" content="一般纳税人销售货物可汇总开具专用发票。汇总开具专用发票的，同时使用防伪税控系统开具《销售货物清单》，并加盖财务专用章或者发票专用章。" />
<link href="/favicon.ico" type="image/x-icon" rel="icon" />
<link rel="stylesheet" type="text/css" href="/templets/lawyer/css/layout-new.css" />
<link rel="stylesheet" type="text/css" href="/templets/lawyer/css/style-new.css" />
<link rel="stylesheet" type="text/css" href="/templets/lawyer/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/templets/lawyer/css/box.css" />
<link href="static/style/tb-box.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/templets/lawyer/js/jquery-1.8.1.min.js"></script>
<script type="text/javascript" src="/templets/lawyer/js/modal.min.js"></script>
<script type="text/javascript" src="/templets/lawyer/js/box.js"></script>
<script type="text/javascript" src="/templets/lawyer/js/iealert.js"></script>
<script src="/include/dedeajax2.js" type="text/javascript"></script>
<script src="static/js/j.js" type="text/javascript"></script>
<script src="static/js/gotop.js" type="text/javascript"></script>
<script src="static/js/box.js" type="text/javascript"></script>
<script src="static/js/question.js" type="text/javascript"></script>
<script type="text/javascript">

$(function(){

	$('.web-header .user-box ul > li:nth-of-type(2) div.fl b').click(function(){

		$('.web-header .user-box ul > li:nth-of-type(2) div.fl ol').show();

		$('.model-box').show();

	});

	$('.model-box').click(function(){

		$('.web-header .user-box ul > li:nth-of-type(2) div.fl ol').hide();

		$('.web-header .inner-box .fr > div.dropdown ul.menu').hide();

		$(this).hide();

	});

	$('.web-header .inner-box .fr > div.dropdown span').click(function(){

		$('.web-header .inner-box .fr > div.dropdown ul.menu').show();

		$('.model-box').show();

	})

	$("#search-btn").leanModal();

	$("body").iealert();

	$('footer .link .row .inner-box .top-box ul li').click(function(){

		$(this).addClass('click').siblings().removeClass('click');

		var numb = $(this).index()

		$('footer .link .row .inner-box .bottom-box div').eq(numb).show().siblings().hide()

	});

});

</script>
</head>

<body>
<?php pasterTempletDiy("lawyer/header2.htm"); ?>
<div class="nav-box">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <nav>
                    <ul class="list-unstyled">
                        <li class="p-r">
                            <p><a class="text-darkgray" href="/ask">法律咨询首页</a></p>
                        </li>
                        <?php
								$temp = 0;
								foreach($asktypes as $asktype)
								{
									if($asktype['reid'] == 0) {
										if($temp > 0) echo "</li></ol></div></li>\n";
										if($cfg_ask_rewrite == 'Y') $url= $asktype['id'];
										else $url='?ct=browser&tid='.$asktype['id'];
										echo '<li class="p-r click"><p><a class="text-darkgray" href="'.$url.'">'.$asktype['name'].'</a></p><div class="inner-box p-a"><ol class="list-unstyled">';
										$temp++;
									} else {
										if($cfg_ask_rewrite == 'Y') $url= 't'.$asktype['id'];
										else $url='?ct=browser&tid2='.$asktype['id'];
										echo '<li><a href="'.$url.'">'.$asktype['name'].'</a></li>';
									}
								}
								echo "</li></ol></div></li>\n";
							?>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</div>
</header>
<!-- 问答头部 -->
<div id="lean_overlay">
    <form class="form-inline p-r" action="?ct=search" method="post">
        <div class="search-bar">
            <div class="input-part">
                <input id="exampleInputEmail2"  type="text" placeholder="搜索在线问答" name="q">
            </div>
            <button class="text-white btn btn-link " type="submit"><img width="29" height="25" alt="搜索" src="/templets/lawyer/images/search.png"></button>
        </div>
        <div class="inner-box"></div>
    </form>
</div>
<div class="lvshijieda-body">
    <div class="breadcrumb-box visible-lg">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 visible-lg clean-m clean-p">
                    <p> <span class="icon-font text-blue">&#xe610;</span> <?php echo $nav?></span> </p>
                </div>
            </div>
        </div>
    </div>
    <div class="jieda-index-mod">
        <div class="container" style="margin-bottom: -95px;">
            <div class="row">
                <div class="l-box col-lg-9 col-xs-12"> 
                    <!-- new start -->
                    <div class="jieda-weijieda">
                        <div class="jd-wjd-wenti">
                            <h2> <span class="zi">已解答</span> <?php echo $question['title']; ?> </h2>
                            <p><?php echo $question['content'];?></p>
                            <h3><span class="f-l"><span class="ico-font time">&#xe9e5;</span><?php echo MyDate('Y-m-d H:i',$question['dateline']);?></span></h3>
                        </div>
                        <div class="jd-wjd-shuru">
                            <div class="jd-wjd-kuang">
                                <p>律师未回答前暂不可追问，律师的及时解答时间为：8：30-17：30，解答后您仍有疑问，可继续提问，感谢您的耐心等待</p>
                            </div>
                            <div class="jd-wjd-button">
                                <p>我要追问</p>
                            </div>
                        </div>
                    </div>
                    <?php
                      if(!empty($digestanswer) && $cfg_ml->M_ID == $question['uid']) {?>
                    <div class="jieda-yijida">
                        <div class="jd-yjd-jigeda">
                            <h2>该问题已有 <span class="chengse">1</span> 位在线法律咨询</h2>
                        </div>
                        <div class="jd-yjd-inner">
                            <div class="jd-yjd-wenti">
                                <h2><span class="tupian"> <img src="/templets/lawyer/images/morentouxiangdaidian.png" alt=""> </span> <span class="lvshihao">
								<?php
									if($digestanswer['anonymous'] == 1){
										echo "热心网友";
									}else{
										echo $digestanswer['username'];
									}
                                ?>	
                                </span>
                                    <time><span class="jiange"><?php echo MyDate('Y-m-d H:i',$question['solvetime']);?> 回复</span></time>
                                </h2>
                                <?php
                                	echo "<p>" .$digestanswer['content'] ."</p>";
                                 if($cfg_ml->isAdmin == 1){?>
								<div class="operate"><a href="#" onClick="javascript:edit_reply(<?php echo $digestanswer['id'];?>);">修改</a></div>
								<?php } ?>
                                <h3> <a target="_blank" class="wenbtn" href="/ask/?ct=question&ac=ask_complete">我要提问</a> </h3>
                            </div>
                        </div>
                    </div>
                    <?php }?>
                    <!-- new end -->
                    <?php pasterTempletDiy("lawyer/changyan.htm"); ?>

                </div>
                <div class="r-box col-xs-3 visible-lg">
                    <div class="pin"> 
                        <div class="jd-r">
                            <div class="jd-r-title">
                                <h2>电话问律师</h2>
                                <h3>帮你准确分析处境  提供较佳解决方案</h3>
                                <p><span>99</span> 元/半小时</p>
                                <a href="/nsht/dgs/8.html">立即体验</a> </div>
                            <a href="/flgw/" class="jd-r-inner jd-siren">
                            <div class="r-dakuang"> <span class="xiaokuang"></span>
                                <h2>私人律师顾问<br>
                                    <span>耐心倾听，出谋划策</span></h2>
                            </div>
                            </a> <a href="/nsht/" class="jd-r-inner jd-nishen">
                            <div class="r-dakuang"> <span class="xiaokuang"></span>
                                <h2>专业拟审合同<br>
                                    <span>告别范本，量身定制</span></h2>
                            </div>
                            </a> <a href="/zls/" class="jd-r-inner jd-zhaolvshi">
                            <div class="r-dakuang"> <span class="xiaokuang"></span>
                                <h2>找律师打官司<br>
                                    <span>全网法律服务陪你，专业找律师</span></h2>
                            </div>
                            </a> <a href="/flgw/" class="jd-r-inner jd-qiye">
                            <div class="r-dakuang"> <span class="xiaokuang"></span>
                                <h2>企业法律顾问<br>
                                    <span>专业团队，竭诚服务</span></h2>
                            </div>
                            </a> </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php pasterTempletDiy("lawyer/footer2.htm"); ?>
<script type="text/javascript">
$(function(){
	$(".pin").pin({
		containerSelector: ".jieda-index-mod"
	});
});
var wasSubmitted = false;
function submitAnswer()
{
	var valid = 1;
	var msg = "";
	if( $("#QnaMobile").val() == '' )
	{
		msg= msg+"请输入手机\n";
		valid = 0;
	}
	if( $("#QnaQuestion").val() == '' )
	{
		msg= msg+"请输入事件原委";
		valid = 0;
	}
	if( $("#QnaQuestion").val().length < 8 )
	{
		msg= msg+"提问不得少于8个字符";
		valid = 0;
	}
	if(valid)
	{
		if(!wasSubmitted) 
		{
			wasSubmitted = true;
			$("#QnaViewForm").submit();
		}
	}else
	{
		alert(msg);
	}
}
function searchSubmit(id)
{
	$('#searchForm'+id).submit();
}
var wasSubmitted1 = false;
$(function(){
	$(".jd-wjd-wenti .zhuiwen").click(function(){
		$(this).parent().parent().siblings('.jd-wjd-shuru').toggle();
		$(this).toggleClass('heise');
	})
})
</script> 
<script type="text/javascript">
$(function(){
	$('.cpgb-fixed-dingbu').click(function(){
		$(window).scrollTop(0);
	});
	$(window).scroll(function () {
		if ($(window).scrollTop() > 1018 ) {			
			$(".cpgb-fixed-dingbu").css("display","block");
		}else if($(window).scrollTop() < 1016){			
			$(".cpgb-fixed-dingbu").css("display","none");
		}
	});
})
BizQQWPA.addCustom({aty: '1', a: '0', nameAccount: 4008515666, selector: 'BizQQBottomCommon'});
</script> 
</body>
</html>