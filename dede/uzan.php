<?php
/**
 * 织梦个人网站支付插件
 * Created by PhpStorm.
 * User: lol9
 * Date: 2017年12月09日
 * Time: 16:20:45
 */
$ver='1.6';
session_cache_limiter('private,must-revalidate');
require_once(dirname(__FILE__)."/config.php");
require_once(DEDEINC.'/payment/uzan.lib.php');

plugUpdateCheck();

$protocol = getHttpProtocol();
$row = $dsql->GetOne("SELECT id FROM `#@__payment` WHERE code = 'uzan' ");
if(empty($row)){
    $uzandata['client_id'] = array(
        'title'=>'有赞云client_id',
        'description'=>'在有赞云控制台/应用设置中查看',
        'type'=>'text',
        'value'=>'',
    );
    $uzandata['client_secret'] = array(
        'title'=>'有赞云client_secret',
        'description'=>'在有赞云控制台/应用设置中查看',
        'type'=>'text',
        'value'=>'',
    );
    $uzandata['kdt_id'] = array(
        'title'=>'授权店铺id',
        'description'=>'在有赞云控制台/应用设置中查看',
        'type'=>'text',
        'value'=>'',
    );
    $uzandata['pay_subject'] = array(
        'title'=>'收款理由',
        'description'=>'留空则默认显示支付订单号',
        'type'=>'text',
        'value'=>'',
    );
    $uzandata['return_url'] = array(
        'title'=>'回调地址',
        'description'=>'支付成功后页面自动跳转的地址',
        'type'=>'text',
        'value'=>$protocol.'://'.$_SERVER['HTTP_HOST'].$cfg_cmspath."/plus/uzanbuyaction.php?dopost=return&code=uzan",
    );

    if($cfg_soft_lang == 'utf-8')
    {
        $config = AutoCharset($uzandata,'utf-8','gb2312');
        $config = serialize($config);
        $config = gb2utf8($config);
    }else{
        $config = serialize($uzandata);
    }
    $query = "INSERT INTO `#@__payment` VALUES ('','uzan','有赞云',0,'支持支付宝、微信、储蓄卡支付',0,'{$config}',1,0,1)";
    $dsql->ExecuteNoneQuery($query);
    $id = $dsql->GetLastID();
    ShowMsg("请先填写有赞云配置信息！", "sys_payment.php?dopost=install&pid={$id}&pm=edit");
    exit();
}
if(!file_exists(DEDEDATA.'/payment/uzan.php')){
    $row = $dsql->GetOne("SELECT id FROM `#@__payment` WHERE code = 'uzan' ");
    ShowMsg("请先填写有赞云配置信息！", "sys_payment.php?dopost=install&pid={$row['id']}&pm=edit");
    exit();
}

require_once DEDEDATA.'/payment/uzan.php';

if(empty($dopost)) $dopost = "";

