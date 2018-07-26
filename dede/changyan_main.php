<?php
//@session_start();
require_once(dirname(__FILE__)."/config.php");
require_once(DEDEINC."/oxwindow.class.php");

helper('changyan');

if(empty($dopost)) $dopost = '';
if(empty($action)) $action = '';
if(empty($nocheck)) $nocheck = '';
if(empty($forward)) $forward = '';

$_SESSION['changyan'] = !empty($_SESSION['changyan'])? $_SESSION['changyan'] : 0;
$_SESSION['user'] = !empty($_SESSION['user'])? $_SESSION['user'] : '';

$appid=$client_id=changyan_get_setting('appid');

if ($cfg_feedback_forbid=='N' AND !empty($client_id)) {
    $dsql->ExecuteNoneQuery("UPDATE `#@__sysconfig` SET `value`='Y' WHERE `varname`='cfg_feedback_forbid';");
    changyan_ReWriteConfig();
    ShowMsg("已经禁用DedeCMS默认评论，开启畅言评论！","?");
    exit();
}

if(empty($_SESSION['user']) AND empty($nocheck))
{
    $db_user = changyan_get_setting('user');
    $db_pwd=changyan_mchStrCode(changyan_get_setting('pwd'), 'DECODE');

    if(!empty($db_user) AND !empty($db_pwd))
    {
        header('Location:?dopost=quick_login&nocheck=yes&forward='.$forward);
        exit();
    } else {
        //header('Location:?dopost=login&nocheck=yes&forward='.$forward);
        //exit();
    }
}
//auto update
$version=changyan_get_setting('version');
if (empty($version)) $version = '0.0.1';
if (version_compare($version, CHANGYAN_VER, '<')) {
    $mysql_version = $dsql->GetVersion(TRUE);

    foreach ($update_sqls as $ver => $sqls) {
        if (version_compare($ver, $version,'<')) {
            continue;
        }
        foreach ($sqls as $sql) {
            $sql = preg_replace("#ENGINE=MyISAM#i", 'TYPE=MyISAM', $sql);
            $sql41tmp = 'ENGINE=MyISAM DEFAULT CHARSET='.$cfg_db_language;
            
            if($mysql_version >= 4.1)
            {
                $sql = preg_replace("#TYPE=MyISAM#i", $sql41tmp, $sql);
            }
            $dsql->ExecuteNoneQuery($sql);
        }
        changyan_set_setting('version', $ver);
        $version=changyan_get_setting('version');
    }
    $isv_app_key = changyan_get_isv_app_key();
}

