<?php 
/**
 * 商品订单
 * 
 * @version        $Id: shops_orders.php 1 8:38 2010年7月9日Z tianya $
 * @package        DedeCMS.Member
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
require_once(dirname(__FILE__)."/config.php");
include_once DEDEINC.'/datalistcp.class.php';
// 如果未登录，跳转登录
if(!$cfg_ml->IsLogin()) {
	ShowMsg("你还未登录，请先登录!","login.php");
	exit();
}
$menutype = 'mydede';
$menutype_son = 'op';
if(!isset($dopost)) $dopost = '';

/**
 *  获取状态
 *
 * @access    public
 * @param     string  $sta  状态ID
 * @param     string  $oid  订单ID
 * @return    string
 */
function GetSta($sta,$oid)
{
    global $dsql;
    $row = $dsql->GetOne("SELECT p.name FROM #@__shops_orders AS s LEFT JOIN #@__payment AS p ON s.paytype=p.id WHERE s.oid='$oid'");
    if($sta==0)
    {
        return  '<span>未付款</span><span>('.$row['name'].')</span>';
    } else if ($sta==1){
        return '<span>已付款,等发货</span>';
    } else if ($sta==2){
        return '<span><a class="pay" href="shops_products.php?do=ok&oid='.$oid.'">确认</a></span>';
    } else {
        return '<span>已完成</span>';
    }
}
function GoPay($sta,$oid)
{
    global $dsql;
    $row = $dsql->GetOne("SELECT p.name FROM #@__shops_orders AS s LEFT JOIN #@__payment AS p ON s.paytype=p.id WHERE s.oid='$oid'");
    if($sta==0)
    {
        return  '<span><a class="pay" href="../plus/carbuyaction.php?dopost=memclickout&oid='.$oid.'" target="_blank">去付款</a></span>';
    } else if ($sta==1){
        return '<span>已付款,等发货</span>';
    } else if ($sta==2){
        return '<span><a class="pay" href="shops_products.php?do=ok&oid='.$oid.'">确认</a></span>';
    } else {
        return '<span>已完成</span>';
    }
}
if($dopost=='')
{
  $sql = "SELECT * FROM #@__shops_orders WHERE userid='".$cfg_ml->M_ID."' ORDER BY stime DESC";
  $dl = new DataListCP();
  $dl->pageSize = 20;
  //这两句的顺序不能更换
  $dl->SetTemplate(dirname(__FILE__)."/templets/shops_orders.htm");      //载入模板
  $dl->SetSource($sql);            //设定查询SQL
  $dl->Display();                  //显示
} else if ($dopost=='del')
{
    $ids = explode(',',$ids);
    if(isset($ids) && is_array($ids))
    {
        foreach($ids as $id)
        {
            $id = preg_replace("/^[a-z][0-9]$/","",$id);
            $query = "DELETE FROM `#@__shops_products` WHERE oid='$id' AND userid='{$cfg_ml->M_ID}'";
            $query2 = "DELETE FROM `#@__shops_orders` WHERE oid='$id' AND userid='{$cfg_ml->M_ID}'";
            $query3 = "DELETE FROM `#@__shops_userinfo` WHERE oid='$id' AND userid='{$cfg_ml->M_ID}'";
            $dsql->ExecuteNoneQuery($query);
            $dsql->ExecuteNoneQuery($query2);
            $dsql->ExecuteNoneQuery($query3);
        }
        ShowMsg("成功删除指定的交易记录!","shops_orders.php");
        exit();
    }
}