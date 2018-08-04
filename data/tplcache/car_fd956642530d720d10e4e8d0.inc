<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>企业法律顾问+律师上门 - 创建订单 - 全网法律服务</title>
<link href="/favicon.ico" type="image/x-icon" rel="icon" />
<link rel="stylesheet" type="text/css" href="/templets/lawyer/css/style-xin.css?v=201805021933" />
<link rel="stylesheet" type="text/css" href="/templets/lawyer/css/box.css" />
<script type="text/javascript" src="/templets/lawyer/js/jquery-1.8.1.min.js"></script>
<script>
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
</head>
<body>
<?php include $this->CompilerInclude("header.htm");
 ?>
<div class="diannao-mianbaoxie">
    <p><span class="ico-font tubiao">&#xea47;</span><a href="/" target="_blank">首页</a> - <a href="/Orders/index" target="_blank"><span>订单中心</span></a> - <a>订单信息</a></p>
</div>
<div class="diannao-dingdangaiban">
    <div class="ddgb-liuchengtu"> 
        <!-- 包年顾问流程图 -->
        <p class="fkzt"> <span class="zi">确认下单付款</span> <span class="zi">30分钟内客服电话确认</span> <span class="zi">发送服务函、企业风险调查表<span class="bottom-zi">登记对接人联系方式</span></span> <span class="zi">法务对接，开始服务</span> </p>
        <img src="/templets/lawyer/images/liucheng1.png" alt="流程一" /> <!-- 流程图片 确认下单 --> 
    </div>
    <!-- 定价产品start -->
    <form id="fixupformid" name="fixupform" action="carbuyaction.php" method="post">
        <!--<form action="/Orders/create/54ed8c67b530c" onsubmit="return checkBeforeSubmit()" class="" id="OrderCreateForm" method="post" accept-charset="utf-8">-->
        <div style="display:none;">
            <input name="do" type="hidden" value="clickout">
        </div>
        <div class="ddgb-shoujian">
            <form action="" method="post">
            	<div class="ddgb-sj-title">
                <h2>收件信息</h2>
            </div>
            <div class="ddgb-sj-message " id="addClass">
                <p> <span class="zi"> <span class="hongse">*</span> <span class="jianju">手</span>机： </span>
                    <input name="phone" class="kuang" placeholder="律师解答咨询的联系方式"  maxLength="11" onkeyup="value=value.replace(/[^1234567890-]+/g,'')" type="text" value="" id="OrderMobile" required="required"/>
                </p>
                <!--<p class="unLogin"> <span class="zi"> <span class="hongse">*</span> <span class="yanzheng">验证</span>码： </span>
                    <input name="sms_code" value="" placeholder="请输入验证码"  maxLength="6" type="text" onkeyup="value=value.replace(/[^1234567890-]+/g,'')" id="OrderSmsCode" class="kuang yzkuang"/>
                    <input  type="button" class="huoqu btn-sms" id="btn-sms" value="获取短信验证码"/>
                </p>
                <p class="unLogin">
                    <input type="button" id="btnSmsLogin" class="lijiyanzheng" value="立即验证"/>
                </p>-->
                <p> <span class="zi"><span class="hongse">*</span><span class="jianju">邮</span>箱：</span>
                    <input name="email" class="kuang" placeholder="接收律师起草合同的邮箱" maxLength="30" type="text" value="" id="OrderEmail" required="required"/>
                </p>
            </div>
            </form>
        </div>
        <div class="ddgb-dingdan">
            <div class="ddgb-dd-title">
                <h2>订单详情 (编号：<?php echo $GLOBALS['_vars']['carts']['orders_id']; ?>)</h2>
            </div>
            <div class="ddgb-dd-message">
                <div class="dd-msg-title">
                    <p>商品信息</p>
                    <p>服务流程</p>
                    <p>单价</p>
                    <p>数量</p>
                    <p>小计</p>
                </div>
                <?php  foreach($GLOBALS['Items'] as $key=>$value){ ?>
                <div class="dd-msg-nav">
                    <div class="msg-nav-shangpin">
                        <h2><?php echo $value['title']; ?></h2>
                        <p><span class="tu"><img src="/templets/lawyer/images/wuli.png" alt="无理由" /></span>不限次数咨询+不限合同份数</p>
                    </div>
                    <div class="msg-nav-fuwu">
                        <p class="lianghang">确认下单付款——30分钟内客服电话确认——发送服务函、企业风险调查表——法务对接，开始服务</p>
                    </div>
                    <div class="msg-nav-fuwu msg-jiage">
                        <p>￥<?php echo $value['price']; ?></p>
                    </div>
                    <div class="msg-nav-shuliang">
                        <p> <span class="shuzi">1</span> </p>
                    </div>
                    <div class="msg-nav-fuwu msg-xiaoji">
                        <p><span class="chengse">￥<?php echo $value['price']; ?></span></p>
                    </div>
                </div>
                <?php  }    ?>
 </div>
        </div>
        <div class="ddgb-zhifu">
            <div class="ddgb-zf-title">
                <h2>支付方式</h2>
            </div>
            <!--<table width="100%" border="0" cellpadding="0" cellspacing="0" class="dede_table">
                <tbody>
                
                <?php  foreach($GLOBALS['shops_paymentarr'] as $key=>$value){ ?>
                <tr onMouseMove="javascript:this.bgColor='#F8F8F8';" onMouseOut="javascript:this.bgColor='#FFFFFF';">
                    <td width="10%" align="right" style="vertical-align:middle;"><input name="paytype" type="radio" value="<?php echo $value['id']; ?>" /></td>
                    <td width="20%" valign="middle" style="vertical-align:middle;"> <?php echo $value['name']; ?> </td>
                    <td width="60%"> <?php echo $value['description']; ?> </td>
                    <td width="10%" align="center"><span class="fc-f60"><?php echo $value['fee']; ?>元</span></td>
                </tr>
                <?php  }    ?>

                    </tbody>
            </table>-->
            <div class="ddgb-zf-xuanzhe">
                <!--<div class="zf-xz-inner ">
                    <label class="guanlian" for="pay05">微信</label>
                    <input class="danxuan" type="radio" id="pay05" onclick="confirmWeixinQrcode()" value="10"  name="payment_option">
                </div>
                <div class="zf-xz-inner zf-xz-inner-cheng">
                    <label class="guanlian" for="pay01">支付宝</label>
                    <input class="danxuan" type="radio" id="pay01" onclick="confirmAlipay()" checked value="1" name="payment_option" >
                </div>
                <div class="zf-xz-inner">
                    <label class="guanlian" for="pay02">信用卡/网银支付</label>
                    <input class="danxuan" type="radio" id="pay02" onclick="showAlipayNetbankList()" value="2" name="payment_option">
                </div>-->
                <input type="hidden" name="paytype" value="7" id="OrderPaymentType"/>
            <input type="hidden" name="data[Order][payment_bank]" value="" id="OrderPaymentBank"/>
                <?php  foreach($GLOBALS['shops_paymentarr'] as $key=>$value){ ?>
                <div class="zf-xz-inner ">
                    <label class="guanlian" for="pay05"  id="pay0<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
                    <!--<input class="danxuan" type="radio"  value="<?php echo $value['id']; ?>"  name="payment_option">-->
                </div>
                <?php  }    ?>

                
            </div>
            <div class="ddgb-zf-message">
                <div class="msg-yinhang">
                    <div class="msg-yh-fuji msg-yh-fuji-show">
                        <p>
                            <label for="img02"><span class="yihangtu"><img src="/templets/lawyer/images/yinhang1.png" alt="工商银行" /></span><span class="cheng"></span></label>
                            <input name="alipay_netbank_option"  onclick="confirmAlipayNetbank()" class="yhradio" id="img02" value="ICBCB2C" type="radio" />
                        </p>
                        <p>
                            <label for="img04"><span class="yihangtu"><img src="/templets/lawyer/images/yinhang2.png" alt="建设银行" /></span><span class="cheng cheng-show"></span></label>
                            <input name="alipay_netbank_option"  onclick="confirmAlipayNetbank()" class="yhradio" id="img04" value="CCB" type="radio" />
                        </p>
                        <p>
                            <label for="img05"><span class="yihangtu"><img src="/templets/lawyer/images/yinhang4.png" alt="农业银行" /></span><span class="cheng"></span></label>
                            <input name="alipay_netbank_option"  onclick="confirmAlipayNetbank()" class="yhradio" id="img05" value="ABC" type="radio" />
                        </p>
                        <p>
                            <label for="img09"><span class="yihangtu"><img src="/templets/lawyer/images/yinhang5.png" alt="交通银行" /></span><span class="cheng"></span></label>
                            <input name="alipay_netbank_option"  onclick="confirmAlipayNetbank()" class="yhradio" id="img09" value="COMM" type="radio" />
                        </p>
                        <p>
                            <label for="img03"><span class="yihangtu"><img src="/templets/lawyer/images/yinhang6.png" alt="招商银行" /></span><span class="cheng"></span></label>
                            <input name="alipay_netbank_option"  onclick="confirmAlipayNetbank()" class="yhradio" id="img03" value="CMB" type="radio" />
                        </p>
                        <p>
                            <label for="img06"><span class="yihangtu"><img src="/templets/lawyer/images/yinhang7.png" alt="兴业银行" /></span><span class="cheng"></span></label>
                            <input name="alipay_netbank_option"  onclick="confirmAlipayNetbank()" class="yhradio" id="img06" value="CIB" type="radio" />
                        </p>
                        <p>
                            <label for="img10"><span class="yihangtu"><img src="/templets/lawyer/images/yinhang9.png" alt="中信银行" /></span><span class="cheng"></span></label>
                            <input name="alipay_netbank_option"  onclick="confirmAlipayNetbank()" class="yhradio" id="img10" value="CITIC" type="radio" />
                        </p>
                        <p>
                            <label for="img08"><span class="yihangtu"><img src="/templets/lawyer/images/yinhang10.png" alt="民生银行" /></span><span class="cheng"></span></label>
                            <input name="alipay_netbank_option"  onclick="confirmAlipayNetbank()" class="yhradio" id="img08" value="CMBC" type="radio" />
                        </p>
                        <p>
                            <label for="img12"><span class="yihangtu"><img src="/templets/lawyer/images/yinhang11.png" alt="光大银行" /></span><span class="cheng"></span></label>
                            <input name="alipay_netbank_option"  onclick="confirmAlipayNetbank()" class="yhradio" id="img12" value="CEB-DEBIT" type="radio" />
                        </p>
                        <p>
                            <label for="img07"><span class="yihangtu"><img src="/templets/lawyer/images/yinhang12.png" alt="浦发银行" /></span><span class="cheng"></span></label>
                            <input name="alipay_netbank_option"  onclick="confirmAlipayNetbank()" class="yhradio" id="img07" value="SPDB" type="radio" />
                        </p>
                        <p>
                            <label for="img11"><span class="yihangtu"><img src="/templets/lawyer/images/yinhang13.png" alt="平安银行" /></span><span class="cheng"></span></label>
                            <input name="alipay_netbank_option"  onclick="confirmAlipayNetbank()" class="yhradio" id="img11" value="SPABANK" type="radio" />
                        </p>
                        <p>
                            <label for="img01"><span class="yihangtu"><img src="/templets/lawyer/images/yinhang3.png" alt="中国银行" /></span><span class="cheng"></span></label>
                            <input name="alipay_netbank_option"  onclick="confirmAlipayNetbank()" class="yhradio" id="img01" value="BOCB2C" type="radio" />
                        </p>
                    </div>
                    <div class="msg-yh-gengduo">
                        <h2>更多银行<span class="daosan"></span></h2>
                    </div>
                </div>
                <div class="msg-zhuanzhang">
                    <p>请汇款至以下账户：</p>
                    <p>户名：厦门全网法律服务法务信息管理股份有限公司</p>
                    <p>支付银行：兴业银行厦门思明支行</p>
                    <p>银行账号：12997 0100100041 905</p>
                </div>
            </div>
            <div class="ddgb-zf-tishi">
                <h2>提示：万元以上款项，建议使用微信支付或银行转账（支付宝和网银支付有限额）</h2>
            </div>
        </div>
        <div class="ddgb-fapiao">
            <div class="ddgb-fp-title">
                <h2>发票信息</h2>
            </div>
            <!-- 发票 start -->
            <div class="ddgb-fp-shifou">
                <h2>
                    <label for="OrderInvoiceRequired"><span class="goukuang"><img src="/templets/lawyer/images/dagou.png" alt="打勾" /></span>
                        <input type="hidden" name="data[Order][invoice_required]" id="OrderInvoiceRequired_" value="不需要"/>
                        <input type="checkbox" name="data[Order][invoice_required]"  value="需要" id="OrderInvoiceRequired" class="fapiao"/>
                        <!-- <input class="fapiao" type="checkbox" id="fapiao" /> --> 
                        
                    </label>
                    是否需要发票</h2>
                <div class="fp-sf-message">
                    <div class="msg-input">
                        <p> <span class="hongse">*</span><span class="youshi">发票抬头：</span>
                            <input type="radio" name="data[Order][invoice_type]" id="OrderInvoiceType1" value="1" onclick="cleanTitle()" />
                            <label for="OrderInvoiceType1">个人</label>
                            <input type="radio" name="data[Order][invoice_type]" id="OrderInvoiceType2" value="2" onclick="cleanTitle()" checked="checked" />
                            <label for="OrderInvoiceType2">企业</label>
                            <input name="data[Order][invoice_title]" onfocus="selectTitle()" placeholder="请输入企业名称" class="qiyemingcheng" maxLength="40" maxlength="50" type="text" id="OrderInvoiceTitle"/>
                        </p>
                        <p id="hideInvoiceTaxpayerId"> <span class="hongse">*</span><span>纳税人识别码：</span>
                            <input name="data[Order][invoice_taxpayer_id]" placeholder="企业必填" class="qiyemingcheng shoujianren nashuiren" maxLength="40" type="text" id="OrderInvoiceTaxpayerId"/>
                        </p>
                        <p> <span class="hongse">*</span><span class="youshi">收<span class="sanjian">件</span>人：</span>
                            <input name="data[Order][invoice_recipient]" class="qiyemingcheng shoujianren" maxLength="40" maxlength="50" type="text" id="OrderInvoiceRecipient"/>
                            <!-- <span class="youjidaofu">发票邮寄，需到付</span> --> 
                            
                        </p>
                        <p> <span class="hongse">*</span><span class="youshi">地<span class="liangjian">址</span>：</span>
                            <select name="data[Order][invoice_province]" onchange="locations(this,&#039;city&#039;)" class="dizhikuang" id="OrderInvoiceProvince">
                                <option value="">选择省份</option>
                                <option value="110000">北京市</option>
                                <option value="120000">天津市</option>
                                <option value="130000">河北省</option>
                                <option value="140000">山西省</option>
                                <option value="150000">内蒙古自治区</option>
                                <option value="210000">辽宁省</option>
                                <option value="220000">吉林省</option>
                                <option value="230000">黑龙江省</option>
                                <option value="310000">上海市</option>
                                <option value="320000">江苏省</option>
                                <option value="330000">浙江省</option>
                                <option value="340000">安徽省</option>
                                <option value="350000">福建省</option>
                                <option value="360000">江西省</option>
                                <option value="370000">山东省</option>
                                <option value="410000">河南省</option>
                                <option value="420000">湖北省</option>
                                <option value="430000">湖南省</option>
                                <option value="440000">广东省</option>
                                <option value="450000">广西壮族自治区</option>
                                <option value="460000">海南省</option>
                                <option value="500000">重庆市</option>
                                <option value="510000">四川省</option>
                                <option value="520000">贵州省</option>
                                <option value="530000">云南省</option>
                                <option value="540000">西藏自治区</option>
                                <option value="610000">陕西省</option>
                                <option value="620000">甘肃省</option>
                                <option value="630000">青海省</option>
                                <option value="640000">宁夏回族自治区</option>
                                <option value="650000">新疆维吾尔自治区</option>
                            </select>
                            <select name="data[Order][invoice_city]" id="city" class="dizhikuang" onchange="locations(this,&#039;district&#039;)">
                                <option value="">选择城市</option>
                            </select>
                            <select name="data[Order][invoice_district]" id="district" class="dizhikuang">
                                <option value="">选择县,区</option>
                            </select>
                        </p>
                        <p class="xiangxidizhi">
                            <input name="data[Order][invoice_address]" class="qiyemingcheng shoujiandizhi" maxLength="40" maxlength="100" type="text" id="OrderInvoiceAddress"/>
                            <span class="mianfeiji">（我司会免费为您寄送发票）</span> </p>
                    </div>
                    <div class="msg-tishi">
                        <h2>温馨提示：</h2>
                        <p>请认真查看上述信息，确保系统关联的开票信息与贵司税务登记证信息一致，避免因开票信息错误给贵司带来损失！</p>
                    </div>
                </div>
            </div>
            <!-- 发票 end -->
            <div class="ddgb-fp-beizhu">
                <p>备注：
                    <input name="data[Order][note]" class="beizhushuru" maxLength="40" maxlength="500" type="text" id="OrderNote"/>
                </p>
            </div>
            <div class="ddgb-jiesuan">
                <input type="hidden" name="data[Order][credit]" class="kuang" maxLength="40" autocomplete="off" value="0" id="OrderCredit"/>
                <p>应付金额：<span class="dahong"><span class="youjianju">¥</span> <span class="confirm-price"><?php echo $GLOBALS['_vars']['carts']['price_count']; ?></span></span></p>
                <tr>
                    <td width="180" class="td1">验证码</td>
                    <td><a name="mate_vdimgck" />
                        <input name="vdcode" id="vdcode" type="text" class="ipt-txt" size="10" style="text-transform:uppercase;" />
                        <a href="#mate_vdimgck"><img id="vdimgck_img" src="../include/vdimgck.php" hspace="6" align="absmiddle" onClick="vdimgck();" title="看不清换一张" /></a> <a href="#mate_vdimgck" onClick="vdimgck();">看不清换一张</a></td>
                </tr>
                <!-- <p>本次可获得积分<span class="hongse">6</span>分</p> -->
                
                <input type="hidden" name="data[Order][added_value]" value="0" id="OrderAddedValue"/>
                <input type="hidden" name="data[Order][related_id]" value="0" id="OrderRelatedId"/>
                <p> <span style='margin-right:40px; font-size:18px; color:#ff0000;'>6月世界杯期间特卖，尊享9折优惠</span>
                    <input  class="tjbtn" id="btnPaySubmit" type="submit" value="提交订单"/>
                </p>
            </div>
        </div>
    </form>
    <!-- 定价产品end --> 
