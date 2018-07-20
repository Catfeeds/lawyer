<?php
if(!defined('DEDEINC')) exit('Request Error!');
require_once(DEDEINC.'/payment/uzan.lib.php');
/**
 * 有赞接口类
 * 支持支付宝、微信、储蓄卡支付
 * author：六久阁  www.lol9.cn
 * Class uzan
 */
class Uzan
{
    var $dsql;
    var $mid;
    var $return_url = "/plus/uzanbuyaction.php?dopost=return";

    /**
     * 构造函数
     *
     * @access  public
     * @param
     *
     * @return void
     */
    function Uzan()
    {
        global $dsql;
        $this->dsql = $dsql;
    }

    function __construct()
    {
        $this->Uzan();
    }
    
    /**
     *  设定接口会送地址
     *
     *  例如: $this->SetReturnUrl($cfg_basehost."/tuangou/control/index.php?ac=pay&orderid=".$p2_Order)
     *
     * @param     string  $returnurl  会送地址
     * @return    void
     */
    function SetReturnUrl($returnurl='')
    {
        if (!empty($returnurl))
        {
            $this->return_url = $returnurl;
        }
    }

    /**
    * 生成支付代码
    * @param   array   $order      订单信息
    * @param   array   $payment    支付方式信息
    */
    function GetCode($order, $payment)
    {
        global $cfg_basehost,$cfg_cmspath,$cfg_soft_lang;
        $charset = $cfg_soft_lang;
        //对于二级目录的处理
        if(!empty($cfg_cmspath)) $cfg_basehost = $cfg_basehost.'/'.$cfg_cmspath;

		//添加订单记录
		$order['mid'] = $order['mid'] ? intval($order['mid']) : 0;
		$order['aid'] = $order['aid'] ? intval($order['aid']) : 0;
        $order['subject'] = $order['subject'] ? $order['subject'] : '订单号：'.$order['out_trade_no'];
		$query = "INSERT INTO `#@__uzanorder` (`subject`,`out_trade_no`,`mid`,`aid`,`total_fee`,`created_at`) VALUES ('".$order['subject']."','".$order['out_trade_no']."','".$order['mid']."','".$order['aid']."','".$order['price']."','".date('Y-m-d H:i:s')."')";
		$this->dsql->ExecuteNoneQuery($query);

        /* 清空购物车 */
        require_once DEDEINC.'/shopcar.class.php';
        $cart     = new MemberShops();
        $cart->clearItem();
        $cart->MakeOrders();

        $clientId = $payment['client_id'];
        $clientSecret = $payment['client_secret'];
        $kdtId = $payment['kdt_id'];
        $outTradeNo = $order['out_trade_no'];
        $paySubject = $payment['pay_subject'] ? $payment['pay_subject'] : '订单号：'.$outTradeNo;
        if($cfg_soft_lang != 'utf-8') $paySubject = @iconv('GBK','UTF-8//IGNORE',$paySubject);
		$payment['return_url'] = str_replace('carbuyaction','uzanbuyaction',$payment['return_url']);	//兼容1.2之前的版本
        $returnUrl = $payment['return_url'];
        $totalFee = floatval($order['price']);
        $uzanPay = new UzanService($clientId,$clientSecret,$kdtId,$paySubject,$returnUrl,$totalFee,$outTradeNo);
        $sHtml = $uzanPay->doPay();
        $head = '<!DOCTYPE html><html><head><meta charset="'.$charset.'" /><title>跳转到支付页面</title><style type="text/css">.load-box{position:fixed;width:100%;height:100%;z-index:9999999999;background:rgba(255,255,255,1);opacity:1;visibility:visible;transition:1s;-moz-transition:1s;-ms-transition:1s;-o-transition:1s;-webkit-transition:1s}.load-box.active{opacity:0;visibility:hidden}.load-box svg{position:absolute;top:20%;left:50%;margin:-50px 0 0 -50px;width:100px;height:100px;padding:10px}.load-box svg circle{fill-opacity:0;-webkit-animation:stroke 1.2s linear infinite;animation:stroke 1.2s linear infinite}.load-box svg circle:nth-child(01){-webkit-animation-delay:-.1s;animation-delay:-.1s}.load-box svg circle:nth-child(02){-webkit-animation-delay:-.2s;animation-delay:-.2s}.load-box svg circle:nth-child(03){-webkit-animation-delay:-.3s;animation-delay:-.3s}.load-box svg circle:nth-child(04){-webkit-animation-delay:-.4s;animation-delay:-.4s}.load-box svg circle:nth-child(05){-webkit-animation-delay:-.5s;animation-delay:-.5s}.load-box svg circle:nth-child(06){-webkit-animation-delay:-.6s;animation-delay:-.6s}.load-box svg circle:nth-child(07){-webkit-animation-delay:-.7s;animation-delay:-.7s}.load-box svg circle:nth-child(08){-webkit-animation-delay:-.8s;animation-delay:-.8s}.load-box svg circle:nth-child(09){-webkit-animation-delay:-.9s;animation-delay:-.9s}.load-box svg circle:nth-child(10){-webkit-animation-delay:-1s;animation-delay:-1s}.load-box svg circle:nth-child(11){-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.load-box svg circle:nth-child(12){-webkit-animation-delay:-1.2s;animation-delay:-1.2s}@-webkit-keyframes stroke{0%{fill:#00c0ff;stroke:#00c0ff;stroke-opacity:0;stroke-width:4}10%{stroke-opacity:1}80%{stroke-width:16}95%{fill:#0c0ff0;stroke:#0c0ff0;stroke-opacity:.1}}@keyframes stroke{0%{fill:#00c0ff;stroke:#00c0ff;stroke-opacity:0;stroke-width:4}10%{stroke-opacity:1}80%{stroke-width:16}95%{fill:#0c0ff0;stroke:#0c0ff0;stroke-opacity:.1}}@media (max-width:1199px){.load-box svg{margin:-45px 0 0 -45px;width:110px;height:110px}}@media (max-width:767px){.load-box svg{margin:-40px 0 0 -40px;width:80px;height:80px}}</style></head><body>正在跳转到支付页面...<div class="load-box"><svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle cx="35" cy="16.6987298" r="11"></circle><circle cx="16.6987298" cy="35" r="11"></circle><circle cx="10" cy="60" r="11"></circle><circle cx="16.6987298" cy="85" r="11"></circle><circle cx="35" cy="103.30127" r="11"></circle><circle cx="60" cy="110" r="11"></circle><circle cx="85" cy="103.30127" r="11"></circle><circle cx="103.30127" cy="85" r="11"></circle><circle cx="110" cy="60" r="11"></circle><circle cx="103.30127" cy="35" r="11"></circle><circle cx="85" cy="16.6987298" r="11"></circle><circle cx="60" cy="10" r="11"></circle></g></svg></div>';
        $html = $head.$sHtml.'</body></html>';
        if(!is_writeable(DEDEROOT.'/plus/pay_action.php'))
        {
            echo $html;exit();
        }else{
            file_put_contents(DEDEROOT.'/plus/pay_action.php',$html);
            header("Location:{$cfg_cmspath}/plus/pay.php");
            exit();
        }
    }

    
    /**
    * 响应操作
    */
    function respond()
    {
        global $cfg_cmspath;
        if (!empty($_POST))
        {
            foreach($_POST as $key => $data)
            {
                $_GET[$key] = $data;
            }
        }
        /* 引入配置文件 */
		$code = preg_replace( "#[^0-9a-z-]#i", "", $_GET['code'] );
		require_once DEDEDATA.'/payment/'.$code.'.php';
        /* 取得订单号 */
        $order_sn = trim(addslashes($_GET['out_trade_no']));
        /*判断订单类型*/
        if(preg_match ("/S-P[0-9]+RN[0-9]/",$order_sn)) {
            //检查支付金额是否相符
            $row = $this->dsql->GetOne("SELECT * FROM #@__shops_orders WHERE oid = '{$order_sn}'");
            if ($row['priceCount'] != $_GET['total_fee'])
            {
                return $msg = "支付失败，支付金额与商品总价不相符!";
            }
            $this->mid = $row['userid'];
            $ordertype="goods";
        }else if (preg_match ("/M[0-9]+T[0-9]+RN[0-9]/", $order_sn)){
            $row = $this->dsql->GetOne("SELECT * FROM #@__member_operation WHERE buyid = '{$order_sn}'");
            //获取订单信息，检查订单的有效性
            if(!is_array($row)||$row['sta']==2){
                header("Location:{$cfg_cmspath}/plus/uzan_return.php?out_trade_no={$order_sn}&total_fee=".$_GET['total_fee']);
                exit();
            }
            elseif($row['money'] != $_GET['total_fee']){
                return $msg = "支付失败，支付金额与商品总价不相符!";
            }
            $ordertype = "member";
            $product =    $row['product'];
            $pname= $row['pname'];
            $pid=$row['pid'];
            $this->mid = $row['mid'];
        } else {
            $row = $this->dsql->GetOne("SELECT * FROM #@__uzanorder WHERE out_trade_no = '{$order_sn}'");
            if(!is_array($row)||$row['status']==0){
                header("Location:{$cfg_cmspath}/plus/uzan_return.php?out_trade_no={$order_sn}&total_fee=".$_GET['total_fee']);
                exit();
            }
            elseif($row['total_fee'] != $_GET['total_fee']){
                return $msg = "支付失败，支付金额与商品总价不相符!";
            }
            $ordertype = 'zan';
        }
        $client_id = $payment['client_id'];//应用的 client_id
        $client_secret = $payment['client_secret'];//应用的 client_secret
        $sign_string = $client_id.str_replace("\\","",$_GET['msg']).$client_secret;
        $sign = md5($sign_string);
        if($sign != $_GET['sign']){
            return $msg = "支付失败!";
        }
        if($_GET['trade_status'] == 'TRADE_FINISHED' || $_GET['trade_status'] == 'WAIT_SELLER_SEND_GOODS' || $_GET['trade_status'] == 'TRADE_SUCCESS')
        {
            $this->success_uzan($_GET);
            if($ordertype=="goods"){
                if($this->success_db($order_sn)){
                    header("Location:/plus/uzan_return.php?out_trade_no={$order_sn}&total_fee=".$_GET['total_fee']);
                    exit();
                }
                else  return $msg = "支付失败！<br> <a href='/'>返回主页</a> <a href='/member'>会员中心</a>";
            } else if ( $ordertype=="member" ) {
                $oldinf = $this->success_mem($order_sn,$pname,$product,$pid);
                header("Location:/plus/uzan_return.php?out_trade_no={$order_sn}&total_fee=".$_GET['total_fee']);
                exit();
            }else if ( $ordertype=="zan" ) {
                header("Location:/plus/uzan_return.php?out_trade_no={$order_sn}&total_fee=".$_GET['total_fee']);
                exit();
            }
        } else {
            $this->log_result ("verify_failed");
            return $msg = "支付失败！<br> <a href='/'>返回主页</a> <a href='/member'>会员中心</a>";
        }
    }

