<?php
require_once(dirname(__FILE__)."/../include/common.inc.php");
require_once DEDEDATA.'/payment/uzan.php';

$client_id = $payment['client_id'];//应用的 client_id
$client_secret = $payment['client_secret'];//应用的 client_secret
$json = file_get_contents('php://input');
$data = json_decode($json, true);
/**
 * 判断消息是否合法，若合法则返回成功标识
 */
$msg = $data['msg'];
$sign_string = $client_id."".$msg."".$client_secret;
$sign = md5($sign_string);
if($sign != $data['sign']){
    exit();
}else{
    if($data['id'] && $data['status']=='TRADE_SUCCESS'){
        //查询订单
        $queryData['id'] = $data['id'];
        $queryData['client_id'] = $client_id;
        $queryData['client_secret'] = $client_secret;
        $queryData['kdt_id'] = $payment['kdt_id'];
        $queryData['return_url'] = $payment['return_url'];

        $result = curlPost("http://pay.dedemao.com/query.php",$queryData);
    }
    $result = array("code"=>0,"msg"=>"success") ;
    echo json_encode($result);exit();
}

function curlPost($url = '', $postData = '', $options = array())
{
    if (is_array($postData)) {
        $postData = http_build_query($postData);
    }
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30); //设置cURL允许执行的最长秒数
    if (!empty($options)) {
        curl_setopt_array($ch, $options);
    }
    //https请求 不验证证书和host
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}