<script language="JavaScript" type="text/javascript">
function vdimgck()
{
	document.getElementById("vdimgck_img").src = '../include/vdimgck.php?'+Math.random();
}
</script>
    <div class="ddgb-yl-qiye">
        <div class="tp-da-juzhong">
            <div class="xieyi-anniu-fuji"> <span class="guanbi"> <img src="/templets/lawyer/images/x.png" alt="关闭"> </span> </div>
        </div>
    </div>
    <div class="ddgb-hongbaotanchuang">
        <div class="hbtc-inner"> <img src="/templets/lawyer/images/tchb.png" alt="大红包"> <span class="guanbi"><img src="/templets/lawyer/images/close.png" alt="guanbi"></span> <span class="jiage" id='priceNum'>1000</span>
            <div class="hbtc-input">
                <p>
                    <input type="text" id='mobile' class="kuang" placeholder="输入手机号领取红包" value="" >
                </p>
                <p>
                    <input type="text" class="kuang input-yzm" id='captcha' placeholder="输入验证码">
                    <input class="kuang input-hq btn-sms" type="button" id='getSms' value="获取验证码">
                </p>
                <span class="kai-btn" id='open'/> </div>
        </div>
    </div>
</div>

<!-- 右侧QQ弹框 -->

<div class="cpgb-fixed"> <a id="BizQQBottomCommon" class="cpgb-fixed-zixun">
    <p><img src="/templets/lawyer/images/qq.png" alt="QQ"><br>
        在线咨询</p>
    </a> <a class="cpgb-fixed-zixun cpgb-fixed-dianhua">
    <p><span class="ico-font tubiao">&#xea89;</span><br>
        400电话</p>
    <span class="zx-haoma"> 13666297870 <img src="/templets/lawyer/images/jiantou.png" alt="箭头"> </span> </a> <a class="cpgb-fixed-zixun cpgb-fixed-dingbu">
    <p><img src="/templets/lawyer/images/dingbu.png" alt="QQ"><br>
        返回顶部</p>
    </a> </div>
