<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>购物车 - 下单购买<?php echo $GLOBALS['_vars']['carts']['orders_id']; ?></title>
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo $GLOBALS['cfg_soft_lang']; ?>" />
<meta name="generator" content="DedeCMS V5.6" />
<meta name="author" content="desdev.cn" />
<link href="<?php echo $GLOBALS['cfg_templets_skin']; ?>/style/dedecms.css" rel="stylesheet" media="screen" type="text/css" />
<link href="<?php echo $GLOBALS['cfg_templets_skin']; ?>/style/table.css" rel="stylesheet" media="screen" type="text/css" />
</head>
<body class="buycarpage">
<div class="header">
  <div class="top w960 center">
    <div class="title">
      <h1><a href="<?php echo $GLOBALS['cfg_basehost']; ?>" title="<?php echo $GLOBALS['cfg_webname']; ?>"><img src="<?php echo $GLOBALS['cfg_templets_skin']; ?>/images/logo.gif" alt="<?php echo $GLOBALS['cfg_webname']; ?>"/></a> </h1>
    </div>
    <!-- /title -->
    <div class="welcome">
      <?php
            if($cfg_ml->IsLogin()){
            ?>
      <b><?php echo $cfg_ml->M_UserName; ?></b>,欢迎您的登陆。 <a href="<?php echo $cfg_memberurl; ?>/index.php">会员中心</a> | <a href="<?php echo $cfg_memberurl; ?>/edit_fullinfo.php">我的资料</a> | <a href="<?php echo $cfg_memberurl; ?>/index.php?uid=<?php echo urlencode($cfg_ml->M_LoginID);?>">我的空间</a> | <a href="<?php echo $cfg_memberurl; ?>/index_do.php?fmdo=login&dopost=exit">退出登录</a>
      <?php
            }
            ?>
    </div>
    <!-- /banner -->
  </div>
  <!-- /top -->
