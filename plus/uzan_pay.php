<?php
/**
 * 发起订单支付入口
 */
require_once(dirname(__FILE__)."/../include/common.inc.php");
require_once DEDEDATA.'/payment/uzan.php';
require_once(DEDEINC.'/payment/uzan.php');
require_once(DEDEINC.'/memberlogin.class.php');
$cfg_ml = new MemberLogin();
if(!isset($total_fee) || $total_fee<=0){
    ShowMsg("支付金额不正确！", "javascript:;");
    exit();
}
$pay = new Uzan();
$outTradeNo = $out_trade_no ? $out_trade_no : uniqid();
$totalFee = floatval($total_fee);
$subject = isset($subject) ? $subject : '订单号：'.$outTradeNo;
$payment['pay_subject'] = $subject;
if($return_url) $payment['return_url'] = $return_url;
$mid = isset($mid) ? intval($mid) : $cfg_ml->M_ID;
$order=array(
    'out_trade_no' => $outTradeNo,
    'price' => $totalFee,
    'mid' => $mid,
    'aid' => intval($aid),
    'subject' => $subject,
);
//发起支付
$pay->GetCode($order, $payment);