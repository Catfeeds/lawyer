<?php   if(!defined('DEDEINC')) exit('Request Error!');
/**
 * 分类信息地区与类型快捷链接
 *
 * @version        $Id: infolink.lib.php 1 9:29 2010年7月6日Z tianya $
 * @package        DedeCMS.Taglib
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
 
/*>>dede>>
<name>分类信息地区与类型快捷链接</name>
<type>全局标记</type>
<for>V55,V56,V57</for>
<description>调用分类信息地区与类型快捷链接</description>
<demo>
{dede:infolink /}
</demo>
<attributes>
</attributes> 
>>dede>>*/
 
require_once(DEDEINC.'/enums.func.php');
require_once(DEDEDATA.'/enums/nativeplace.php');
require_once(DEDEDATA.'/enums/infotype.php');
function lib_infolink(&$ctag,&$refObj)
{
    global $dsql,$nativeplace,$topplace,$infotype,$hasSetEnumJs,$cfg_cmspath,$cfg_mainsite;
    global $em_nativeplaces,$em_infotypes;
    
    //属性处理
    //$attlist="row|12,titlelen|24";
    //FillAttsDefault($ctag->CAttribute->Items,$attlist);
    //extract($ctag->CAttribute->Items, EXTR_SKIP);
    
    $cmspath = ( (empty($cfg_cmspath) || !preg_match("#\/$#", $cfg_cmspath)) ? $cfg_cmspath.'/' : $cfg_cmspath );
    $baseurl = preg_replace("#\/$#", '', $cfg_mainsite).$cmspath;
    
    $smalltypes = '';
    if( !empty($refObj->TypeLink->TypeInfos['smalltypes']) ) {
        $smalltypes = explode(',', $refObj->TypeLink->TypeInfos['smalltypes']);
    }
    
    if(empty($refObj->Fields['typeid'])) {
        $row = $dsql->GetOne("SELECT id FROM `#@__arctype` WHERE channeltype='-8' And reid = '0' ");
        $typeid = (is_array($row) ? $row['id'] : 0);
    }
    else {
        $typeid = $refObj->Fields['typeid'];
    }
    
    $innerText = trim($ctag->GetInnerText());
    if(empty($innerText)) $innerText = GetSysTemplets("info_link.htm");
    $ctp = new DedeTagParse();
    $ctp->SetNameSpace('field','[',']');
    $ctp->LoadSource($innerText);

    $revalue = $seli = '';
    $channelid = ( empty($refObj->TypeLink->TypeInfos['channeltype']) ? -8 : $refObj->TypeLink->TypeInfos['channeltype'] );
    
    $fields = array('nativeplace'=>'','topplace'=>'','selnat'=>'','selyears'=>'','infotype'=>'','typeid'=>$typeid,
                    'channelid'=>$channelid,'linkallplace'=>'','linkalltype'=>'');
    $fields['nativeplace'] = $fields['infotype'] = '';
    $fields['linkallplace'] = "<a href='{$baseurl}plus/list.php?channelid={$channelid}&tid={$typeid}&infotype={$infotype}'><b>不限</b></a>";
    $fields['linkalltype'] = "<a href='{$baseurl}plus/list.php?channelid={$channelid}&tid={$typeid}&nativeplace={$nativeplace}'><b>不限</b></a>";
    //地区链接
	$fields['selnat'] = $nativeplace;
	//省份
	$toptype = floor($nativeplace-($nativeplace % 500));
	foreach($em_nativeplaces as $eid=>$em)
	{
		if($eid % 500 != 0) continue;
		if($eid == $nativeplace || $eid == $toptype) {
			$fields['topplace'] .= "<option value='{$eid}' selected> {$em} </option>\r\n";
		}else{
			$fields['topplace'] .= "<option value='{$eid}'> {$em} </option>\r\n";
		}
	}
	//县市区
	if(!empty($nativeplace)){
		$sontype = ( ($nativeplace % 500 != 0) ? $nativeplace : 0 );
        $toptype = ( ($nativeplace % 500 == 0) ? $nativeplace : ( $nativeplace-($nativeplace%500) ) );
        foreach($em_nativeplaces as $eid=>$em)
        {
            if($eid < $toptype+1 || $eid > $toptype+499) continue;
            if($eid == $nativeplace) {
				$fields['nativeplace'] .= "<option value='{$eid}' selected> {$em} </option>\r\n";
            }
            else {
				$fields['nativeplace'] .= "<option value='{$eid}'> {$em} </option>\r\n";
          }
      }
	}
	
	//专业领域
	$fields['typename'] = "<a href='{$baseurl}plus/list.php?channelid={$channelid}&tid=16&nativeplace={$nativeplace}'><b>不限</b></a>";
	$dsql->SetQuery("SELECT id,typename FROM `#@__arctype` WHERE reid = 16");
	$dsql->Execute();
	
	while($row = $dsql->GetArray()){
		$fields['typename'] .= " <a href='{$baseurl}plus/list.php?channelid={$channelid}&tid={$row['id']}&infotype={$infotype}&nativeplace={$nativeplace}'>{$row['typename']}</a>\r\n";
	}
    //执业年限
	$infotype = $_GET['infotype'];
	$fields['selyears'] = $infotype;
	foreach($em_infotypes as $eid=>$em){
		if($eid == $infotype){
			$fields['infotype'] .= " <input type='radio' name='years' checked value='{$eid}'>{$em}";
		}else{
			$fields['infotype'] .= " <input type='radio' name='years' value='{$eid}'>{$em}";
		}
		
	}	
    if(is_array($ctp->CTags))
    {
        foreach($ctp->CTags as $tagid=>$ctag)
        {
            if(isset($fields[$ctag->GetName()])) {
                $ctp->Assign($tagid,$fields[$ctag->GetName()]);
            }
        }
        $revalue .= $ctp->GetResult();
    }
    return $revalue;
}