</div>
<!-- /header -->
<div class="w960 clear center mt1 cmt-box">
  <div class="sp-title">
    <h2>商品购买</h2>
  </div>
  <div class="buycar">
    <?php if(!$cfg_ml->IsLogin()){ ?>
    <table cellpadding="0" cellspacing="0" class="flow">
      <tr>
        <td style="color:#F00">您好,欢迎来到本网站, 请 <a href="../member/login.php?gourl=<?php echo urlencode(GetCurUrl());?>">登录</a> 或 <a href="../member/index_do.php?fmdo=user&dopost=regnew">注册</a></td>
      </tr>
    </table>
    <?php }?>
    <form id="fixupformid" name="fixupform" action="carbuyaction.php" method="post">
      <input name="do" type="hidden" value="clickout">
      <table cellpadding="0" cellspacing="0" class="flow">
        <tr>
          <td class="thisclass">下单购买</td>
          <td>买家付款</td>
          <td>确认收货</td>
          <td>交易结束 </td>
        </tr>
      </table>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" class="dede_table">
        <thead>
          <tr>
            <td colspan="6">确认订单信息</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="180" class="td1">订单编号</td>
            <td><strong><?php echo $GLOBALS['_vars']['carts']['orders_id']; ?></strong></td>
          </tr>
          <tr>
            <td width="180" class="td1">订单价格</td>
            <td><strong class="fc-f60" id="priceCount"><?php echo $GLOBALS['_vars']['carts']['price_count']; ?></strong> 元</td>
          </tr>
          <tr>
            <td width="180" class="td1">商品总数</td>
            <td><?php echo $GLOBALS['_vars']['carts']['cart_count']; ?>件</td>
          </tr>
          <tr>
            <td width="180" class="td1">状态</td>
            <td>下单</td>
          </tr>
        </tbody>
      </table>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" class="dede_table">
        <thead>
          <tr>
            <td colspan="6">配送方式</td>
          </tr>
        </thead>
        <tbody>
        
        <?php  foreach($GLOBALS['shops_deliveryarr'] as $key=>$value){ ?>
        <tr>
          <td width="10%" class="td1"><input type="radio" name="pid" value="<?php echo $value['pid']; ?>"/></td>
          <td width="90%"><p><strong><?php echo $value['dname']; ?></strong> <span class="fc-f90">手续费：<?php echo $value['price']; ?>元</span> <small><?php echo $value['des']; ?>.</small> </p></td>
        </tr>
        <?php  }    ?>

        </tbody>
        
      </table>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" class="dede_table">
        <thead>
          <tr>
            <td colspan="8">支付方式</td>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td class="td1">&nbsp;</td>
          <td align="center" valign="middle" style="vertical-align:middle;"><strong>名称</strong></td>
          <td align="center"><strong>描述</strong></td>
          <td align="center"><strong>手续费</strong></td>
        </tr>        
        <?php  foreach($GLOBALS['shops_paymentarr'] as $key=>$value){ ?>

        <tr onMouseMove="javascript:this.bgColor='#F8F8F8';" onMouseOut="javascript:this.bgColor='#FFFFFF';">
          <td width="10%" align="right" style="vertical-align:middle;"><input name="paytype" type="radio" value="<?php echo $value['id']; ?>" /></td>
          <td width="20%" valign="middle" style="vertical-align:middle;"> <?php echo $value['name']; ?> </td>
          <td width="60%"> <?php echo $value['description']; ?> </td>
          <td width="10%" align="center"> <span class="fc-f60"><?php echo $value['fee']; ?>元</span> </td>
        </tr>
        <?php  }    ?>

        </tbody>
        
      </table>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" class="dede_table">
        <thead>
          <tr>
            <td colspan="6">确认订单信息</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="180" class="td1">街道地址</td>
            <td><input name="address" id="address" type="text" class="ipt-txt" size="50" />
              <span class="red">*</span><small>请填写街道地址，不能为空!</small></td>
          </tr>
          <tr>
            <td width="180" class="td1">收货人</td>
            <td><input name="postname" id="postname" type="text" class="ipt-txt" size="20" />
              <span class="red">*</span><small>请填写收货人姓名</small></td>
          </tr>
          <tr>
            <td width="180" class="td1">E-Mail</td>
            <td><input name="email" id="email" type="text" class="ipt-txt" size="30" />
              <small>可选，联系您的电子邮箱</small></td>
          </tr>
          <tr>
            <td width="180" class="td1">手机/电话</td>
            <td><input name="tel" id="tel" type="text" class="ipt-txt" size="30" />
              <span class="red">*</span><small>请填写可以联系到您的电话</small></td>
          </tr>
          <tr>
            <td width="180" class="td1">邮编</td>
            <td><input name="zip" id="zip" type="text" class="ipt-txt" size="30" />
              <span class="red">*</span><small>请填写格式如：300030</small></td>
          </tr>
        </tbody>
      </table>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" class="dede_table">
        <thead>
          <tr>
            <td colspan="6">确认订单信息</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="180" class="td1">购买留言</td>
            <td><textarea name="des" id="des" cols="50" rows="5" class="ipt-txt"></textarea>
              <p><small>请在购买留言中填写您对商品的特殊要求，如“我要红色的小码”(100个字以内)</small></p></td>
          </tr>
          <tr>
            <td width="180" class="td1">验证码</td>
            <td><a name="mate_vdimgck" />
              <input name="vdcode" id="vdcode" type="text" class="ipt-txt" size="10" style="text-transform:uppercase;" />
              <a href="#mate_vdimgck"><img id="vdimgck_img" src="../include/vdimgck.php" hspace="6" align="absmiddle" onClick="vdimgck();" title="看不清换一张" /></a> <a href="#mate_vdimgck" onClick="vdimgck();">看不清换一张</a></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"><button type="submit" class="btn-2">确认下单</button></td>
          </tr>
        </tfoot>
      </table>
    </form>
  </div>
</div>
<script language="JavaScript" type="text/javascript">
function vdimgck()
{
	document.getElementById("vdimgck_img").src = '../include/vdimgck.php?'+Math.random();
}
</script>
<?php include $this->CompilerInclude("../default/footer.htm");
 ?>
</body>
</html>