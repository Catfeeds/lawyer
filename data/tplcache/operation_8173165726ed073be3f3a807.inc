<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="shenma-site-verification" content="7cbadc960c1c35490a83f54ee96e95ec_1433491416"/>
	<meta name="baidu-site-verification" content="7I1SeeZXUv" />
	<title>浏览订单 - 全网法律服务</title>
	<link href="/favicon.ico" type="image/x-icon" rel="icon" /><link href="/favicon.ico" type="image/x-icon" rel="shortcut icon" />
	<link rel="stylesheet" type="text/css" href="/templets/lawyer/css/layout-new.css" />
	<link rel="stylesheet" type="text/css" href="/templets/lawyer/css/style-new.css" />
	<link rel="stylesheet" type="text/css" href="/templets/lawyer/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="/templets/lawyer/css/box.css" />
<link rel="stylesheet" type="text/css" href="/templets/lawyer/css/mask.css" />
	<script type="text/javascript" src="/templets/lawyer/js/jquery-1.8.1.min.js"></script>
	<script type="text/javascript" src="/templets/lawyer/js/modal.min.js"></script>
	<script type="text/javascript" src="/templets/lawyer/js/box.js"></script>
	<script type="text/javascript" src="/templets/lawyer/js/iealert.js"></script>
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
		// $('.web-header .user-box ul > li:nth-of-type(2) div.fl b').click(function(){
		// 	$('.web-header .user-box ul > li:nth-of-type(2) div.fl ol').toggle();
		// });
		// $('.web-header .inner-box .fr > div.dropdown span').click(function(){
		// 	$('.web-header .inner-box .fr > div.dropdown ul.menu').toggle();
		// })
	});
	</script>
<!--nocache-->
			<!--/nocache-->
	
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?fb384d34b375f9c11fc59bc51d22f5d4";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
<script charset="utf-8" src="http://wpa.b.qq.com/cgi/wpa.php"></script>
</head>
<body>
<header class="user-center">
	<div class="uc-info o-h">
		<div class="inner-box">
			<div class="uc-info-left fl">
				<h2><p>我的全网法律服务</p><a href="/Customers/edit">完善资料>></a></h2>
			</div>
			<div class="uc-info-right fr">
				<div class="uc-info-icon dollar">
					<a href="/CreditOrders/recharge"><div class="icon">
						¥
					</div></a>
					<p>积分：0&nbsp;<a href="/CreditOrders/recharge">( 充值 )</a></p>
				</div>
				<a href="/Messages/index?isRead=0" class="uc-info-icon message">
					<div class="icon">
						<span class=ico-font>&#xf03b;</span>
					</div>	
					<p>未读消息：&nbsp;0</p>
				</a>
			</div>
		</div>
	</div>
	<div class="uc-header">
		<div class="inner-box">
			<div class="uc-header-logo fl o-h"><img height="45"  alt="全网法律服务" src="img/new/yifatonglogo_whithout_word.png"></div>
			<div class="uc-header-bread fl">
				<div class="breadcrumb-box visible-lg clean-m clean-p" style="height: 45px;line-height: 45px;padding: 0;margin: 0;">
					<p>
						<span class="icon-font text-blue">&#xe610;</span>
						<a target="_blank" href="/" class=" text-blue">首页</a>
						-
						<span>合同服务</span>
					</p>
				</div>
			</div>
			<div class="fr uc-header-info">
				<p><span class="ico-font">&#xee0a;</span>你好，欢迎 13122707159     <a href="/Customers/logout?url=Orders/index">退出</a></p>
			</div>
		</div>
	</div>
</header><div id="lean_overlay">
		<form class="form-inline p-r" action="/Products/search" method="get">
		<div class="search-bar">
			<div class="input-part">
				<input id="exampleInputEmail2"  type="text" placeholder="劳动合同" name="q">
			</div>	
			<button class="text-white btn btn-link " type="submit"><img width="29" height="25" alt="搜索" src="img/new/icon/search.png"></button>
		</div>
		<div class="inner-box"></div>
		</form>
	</div>

