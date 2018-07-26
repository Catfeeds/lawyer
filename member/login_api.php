<?php
define('AJAXLOGIN', TRUE);
require_once(dirname(__FILE__)."/config.php");
AjaxHead();
$uid  = $cfg_ml->M_LoginID;
if($uid){
	$ret=array(
	"is_login"=>1, //已登录，返回登录的用户信息
	"user"=>array(
		"user_id"=>$uid,
		"nickname"=>$cfg_ml->M_Phone,
		"img_url"=>"/images/login.jpg",
		"profile_url"=>"",
		"sign"=>"**" //注意这里的sign签名验证已弃用，任意赋值即可
	));

}else{
	$ret=array("is_login"=>0);//未登录
}
echo $_GET['callback'].'('.json_encode($ret).')';

?>