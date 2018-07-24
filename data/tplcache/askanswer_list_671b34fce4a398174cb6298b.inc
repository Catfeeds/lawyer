<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo $cfg_soft_lang; ?>">
<title>问答模块 -- 用户提问管理</title>
<link href="static/style/admin.css" rel="stylesheet" type="text/css" />
<script language='javascript'>
	function DelOld()
	{
		if(window.confirm("你确实要删除选定的记录么？"))
		{
			document.lurdform.ac.value = 'delete';
			document.lurdform.submit();
		}
	}
	function CheckOld()
	{
		document.lurdform.ac.value = 'check';
		document.lurdform.submit();
	}
	function AllSel(ntype)
	{
		var f = document.lurdform;
		for(var i=0; i < f.elements.length; i++)
		{
			if(f.elements[i].type=='checkbox') {
				if(ntype==1) f.elements[i].checked = true;
				else if(ntype==0) f.elements[i].checked = false;
				else f.elements[i].checked = !f.elements[i].checked;
			}
		}
	}
</script>
</head>
<body leftmargin='8' topmargin='8'>
<div class="bodytitle">
<div class="bodytitleleft"></div>
<div class="bodytitletxt" style="padding-left:10px;"><b>问答模块</b> -- 答案管理</div>
</div>
<tr>
<td align='center' valign='top'>
<table width="98%" border="0" cellpadding="1" cellspacing="1" align="center" class="tbtitle" style="background:#cfcfcf;">
<tr>
<td height="26" colspan="6" align="left"  bgcolor="#EDF9D5" background="static/images/tbg.gif" style="padding-left:10px;">
<b>答案列表 &nbsp; <a href="?ct=answer">全部答案</a> | <a href="?ct=answer&ifcheck=0">未审核</a> | <a href="?ct=answer&ifcheck=1">已审核</a></b>
</td>
</tr>
<form name="lurdform" action="<?php
$atts = array();
$atts['tagname'] = 'server';
$atts['name'] = 'PHP_SELF';
$blockValue = MakePublicTag($atts,$this->refObj,$fields); 
if(is_array($blockValue) && count($blockValue) > 0){
foreach( $blockValue as $key=>$fields )
{

}
}
?>" method="post">
<input type='hidden' name='ct' value='<?php echo $GLOBALS['ct']; ?>' />
<input type='hidden' name='ac' value='listenall' />
<input type='hidden' name='bc' value='' />
<input type='hidden' name='pageno' value='<?php echo $GLOBALS['pageno']; ?>' />
<tr height="25" align="center" bgcolor="#FBFCE2">
  <td  width="6%" align="center">ID</td>
  <td width="4%" align="center">选择</td>
  <td width="50%" align="center">答案</td>
  <td width="10%" align="center">回答时间</td>
  <td width="6%" align="center">回答者</td>
  <td width="6%" align="center">答案状态</td>
</tr>
<?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{

	if($fields['ifcheck'] == 1){
		$fields['ifcheck'] = '已审核';
	}elseif($fields['ifcheck']==0){
		$fields['ifcheck'] = '未审核';
	}
    if(strlen($fields['content']) > 248)
    	$fields['content']= cn_substr($fields['content'],248).'...';
    //对连接地址进行处理
    if($cfg_ask_isdomain == 'Y')
    {
        if($cfg_ask_rewrite == 'Y')
            $qurl = $cfg_ask_domain.'/'.$fields['id'].'html';
        else
            $qurl = $cfg_ask_domain.'?ct=question&askaid='.$fields['id'];
    }else{
        if($cfg_ask_rewrite == 'Y')
            $qurl = $cfg_ask_directory.'/'.$fields['id'].'html';
        else
            $qurl = $cfg_ask_directory.'/?ct=question&askaid='.$fields['id'];
    }    
?>
<tr align='center' bgcolor="#FFFFFF"  onMouseMove="javascript:this.bgColor='#FCFDEE';" onMouseOut="javascript:this.bgColor='#FFFFFF';" height="22" >
<td><?php echo $fields['id']; ?></td>
<td><input type="checkbox" name="id[]" value="<?php echo $fields['id']; ?>" /></td>
<td align='left'><a title="点击查看问题页面" href="<?php echo $qurl;?>" target="_blank"><?php echo $fields['content']; ?></a></td>
<td><?php echo GetDateTimeMk($fields['dateline']); ?></td>
<td><a href="member_view.php?ID=<?php echo $fields['uid'];?>" target="_blank"><?php echo $fields['username']; ?></a></td>
<td><?php echo $fields['ifcheck']; ?></td>
</tr>
<?php
}
}?>
<tr bgcolor="#ffffff">
<td height="30" colspan="6" align="left">
&nbsp;
<a href="javascript:AllSel(1)" class="coolbg">全选</a>
<a href="javascript:AllSel(0)" class="coolbg">取消</a>
<a href="javascript:CheckOld()" class="coolbg">审核</a>
<a href="javascript:DelOld()" class="coolbg">删除</a></td>
</tr>
</form>
<tr align="right" bgcolor="#F9FCEF">
<td height="20" colspan="6" align="center">
<?php
$atts = array();
$atts['tagname'] = 'pagelist';
$atts['listsize'] = '5';
$atts['listitem'] = 'info,index,end,pre,next,pageno,form';
 echo $this->refObj->GetPageList($atts,$this->refObj,$fields); 
?>

</td>
</tr>
</table>
</td>
</tr>
</body>
</html>