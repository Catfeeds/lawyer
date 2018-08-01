<?php
/**
 * @version        $Id: index_do.php 1 8:24 2010年7月9日Z tianya $
 * @package        DedeCMS.Member
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
require_once(dirname(__FILE__)."/config.php");
if(empty($dopost)) $dopost = '';
if(empty($fmdo)) $fmdo = '';
/*********************
function Case_user()
*******************/
if($fmdo=='user')
{
    //检查用户名是否存在
    if($dopost=="checkuser")
    {
        AjaxHead();
        $msg = '';
        $uid = trim($uid);
        if($cktype==0)
        {
            $msgtitle='用户笔名';
        }
        else
        {
            #api{{
            if(defined('UC_API') && @include_once DEDEROOT.'/uc_client/client.php')
            {
                $ucresult = uc_user_checkname($uid);
                if($ucresult > 0)
                {
                }
                elseif($ucresult == -1)
                {
                    echo "<span class='icon-font'></span><b>用户名不合法</b>";
                }
                elseif($ucresult == -2)
                {
                    echo "<span class='icon-font'></span><b>包含要允许注册的词语</b>";
                }
                elseif($ucresult == -3)
                {
                    echo "<span class='icon-font'></span><b>用户名已经存在！</b>";
                }
                exit();
            }
            #/aip}}            
            $msgtitle='用户名';
        }
        if($cktype!=0 || $cfg_mb_wnameone=='N') {
            $msg = CheckUserID($uid, $msgtitle);
        }
        else {
            $msg = CheckUserID($uid, $msgtitle, false);
        }
        if($msg!='ok')
        {
           $msg = "<span class='icon-font'></span><b>{$msg}</b>";
        }
        if($msg=='ok'){
            $msg = '';
        }
		echo $msg;
    }
	//检查手机号是否存在
	else if($dopost=="checkphone")
	{
		AjaxHead();
		$msg = '';
		$row = $dsql->GetOne("SELECT mid FROM `#@__member` WHERE phone LIKE '$phone' LIMIT 1");
		 if(is_array($row)) {
			 $msg = "<span class='icon-font'></span><b>该手机号已被使用，输入密码登录！</b>";
		 }
		echo $msg;
		header("localtion:/member/reg_new.php");
		exit();
	}
    //引入注册页面
    else if($dopost=="regnew")
    {
        $step = empty($step)? 1 : intval(preg_replace("/[^\d]/",'', $step));
        require_once(dirname(__FILE__)."/reg_new.php");
        exit();
    }
  /***************************
  //积分换金币
  function money2s() {  }
  ***************************/
    else if($dopost=="money2s")
    {
        CheckRank(0,0);
        if($cfg_money_scores==0)
        {
            ShowMsg('系统禁用了积分与金币兑换功能！', '-1');
            exit();
        }
        $money = empty($money) ? "" : abs(intval($money));
        if(empty($money))
        {
            ShowMsg('您没指定要兑换多少金币！', '-1');
            exit();
        }
        
        $needscores = $money * $cfg_money_scores;
        if($cfg_ml->fields['scores'] < $needscores )
        {
            ShowMsg('您积分不足，不能换取这么多的金币！', '-1');
            exit();
        }
        $litmitscores = $cfg_ml->fields['scores'] - $needscores;
        
        //保存记录
        $mtime = time();
        $inquery = "INSERT INTO `#@__member_operation`(`buyid` , `pname` , `product` , `money` , `mtime` , `pid` , `mid` , `sta` ,`oldinfo`)
           VALUES ('ScoresToMoney', '积分换金币操作', 'stc' , '0' , '$mtime' , '0' , '{$cfg_ml->M_ID}' , '0' , '用 {$needscores} 积分兑了换金币：{$money} 个'); ";
        $dsql->ExecuteNoneQuery($inquery);
        //修改积分与金币值
        $dsql->ExecuteNoneQuery("UPDATE `#@__member` SET `scores`=$litmitscores, money= money + $money  WHERE mid='".$cfg_ml->M_ID."' ");
        
        // 清除会员缓存
        $cfg_ml->DelCache($cfg_ml->M_ID);
        ShowMsg('成功兑换指定量的金币！', 'operation.php');
        exit();
    }
}

