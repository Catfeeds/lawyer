<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>免签约支付宝即时到帐接口 for DedeCMS 5.7 SP1安装程序 官方网址：www.zfbjk.com</title>
<style>
body{color:#000000; font-size:14px; line-height:25px;}
.suc{color:#006000;}
.err{color:#FF0000;}
</style>
</head>
<body>
<?php
require_once (dirname(__FILE__) . "/include/common.inc.php");
if($_GET['act']=='install')
{
$sql = 'INSERT INTO `#@__payment` VALUES (\'8\', \'alidirect\', \'支付宝免签约接口\', \'0\', \'本支付宝免签约接口由www.zfbjk.com提供，支持自动通知网站到帐，免企业支付宝，免签约，免手续费，不托管资金，资金直接进入您自己的支付宝帐号。商户ID、密钥为www.zfbjk.com网站用户的ID和密钥，请登录www.zfbjk.com网站注册用户后登录获取。\', \'0\', \'a:3:{s:14:"alipay_account";a:4:{s:5:"title";s:10:"收款支付宝";s:11:"description";s:0:"";s:4:"type";s:4:"text";s:5:"value";s:17:"support@zfbjk.com";}s:9:"alipay_id";a:4:{s:5:"title";s:6:"商户ID";s:11:"description";s:84:"请登录<a href=http://www.zfbjk.com target=_blank>www.zfbjk.com</a>注册用户获取商户ID";s:4:"type";s:4:"text";s:5:"value";s:5:"10000";}s:10:"alipay_key";a:4:{s:5:"title";s:8:"商户密钥";s:11:"description";s:0:"";s:4:"type";s:4:"text";s:5:"value";s:32:"e10adc3949ba59abbe56e057f20f883e";}}\', \'1\', \'0\', \'1\');';
$rs = $db->ExecuteNoneQuery2($sql);
if($rs==1)
{
echo '<span class="suc">接口安装成功，请登录DedeCMS后台，进入“系统”－“支付接口设置”更改“支付宝免签约接口”的显示名称和其它参数。</span><br />';
}
else
{
echo '<span class="err">安装出错，可能您已执行过安装。请登录DedeCMS后台，进入“系统”－“支付接口设置”更改“支付宝免签约接口”的显示名称和其它参数。<br />如果后台找不到此接口设置请联系客服QQ：40386277为您检查、处理。</span><br />';
}
echo '<input type="button" value=" 返回 " onclick="location.href=\'Install_Alidirect.php\'" />';
}
else if($_GET['act']=='uninstall')
{
$sql = 'delete from `#@__payment` where code = \'alidirect\'';
$rs = $db->ExecuteNoneQuery2($sql);
if($rs==1)
{
echo '<span class="suc">卸载成功，如果您对本接口有任何疑问，请与客服QQ：40386277联系。<br />有您的帮助，我们才能做的更好！感谢您的支持，期待您的再次安装。</span><br />';
}
else
{
echo '<span class="err">卸载出错，可能您的系统中并没有安装本接口。</span><br />';
}
echo '<input type="button" value=" 返回 " onclick="location.href=\'Install_Alidirect.php\'" />';
}
else
{
echo '在《支付宝免签约即时到帐接口》的安装、使用中遇到任何问题，请与客服QQ：40386277或E-mail：support@zfbjk.com联系<br />请选择您要执行的操作：<br />';
echo '<input type="button" value=" 安装支付宝免签约即时到帐接口 " onclick="location.href=\'Install_Alidirect.php?act=install\'" /><br />';
echo '<input type="button" value=" 卸载支付宝免签约即时到帐接口 " onclick="location.href=\'Install_Alidirect.php?act=uninstall\'" />';
}
?>
<br />
<br />
 * 支付宝免签约即时到帐接口 for DedeCMS 5.7 SP1<br />
 * 本插件由《支付宝免签约即时到帐辅助》提供 www.zfbjk.com<br />
 * QQ：40386277<br />
 * Email：support@zfbjk.com<br />
 * 本接口支持充值自动到帐，购买接口客户端软件请与客服或代理商联系
</body>
</html>