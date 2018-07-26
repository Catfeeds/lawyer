<form name='infoguide' method='get' action='/plus/list.php'>
                    
                    <input type='hidden' name='tid' value='[field:typeid /]' />
                    <input type='hidden' name='channelid' value='-8' />
                    <span class='infosearchtxt'>关键字：</span><span><input type='text' name='keyword' value='' class="ipt-txt" /></span>
                    <input type='submit' value='搜索信息' class="btn-2" style='cursor:pointer' />
                    &nbsp;
                    <input type='button' value='发布信息' class="btn-2" 
                    onclick="location='/member/archives_sg_add.php?channelid=-8';" style='cursor:pointer' />
                    <div class="choose-block">
                        <div class="city-bar">
                            <div class="title-part">
                                <h3>所在城市：</h3>
                            </div>
                            <div class="content-part"> 
								[field:linkallplace /]
								<select id="province" onchange="provinceSelect('1')">
                                    <option value="">选择省份 </option>
                                    [field:nativeplace /]
                                </select>
                                [field:infotype /]
                            </div>
                        </div>
                        <div class="special-bar">
                            <div class="title-part">
                                <h3>专长领域：</h3>
                            </div>
                            <div class="content-part"> <a class="selected" href="/zhaolvshi/shanghai/all/all/p1.html" ><b>不限</b></a> <a class="" href="/zhaolvshi/shanghai/laodongzhongcai/all/p1.html" >劳动仲裁</a> <a class="" href="/zhaolvshi/shanghai/zhaiwujiufen/all/p1.html" >债务纠纷</a> <a class="" href="/zhaolvshi/shanghai/hetongjiufen/all/p1.html" >合同纠纷</a> <a class="" href="/zhaolvshi/shanghai/qisulihun/all/p1.html" >起诉离婚</a> <a class="" href="/zhaolvshi/shanghai/jiaotongshigu/all/p1.html" >交通事故</a> <a class="" href="/zhaolvshi/shanghai/renshensunhai/all/p1.html" >人身损害</a> <a class="" href="/zhaolvshi/shanghai/fangchanjiufen/all/p1.html" >房产纠纷</a> <a class="" href="/zhaolvshi/shanghai/xingshibianhu/all/p1.html" >刑事辩护</a> <a class="" href="/zhaolvshi/shanghai/zhishichanquan/all/p1.html" >知识产权</a> <a class="" href="/zhaolvshi/shanghai/qita/all/p1.html" >其他纠纷</a> </div>
                        </div>
                        <div class="year-bar">
                            <div class="title-part">
                                <h3>执业年限：</h3>
                            </div>
                            <div class="content-part" style="border-bottom: none;"> [field:years /]<!--<a href="/zhaolvshi/shanghai/all/all/p1.html" class="selected"><b>不限</b></a> <a href="/zhaolvshi/shanghai/all/1/p1.html" class="">1-5年</a> <a href="/zhaolvshi/shanghai/all/2/p1.html" class="">6-10年</a> <a href="/zhaolvshi/shanghai/all/3/p1.html" class="">10年以上</a>--> </div>
                        </div>
                    </div>
                    </form>