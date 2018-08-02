<?php
require_once(dirname(__file__)."/config.php");
require_once(DEDEINC."/WxPay.Api.php");
require_once(DEDEDATA."/payment/weipay.php");
$input = new WxPayOrderQuery();
$input->SetOut_trade_no($out_trade_no);
echo json_encode(WxPayApi::orderQuery($input));
exit();