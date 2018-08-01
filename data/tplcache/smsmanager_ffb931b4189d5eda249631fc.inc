<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<head> 
<title>手机号码管理</title> 
<link href='img/base.css' rel='stylesheet' type='text/css' /> 
<style type="text/css"> 
th,td{ 
text-align:center; 
border:1px #D1DDAA solid; 
font-size:15px; 
} 
th{ 
background:#E6F8B7; 
} 
table{ 
margin-top:20px; 
} 
</style> 
</head> 
<body> 
<table width="90%" border="0" cellpadding="0" cellspacing="0" align="center"> 
<tr> 
<th>姓名</th> 
<th>E-mail</th> 
<th>手机号码</th> 
<th>状态</th> 
<th>操作</th> 
</tr> 
<!-- 循环得到结果 --> 
<?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{
?> 
<tr> 
<td><?php echo $fields['name']; ?></td> 
<td><?php echo $fields['mail']; ?></td> 
<td><?php echo $fields['moblie']; ?></td>
<td> 
<?php if($fields['tag']==0){ ?> 
个人
<?php
}
else{
?> 
<font color="red">企业</font> 
<?php } ?> 
</td> 
<td>  
<a href="smsmanager.php?action=delete&id=<?php echo $fields['id']; ?>">[删除]</a> 
</td> 
</tr> 
<?php
}
}?> 
</table> 
<!-- 分页标签 --> 
<p style="text-align:center;font-size:15px;"><?php
$atts = array();
$atts['tagname'] = 'pagelist';
$atts['listitem'] = 'info,index,end,pre,next,pageno';
$atts['listsize'] = '5';
 echo $this->refObj->GetPageList($atts,$this->refObj,$fields); 
?>
</p> 
</body> 
</html>