<!-------------- javascript -------------->


<div class="user-center h100p o-h">
	<aside class="uc-title o-h fl">
	<div class="uc-title-items">
		<h2>服务管理</h2>
		<ul class="list-unstyled">
			<li><a class="choose" href="/Orders/index"><span>合同服务</span></a></li>
			<li><a  href="/Orders/myTrademark"><span>商标服务</span></a></li>
			<li><a  href="/LegalCases/myCases"><span>我的案件</span></a></li>
			<li><a  href="/Qnas/own"><span>我的咨询</span></a></li>
			<li><a  href="/Orders/myContract"><span>合同范本</span></a></li>
			<li><a  href="/Tips/myTip"><span>我的锦囊</span></a></li>
		</ul>
	</div>
	<div class="uc-title-items">
		<h2>资产管理</h2>
		<ul class="list-unstyled">
			<li><a  href="/Customers/myAccount"><span>我的账户</span></a></li>
			<li><a  href="/CreditOrders/recharge"><span>买卖积分</span></a></li>
		</ul>
	</div>
	<div class="uc-title-items">
		<h2>账号设置</h2>
		<ul class="list-unstyled">
			<li><a  href="/Customers/edit"><span>修改资料</span></a></li>
			<li><a  href="/Customers/changePassword"><span>修改密码</span></a></li>
			<li><a  href="/Messages/index"><span>消息提醒</span></a></li>
		</ul>
	</div>
</aside>	<div class="user-center-contract-service">
		<div class="border-box">
			<div class="container">
				<div class="row">
									
				</div>
			</div>
			<div class="uccs-title">
				<h2 class="fl">合同服务</h2>
				<div class="uccs-title-img fr">
					<img src="img/new/icon/qq.png" alt="qq" width="25">
					<a href="http://wpa.qq.com/msgrd?v=3&uin=2750352994&site=qq&menu=yes" target="_blank">联系客服</a>
				</div>
			</div>
			<div class="uccs-type o-h">
				<div class="uccs-type-product">
					<h2>订单产品</h2>
				</div>
				<div class="uccs-type-price">
					<h2>价格（元）</h2>
				</div>
				<div class="uccs-type-status">
					<h2>订单状态</h2>
				</div>
				<div class="uccs-type-operate">
					<h2>交易操作</h2>
				</div>
				<div class="uccs-type-message">
					<h2>服务提醒</h2>
				</div>
			</div>			<div class="ucss-item">
				<div class="ucss-item-title">
					<h2><span>订单编号：</span><a target="_blank" href="/Orders/view/20180716154346213331118134">20180716154346213331118134</a></h2>
				</div>
				<div class="inner-box">
					<div class="uccs-item-product">
						<img class="p-a" src="img/new/center/service/file.png">
						<h3>股权转让协议</h3>
						<p>服务内容：法律咨询 + 股权转让协议起草/审查审查 + 7天不限次数修改 + 风...								
						</p>
					</div>
					<div class="uccs-item-price">
						<h3>¥ 488</h3>
					</div>
					<div class="uccs-item-status">
						<h3>  	等待付款