<?php include $this->CompilerInclude("footer.htm");
 ?> 
<!--  debug --> 
<!-- javascript --> 
<script type="text/javascript" src="/templets/lawyer/js/box.js"></script><script type="text/javascript" src="/templets/lawyer/js/jquery.pin.min.js"></script><script type="text/javascript" src="/templets/lawyer/js/update-location.js"></script><script type="text/javascript" src="/templets/lawyer/js/order-payment-selection-stylexin.js"></script><script type="text/javascript">
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
<script type="text/javascript">
			$(".ddgb-yulantu h2 .link").click(function(event) {
				/* Act on the event */
				$(".ddgb-yl-qiye").show();
				$("body").css("overflowY","hidden");
			});
			$(".xieyi-anniu-fuji .guanbi").click(function(event) {
				/* Act on the event */
				$(this).parents(".ddgb-yl-qiye").hide();
				$("body").css("overflowY","auto");
			});

			//出来吧  红包
			var tcpg = $(window).height(),
			tcpk = $(window).width();
			$(".msg-zhijiang").click(function(event) {
				/* Act on the event */
				var product_id = $(this).attr('productId');   //获取对应产品id
				$('#open').attr('productId',product_id);
				if(product_id == 356 || product_id == 354)
				{
					$('#priceNum').text('1000');
				}
				else if(product_id == 355)
				{
					$('#priceNum').text('3000');
				}
				$(".ddgb-hongbaotanchuang").css({
					"height":tcpg +"px",
					"width":tcpk +"px",
					"display":"block",
				})
				$("body").css("overflow-y","hidden");
			});
			$(".ddgb-hongbaotanchuang .hbtc-inner .guanbi").click(function(event) {
				/* Act on the event */
				guanbipacket($(this));
			});
			function guanbipacket(obj){
				$('#captcha').val('');
				obj.parents(".ddgb-hongbaotanchuang").css({
					"display":"none",
					"height":"",
					"width":"",
				});
				$("body").css("overflow-y","auto");
			}
			// 出来吧 红包结束
			var total_credit =0;
			var total_price = <?php echo $GLOBALS['_vars']['carts']['price_count']; ?>;