if ($dopost=='quick_login')
{
    $user = changyan_get_setting('user');
    $pwd=changyan_mchStrCode(changyan_get_setting('pwd'), 'DECODE') ;
    $sign=changyan_gen_sign($user);
    $paramsArr=array(
        'client_id'=>CHANGYAN_CLIENT_ID,
        'user'=>$user,
        'password'=>$pwd,
        'sign'=>$sign);
    $rs=changyan_http_send(CHANGYAN_API_LOGIN,0,$paramsArr);
    $result=json_decode($rs,TRUE);
    if($result['status']==0)
    {
        $isv_id = changyan_get_setting('isv_id');
        $isvs = changyan_get_isvs();
        $isv_in = FALSE;
        if(!empty($isv_id)) {
            foreach($isvs as $isv){
                if($isv['id']==$isv_id)
                    $isv_in=TRUE;
            }
        }
        $_SESSION['changyan']=$result['token'];
        $_SESSION['user']=$user;
        if(!$isv_in)
        {
            ShowMsg("尚未设置站点APP信息，请进行配置……",'?dopost=change_appinfo');
        } else {
            header('Location:?forward='.$forward);
        }
        exit();
    } else {
        changyan_set_setting('pwd', '');
        ShowMsg("登录失败，".$result['msg'],'?');
        exit();
    }
} elseif ($dopost=='login') {
    $user = empty($user)? '' : $user;
    $pwd = empty($pwd)? '' : $pwd;
    $sign=changyan_gen_sign($user);
    $paramsArr=array(
        'client_id'=>CHANGYAN_CLIENT_ID,
        'user'=>$user,
        'password'=>$pwd,
        'sign'=>$sign);
    $rs=changyan_http_send(CHANGYAN_API_LOGIN,0,$paramsArr);
    $result=json_decode($rs,TRUE);
    changyan_set_setting('user', $user);
    if ($result['status']==0)
    {
        changyan_set_setting('user', $user);
        $pwd = changyan_mchStrCode($pwd, 'ENCODE');
        changyan_set_setting('pwd', $pwd);
        $_SESSION['changyan']=$result['token'];
        $_SESSION['user']=$user;
        $login_url=CHANGYAN_API_SETCOOKIE.'?client_id='.CHANGYAN_CLIENT_ID.'&token='.$result['token'];
        echo <<<EOT
<iframe src="{$login_url}" scrolling="no" width="0" height="0" style="border:none"></iframe>
EOT;
        ShowMsg("尚未设置站点APP信息，请进行配置……",'?dopost=change_appinfo');
        exit();
    }
    else {
        $_SESSION['changyan'] = 0;
        $_SESSION['user'] = '';
        unset($_SESSION['changyan']);
        unset($_SESSION['user']);
        changyan_set_setting('pwd', '');
        ShowMsg("登录失败，".$result['msg'],'?');
        exit();
    }
} elseif ($dopost=='change_appinfo') {
    $isvstr="<p> 选择您需要设置的APPID：</p>";
    $jquery_src =  CHANGYAN_JQUERY_SRC;
    $isvs_jsonp = changyan_get_isvs_jsonp();
    echo <<<EOT
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset={$cfg_soft_lang}">
<title>畅言评论管理</title>
<link rel="stylesheet" type="text/css" href="{$cfg_plus_dir}/img/base.css">
{$jquery_src}
{$isvs_jsonp}
</head>
<body background='{$cfg_plus_dir}/img/allbg.gif' leftmargin="8" topmargin='8'>
<table width="98%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#DFF9AA">
  <tr>
    <td height="28" style="border:1px solid #DADADA" background='{$cfg_plus_dir}/img/wbg.gif'>&nbsp;<b><a href="?">◇畅言评论模块 </a> 》配置APP信息</b></td>
  </tr>
  <tr>
  <td width="100%" height="80" style="padding-top:5px" bgcolor='#ffffff'>
  <script language='javascript'>
function CheckSubmit(){
	return true;
}
</script>
  <form name='myform' method='POST' onSubmit='return CheckSubmit();' action='?'>
  <input type='hidden' name='dopost' value='save_appinfo'>
  <table width='100%'  border='0' cellpadding='3' cellspacing='1' bgcolor='#DADADA'>
    <tr bgcolor='#DADADA'>
      <td colspan='2' background='{$cfg_plus_dir}/img/wbg.gif' height='26'><font color='#666600'><b>畅言评论管理</b></font></td>
    </tr>
    <tr bgcolor='#FFFFFF'>
      <td colspan='2'  height='100'>
      <table width="98%" border="0" cellspacing="1" cellpadding="1">
        <tbody>
            <tr>
                <td colspan="2" id="isvsContent">
                </td>
            </tr>
        </tbody>
      </table>
      </td>
    </tr>
    <tr>
      <td colspan='2' bgcolor='#F9FCEF'><table width='270' border='0' cellpadding='0' cellspacing='0'>
          <tr align='center' height='28'>
            <td width='90'><input name='imageField1' type='image' class='np' src='{$cfg_plus_dir}/img/button_ok.gif' width='60' height='22' border='0' /></td>
            <td width='90'><a href='?dopost=addsite' style="color:blue">创建APP ID</a></td>
            <td><a href='?' style="color:blue">返回上一页</a></td>
          </tr>
        </table></td>
    </tr>
  </table>
  </td>
  </tr>
</table>
<p align="center"> <br>
  <br>
</p>
</body>
</html>
EOT;
} elseif ($dopost=='save_appinfo') {
    if (empty($appInfo)) {
        ShowMsg("请选择正确的AppID信息！", '?dopost=change_appinfo');
        exit();
    }
    list($appid,$isv_app_key)=explode('|',$appInfo);
    changyan_set_setting('appid',$appid);
    changyan_set_setting('isv_app_key',$isv_app_key);
    $user=changyan_get_setting('user');
    $sign=changyan_gen_sign($user);
    $result = changyan_getcode(CHANGYAN_CLIENT_ID, $user, false, $sign,$appid);
    $isv_id = $result['isv_id'];

    changyan_set_setting('isv_id',$isv_id);
    changyan_clearcache();
    $isv_id = intval($isv_id);
    $changge_isv_url = CHANGYAN_API_CHANGE_ISV.$isv_id;
    echo <<<EOT
<iframe src="{$changge_isv_url}" scrolling="no" width="0" height="0" style="border:none"></iframe>
EOT;
    ShowMsg("成功设置新的AppID及APPKEY！",'?',0,3000);
    exit();
} elseif ($dopost=='logout')
{
    echo <<<EOT
<iframe src="http://changyan.kuaizhan.com/logout" scrolling="no" width="0" height="0"></iframe>
EOT;
    $_SESSION['changyan'] = 0;
    $_SESSION['user'] = '';
    unset($_SESSION['changyan']);
    unset($_SESSION['user']);
    if($forward)
    {
        header('Location:?forward='.$forward);
        exit;
    } else {
        changyan_set_setting('pwd', '');
    }
    ShowMsg("成功退出畅言！",'?');
    exit();
} elseif ($dopost=='addsite') {
    $url = $_SERVER['SERVER_NAME'];
    $user=changyan_get_setting('user');
    $sign=changyan_gen_sign($user);
    $paramsArr=array(
        'user'=>$user,
        'client_id'=>CHANGYAN_CLIENT_ID,
        'isv_name'=>'New dedecms site',
        'url'=>$url,
        'sign'=>$sign);
    $rs=changyan_http_send(CHANGYAN_API_ADDSITE,0,$paramsArr);
    $result=json_decode($rs,TRUE);
    if($result['status']==1)
    {
        ShowMsg("添加新站点失败", '?dopost=change_appinfo');
        exit();
    } else {
        changyan_set_setting('appid', $result['appid']);
        changyan_set_setting('id', $result['id']);
        changyan_set_setting('isv_id', $result['isv_id']);
        changyan_set_setting('isv_app_key', $result['isv_app_key']);
        $_SESSION['changyan']=$result['token'];
        changyan_clearcache();
        $isv_id = intval($result['isv_id']);
        $login_url=CHANGYAN_API_SETCOOKIE.'?client_id='.CHANGYAN_CLIENT_ID.'&token='.$result['token'];
        echo <<<EOT
<iframe src="{$login_url}" scrolling="no" width="0" height="0" style="border:none"></iframe>
EOT;
        ShowMsg("成功添加站点信息，进行站点切换……",'?dopost=changeisv&isv_id='.$isv_id,0,3000);
        exit;
    }
} elseif ($dopost=='changeisv') {
    $isv_id = intval($isv_id);
    $changge_isv_url = CHANGYAN_API_CHANGE_ISV.$isv_id;
    $isv_app_key = changyan_get_isv_app_key();
    echo <<<EOT
<iframe src="{$changge_isv_url}" scrolling="no" width="0" height="0" style="border:none"></iframe>
EOT;
    ShowMsg("成功切换站点！",'?');
    exit();
} elseif ($dopost=='manage' OR $dopost=='stat' OR $dopost=='setting'
OR $dopost=="import")
{
    if(!changyan_islogin())
    {
        ShowMsg("您尚未登录畅言，请先登录后继续使用……！",'?');
        exit();
    }
    changyan_check_islogin();
    $addstyle='scrolling="no" ';
    $type='audit';
    $appid=changyan_get_setting('appid');
    if($dopost=='manage') $type='audit';
    elseif($dopost=='stat') $type='stat';
    $ptitle = '畅言评论管理';

    $manage_url="http://s.changyan.kuaizhan.com/audit/comments/TOAUDIT/1";
    $addstr='';
    if($dopost=='setting') 
    {
        $ptitle = "畅言设置";
        $manage_url="http://s.changyan.kuaizhan.com/setting/basic";
        
    } elseif ($dopost=='stat')
    {
        $ptitle = "数据统计";
        $manage_url="http://s.changyan.kuaizhan.com/stat-data/comment";
    } elseif ($dopost=='import')
    {
        $ptitle = "畅言工具";
        $export_str=$import_str='';
        $manage_url="?dopost=blank";
        $last_import=changyan_get_setting('last_import');
        $last_export=changyan_get_setting('last_export');
        if (empty($last_export)) {
            $export_str = '<font color="red">尚未备份，建议备份！</font>';
        } else {
            $export_time = date('Y-m-d H:i:s', $last_export);
            $export_str = '<font color="#666">最后备份日期：'.$export_time.'</font>';
        }
        if (empty($last_import)) {
            $import_str = '<font color="red">尚未导出DedeCMS评论到畅言！</font>';
        } else {
            $import_time = date('Y-m-d H:i:s', $last_import);
            $import_str = '<font color="#666">最后导出日期：'.$import_time.'</font>';
        }
        $addstr=<<<EOT
        <tr bgcolor='#FFFFFF'>
          <td colspan='2' height='30px' style='padding:20px'>
          <script type="text/javascript">
          function isgo(url,msg) {
              if(confirm(msg)) window.location.href=url;
              else return false;
          }
          </script>
          <input type="button" size="14" onclick="return isgo('?dopost=changyan_to_dedecms','是否导出畅言到DedeCMS评论？');" value="导出畅言到DedeCMS评论"> 
           <span style="color:#999">将畅言模块中的数据导出备份到DedeCMS数据库中</span>  {$export_str}
          <br /><br />
          <input type="button" size="14" onclick="return isgo('?dopost=dedecms_to_changyan','是否导入DedeCMS评论到畅言？');" value="导入DedeCMS评论到畅言">
           <span style="color:#999">将DedeCMS评论数据导入到畅言模块中</span> {$import_str}
          </td>
        </tr>
EOT;
    }
    $addstyle='scrolling="auto" ';
    $account_str = preg_match("#@dedecms$#",$_SESSION['user'])? "<a href='?dopost=bind' style='color:blue'>[绑定账号]</a>" :
    "<a href='?dopost=logout' style='color:blue'>[切换账号]</a>";
    echo <<<EOT
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset={$cfg_soft_lang}">
<title>{$ptitle}</title>
<link rel="stylesheet" type="text/css" href="css/base.css">
</head>
<body background='images/allbg.gif' leftmargin="8" topmargin='8'>
<table width="98%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#DFF9AA" height="100%">
  <tr>
    <td height="28" style="border:1px solid #DADADA" background='images/wbg.gif'>
    
    <div style="float:left">&nbsp;<b>◇<a href="?">畅言评论模块</a> 》{$ptitle}</b></div>
    <div style="float:right;margin-right:20px;">您好：{$_SESSION['user']} {$account_str}</div>
    </td>
  </tr>
  <tr>
    <td width="100%" height="100%" valign="top" bgcolor='#ffffff' style="padding-top:5px"><table width='100%'  border='0' cellpadding='3' cellspacing='1' bgcolor='#DADADA' height="100%">
        <tr bgcolor='#DADADA'>
          <td colspan='2' background='images/wbg.gif' height='26'><font color='#666600'><b>{$ptitle}</b></font></td>
        </tr>
        {$addstr}
        <tr bgcolor='#FFFFFF'>
          <td colspan='2' height='100%' style='padding:20px'><br/><iframe src="{$manage_url}" {$addstyle} width="100%" height="100%" style="border:none"></iframe></td>
        </tr>
        <tr>
          <td bgcolor='#F5F5F5'>&nbsp;</td>
        </tr>
      </table></td>
  </tr>
</table>
<p align="center"> <br>
  <br>
</p>
</body>
</html>

EOT;
} elseif ($dopost=='dedecms_to_changyan') {
    if(!changyan_islogin())
    {
        ShowMsg("您尚未登录畅言，请先登录后继续使用……！",'?');
        exit();
    }
    $isv_app_key = changyan_get_isv_app_key();
    $start = isset($start)? intval($start) : 0;
    $pagesize=1;
    $sql = "SELECT count(*) as dd FROM `#@__feedback` group by aid order by aid asc limit {$start},{$pagesize}";
    $rr = $dsql->GetOne($sql);
    if($rr['dd']==0)
    {
        changyan_set_setting('last_import', time());
        ShowMsg('全部导出完成！','javascript:;');
        exit;
    }
    $sql = "SELECT aid FROM `#@__feedback` group by aid order by aid asc limit {$start},{$pagesize}";
    $dsql->SetQuery($sql);
    $dsql->Execute('dd');
    $result=array();
    while($arr = $dsql->GetArray('dd'))
    {
        $feedArr=array();
        $arctRow = $dsql->GetOne("SELECT * FROM `#@__arctiny` WHERE id={$arr['aid']}");
        if($arctRow['channel']==0) $arctRow['channel']=1;
        $cid = $arctRow['channel'];
        $chRow = $dsql->GetOne("SELECT * FROM `#@__channeltype` WHERE id='$cid' ");
        $row=array();
        if ($chRow['issystem']!= -1) {
            $sql = "SELECT arc.*,tp.reid,tp.typedir,tp.typename,tp.isdefault,tp.defaultname,tp.namerule,tp.namerule2,tp.ispart,
            tp.moresite,tp.siteurl,tp.sitepath,ch.addtable
            FROM `#@__archives` arc
                     LEFT JOIN `#@__arctype` tp on tp.id=arc.typeid
                      LEFT JOIN `#@__channeltype` as ch on arc.channel = ch.id
                      WHERE arc.id='{$arr['aid']}' ";
            $row = $dsql->GetOne($sql);
        } else {
            if($chRow['addtable']!='')
            {
                $sql = "SELECT arc.*,tp.typedir,tp.typename,tp.isdefault,tp.defaultname,tp.namerule,tp.namerule2,tp.ispart,
            tp.moresite,tp.siteurl,tp.sitepath FROM `{$chRow['addtable']}` arc  
            LEFT JOIN `#@__arctype` tp ON arc.typeid=tp.id
                WHERE `aid` = '{$arr['aid']}'";
                $addTableRow = $dsql->GetOne($sql);
                if(is_array($addTableRow))
                {
                    $row['id']=$addTableRow['aid'];
                    $row['title']=$addTableRow['title'];
                    $row['typeid']=$addTableRow['typeid'];
                    $row['mid']=$addTableRow['mid'];
                    $row['senddate']=$addTableRow['senddate'];
                    $row['channel']=$addTableRow['channel'];
                    $row['arcrank']=$addTableRow['arcrank'];
                    $row['senddate']=$addTableRow['senddate'];
                    $row['typedir']=$addTableRow['typedir'];
                    $row['isdefault']=$addTableRow['isdefault'];
                    $row['defaultname']=$addTableRow['defaultname'];
                    $row['ispart']=$addTableRow['ispart'];
                    $row['namerule2']=$addTableRow['namerule2'];
                    $row['moresite']=$addTableRow['moresite'];
                    $row['siteurl']=$addTableRow['siteurl'];
                    $row['sitepath']=$addTableRow['sitepath'];
                }
            }
        }
        $row['filename'] = $row['arcurl'] = GetFileUrl($row['id'],$row['typeid'],$row['senddate'],$row['title'],1,
        0,$row['namerule'],$row['typedir'],0,'',$row['moresite'],$row['siteurl'],$row['sitepath']);
        $row['title']=changyan_autoCharset($row['title']);
        
        $feedArr['title']=$row['title'];
        $feedArr['url']=$cfg_basehost.$row['arcurl'];
        $feedArr['ttime']= date('Y-m-d h:m:s',  $row['senddate']);
        $feedArr['sourceid']=$arr['aid'];
        $feedArr['parentid']=0;
        $feedArr['categoryid']=$row['typeid'];
        $feedArr['ownerid']=$row['mid'];
        $feedArr['metadata']='';

        $dsql->SetQuery("SELECT feedback_id FROM `#@__plus_changyan_importids` WHERE aid={$arr['aid']}");
        $dsql->Execute('dd');
        $feedback_ids=array();
        while($farr = $dsql->GetArray('dd'))
        {
            $feedback_ids[] = $farr['feedback_id'];
        }
        
        $squery="SELECT * FROM `#@__feedback` WHERE aid={$arr['aid']} order by dtime asc;";
        $dsql->SetQuery($squery);
        $dsql->Execute('xx');
        while($fRow = $dsql->GetArray('xx'))
        {
            if (in_array($fRow['id'], $feedback_ids)) continue;
            $feedArr['comments'][]=array(
                'cmtid'=>$fRow['id'],
                'ctime'=>date('Y-m-d h:m:s',  $fRow['dtime']),
                'content'=>changyan_Quote_replace(changyan_autoCharset($fRow['msg'])),
                'replyid'=>0,
                'spcount'=>$fRow['good'],
                'opcount'=>$fRow['bad'],
                'user'=>array(
                    'userid'=>$fRow['mid'],
                    'nickname'=>changyan_autoCharset($fRow['username']),
                    'usericon'=>'',
                    'userurl'=>'',
                )
            );
            $inquery = "INSERT INTO `#@__plus_changyan_importids`(`aid`,`feedback_id`) VALUES ('{$arr['aid']}','{$fRow['id']}')";
            $rs = $dsql->ExecuteNoneQuery($inquery);
        }
        if (count($feedArr['comments'])<1) {
            continue;
        }

        $content=json_encode($feedArr);
        $md5 = changyan_hmacsha1($content, $isv_app_key);

        $paramsArr=array(
            'appid'=>$client_id, 
            'md5'=>$md5, 
            'jsondata'=>$content);
        $rs=changyan_http_send(CHANGYAN_API_IMPORT,0,$paramsArr);
    }
    
    $start =$start+$pagesize;
    $end =$start+$pagesize;
    ShowMsg("成功导出评论数据，接下来导入[{$start}-{$end}]的评论数据","?dopost=dedecms_to_changyan&start={$start}");
    //echo json_encode($result);
    exit();
} elseif ($dopost=='changyan_to_dedecms') {
    if(!changyan_islogin())
    {
        ShowMsg("您尚未登录畅言，请先登录后继续使用……！",'?');
        exit();
    }
    $last_export=changyan_get_setting('last_export');
    if (empty($last_export)) {
        $start_date='2014-01-01 00:00:00';
    } else {
        $start_date= date('Y-m-d H:i:s',$last_export);
    }
    //$start_date='2014-01-01 00:00:00';
    $recent = changyan_get_recent($client_id, $start_date);
    //var_dump($recent);exit;
    if (count($recent['topics'])<=0) {
        ShowMsg("没有发现新的评论内容需要导出！",-1);
        exit();
    }
    $exports=array();
    foreach ($recent['topics'] as $topic) {
        $exports[]=array(
            'topic_id'=>$topic['topic_id'],
            'aid'=>$topic['topic_source_id'],
            'title'=>$topic['topic_title'],
        );
    }
    foreach ($exports as $export) {
        changyan_insert_comments(changyan_get_comments(changyan_get_setting('appid'),$export['topic_id']),$export['aid'],$export['title']);
    }
    changyan_set_setting('last_export', time());
    ShowMsg("成功备份畅言评论到DedeCMS系统！","?dopost=import");
    exit();
} elseif ($dopost=='checkupdate')
{
    ShowMsg("<p>当前为最新版本，无须下载更新！</p> <p><a href='?' >返回上一页</a></p>","javascript:;");
    exit();
} elseif ($dopost=='clearcache')
{
    changyan_clearcache();
    ShowMsg("成功清空标签缓存！","?");
    exit();
} elseif($dopost=='forget-pwd')
{
    ShowMsg("<p> 如果您忘记了畅言密码 </p> <p><a href='http://www.kuaizhan.com/passport/forget-pwd?refer=http://changyan.kuaizhan.com/audit/comments/TOAUDIT/1' >点击这里找回</a></p>","javascript:;");
    exit();
} else {
    /* 登录后主界面 */

    if(changyan_islogin())
    {
        $changyan_ver = CHANGYAN_VER;
        $login_url=CHANGYAN_API_SETCOOKIE.'?client_id='.CHANGYAN_CLIENT_ID.'&token='.$_SESSION['changyan'];
        $login_str = <<<EOT
<iframe src="{$login_url}" scrolling="no" width="0" height="0" style="border:none"></iframe>
EOT;
        
        $isv_app_key = changyan_get_setting('isv_app_key');
        $isv_id = changyan_get_setting('isv_id');
        $isv_id = intval($isv_id);
        $changge_isv_url = CHANGYAN_API_CHANGE_ISV.$isv_id;
        //$isv_app_key = changyan_get_isv_app_key();
        $change_isv_id = <<<EOT
<div id="change_isv"></div>
<script type="text/javascript">
setTimeout(function(){var change_isv_div = document.getElementById("change_isv");change_isv_div.innerHTML='<iframe src="{$changge_isv_url}" scrolling="no" width="0" height="0" style="border:none"></iframe>';},100);
</script>
EOT;
        if(!empty($forward))
        {
            echo <<<EOT
            <div style="font-size: 12px;padding: 20px;border: 1px solid #DDD;">畅言模块自动登录中，请耐心等待……</div>
{$login_str}
{$change_isv_id}
<script type="text/javascript">
setTimeout(function(){window.location.href='?dopost={$forward}';},500);
</script>
EOT;
            exit();
        }
        $account_str = preg_match("#@dedecms$#",$_SESSION['user'])? "<a href='?dopost=bind' style='color:blue'>[绑定账号]</a> <font color='red'>为了保证您的评论安全，建议绑定账号</font>" :
        "<a href='?dopost=logout' style='color:blue'>[切换账号]</a>";
        $msg = <<<EOT
<table width="98%" border="0" cellspacing="1" cellpadding="1">
  <tbody>
    <tr>
      <td width="16%" height="30">登录用户：</td>
      <td width="84%" style="text-align:left;">{$_SESSION['user']} {$account_str} <!--<a href='?dopost=logout' style='color:blue'>[退出]</a>--></td>
    </tr>
    <tr>
      <td width="16%" height="30">畅言模块版本：</td>
      <td width="84%" style="text-align:left;">v{$changyan_ver} <a href='?dopost=checkupdate' style='color:blue'>[检查更新]</a> </td>
    </tr>
    <tr>
      <td width="16%" height="30">App ID：</td>
      <td width="84%" style="text-align:left;"><input class="input-xlarge" type="text" value="{$appid}" disabled="disabled/" style="width:260px"> <a href='?dopost=change_appinfo' style='color:blue'>[修改]</a> <span style="color:#999">&nbsp;APP ID用于切换不同的站点</span></td>
    </tr>
    <tr>
      <td width="16%" height="30">APP Key：</td>
      <td width="84%" style="text-align:left;"><input class="input-xlarge" type="text" value="{$isv_app_key}" disabled="disabled/" style="width:260px">  </td>
    </tr>
    <tr>
      <td height="30" colspan="2">您已成功登录畅言！您可以进行以下操作：</td>
    </tr>
    <tr>
      <td height="30" colspan="2">
      <a href='?dopost=manage' style='color:blue'>[评论管理]</a> 
      <a href='?dopost=stat' style='color:blue'>[数据统计]</a> 
      <a href='?dopost=import' style='color:blue'>[导入导出]</a> 
      <a href='?dopost=clearcache' style='color:blue'>[清空缓存]</a> 
      <a href='?dopost=setting' style='color:blue'>[畅言设置]</a> 
      </td>
    </tr>
<tr>
      <td height="30" colspan="2">
   <hr>
   使用说明：<br>
   在对应模板中使用标签：<font color="red">{dede:changyan/}</font>，直接进行调用即可，样式设定可点击<a href='?dopost=setting' style='color:blue'>[畅言设置]</a> 进行设置。
  <hr>
  功能说明：<br>
  <b>[评论管理]</b>审核、删除评论信息，敏感词管理，用户禁言操作；<br>
 <b>[数据统计]</b>站点评论信息数据全方位统计；<br>
 <b>[导入导出]</b>评论信息数据导入/导出，建议用户定期导出备份；<br>
 <b>[清空缓存]</b>清空畅言评论标签缓存，如果更改登录账号建议清空缓存再生成；<br>
 <b>[畅言设置]</b>畅言评论相关设定；<br><br>
<hr>
    </tr>
    <tr>
      <td height="30" colspan="2" style="color:#999"><strong>畅言</strong>是一个简单友好的社会化评论及聚合系统。畅言评论系统可以保证您网站的评论安全，让您的网站远离垃圾评论；用户可以使用自己的社交账户在您的网站发表评论，并且一键同步至社交网络，为您的网站带来更多流量。</td>
    </tr>
  </tbody>
</table>
{$login_str}
{$change_isv_id}
EOT;
        $wintitle = '畅言评论管理';
        $wecome_info = '畅言评论模块 》';
        $win = new OxWindow();
        $win->AddTitle($wintitle);
        $win->AddMsgItem($msg);
        $winform = $win->GetWindow('hand', '&nbsp;', false);
        $win->Display();
        exit;
    } else {
        unset($_SESSION['changyan']);
        unset($_SESSION['user']);
        $user = changyan_get_setting('user');
        $version = CHANGYAN_VER;
        $changyan_reg_url = CHANGYAN_REG_URL;
        $changyan_forget_pwd_url = CHANGYAN_FORGET_PWD_URL;
        $changyan_update_url = CHANGYAN_UPDATE_URL;
        if(empty($user)) $user='';
        $msg = <<<EOT
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset={$cfg_soft_lang}">
<title>畅言评论管理</title>
<link rel="stylesheet" type="text/css" href="{$cfg_plus_dir}/img/base.css">
</head>
<body background='{$cfg_plus_dir}/img/allbg.gif' leftmargin="8" topmargin='8'>
<table width="98%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#DFF9AA">
  <tr>
    <td height="28" style="border:1px solid #DADADA" background='{$cfg_plus_dir}/img/wbg.gif'>&nbsp;<b>◇畅言评论模块 》</b></td>
  </tr>
  <tr>

  <td width="100%" height="80" style="padding-top:5px" bgcolor='#ffffff'>

  <script language='javascript'>
function CheckSubmit(){
    return true;
}
</script>
  <form name='myform' method='POST' onSubmit='return CheckSubmit();' action='?'>

  <input type='hidden' name='dopost' value='login'>
  <table width='100%'  border='0' cellpadding='3' cellspacing='1' bgcolor='#DADADA'>
    <tr bgcolor='#DADADA'>
      <td colspan='2' background='{$cfg_plus_dir}/img/wbg.gif' height='26'><font color='#666600'><b>畅言评论管理</b></font></td>
    </tr>
    <tr bgcolor='#FFFFFF'>
      <td colspan='2'  height='100'><table width="98%" border="0" cellspacing="1" cellpadding="1">
          <tbody>
            <tr>
              <td width="16%" height="30">邮箱：</td>
              <td width="84%" style="text-align:left;"><input name="user" type="text" id="user" size="16" style="width:200px" value="{$user}" />
                <a href="$changyan_reg_url" style="color:blue">免费注册</a> ，获取专业的评论服务</td>
            </tr>
            <tr>
              <td height="30">密码：</td>
              <td style="text-align:left;"><input name="pwd" type="password" id="pwd" size="16" style="width:200px">
               <a href="$changyan_forget_pwd_url" style="color:blue">忘记密码</a> &nbsp; </td>
            </tr>
            <tr>
              <td height="30">插件版本：</td>
              <td style="text-align:left;"><input name="ver" type="text" id="ver" size="16" style="width:200px" value="{$version}" readonly />
               <a href="$changyan_update_url" style="color:blue">下载新版插件</a> &nbsp; </td>
            </tr>
          </tbody>
        </table></td>
    </tr>
    <tr>
      <td colspan='2' bgcolor='#F9FCEF'><table width='100%' border='0' cellpadding='0' cellspacing='0'>
          <tr align='center' height='28'>
            <td width='16%'></td>
            <td width='84%' style="text-align: left;"><input name='imageField1' type='image' class='np' src='{$cfg_plus_dir}/img/button_ok.gif' width='60' height='22' border='0' /></td>
            <td></td>
          </tr>
        </table></td>
    </tr>
  </table>
  </td>
  </tr>
</table>
</body>
</html>
EOT;
        echo $msg;
    }
}
?>