$configfile = DEDEDATA.'/config.cache.inc.php';
//更新配置函数
function ReWriteConfig()
{
    global $dsql,$configfile;
    if(!is_writeable($configfile))
    {
        echo "配置文件'{$configfile}'不支持写入，无法修改系统配置参数！";
        exit();
    }
    $fp = fopen($configfile,'w');
    flock($fp,3);
    fwrite($fp,"<"."?php\r\n");
    $dsql->SetQuery("SELECT `varname`,`type`,`value`,`groupid` FROM `#@__sysconfig` ORDER BY aid ASC ");
    $dsql->Execute();
    while($row = $dsql->GetArray())
    {
        if($row['type']=='number')
        {
            if($row['value']=='') $row['value'] = 0;
            fwrite($fp,"\${$row['varname']} = ".$row['value'].";\r\n");
        }
        else
        {
            fwrite($fp,"\${$row['varname']} = '".str_replace("'",'',$row['value'])."';\r\n");
        }
    }
    fwrite($fp,"?".">");
    fclose($fp);
}
function getRandString()
{
    $str = strtoupper(md5(uniqid(md5(microtime(true)),true)));
    return substr($str,0,8).'-'.substr($str,8,4).'-'.substr($str,12,4).'-'.substr($str,16,4).'-'.substr($str,20);
}
function getHttpProtocol() {
	$protocol = 'http';
    if ( !empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off') {
        $protocol='https';
    } elseif ( isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https' ) {
        $protocol='https';
    } elseif ( !empty($_SERVER['HTTP_FRONT_END_HTTPS']) && strtolower($_SERVER['HTTP_FRONT_END_HTTPS']) !== 'off') {
        $protocol='https';
    }
    return $protocol;
}
function setCache()
{
    global $cfg_version,$ver;
    $first_use = false;
    $use_time = date('Y-m-d');
    $txt = DEDEDATA.'/module/uzan.txt';
    if(!file_exists($txt))
    {
        $id = getRandString();
        $first_use = true;
        $fp = fopen($txt,'w');
        $tData['id'] = $id;
        $tData['time'] = $use_time;
        $tData['ver'] = $ver;
        fwrite($fp,serialize($tData));
        fclose($fp);
    }else{
        $fp = fopen($txt,'r');
        $content = fread($fp, filesize($txt));
        fclose($fp);
        $content = unserialize($content);
        $id = $content['id'];
        $use_time = $content['time'];
        $tData['id'] = $id;
        $tData['time'] = date('Y-m-d');
        $tData['ver'] = $ver;
        $fp = fopen($txt,'w');
        fwrite($fp,serialize($tData));
        fclose($fp);
    }
    if($first_use || $use_time!=date('Y-m-d')){
        echo '<script>
                var _hmt = _hmt || [];
                (function() {
                    var hm = document.createElement("script");
                    hm.src = "//www.lol9.cn/api/stat.php?id='.$id.'&v='.$cfg_version.'-'.$ver.'&subject=uzan";
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(hm, s);
                })();
            </script>';
    }
}
function plugUpdateCheck()
{
    global $dsql,$cfg_db_language,$cfg_dbprefix;
    $txt = DEDEDATA.'/module/uzan.txt';
    if(file_exists($txt))
    {
        $fp = fopen($txt,'r');
        $content = fread($fp, filesize($txt));
        fclose($fp);
        $content = unserialize($content);
        $oldVer = $content['ver'];
        if($oldVer<1.4){
            $dsql->GetTableFields('#@__uzanorder');
            $fields = array();
            while($r=$dsql->GetFieldObject()){
                $fields[] = $r->name;
            }
            if(in_array('aid',$fields)===false){
                $dsql->ExecNoneQuery("ALTER TABLE `#@__uzanorder` ADD COLUMN `aid` int UNSIGNED NULL DEFAULT 0 AFTER `out_trade_no`");
            }
            if(in_array('subject',$fields)===false){
                $dsql->ExecNoneQuery("ALTER TABLE `#@__uzanorder` ADD COLUMN `subject`  varchar(200) NULL DEFAULT '' AFTER `out_trade_no`");
            }
        }
    }
    $isTableExist = $dsql->IsTable("#@__uzanorder");
    if(!$isTableExist){
        $dsql->ExecuteSafeQuery("CREATE TABLE `{$cfg_dbprefix}uzanorder` (
`id` int(10) unsigned NOT NULL auto_increment,
`out_trade_no` varchar(30) NOT NULL COMMENT '商户订单号',
`aid` int(10) unsigned default '0' COMMENT '文章id',
`subject` varchar(200) default NULL COMMENT '订单名称',
`mid` int(11) unsigned default '0' COMMENT '会员id',
`tid` varchar(30) default NULL COMMENT '有赞订单号',
`outer_tid` varchar(30) default NULL COMMENT '外部交易编号',
`transaction_tid` varchar(30) default NULL COMMENT '支付流水号',
`total_fee` decimal(10,2) default NULL,
`pay_type` varchar(20) default NULL,
`status` tinyint(4) default '1' COMMENT '0：已付款 1：等待付款',
`pay_at` datetime default NULL,
`buyer_info` text COMMENT '购买者信息',
`created_at` datetime default NULL,
`updated_at` timestamp NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
PRIMARY KEY  (`id`),
UNIQUE KEY `uq_oid` (`out_trade_no`)
) ENGINE=MyISAM DEFAULT CHARSET={$cfg_db_language}");
    }
}
function getUserName($mid=0)
{
    global $dsql;
    $mid = intval($mid);
    if(!$mid) return '游客';
    $row = $dsql->getOne("select userid,uname from `#@__member` where mid = {$mid}");
    return $row['uname'].'(登录账号:'.$row['userid'].')';

}
function getArcTitles($aid=0)
{
    $aid = intval($aid);
    if(!$aid) return '无';
    $arcRow=GetOneArchive($aid);
    return '<a href="'.$arcRow['arcurl'].'">'.$arcRow['title'].'</a>';
}
if($dopost=="test")
{
    require_once DEDEDATA.'/payment/uzan.php';
    require_once DEDEINC.'/payment/uzan.php';
    require_once DEDEINC.'/memberlogin.class.php';
    $cfg_ml = new MemberLogin();
    if(!isset($total_fee) || $total_fee<=0){
        ShowMsg("支付金额不正确！", "javascript:;");
        exit();
    }
    $pay = new Uzan();
    $outTradeNo = $out_trade_no ? $out_trade_no : uniqid();
    $totalFee = floatval($total_fee);
    $mid = isset($mid) ? intval($mid) : $cfg_ml->M_ID;
    $order=array(
        'out_trade_no' => $outTradeNo,
        'price' => $totalFee,
        'mid' => $mid,
        'aid' => intval($aid),
        'subject' => '支付测试',
    );
    //发起支付
    $pay->GetCode($order, $payment);
}
if($dopost=="order")
{
    $limit = 20;
    if(!isset($page)) $page = 1;
    $start = ($page-1)*$limit;
    $whereSql = "where 1=1";
    if($search && $field){
        $whereSql .= " and `{$field}` like '%{$search}%'";
    }
    $sortkey = "id";
    $sql  = "SELECT count(*) c FROM `#@__uzanorder` $whereSql ORDER BY $sortkey DESC";
    $totalCount = $dsql->getOne($sql);
    $pageCount =ceil($totalCount['c']/$limit);
    if($pageCount==0) $pageCount= 1;
    $sql  = "SELECT * FROM `#@__uzanorder` $whereSql ORDER BY $sortkey DESC LIMIT {$start},{$limit}";
    $dsql->SetQuery($sql);
    $dsql->Execute();
    $dataList = array();
    $i=0;
    while($row = $dsql->GetArray())
    {
        $dataList[$i] = $row;
        $dataList[$i]['status'] = $row['status']==0 ? '<span class="badge badge-success">已付款</span>' : '<span class="badge">待支付</span>';
        $dataList[$i]['buyer_info'] = unserialize($row['buyer_info']);
        $i++;
    }
    include DedeInclude('templets/uzan_order_list.htm');
    exit();
}
$row = $dsql->GetOne("SELECT id FROM `#@__payment` WHERE code = 'uzan' ");
$protocol = getHttpProtocol();
include DedeInclude('templets/uzan.htm');
setCache();