$(function(){
			//定价产品初始化
	credit($("#OrderCredit").val());
	document.getElementById('img04').checked=true;
	document.getElementById('OrderInvoiceRequired').checked=false;
		$(".msg-input p .zenzhifapiao").click(function(event) {
		/* Act on the event */
		$(this).children('.jiayuan').addClass('yuanxin-show').parent().siblings('.zenzhifapiao').children('.jiayuan').removeClass('yuanxin-show');
	});
	$(".msg-input p .qiyegeren").click(function(event) {
		/* Act on the event */
		$(this).children('.jiayuan').addClass('yuanxin-show').parent().siblings('.qiyegeren').children('.jiayuan').removeClass('yuanxin-show');
	});
	$(".ddgb-fp-shifou h2 label .goukuang").click(function(event) {
		/* Act on the event */
		$(this).toggleClass('goukuang-show');
		$(".fp-sf-message").toggleClass('fp-sf-message-show');
	});
	$(".ddgb-zf-xuanzhe .zf-xz-inner").eq(0).click(function(event) {
		/* Act on the event */
		$(".ddgb-zf-message .msg-yinhang").hide().siblings('.msg-zhuanzhang').hide();
	});
	$(".ddgb-zf-xuanzhe .zf-xz-inner").eq(1).click(function(event) {
		/* Act on the event */
		$(".ddgb-zf-message .msg-yinhang").hide().siblings('.msg-zhuanzhang').hide();
	});
	$(".ddgb-zf-xuanzhe .zf-xz-inner").eq(2).click(function(event) {
		/* Act on the event */
		$(".ddgb-zf-message .msg-yinhang").show().siblings('.msg-zhuanzhang').hide();
	});
	$(".ddgb-zf-xuanzhe .zf-xz-inner").eq(3).click(function(event) {
		/* Act on the event */
		$(".ddgb-zf-message .msg-zhuanzhang").show().siblings('.msg-yinhang').hide();
	});
	$(".msg-yh-gengduo h2").click(function(event) {
		/* Act on the event */
		$(this).parent().hide().siblings('.msg-yh-fuji').removeClass('msg-yh-fuji-show');
	});
	$(".ddgb-zf-xuanzhe .zf-xz-inner").click(function(event) {
		/* Act on the event */
		$(this).addClass('zf-xz-inner-cheng').siblings('.zf-xz-inner').removeClass('zf-xz-inner-cheng');
	});
	$(".msg-yh-fuji p label").click(function(event) {
		/* Act on the event */
		$(this).children('.cheng').addClass('cheng-show');
		$(this).parent().siblings('p').children('label').children('.cheng').removeClass('cheng-show');
	});

//验证码发送
	$(".btn-sms").click(function(){
		var mobileObj = {};
		if(this.id == 'btn-sms')
			mobileObj = $('#OrderMobile');
		if(this.id == 'getSms')
			mobileObj = $('#mobile');
		if(!check_mobile(mobileObj))
		{
			return false;
		}
		$(this).addClass('disable');
		$(this).attr('disabled',true);
		sendSMS($(this),mobileObj);
	});
});
function sendSMS(btnObj,mobileObj)
{
	if(check_mobile(mobileObj))
	{
		mobile = $.trim($('#OrderMobile').val());
		smsCode = $.trim($('#captcha').val());
		btnObj.attr('value','发送中...');
		$.post("/plus/sendSMS/getOrderSMS.php",{"phone":mobile,"sms_code":smsCode},function(data){
				if(data=='success')
				{
					$("input[type='submit']").attr('disabled',false);
					lSeconds=60;
					$("#btn-sms").attr('value','已成功发送');
					displayInterval();
				}
				else
				{
					alert(data);
					$("input[type='submit']").attr('disabled',true);
					//alert('获取短信出错，请重试或联系管理员1！');
					$('#btn-sms').removeClass('disable');
					$('#btn-sms').attr('disabled',false);
				}
			})
		/*$.ajax({
			type: "GET",
			url: 'Customers/getsms?rnd='+new Date().getTime()/1000,
			data:'mobile='+$.trim(mobileObj.val()),
			dataType: 'html',
			success: function(data)
			{
				if(data=='success')
				{
					lSeconds=60;
					btnObj.val('已成功发送');
					displayInterval(btnObj,mobileObj);				
				}
				else if(data=='error')
				{
					alert('该用户不存！');
					btnObj.removeClass('disable');
					btnObj.attr('disabled',false);
				}
				else
				{
					alert('获取短信出错，请重试或联系管理员！');
					btnObj.removeClass('disable');
					btnObj.attr('disabled',false);
				}
			},
			'error':function(){
				alert('获取短信出错，请重试或联系管理员！');
				btnObj.removeClass('disable');
				btnObj.attr('disabled',false);
			}
		});	*/
	}	
}
var lSeconds = 60;
function displayInterval(obj,mobileObj){		
	$(".btn-sms").unbind('click');
	timeIntervalSMS=setInterval(function(){
		if(lSeconds<=1){
			obj.removeClass('disable');
			obj.attr('disabled',false);
			obj.attr('value','重新发送');
			clearInterval(timeIntervalSMS);
			$(".btn-sms").click(function(){
				var mobileObj = {};
				if(this.id == 'btn-sms')
					mobileObj = $('#OrderMobile');
				if(this.id == 'getSms')
					mobileObj = $('#mobile');
				if(!check_mobile(mobileObj))
					return false;
				$(this).addClass('disable');
				$(this).attr('disabled',true);
				sendSMS($(this),mobileObj);
			});
			return;
		}
		lSeconds--;
		obj.val(lSeconds+"秒后重发");
	}, 1000);

}
//手机验证
function check_mobile(obj)
{
	var m=$.trim(obj.val());
	if(m!='')
	{
		var reg = /^1[345789]\d{9}$/;
		var result = false;
		if (reg.test(m))
			result=true;		
		if (result)
		{
			return true;
		}else{
			alert("请输入正确的手机号！");
			obj.focus();
			return false;
		}
	}else{
		alert("请输入手机号！");
		obj.focus();
		return false;
	}
}
//开红包
$('#open').click(function(){
	//验证手机
	if(!check_mobile($('#mobile'))){
		return false;
	}
	var code = $.trim($('#captcha').val());

	if(code == ''){

		alert('请输入验证码'); 

		return false;

	}

	var product_id = $(this).attr('productId'); //对应产品id

	if(product_id == 356)

	{

		product_id = 345;

	}

	else if(product_id == 354)

	{

		product_id = 353;

	}

	else if(product_id == 355)

	{

		product_id = 270;

	}

	$.ajax({

		url:'Products/openPacket',

		data:{'mobile':$.trim($('#mobile').val()),'code':code,'product_id':product_id},

		success:function(data){

			$('#getSms').removeClass('disable');

			$('#getSms').attr('disabled',false);

		    if($('#getSms').val() != '重新发送' && $('#getSms').val() != '发送验证码'){	//还在倒计时

		    	if(typeof(timeIntervalSMS) != 'undefined')

		    		clearInterval(timeIntervalSMS);

		    	$("#getSms").val('获取验证码');

		    	$(".btn-sms").click(function(){

		    		var mobileObj = {};

					if(this.id == 'btn-sms')

						mobileObj = $('#OrderMobile');

					if(this.id == 'getSms')

						mobileObj = $('#mobile');

					if(!check_mobile(mobileObj))

						return false;

					$(this).addClass('disable');

					$(this).attr('disabled',true);

					sendSMS($(this),mobileObj);

		    	});

		    }
		    if(parseInt(data) != data)
		    {	
				//关闭红包弹窗
				guanbipacket($(".gwzl-hongbaotanchuang .hbtc-inner .guanbi"));
				//进入购买页
				var query = '';
				var url = "/Orders/create/"+data+query;
				window.location.href = url;
				return;
			}
			var str = '';  text = '获取验证码';
			switch(Number(data)){
				case 0:
				str = '内部错误';	break;
				case -1:
				str = '请输入正确的手机号码';	break;
				case -2:
				str = '短信验证码错误，请重试';				text = '重新发送';	break;
				case -3:
				str = '未生成验证码或验证码已过期,请重新获取';	text = '重新发送';	break;
				default: break;
			}
			$("#getSms").val(text);
			$('#captcha').val('');
			alert(str);
		}
	})
})
//验证码相关结束
function showInvoice()
{
	if($('#OrderInvoiceRequired').is(':checked'))
	{
		$("#invoice-info").show();
	}else
	{
		$("#invoice-info").hide();
	}
}
function cleanTitle()
{
	$('#OrderInvoiceTitle').val('');
	if($("#OrderInvoiceType2").is(':checked'))
	{
		$("#hideInvoiceTaxpayerId").show();
	}
	else
	{
		$("#hideInvoiceTaxpayerId").hide();
	}
}
function selectTitle()
{
	$('#OrderInvoiceType2').attr("checked","checked");
	$("#hideInvoiceTaxpayerId").show();
}
function popup()
{
	$.fancybox.open({
		'type' : 'inline',
		'href': '#dialog'
	});
}
function validateEmail(email)
{
	if(email=="")
		return true;
	var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(!pattern.test(email))
	{
		return false;
	}else 
	{
		return true;
	}
}