</h3>
					</div>
					<div class="uccs-item-operate">
						  	<div class="wait-pay">
  		<a class="pay" href="/Orders/pay/20180716154346213331118134" target="_blank">立即付款</a>
  		<a class="cancel" href="javascript:void(0)" class="cancel-order" onclick="showCancelDialog('20180716154346213331118134')">取消订单</a>
  		<a class="consult" href="http://wpa.qq.com/msgrd?v=3&uin=2448211596&site=qq&menu=yes" target="_blank">咨询售前律师</a>
  	</div>
					</div>
					<div class="uccs-item-message">
						<p>
							  	若付款遇到问题，请咨询客服；如购买前还有疑问，请咨询售前律师。
						</p>
					</div>
				</div>
			</div>	
			<div class="web-page">	
				<h1>
									</h1>	
			</div>
		</div>

		<!--- tip start-->
		<div style="display:none;" class="info-box ">
			<div class="cancel-box-info">
				<div class="text-center quxiao">
					<p id="laa">您确认要取消该订单吗？</p>
					<h3 class="text-center"> <a id="cancel-href"> <span>是</span> </a> <a onclick="hideCancelDialog()"> <span>否</span> </a> </h3>
				</div>

				<div class="text-center qxchenggong">
					<h2>取消订单成功</h2>
					<p>系统将在<span id="spSeconds">10秒</span>后自动跳转或<a href="/Orders/index">回到频道首页</a></p>
				</div>
			</div>
		</div>
		<!--- tip end-->
	</div>
</div>
</div>



<!-- 红包 -->
<!-- <div class="fltc-hongbao">
		<a class="tu hb-tiaodong" href="/p/falvguwen" target="_blank"><img src="img/new/qyfl/nhth.jpg" alt="农行特惠"></a>
</div>

<script type="text/javascript">

$(function(){
	function hongbao(){
		var dbd = $(".fltc-hongbao .tu").hasClass('hb-tiaodong');
		if(!dbd){
			$(".fltc-hongbao .tu").addClass('hb-tiaodong');
		}else{
			$(".fltc-hongbao .tu").removeClass('hb-tiaodong');
		}
	}
	setInterval(hongbao,5000);
})
</script> -->
<div class="cpgb-fixed">
	<a id="BizQQBottomCommon" class="cpgb-fixed-zixun">
		<p><img src="/templets/lawyer/images/qq.png" alt="QQ"><br>在线咨询</p>
	</a>

	<a class="cpgb-fixed-zixun cpgb-fixed-dianhua">
		<p><span class="ico-font tubiao">&#xea89;</span><br>400电话</p>
		<span class="zx-haoma">
			13666297870
			<img src="/templets/lawyer/images/jiantou.png" alt="箭头">
		</span>
	</a>

	<a class="cpgb-fixed-zixun cpgb-fixed-dingbu">
		<p><img src="/templets/lawyer/images/dingbu.png" alt="QQ"><br>返回顶部</p>
	</a>
