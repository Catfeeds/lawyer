<?php
define('AJAXLOGIN', TRUE);
require_once(dirname(__FILE__)."/config.php");
AjaxHead();
$uid  = $cfg_ml->M_LoginID;
if($uid){
	$ret=array(
	"is_login"=>1, //�ѵ�¼�����ص�¼���û���Ϣ
	"user"=>array(
		"user_id"=>$uid,
		"nickname"=>$cfg_ml->M_Phone,
		"img_url"=>"/images/login.jpg",
		"profile_url"=>"",
		"sign"=>"**" //ע�������signǩ����֤�����ã����⸳ֵ����
	));

}else{
	$ret=array("is_login"=>0);//δ��¼
}
echo $_GET['callback'].'('.json_encode($ret).')';

?>