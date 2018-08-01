<?php 
require_once(dirname(__FILE__).'/config.php');//后台配置文件 检查登陆 配置信息 
require_once(DEDEINC."/datalistcp.class.php");//包含分页类 
if($_GET['action']&&$_GET['id']){ 
if($_GET['action']=='pass'){//各种操作 
$db->ExecuteNoneQuery("update dede_sms set `tag`=1 where id='$_GET[id]'"); 
ShowMsg('录取成功','adenroll.php'); 
} 
if($_GET['action']=='nopass'){ 
$db->ExecuteNoneQuery("update dede_sms set `tag`=0 where id='$_GET[id]'"); 
ShowMsg('取消录取','adenroll.php'); 
} 
if($_GET['action']=='delete'){ 
$db->ExecuteNoneQuery("delete from dede_sms where id='$_GET[id]'"); 
ShowMsg('删除成功','adenroll.php'); 
} 
}else{ 
$dl = new DataListCP(); 
$dl->pageSize = 10;//每页显示10条 
$dl->SetTemplate('./templets/smsmanager.html');//载入模板 
$sql="select * from dede_sms"; 
$dl->SetSource($sql);//执行sql 不能与$dl->SetTemplate 颠倒 
$dl->Display();//显示页面 
}

?>