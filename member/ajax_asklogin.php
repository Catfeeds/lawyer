<?php
/**
 * @version        $Id: ajax_loginsta.php 1 8:38 2010年7月9日Z tianya $
 * @package        DedeCMS.Member
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
define('AJAXLOGIN', TRUE);
require_once(dirname(__FILE__)."/config.php");
AjaxHead();
if($myurl == '') exit('');
$uid  = $cfg_ml->M_LoginID;
!$cfg_ml->fields['face'] && $face = ($cfg_ml->fields['sex'] == '女')? 'dfgirl' : 'dfboy';
$facepic = empty($face)? $cfg_ml->fields['face'] : $GLOBALS['cfg_memberurl'].'/templets/images/'.$face.'.png';
?>
<li class="fl ">
	<a style="font-size:12px;" class="text-white" href="/member/shops_orders.php"><strong><?php echo $cfg_ml->M_Phone; ?></strong> 的订单</a> &nbsp;
	<a style="font-size:12px;" class="text-white" href="/member/index_do.php?fmdo=login&dopost=exit">退出</a>
</li>
<li class="fl" style="height: 40px;"> <img style="position: relative;left: 20px;" width="189" height="26" src="/templets/lawyer/images/400orange.png" alt="服务热线" /> </li>