/*********************
function login()
*******************/
else if($fmdo=='login')
{
    //用户登录
    if($dopost=="login")
    {
        if(!isset($vdcode))
        {
            $vdcode = '';
        }
        $svali = GetCkVdValue();
        if(preg_match("/2/",$safe_gdopen)){
            if(strtolower($vdcode)!=$svali || $svali=='')
            {
                ResetVdValue();
                ShowMsg('验证码错误！', 'index.php');
                exit();
            }
            
        }
        if(CheckUserID($userid,'',false)!='ok')
        {
            ResetVdValue();
            ShowMsg("你输入的用户名 {$userid} 不合法！","index.php");
            exit();
        }
        if($pwd=='')
        {
            ResetVdValue();
            ShowMsg("密码不能为空！","-1",0,2000);
            exit();
        }

        //检查帐号
        $rs = $cfg_ml->CheckUser($userid,$pwd);  
        
        #api{{
        if(defined('UC_API') && @include_once DEDEROOT.'/uc_client/client.php')
        {
            //检查帐号
            list($uid, $username, $password, $email) = uc_user_login($userid, $pwd);
            if($uid > 0) {
                $password = md5($password);
                //当UC存在用户,而CMS不存在时,就注册一个    
                if(!$rs) {
                    //会员的默认金币
                    $row = $dsql->GetOne("SELECT `money`,`scores` FROM `#@__arcrank` WHERE `rank`='10' ");
                    $scores = is_array($row) ? $row['scores'] : 0;
                    $money = is_array($row) ? $row['money'] : 0;
                    $logintime = $jointime = time();
                    $loginip = $joinip = GetIP();
                    $res = $dsql->ExecuteNoneQuery("INSERT INTO #@__member SET `mtype`='个人',`userid`='$username',`pwd`='$password',`uname`='$username',`sex`='男' ,`rank`='10',`money`='$money', `email`='$email', `scores`='$scores', `matt`='0', `face`='',`safequestion`='0',`safeanswer`='', `jointime`='$jointime',`joinip`='$joinip',`logintime`='$logintime',`loginip`='$loginip';");
                    if($res) {
                        $mid = $dsql->GetLastID();
                        $data = array
                        (
                        0 => "INSERT INTO `#@__member_person` SET `mid`='$mid', `onlynet`='1', `sex`='男', `uname`='$username', `qq`='', `msn`='', `tel`='', `mobile`='', `place`='', `oldplace`='0' ,
                                 `birthday`='1980-01-01', `star`='1', `income`='0', `education`='0', `height`='160', `bodytype`='0', `blood`='0', `vocation`='0', `smoke`='0', `marital`='0', `house`='0',
                       `drink`='0', `datingtype`='0', `language`='', `nature`='', `lovemsg`='', `address`='',`uptime`='0';",
                        1 => "INSERT INTO `#@__member_tj` SET `mid`='$mid',`article`='0',`album`='0',`archives`='0',`homecount`='0',`pagecount`='0',`feedback`='0',`friend`='0',`stow`='0';",
                        2 => "INSERT INTO `#@__member_space` SET `mid`='$mid',`pagesize`='10',`matt`='0',`spacename`='{$uname}的空间',`spacelogo`='',`spacestyle`='person', `sign`='',`spacenews`='';",
                        3 => "INSERT INTO `#@__member_flink` SET `mid`='$mid', `title`='织梦内容管理系统', `url`='http://www.dedecms.com';"
                        );                        
                        foreach($data as $val) $dsql->ExecuteNoneQuery($val);
                    }
                }
                $rs = 1;
                $row = $dsql->GetOne("SELECT `mid`, `pwd` FROM #@__member WHERE `userid`='$username'");
                if(isset($row['mid']))
                {
                    $cfg_ml->PutLoginInfo($row['mid']);
                    if($password!=$row['pwd']) $dsql->ExecuteNoneQuery("UPDATE #@__member SET `pwd`='$password' WHERE mid='$row[mid]'");
                }
                //生成同步登录的代码
                $ucsynlogin = uc_user_synlogin($uid);
            } else if($uid == -1) {
                //当UC不存在该用而CMS存在,就注册一个.
                if($rs) {
                    $row = $dsql->GetOne("SELECT `email` FROM #@__member WHERE userid='$userid'");                    
                    $uid = uc_user_register($userid, $pwd, $row['email']);
                    if($uid > 0) $ucsynlogin = uc_user_synlogin($uid);
                } else {
                    $rs = -1;
                }
            } else {
                $rs = -1;
            }
        }
        #/aip}}        
        
        if($rs==0)
        {
            ResetVdValue();
            ShowMsg("用户名不存在！", "index.php", 0, 2000);
            exit();
        }
        else if($rs==-1) {
            ResetVdValue();
            ShowMsg("密码错误！", "index.php", 0, 2000);
            exit();
        }
        else if($rs==-2) {
            ResetVdValue();
            ShowMsg("管理员帐号不允许从前台登录！", "index.php", 0, 2000);
            exit();
        }
        else
        {
            // 清除会员缓存
            $cfg_ml->DelCache($cfg_ml->M_ID);
            if(empty($gourl) || preg_match("#action|_do#i", $gourl))
            {
                ShowMsg("成功登录，5秒钟后转向上一页...","javascript:window.history.go(-2)",0,100);
            }
            else
            {
                $gourl = str_replace('^','&',$gourl);
                ShowMsg("成功登录，现在转向指定页面...",$gourl,0,2000);
            }
            exit();
        }
    }

    //退出登录
    else if($dopost=="exit")
    {
        $cfg_ml->ExitCookie();
        #api{{
        if(defined('UC_API') && @include_once DEDEROOT.'/uc_client/client.php')
        {
            $ucsynlogin = uc_user_synlogout();
        }
        #/aip}}
        ShowMsg("成功退出登录！","/",0,1);
        exit();
    }
}
/*********************
function moodmsg()
*******************/
else if($fmdo=='moodmsg')
{
    //用户登录
    if($dopost=="sendmsg")
    {
        if(!empty($content))
        {
        $ip = GetIP();
        $dtime = time();
          $ischeck = ($cfg_mb_msgischeck == 'Y')? 0 : 1;
          if($cfg_soft_lang == 'gb2312')
          {
              $content = utf82gb(nl2br($content));
          } 
          $content = cn_substrR(HtmlReplace($content,1),360);
          //对表情进行解析
          $content = addslashes(preg_replace("/\[face:(\d{1,2})\]/is","<img src='".$cfg_memberurl."/templets/images/smiley/\\1.gif' style='cursor: pointer; position: relative;'>",$content));
          $content = RemoveXSS($content);
            $inquery = "INSERT INTO `#@__member_msg`(`mid`,`userid`,`ip`,`ischeck`,`dtime`, `msg`)
                   VALUES ('{$cfg_ml->M_ID}','{$cfg_ml->M_LoginID}','$ip','$ischeck','$dtime', '$content'); ";
            $rs = $dsql->ExecuteNoneQuery($inquery);
            if(!$rs)
            {
                $output['type'] = 'error';
                $output['data'] = '更新失败,请重试.';
                exit();
            }
            $output['type'] = 'success';
            if($cfg_soft_lang == 'gb2312')
            {
              $content = utf82gb(nl2br($content));
            } 
            $output['data'] = stripslashes($content);
            exit(json_encode($output));
        }
    }
}
else
{
    ShowMsg("本页面禁止返回!","index.php");
}