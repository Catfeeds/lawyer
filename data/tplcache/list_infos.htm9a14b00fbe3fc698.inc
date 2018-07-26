<?php
$z[0]=Array("field","",226,248);
$z[0][4]=array();
$z[0][4]['name']="seotitle";
$z[1]=Array("global","",249,277);
$z[1][4]=array();
$z[1][4]['name']="cfg_indexname";
$z[2]=Array("field","",318,347);
$z[2][4]=array();
$z[2][4]['name']="keywords";
$z[3]=Array("field","",387,445);
$z[3][4]=array();
$z[3][4]['name']="description";
$z[3][4]['function']="html2text(@me)";
$z[4]=Array("include","",2495,2532);
$z[4][4]=array();
$z[4][4]['filename']="header.htm";
$z[5]=Array("field","",8279,8308);
$z[5][4]=array();
$z[5][4]['name']="position";
$z[6]=Array("infolink","\r\n                    <div class=\"choose-block\">\r\n                        <div class=\"city-bar\">\r\n                            <div class=\"title-part\">\r\n                                <h3>所在城市：</h3>\r\n                            </div>\r\n                            <div class=\"content-part\"> \r\n								[field:linkallplace /]\r\n								<select id=\"province\" onchange=\"provinceSelect('')\">\r\n									<option value=\"\">选择省份</option>\r\n									[field:nativeplace /]\r\n								</select>\r\n								<select id=\"city\" onchange=\"citySelect()\">\r\n										<option value=\"all\">选择县市\r\n										</option>\r\n										<option selected=\"selected\" value=\"shanghai\"> 上海市辖区</option>\r\n								</select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"special-bar\">\r\n                            <div class=\"title-part\">\r\n                                <h3>专长领域：</h3>\r\n                            </div>\r\n                            <div class=\"content-part\"> <a class=\"selected\" href=\"/zhaolvshi/shanghai/all/all/p1.html\" ><b>不限</b></a> <a class=\"\" href=\"/zhaolvshi/shanghai/laodongzhongcai/all/p1.html\" >劳动仲裁</a> <a class=\"\" href=\"/zhaolvshi/shanghai/zhaiwujiufen/all/p1.html\" >债务纠纷</a> <a class=\"\" href=\"/zhaolvshi/shanghai/hetongjiufen/all/p1.html\" >合同纠纷</a> <a class=\"\" href=\"/zhaolvshi/shanghai/qisulihun/all/p1.html\" >起诉离婚</a> <a class=\"\" href=\"/zhaolvshi/shanghai/jiaotongshigu/all/p1.html\" >交通事故</a> <a class=\"\" href=\"/zhaolvshi/shanghai/renshensunhai/all/p1.html\" >人身损害</a> <a class=\"\" href=\"/zhaolvshi/shanghai/fangchanjiufen/all/p1.html\" >房产纠纷</a> <a class=\"\" href=\"/zhaolvshi/shanghai/xingshibianhu/all/p1.html\" >刑事辩护</a> <a class=\"\" href=\"/zhaolvshi/shanghai/zhishichanquan/all/p1.html\" >知识产权</a> <a class=\"\" href=\"/zhaolvshi/shanghai/qita/all/p1.html\" >其他纠纷</a> </div>\r\n                        </div>\r\n                        <div class=\"year-bar\">\r\n                            <div class=\"title-part\">\r\n                                <h3>执业年限：</h3>\r\n                            </div>\r\n                            <div class=\"content-part\" style=\"border-bottom: none;\">[field:linkalltype/] [field:infotype /]<!--<a href=\"/zhaolvshi/shanghai/all/all/p1.html\" class=\"selected\"><b>不限</b></a> <a href=\"/zhaolvshi/shanghai/all/1/p1.html\" class=\"\">1-5年</a> <a href=\"/zhaolvshi/shanghai/all/2/p1.html\" class=\"\">6-10年</a> <a href=\"/zhaolvshi/shanghai/all/3/p1.html\" class=\"\">10年以上</a>--> </div>\r\n                        </div>\r\n                    </div>\r\n                    </form>\r\n                ",8564,11290);
$z[6][4]=array();
$z[7]=Array("list","\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"hb-right\"> </div>\r\n                            <a href=\"[field:arcurl/]\" class=\"law-photo\" target=\"_blank\"><img src=\"[field:picname/]\" alt=\"[field:title/]\" /></a>\r\n                            <div class=\"fl\">\r\n                                <p> <a href=\"[field:arcurl/]\" class=\"f16 s-c333 fb\" target=\"_blank\">[field:title/]</a><i title=\"[field:title/]\" class=\"ico-new i-new63\"></i> [field:tag/]<!--<span class=\"law-bq\">有团队</span><span class=\"law-bq\">办过大案</span>--> </p>\r\n                                <div class=\"mt5 clearfix\">\r\n                                    <div class=\"w325 fl\">\r\n                                        <p>擅长：[field:skill/]</p>\r\n                                        <p class=\"mt5\"> <em class=\"law-qg\">特色律所</em> <a href=\"[field:arcurl/]\" target=\"_blank\">[field:addr/]</a> </p>\r\n                                        <p class=\"s-c999 mt5\"><i class=\"ico-lr i-place mr5\"></i>[field:address/]</p>\r\n                                    </div>\r\n                                    <div class=\"w373 fl\">\r\n                                        <p><span class=\"mr20\">案例：[field:case/]</span><span>帮助：[field:help/]</span></p>\r\n                                        <p class=\"mt15 clearfix\"> <span class=\"law-tel\"><i class=\"ico-new i-new79\"></i>[field:tel/]</span> <a href=\"/swt/\" target=\"_blank\" class=\"btn btn-gn2\">在线咨询</a> </p>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mt15 clearfix lh24\">\r\n                                    <div class=\"law-ensure pr fl mr30\">\r\n                                    [field:id runphp='yes']  \r\n									\$aid = @me;\r\n									\$row=\$GLOBALS['dsql']->GetOne(\"select a.star FROM dede_addoninfos as a where a.aid='\$aid' \");\r\n									@me=str_repeat('<i class=\"ico-ft i-sr14 i-sr14-oe\"></i>',\$row['star']);\r\n									[/field:id]\r\n									 </div>\r\n                                    <span title=\"执业认证\" class=\"s-c999 mr20\"><i class=\"ico-new i-new73 mr5\"></i>执业认证</span> </div>\r\n                            </div>\r\n                        </li>\r\n                        ",12195,14495);
$z[7][4]=array();
$z[7][4]['pagesize']="20";
$z[8]=Array("pagelist","",14638,14709);
$z[8][4]=array();
$z[8][4]['listitem']="info,index,end,pre,next,pageno";
$z[8][4]['listsize']="5";
$z[9]=Array("include","",31902,31939);
$z[9][4]=array();
$z[9][4]['filename']="footer.htm";

?>