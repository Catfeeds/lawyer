<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo $cfg_soft_lang; ?>">
<title><?php echo $oid;?></title>
<link href="css/base.css" rel="stylesheet" type="text/css" />
<body>
<table width="50%" border="0" align="center" cellpadding="1" cellspacing="1" bgcolor="#CCCCCC">
  <tr>
    <td height="25" colspan="2" align="center" bgcolor="#F0F0F0">订单信息</td>
  </tr>
<?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{
?>
  <tr>
    <td width="29%" height="25" align="right" bgcolor="#FFFFFF">订单号:</td>
    <td width="71%" bgcolor="#FFFFFF">&nbsp;<?php echo $fields['oid']; ?></td>
  </tr>
   <tr>
    <td height="25" align="right" bgcolor="#FFFFFF">商品名称:</td>
    <td height="25" bgcolor="#FFFFFF">&nbsp;<?php echo $fields['title']; ?></td>
  </tr>
   <tr>
    <td height="25" align="right" bgcolor="#FFFFFF">单价(元/单位):</td>
    <td height="25" bgcolor="#FFFFFF">&nbsp;<?php echo $fields['uprice']; ?></td>
  </tr>
   <tr>
    <td height="25" align="right" bgcolor="#FFFFFF">数量:</td>
    <td height="25" bgcolor="#FFFFFF">&nbsp;<?php echo $fields['cartcount']; ?></td>
  </tr>
  <tr>
    <td height="25" align="right" bgcolor="#FFFFFF">支付方式:</td>
    <td height="25" bgcolor="#FFFFFF">&nbsp;<?php echo GetSta($fields['state'],$oid)?></td>
  </tr>
  <tr>
    <td height="25" align="right" bgcolor="#FFFFFF">配送:</td>
    <td height="25" bgcolor="#FFFFFF">&nbsp;<?php echo $fields['dname']; ?> 费用:<?php echo $fields['dprice']; ?>元</td>
  </tr>
   <tr>
    <td height="25" align="right" bgcolor="#FFFFFF">购买时间:</td>
    <td height="25" bgcolor="#FFFFFF">&nbsp;<?php echo GetDateTimeMk($fields['stime']); ?></td>
  </tr>
   <tr>
    <td height="25" align="right" bgcolor="#FFFFFF">收货人:</td>
    <td height="25" bgcolor="#FFFFFF">&nbsp;<?php echo $row['consignee']?></td>
  </tr>
  <tr>
    <td height="25" align="right" bgcolor="#FFFFFF">地址:</td>
    <td height="25" bgcolor="#FFFFFF">&nbsp;<?php echo $row['address']?></td>
  </tr>
  <tr>
    <td height="25" align="right" bgcolor="#FFFFFF">邮编:</td>
    <td height="25" bgcolor="#FFFFFF">&nbsp;<?php echo $row['zip']?></td>
  </tr>
  <tr>
    <td height="25" align="right" bgcolor="#FFFFFF">联系电话:</td>
    <td height="25" bgcolor="#FFFFFF">&nbsp;<?php echo $row['tel']?></td>
  </tr>
  <tr>
    <td height="25" align="right" bgcolor="#FFFFFF">邮箱:</td>
    <td height="25" bgcolor="#FFFFFF">&nbsp;<?php echo $row['email']?></td>
  </tr>
  <tr>
    <td height="25" align="right" bgcolor="#FFFFFF">留言:</td>
    <td height="25" bgcolor="#FFFFFF">&nbsp;<?php echo $row['des']?></td>
  </tr>
  <tr>
    <td height="25" align="right" bgcolor="#FFFFFF">合计(元):</td>
    <td height="25" bgcolor="#FFFFFF">&nbsp;<?php echo $fields['priceCount']; ?>元</td>
  </tr>
<?php
}
}?>
  <tr>
    <td height="25" colspan="2" align="right" bgcolor="#F0F0F0" style="padding-right:6px;padding-left:6px;">
      <div style="float:left;">
      <input type="button" name="ss12" value="关闭窗口" style="width:90px" onClick="window.close();" class='inputbut'>
      </div>
      
      <div style="float:right;">
      <span style="font-weight:bold;">订单总计:</span> <span style="color:red;"><?php echo $fields['priceCount']; ?></span>元, <?php
$atts = array();
$atts['tagname'] = 'pagelist';
$atts['listsize'] = '3';
 echo $this->refObj->GetPageList($atts,$this->refObj,$fields); 
?>

      <div>
    </td>
  </tr>
</table>
</body>
</html>