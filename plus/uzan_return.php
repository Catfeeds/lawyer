<?php
require_once(dirname(__FILE__)."/../include/common.inc.php");
/* 取得订单号 */
$order_sn = trim(addslashes($out_trade_no));
/*判断订单类型*/
if(preg_match ("/S-P[0-9]+RN[0-9]/",$order_sn)) {
    //检查支付金额是否相符
    $row = $dsql->GetOne("SELECT * FROM #@__shops_orders WHERE oid = '{$order_sn}'");
	$row['money'] = $row['priceCount'];
}else if (preg_match ("/M[0-9]+T[0-9]+RN[0-9]/", $order_sn)){
    $row = $dsql->GetOne("SELECT * FROM #@__member_operation WHERE buyid = '{$order_sn}'");
} else {
    $row['money'] = $total_fee;
}
?>
<html>
<head>
    <meta charset="UTF-8">
    <title>成功支付</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <script type="text/javascript" src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
    <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <style>
        .container {
            width: 100%;
            max-width: 600px;
        }

        .mtm {
            margin-top: 10px;
        }

        .pay-top {
            padding: 15px 0px;
            background: #FAFAFA;
            border: 2px #009900 dashed;
            margin: 20px 0px;
            font-family: 微软雅黑;
        }
    </style>
</head>
<body>
<div class="container mtm">
    <div class="text-center pay-top">
        <h2 class="text-success"><i class="glyphicon glyphicon-ok"></i> 支付成功！<br>您的订单已经成功提交</h2>
        <h3>订单号：<?php echo $out_trade_no?></h3>
        <h3>总金额：￥<?php echo $row['money']?></h3>
    </div>

    <div class="text-center QRcode-button">
        <button type="button" class="btn btn-info" onclick="javascript:location.href='<?php echo $cfg_basehost.$cfg_cmspath?>';">返回网站</button>
    </div>
</div>
</body>
</html>