    /*处理有赞订单*/
    function success_uzan($data)
    {
        global $cfg_soft_lang;
		if(empty($data['pay_at'])) return;
        $order_sn = $data['out_trade_no'];
        //获取订单信息，检查订单的有效性
        $row = $this->dsql->GetOne("SELECT * FROM #@__uzanorder WHERE out_trade_no='$order_sn' ");
        if($row['status'] == 0)
        {
            return TRUE;
        }
        /* 改变订单状态_支付成功 */
        if($cfg_soft_lang == 'utf-8')
        {
            $buyer_info = AutoCharset($data['buyer_info'],'utf-8','gb2312');
            $buyer_info = serialize($buyer_info);
            $buyer_info = gb2utf8($buyer_info);
        }else{
            $buyer_info = serialize($data['buyer_info']);
        }
        $sql = "UPDATE `#@__uzanorder` SET `status`=0,`tid`='{$data['tid']}',`outer_tid`='{$data['outer_tid']}',`transaction_tid`='{$data['transaction_tid']}',`pay_type`='{$data['pay_type']}',`pay_at`='{$data['pay_at']}',`buyer_info`='{$buyer_info}' WHERE `out_trade_no`='$order_sn'";
        if($this->dsql->ExecuteNoneQuery($sql))
        {
            $this->log_result("verify_success,订单号:".$order_sn); //将验证结果存入文件
            return TRUE;
        } else {
            $this->log_result ("verify_failed,订单号:".$order_sn);//将验证结果存入文件
            return FALSE;
        }
    }

