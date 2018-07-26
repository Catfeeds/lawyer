<?php
header("content-type:text/html;charset=utf8");
require_once(dirname(__FILE__)."/config.php");
$uid  = $cfg_ml->M_LoginID;
if($uid){
    $cfg_ml->ExitCookie();
	if(defined('UC_API') && @include_once DEDEROOT.'/uc_client/client.php')
	{
		$ucsynlogin = uc_user_synlogout();
	}
    $return=array(
    'code'=>1,
    'reload_page'=>1
    );
}else{
    $return=array(
    'code'=>1,
    'reload_page'=>0
    );
}
?>