$("#btnPaySubmit").click(function(){
	//var smsCode=$('#OrderSmsCode').val();
	var mobileObj=$('#OrderMobile');
	if(!check_mobile(mobileObj)){
		return false;
	}
	/*if(smsCode==""){
		alert('请输入验证码!');
		return false;
	}*/

	/*$.ajax({
		type: "POST",
		url: 'Customers/ajaxSmsLogin',
		data: {'username':mobile,'smsCode':smsCode,'type':'order'},
		dataType: "json",
		success: function(data)
		{
			if(data.success)
			{				
				window.location.reload();	
			}
			else
			{
				$("#btnPaySubmit").attr("disabled",true);
				alert('验证错误，请重试！');
			}
		},
		error:function(xhr,t,tr){
			$("#askbtn").attr("disabled",true);
			//alert(tr);
		}
	});	*/
});

function validateCompanyName(cName)
{
	if(cName=="")
		return false;
	var reg=/^[\u4e00-\u9fa5()（）\[\]]{3,}$/;
	if(reg.exec(cName))
	{
		var start1 = cName.indexOf("(");
			var end1 = cName.indexOf(")");
			var start2 = cName.indexOf("（");
			var end2 = cName.indexOf("）");
			if(start1 > -1 && end1 > -1 && start1 < end1-1 )
			{
				return true;
			}
			else if(start2 > -1 && end2 > -1 && start2 < end2-1 )
			{
				return true;
			}
			else if(start1 == -1 && end1 == -1 && start2 == -1 && end2 ==-1)
			{
				return true;
			}
			else
				return false;			
		}			
		else
			return false;
	}
	var wasSubmitted = false;    
	function checkBeforeSubmit()
	{
		if(!check_mobile($('#OrderMobile')))
		{
			return false;
		}
		if(!validateEmail($('#OrderEmail').val()))
		{			
			alert("请填写正确的邮箱");
			return false;
		}
		if($('#OrderInvoiceRequired').is(':checked') && $('input[name="data[Order][invoice_type]"]:checked ').val()=='2' )
		{
			if($.trim($('#OrderInvoiceTitle').val()) == '')
			{
				alert('请填写企业名称');
				return false;
			}	
			if($.trim($('#OrderInvoiceTaxpayerId').val()) == '')
			{
				alert('企业开发票须填写纳税人识别码');
				return false;
			}		
		}
		if(!wasSubmitted) 
		{
			wasSubmitted = true;
			return wasSubmitted;
		}
		return false;
	} 
	$("#OrderCredit").keyup( function() {
		credit($(this).val());
	});