    /*处理物品交易*/
    function success_db($order_sn)
    {
        //获取订单信息，检查订单的有效性
        $row = $this->dsql->GetOne("SELECT state FROM #@__shops_orders WHERE oid='$order_sn' ");
        if($row['state'] > 0)
        {
            return TRUE;
        }
        /* 改变订单状态_支付成功 */
        $sql = "UPDATE `#@__shops_orders` SET `state`='1' WHERE `oid`='$order_sn' AND `userid`='".$this->mid."'";
        if($this->dsql->ExecuteNoneQuery($sql))
        {
            $this->log_result("verify_success,订单号:".$order_sn); //将验证结果存入文件
            return TRUE;
        } else {
            $this->log_result ("verify_failed,订单号:".$order_sn);//将验证结果存入文件
            return FALSE;
        }
    }

    /*处理点卡，会员升级*/
    function success_mem($order_sn,$pname,$product,$pid)
    {
        //更新交易状态为已付款
        $sql = "UPDATE `#@__member_operation` SET `sta`='1' WHERE `buyid`='$order_sn' AND `mid`='".$this->mid."'";
        $this->dsql->ExecuteNoneQuery($sql);

        /* 改变点卡订单状态_支付成功 */
        if($product=="card")
        {
            $row = $this->dsql->GetOne("SELECT cardid FROM #@__moneycard_record WHERE ctid='$pid' AND isexp='0' ");;
            //如果找不到某种类型的卡，直接为用户增加金币
            if(!is_array($row))
            {
                $nrow = $this->dsql->GetOne("SELECT num FROM #@__moneycard_type WHERE pname = '{$pname}'");
                $dnum = $nrow['num'];
                $sql1 = "UPDATE `#@__member` SET `money`=money+'{$nrow['num']}' WHERE `mid`='".$this->mid."'";
                $oldinf ="已经充值了".$nrow['num']."金币到您的帐号！";
            } else {
                $cardid = $row['cardid'];
                $sql1=" UPDATE #@__moneycard_record SET uid='".$this->mid."',isexp='1',utime='".time()."' WHERE cardid='$cardid' ";
                $oldinf='您的充值密码是：<font color="green">'.$cardid.'</font>';
            }
            //更新交易状态为已关闭
            $sql2=" UPDATE #@__member_operation SET sta=2,oldinfo='$oldinf' WHERE buyid='$order_sn'";
            if($this->dsql->ExecuteNoneQuery($sql1) && $this->dsql->ExecuteNoneQuery($sql2))
            {
                $this->log_result("verify_success,订单号:".$order_sn); //将验证结果存入文件
                return $oldinf;
            } else {
                $this->log_result ("verify_failed,订单号:".$order_sn);//将验证结果存入文件
                return "支付失败！";
            }
        /* 改变会员订单状态_支付成功 */
        } else if ( $product=="member" ){
            $row = $this->dsql->GetOne("SELECT rank,exptime FROM #@__member_type WHERE aid='$pid' ");
            $rank = $row['rank'];
            $exptime = $row['exptime'];
            /*计算原来升级剩余的天数*/
            $rs = $this->dsql->GetOne("SELECT uptime,exptime FROM #@__member WHERE mid='".$this->mid."'");
            if($rs['uptime']!=0 && $rs['exptime']!=0 ) 
            {
                $nowtime = time();
                $mhasDay = $rs['exptime'] - ceil(($nowtime - $rs['uptime'])/3600/24) + 1;
                $mhasDay=($mhasDay>0)? $mhasDay : 0;
            }
            //获取会员默认级别的金币和积分数
            $memrank = $this->dsql->GetOne("SELECT money,scores FROM #@__arcrank WHERE rank='$rank'");
            //更新会员信息
            $sql1 =  " UPDATE #@__member SET rank='$rank',money=money+'{$memrank['money']}',
                       scores=scores+'{$memrank['scores']}',exptime='$exptime'+'$mhasDay',uptime='".time()."' 
                       WHERE mid='".$this->mid."'";
            //更新交易状态为已关闭
            $sql2=" UPDATE #@__member_operation SET sta='2',oldinfo='会员升级成功!' WHERE buyid='$order_sn' ";
            if($this->dsql->ExecuteNoneQuery($sql1) && $this->dsql->ExecuteNoneQuery($sql2))
            {
                $this->log_result("verify_success,订单号:".$order_sn); //将验证结果存入文件
                return "会员升级成功！";
            } else {
                $this->log_result ("verify_failed,订单号:".$order_sn);//将验证结果存入文件
                return "会员升级失败！";
            }
        }    
    }

    function  log_result($word) 
    {
        $fp = fopen(DEDEDATA."/payment/log.txt","a");
        flock($fp, LOCK_EX) ;
        fwrite($fp,$word.",执行日期:".strftime("%Y-%m-%d %H:%I:%S",time())."\r\n");
        flock($fp, LOCK_UN);
        fclose($fp);
    }
}
