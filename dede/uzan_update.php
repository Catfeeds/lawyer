<?php
/**
 * 织梦个人网站支付插件1.0
 * Created by PhpStorm.
 * User: lol9
 * Date: 2017年12月09日
 * Time: 16:20:45
 */

require_once(dirname(__FILE__)."/config.php");
require_once(dirname(__FILE__)."/../include/dedemodule.class.php");
$action = isset($action) ? $action : '';
$data['code'] = 0;
if($action=='update'){
    if (!function_exists('curl_init')) {
        $data['msg'] = "没有支持的curl组件！";
        echo json_encode($data);exit();
    }
    $row = $dsql->GetOne("SELECT * FROM `#@__sys_module` WHERE modname = '个人网站支付'");
    if(empty($row) || empty($row['hashcode'])){
        $data['msg'] = "检查更新失败！请确定你已正确安装该插件！";
        echo json_encode($data);exit();
    }
    $ver = getVer();
    $result = curlGet("http://pay.lol9.cn/checkUpdate.php?plug=uzan&hash=".$row['hashcode']."&charset=".$cfg_soft_lang."&ver=".$ver);
    $result = json_decode($result,true);
    if($result['code']==0){
        $data['msg'] = "已是最新版本！";
        echo json_encode($data);exit();
    }
    $data['code'] = 1;
    $data['msg'] = "有新的版本更新";
    echo json_encode($data);exit();
}
if($action=='doUpdate'){
    $row = $dsql->GetOne("SELECT * FROM `#@__sys_module` WHERE modname = '个人网站支付'");
    if(empty($row) || empty($row['hashcode'])){
        $data['msg'] = "检查更新失败！请确定你已正确安装该插件！";
        echo json_encode($data);exit();
    }
    $ver = getVer();
    $result = curlGet("http://pay.lol9.cn/checkUpdate.php?plug=uzan&hash=".$row['hashcode']."&charset=".$cfg_soft_lang."&ver=".$ver);
    $result = json_decode($result,true);
    if($result['code']==0){
        $data['msg'] = "已是最新版本！";
        echo json_encode($data);exit();
    }
    $downUrl = $result['url'];
    $mdir = DEDEDATA.'/module';
    if(!is_writeable($mdir))
    {
        $data['msg'] = "目录 {$mdir} 不支持写入，这将导致安装程序没法正常创建！";
        echo json_encode($data);exit();
    }
    $tmpfilename = $mdir.'/'.ExecTime().mt_rand(10000,50000).'.tmp';
    $result = curlGet($downUrl);
    file_put_contents($tmpfilename,$result) or die("把上传的文件移动到{$tmpfilename}时失败，请检查{$mdir}目录是否有写入权限！");

    $dm = new DedeModule($mdir);
    $infos = $dm->GetModuleInfo($tmpfilename,'file');
    $hash = $infos['hash'];
    if(file_exists($mdir.'/'.$hash.'.xml')){
        @unlink($mdir.'/'.$hash.'.xml');
    }
    rename($tmpfilename,$mdir.'/'.$hash.'.xml');
    $filelists = $dm->GetFileLists($hash);
    init($filelists);

    $minfos = $dm->GetModuleInfo($hash);
    extract($minfos, EXTR_SKIP);

    $menustring = addslashes($dm->GetSystemFile($hash,'menustring'));
    $indexurl = str_replace('**', '=', $indexurl);

    $dm->WriteFiles($hash,1);
    $filename = '';
    if(!isset($autosetup) || $autosetup==0) $filename = $dm->WriteSystemFile($hash, 'setup');
    if(!isset($autodel) || $autodel==0) $dm->WriteSystemFile($hash, 'uninstall');
    $dm->WriteSystemFile($hash,'readme');
    $dm->Clear();

    $mysql_version = $dsql->GetVersion(TRUE);
//默认使用MySQL 4.1 以下版本的SQL语句，对大于4.1版本采用替换处理 TYPE=MyISAM ==> ENGINE=MyISAM DEFAULT CHARSET=#~lang~#
    $setupsql = $dm->GetSystemFile($hash, 'setupsql40');
    $setupsql = preg_replace("#ENGINE=MyISAM#i", 'TYPE=MyISAM', $setupsql);
    $sql41tmp = 'ENGINE=MyISAM DEFAULT CHARSET='.$cfg_db_language;
    if($mysql_version >= 4.1)
    {
        $setupsql = preg_replace("#TYPE=MyISAM#i", $sql41tmp, $setupsql);
    }
//_ROOTURL_
    if($cfg_cmspath=='/') $cfg_cmspath = '';

    $rooturl = $cfg_basehost.$cfg_cmspath;

    $setupsql = preg_replace("#_ROOTURL_#i", $rooturl, $setupsql);
    $setupsql = preg_replace("#[\r\n]{1,}#", "\n", $setupsql);

    $sqls = @split(";[ \t]{0,}\n", $setupsql);


    foreach($sqls as $sql)
    {
        if(trim($sql)!='') $dsql->ExecuteNoneQuery($sql);
    }
    ReWriteConfigAuto();
    UpDateCatCache();
    echo "<script>parent.layer.msg('更新成功');var timer1=window.setTimeout(function(){parent.window.location.reload()},3000);</script>";
//    $data['code'] = 1;
//    $data['msg'] = "升级完成！";
//    echo json_encode($data);exit();
}
function curlGet($url = '', $options = array())
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    if (!empty($options)) {
        curl_setopt_array($ch, $options);
    }
    //https请求 不验证证书和host
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}
function TestWriteAble($d)
{
    $tfile = '_dedet.txt';
    $d = preg_replace("#\/$#", '', $d);
    $fp = @fopen($d.'/'.$tfile,'w');
    if(!$fp) return FALSE;
    else
    {
        fclose($fp);
        $rs = @unlink($d.'/'.$tfile);
        if($rs) return TRUE;
        else return FALSE;
    }
}