//积分处理
function credit(c)
{
	if(!c)
	{
		$("#OrderCredit").val("");
		$("#credit-rest").html(total_credit);
		$(".confirm-price").html(total_price);
		$("#confirm-credit").html(0);
	}else if(isNaN(c))
	{
		$("#OrderCredit").val("");
		$("#credit-rest").html(total_credit);
		$(".confirm-price").html(total_price);
		$("#confirm-credit").html(0);
	}else if(  parseInt(c) < 0)
	{
		$("#OrderCredit").val("");
		$("#credit-rest").html(total_credit);
		$(".confirm-price").html(total_price);
		$("#confirm-credit").html(0);
		$(this).val('');
	}else
	{
		var credit  = parseInt(c);	
		if(credit)
		{
			if(credit >= total_credit)
			{
				if(credit >= total_price)
				{
					if(total_price >= total_credit)
					{
						credit =total_credit;
					}else
					{
						credit = total_price;
						$("#OrderInvoiceRequired").attr('checked',false);							
					}
				}else
				{
					credit = total_credit;	
				}
			}else
			{
				if(credit >= total_price)
				{
					credit = total_price;
					$("#OrderInvoiceRequired").attr('checked',false);
				}else
				{
				}
			}
			$("#OrderCredit").val(credit);
			$("#credit-rest").html(total_credit - credit);
			$(".confirm-price").html(total_price-credit);
			$("#confirm-credit").html(credit);
		}else
		{
			$("#credit-rest").html(total_credit);
			$(".confirm-price").html(total_price);
			$("#confirm-credit").html(0);
		}
	}
}
</script> 
</body>
</html>