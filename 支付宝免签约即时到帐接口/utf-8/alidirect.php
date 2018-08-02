<?php
/**
 *
 * 支付宝免签约即时到帐接口 for DedeCMS 5.7 SP1 by Mr.Point
 * 本插件由《支付宝免签约即时到帐辅助》提供 www.zfbjk.com
 * QQ：40386277
 * Email：support@zfbjk.com
 * 本接口支持充值自动到帐，购买接口客户端软件请与客服或代理商联系
 */
require_once (dirname(__FILE__) . "/include/common.inc.php");
        if (!empty($_POST))
        {
            foreach($_POST as $key => $data)
            {
                $_POST[$key] = $data;
            }
        }
        /* 引入配置文件 */
		//$code = preg_replace( "#[^0-9a-z-]#i", "", $_GET['code'] );
		require_once DEDEDATA.'/payment/alidirect.php';
		
        /* 取得订单号 */
        $order_sn = trim($_POST['title']);
        /*判断订单类型*/
        if(preg_match ("/S-P[0-9]+RN[0-9]/",$order_sn)) {
            //检查支付金额是否相符
            $row = $this->dsql->GetOne("SELECT * FROM #@__shops_orders WHERE oid = '{$order_sn}'");
            if ($row['priceCount'] != $_POST['Money'])
            {
                exit("Fail");//支付失败，支付金额与商品总价不相符!
            }
            $this->mid = $row['userid'];
            $ordertype="goods";
        }else if (preg_match ("/M[0-9]+T[0-9]+RN[0-9]/", $order_sn)){
            $row = $dsql->GetOne("SELECT * FROM #@__member_operation WHERE buyid = '{$order_sn}'");
            //获取订单信息，检查订单的有效性
            if(!is_array($row)||$row['sta']==2) exit("Success");//您的订单已经处理，请不要重复提交!
            elseif($row['money'] != $_POST['Money']) exit("Fail");//支付失败，支付金额与商品总价不相符!
            $ordertype = "member";
            $product =    $row['product'];
            $pname= $row['pname'];
            $pid=$row['pid'];
            $mid = $row['mid'];
        } else {    
            exit("IncorrectOrder");//订单号错误
        }

        /* 检查数字签名是否正确 */
        $sign = '';		
		
		$sign=substr(md5($payment['alipay_id'].$payment['alipay_key'].$_POST['tradeNo'].$_POST['Money'].$_POST['title'].$_POST['memo']));

        if ($sign != $_POST['sign'])
        {
            exit("Fail");
        }

        if($ordertype=="goods"){ 
            if(success_db($order_sn))  exit("Success");
            else  return exit("Fail");
        } else if ( $ordertype=="member" ) {
            if(success_mem($order_sn,$pname,$product,$pid))  exit("Success");
            else  return exit("Fail");
        }

    /*处理物品交易*/
    function success_db($order_sn)
    {
		global $dsql;
        //获取订单信息，检查订单的有效性
        $row = $dsql->GetOne("SELECT state FROM #@__shops_orders WHERE oid='$order_sn' ");
        if($row['state'] > 0)
        {
            return TRUE;
        }    
        /* 改变订单状态_支付成功 */
        $sql = "UPDATE `#@__shops_orders` SET `state`='1' WHERE `oid`='$order_sn' AND `userid`='".$this->mid."'";
        if($dsql->ExecuteNoneQuery($sql))
        {
            log_result("verify_success,订单号:".$order_sn); //将验证结果存入文件
            return TRUE;
        } else {
            log_result ("verify_failed,订单号:".$order_sn);//将验证结果存入文件
            return FALSE;
        }
	}
    /*处理点卡，会员升级*/
    function success_mem($order_sn,$pname,$product,$pid)
    {
        //更新交易状态为已付款
		global $mid;
		global $dsql;
        $sql = "UPDATE `#@__member_operation` SET `sta`='1' WHERE `buyid`='$order_sn' AND `mid`='".$mid."'";
        $dsql->ExecuteNoneQuery($sql);

        /* 改变点卡订单状态_支付成功 */
        if($product=="card")
        {
            $row = $dsql->GetOne("SELECT cardid FROM #@__moneycard_record WHERE ctid='$pid' AND isexp='0' ");;
            //如果找不到某种类型的卡，直接为用户增加金币
            if(!is_array($row))
            {
                $nrow = $dsql->GetOne("SELECT num FROM #@__moneycard_type WHERE pname = '{$pname}'");
                $dnum = $nrow['num'];
                $sql1 = "UPDATE `#@__member` SET `money`=money+'{$nrow['num']}' WHERE `mid`='".$mid."'";
                $oldinf ="已经充值了".$nrow['num']."金币到您的帐号！";
            } else {
                $cardid = $row['cardid'];
                $sql1=" UPDATE #@__moneycard_record SET uid='".$mid."',isexp='1',utime='".time()."' WHERE cardid='$cardid' ";
                $oldinf='您的充值密码是：<font color="green">'.$cardid.'</font>';
            }
            //更新交易状态为已关闭
            $sql2=" UPDATE #@__member_operation SET sta=2,oldinfo='$oldinf' WHERE buyid='$order_sn'";
            if($dsql->ExecuteNoneQuery($sql1) && $dsql->ExecuteNoneQuery($sql2))
            {
                log_result("verify_success,订单号:".$order_sn); //将验证结果存入文件
                return TRUE;
            } else {
                log_result ("verify_failed,订单号:".$order_sn);//将验证结果存入文件
                return FALSE;
            }
        /* 改变会员订单状态_支付成功 */
        } else if ( $product=="member" ){
            $row = $dsql->GetOne("SELECT rank,exptime FROM #@__member_type WHERE aid='$pid' ");
            $rank = $row['rank'];
            $exptime = $row['exptime'];
            /*计算原来升级剩余的天数*/
            $rs = $dsql->GetOne("SELECT uptime,exptime FROM #@__member WHERE mid='".$mid."'");
            if($rs['uptime']!=0 && $rs['exptime']!=0 ) 
            {
                $nowtime = time();
                $mhasDay = $rs['exptime'] - ceil(($nowtime - $rs['uptime'])/3600/24) + 1;
                $mhasDay=($mhasDay>0)? $mhasDay : 0;
            }
            //获取会员默认级别的金币和积分数
            $memrank = $dsql->GetOne("SELECT money,scores FROM #@__arcrank WHERE rank='$rank'");
            //更新会员信息
            $sql1 =  " UPDATE #@__member SET rank='$rank',money=money+'{$memrank['money']}',
                       scores=scores+'{$memrank['scores']}',exptime='$exptime'+'$mhasDay',uptime='".time()."' 
                       WHERE mid='".$mid."'";
            //更新交易状态为已关闭
            $sql2=" UPDATE #@__member_operation SET sta='2',oldinfo='会员升级成功!' WHERE buyid='$order_sn' ";
            if($dsql->ExecuteNoneQuery($sql1) && $dsql->ExecuteNoneQuery($sql2))
            {
                log_result("verify_success,订单号:".$order_sn); //将验证结果存入文件
                return TRUE;
            } else {
                log_result ("verify_failed,订单号:".$order_sn);//将验证结果存入文件
                return FALSE;
            }
        }    
    }

    function  log_result($word) 
    {
        global $cfg_cmspath;
        $fp = fopen(dirname(__FILE__)."/../../data/payment/log.txt","a");
        flock($fp, LOCK_EX) ;
        fwrite($fp,$word.",执行日期:".strftime("%Y-%m-%d %H:%I:%S",time())."\r\n");
        flock($fp, LOCK_UN);
        fclose($fp);
    }
?>