</div>
<!-------------- javascript -------------->
<div class="model-box p-a" ></div>
<footer class="visible-lg visible-md">
		<div class="bg-nav">
		<div class="container">
			<br />
			<div class="row">
				<div class="col-xs-4 col-sm-2">
					<em></em>
					<p class="text-center text-white hidden-xs" style="font-size:12px;">10年150万+项服务经验</p>
					<p class="text-center text-white visible-xs" style="font-size:8px;">10年150万+项服务经验</p>
				</div>
				<div class="col-xs-4 col-sm-2">
					<em></em>
					<p class="text-center text-white hidden-xs" style="font-size:12px;">10000多专业律师</p>
					<p class="text-center text-white visible-xs" style="font-size:8px;">10000多专业律师</p>
				</div>
				<div class="col-xs-4 col-sm-2">
					<em></em>
					<p class="text-center text-white hidden-xs" style="font-size:12px;">无形的法律看得见</p>
					<p class="text-center text-white visible-xs" style="font-size:8px;">无形的法律看得见</p>
				</div>
				<div class="col-xs-4 col-sm-2">
					<em></em>
					<p class="text-center text-white hidden-xs" style="font-size:12px;">有效的法律分析解答</p>
					<p class="text-center text-white visible-xs" style="font-size:8px;">有效的法律分析解答</p>
				</div>
				<div class="col-xs-4 col-sm-2">
					<em></em>
					<p class="text-center text-white hidden-xs" style="font-size:12px;">7天不限次数修改</p>
					<p class="text-center text-white visible-xs" style="font-size:8px;">7天不限次数修改</p>
				</div>
				<div class="col-xs-4 col-sm-2">
					<em></em>
					<p class="text-center text-white hidden-xs" style="font-size:12px;">提供法律售后服务</p>
					<p class="text-center text-white visible-xs" style="font-size:8px;">提供法律售后服务</p>
				</div>
			</div>
			<br />
		</div>
	</div>
			<div class="footer-middle">
		<div class="container">
			<div class="row">
				<div class=" col-md-5 list-inline text-center">
											<img src="img/new/background/footer-tel.png" width="294" height="69" alt="服务热线" />
										
				</div>
				<div class=" col-md-6 list-inline text-center">
					<div class="row" style="padding-top:20px;">
						<a target="_blank" href="https://ss.knet.cn/verifyseal.dll?sn=e15052611010158890ey85000000&comefrom=trust"><img alt="可信网站身份认证" src="img/new/footer-icon-1.jpg" width="82" height="30"></a>
						<img width="89" height="30" alt="支付宝特约商家" src="img/new/footer-icon-2.png">
						<img width="77" height="30" alt="网上交易保障中心" src="img/new/footer-icon-3.png">
						<a href="https://www.startssl.com/" target="_blank" rel="nofollow">
							<img alt="保障" src="img/new/footer-icon-4.png" width="29" height="30">
						</a>
					<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1254492474'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/stat.php%3Fid%3D1254492474%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E"));</script>
					
										</div>
				</div>				
			</div>
		</div>
	</div>
	<div class="footer-bottom">
		<div class="container">
			<div class="row">
				<ul class="list-inline text-center">
					<li>
						<a href="/about" target="_blank">关于我们</a>
						<a href="/sitemap" target="_blank">网站地图</a>
						<a href="/privacy" target="_blank">隐私申明</a>
					</li>
					<li>
						<a rel="nofollow"  href="http://www.miitbeian.gov.cn/" >闽ICP备09042048号-2</a>
						
		 				<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35020602000086" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="img/new/beian.png" style="float:left;"/>闽公网安备 35020602000086号</a>
		 	
					</li>
					<li><a>版权：全网法律服务股份</a></li>
				</ul>
			</div>
		</div>
	</div>
</footer>
<footer class="visible-xs visible-sm" style="">
	<p class="text-center lh3 w6">
		<img src="img/new/icon/weixin.png" width="20" height="20" alt="全网法律服务" />
		<span>@全网法律服务法律咨询</span>
		<span>@全网法律服务法律服务</span>
		<span>|</span>
		<a href="http://www.yifatong.com?force=pc">电脑版</a>	
		<a class="nowrap" href="/about">关于我们</a>
		<a class="nowrap" href="/contact">联系我们</a>
	</p>
	<p class="text-center w6"><a  rel="nofollow"  href="http://www.miitbeian.gov.cn/">闽ICP备09042048号-2</a> 版权：全网法律服务股份</p>
	<div class="fix-block"></div>
</footer>
<!--  debug -->
<!-- javascript -->
<script type="text/javascript" charset="utf-8">
$(function(){
	$('.click').click(function(){
		var num = $(this).parent('div').index();
		$('.info-box>div.text-center').eq(num+1).show().siblings('div.text-center').hide();
	})
});

$(function(){	
	})

function showCancelDialog(orderCode)
{
	$(".qxchenggong").hide();
	$(".quxiao").show();
	$("a#cancel-href").attr("href","/Orders/cancel/"+orderCode);
	mask("info-box");
}
function hideCancelDialog()
{
	clearMask("info-box");
}
var redirectSeconds=10;
function redirectInterval()
{
	timeIntervalRedirect=setInterval(function(){

		if(redirectSeconds<=1)
		{
			clearInterval(timeIntervalRedirect);
			clearMask("info-box");
			window.location.href="/Orders/index";
			return;
		}
		redirectSeconds--;
		$("span#spSeconds").html(redirectSeconds+"秒");
	},1000)
}
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
</html>>