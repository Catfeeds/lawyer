<?php 
require_once(dirname(__FILE__).'/config.php');//��̨�����ļ� ����½ ������Ϣ 
require_once(DEDEINC."/datalistcp.class.php");//������ҳ�� 
if($_GET['action']&&$_GET['id']){ 
if($_GET['action']=='pass'){//���ֲ��� 
$db->ExecuteNoneQuery("update dede_sms set `tag`=1 where id='$_GET[id]'"); 
ShowMsg('¼ȡ�ɹ�','adenroll.php'); 
} 
if($_GET['action']=='nopass'){ 
$db->ExecuteNoneQuery("update dede_sms set `tag`=0 where id='$_GET[id]'"); 
ShowMsg('ȡ��¼ȡ','adenroll.php'); 
} 
if($_GET['action']=='delete'){ 
$db->ExecuteNoneQuery("delete from dede_sms where id='$_GET[id]'"); 
ShowMsg('ɾ���ɹ�','adenroll.php'); 
} 
}else{ 
$dl = new DataListCP(); 
$dl->pageSize = 10;//ÿҳ��ʾ10�� 
$dl->SetTemplate('./templets/smsmanager.html');//����ģ�� 
$sql="select * from dede_sms"; 
$dl->SetSource($sql);//ִ��sql ������$dl->SetTemplate �ߵ� 
$dl->Display();//��ʾҳ�� 
}

?>