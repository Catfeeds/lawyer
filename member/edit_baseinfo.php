<?php
/**
 * @version        $Id: edit_baseinfo.php 1 8:38 2010年7月9日Z tianya $
 * @package        DedeCMS.Member
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
require_once(dirname(__FILE__)."/config.php");
CheckRank(0,0);
$menutype = 'config';
if(!isset($dopost)) $dopost = '';

$pwd2=(empty($pwd2))? "" : $pwd2;
$row=$dsql->GetOne("SELECT  * FROM `#@__member` WHERE mid='".$cfg_ml->M_ID."'");
$face = $row['face'];
if($dopost=='save')
{
    $svali = GetCkVdValue();

    if(strtolower($vdcode) != $svali || $svali=='')
    {
        ReSETVdValue();
        ShowMsg('验证码错误！','-1');
        exit();
    }
    if(!is_array($row) || $row['pwd'] != md5($oldpwd))
    {
        ShowMsg('你输入的旧密码错误或没填写，不允许修改资料！','-1');
        exit();
    }
    if($userpwd != $userpwdok)
    {
        ShowMsg('你两次输入的新密码不一致！','-1');
        exit();
    }
    if($userpwd=='')
    {
        $pwd = $row['pwd'];
    }
    else
    {
        $pwd = md5($userpwd);
        $pwd2 = substr(md5($userpwd),5,20);
    }
    $addupquery = '';
    
    #api{{
    if(defined('UC_API') && @include_once DEDEROOT.'/uc_client/client.php')
    {
        $emailnew = $email != $row['email'] ? $email : '';
        $ucresult = uc_user_edit($cfg_ml->M_LoginID, $oldpwd, $userpwd, $emailnew);        
    }
    #/aip}}
    
    $query1 = "UPDATE `#@__member` SET pwd='$pwd',sex='$sex'{$addupquery} where mid='".$cfg_ml->M_ID."' ";
    $dsql->ExecuteNoneQuery($query1);

    //如果是管理员，修改其后台密码
    if($cfg_ml->fields['matt']==10 && $pwd2!="")
    {
        $query2 = "UPDATE `#@__admin` SET pwd='$pwd2' where id='".$cfg_ml->M_ID."' ";
        $dsql->ExecuteNoneQuery($query2);
    }
    // 清除会员缓存
    $cfg_ml->DelCache($cfg_ml->M_ID);
    ShowMsg('成功更新你的密码！','edit_baseinfo.php',0,2000);
    exit();
}
include(DEDEMEMBER."/templets/edit_baseinfo.htm");