function ReWriteConfigAuto()
{
    global $dsql;
    $configfile = DEDEDATA.'/config.cache.inc.php';
    if(!is_writeable($configfile))
    {
        echo "配置文件'{$configfile}'不支持写入，无法修改系统配置参数！";
        //ClearAllLink();
        exit();
    }
    $fp = fopen($configfile,'w');
    flock($fp,3);
    fwrite($fp,"<"."?php\r\n");
    $dsql->SetQuery("SELECT `varname`,`type`,`value`,`groupid` FROM `#@__sysconfig` ORDER BY aid ASC ");
    $dsql->Execute();
    while($row = $dsql->GetArray())
    {
        if($row['type']=='number') fwrite($fp,"\${$row['varname']} = ".$row['value'].";\r\n");
        else fwrite($fp,"\${$row['varname']} = '".str_replace("'",'',$row['value'])."';\r\n");
    }
    fwrite($fp,"?".">");
    fclose($fp);
}

function init($filelists)
{
    $prvdirs = array();
    $incdir = array();
    foreach($filelists as $v)
    {
        if(empty($v['name'])) continue;
        if($v['type']=='dir')
        {
            $v['type'] = '目录';
            $incdir[] = $v['name'];
        }
        else
        {
            $v['type'] = '文件';
        }
    }
//检测需要的目录权限
    foreach($filelists as $v)
    {
        $prvdir = preg_replace("#\/([^\/]*)$#", '/', $v['name']);
        if(!preg_match("#^\.#", $prvdir)) $prvdir = './';
        $n = TRUE;
        foreach($incdir as $k=>$v)
        {
            if(preg_match("#^".$v."#i", $prvdir))
            {
                $n = FALSE;
                BREAK;
            }
        }
        if(!isset($prvdirs[$prvdir]) && $n && is_dir($prvdir))
        {
            $prvdirs[$prvdir][0] = 1;
            $prvdirs[$prvdir][1] = TestWriteAble($prvdir);
        }
    }
    $msg = array();
    foreach ($prvdirs as $key=>$dir){
        if($dir[1]===false){
            $msg[] = "目录 {$key} 不支持写入。";
        }
    }
    if(!empty($msg)){
        ShowMsg("更新失败！".implode("<br>",$msg),"javascript:;");
        exit();
    }
}

function getVer()
{
    $txt = DEDEDATA.'/module/uzan.txt';
    if(!file_exists($txt)) $ver = '1.0';
    $fp = fopen($txt,'r');
    $content = fread($fp, filesize($txt));
    fclose($fp);
    $content = unserialize($content);
    $ver = $content['ver'] ? $content['ver'] : '1.0';
    return $ver;
}