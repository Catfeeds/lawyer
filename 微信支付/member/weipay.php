<?php
require_once(dirname(__file__)."/config.php");
?>
<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1" /> 
    <title>微信支付</title>
	<script src="/include/js/jquery/jquery.js" type="text/javascript"></script>
</head>
<body>
<div style='margin:auto;width:350px;margin-top:100px;border:1px solid #DADADA;height:150px;'>
	<div style='float:left;width:150px;'><img alt="模式二扫码支付" src="/include/qrcode.php?data=<?php echo $url;?>" style="width:150px;height:150px;"/></div>
	<div style="flost:left;width:350px;text-align:center">
	<p style="margin-top:50px;">使用微信扫一扫支付</p>
	<p style='font-size:14px;color:#666'>支付完成关闭此页</p>
	</div>
	
</div>
<script>
$ = jQuery;
$(function(){
	setInterval(weipay,5000);
})

function weipay()
{
	var timeStamp = new Date().getTime();
	$.get("/member/weipay_ajax.php",{'out_trade_no':'<?php echo $out_trade_no; ?>',timeStamp:timeStamp},function(data){
		if(data['trade_state'] == 'SUCCESS')
		{
			alert("订单支付成功，即将跳转....");
			window.location.href='/plus/carbuyaction.php?dopost=return&code=weipay&out_trade_no=<?php echo $out_trade_no; ?>&total_fee='+data['cash_fee'];
		}
	},'json')
}
</script>
</body>
</html>