<div class="choose-block">
                        <div class="city-bar">
                            <div class="title-part">
                                <h3>所在城市：</h3>
                            </div>
                            <div class="content-part"> 
								[field:linkallplace /]
								<select id="province" onchange="provinceSelect(this,[field:channelid/],[field:typeid/],[field:selyears/])">
									<option value="">选择省份</option>
									[field:topplace /]
								</select>
								<select id="city" onchange="citySelect(this,[field:channelid/],[field:typeid/],[field:selyears/])">
										<option value="">选择县市</option>
                                        [field:nativeplace /]
								</select>
                            </div>
                        </div>
                        <div class="special-bar">
                            <div class="title-part">
                                <h3>专长领域：</h3>
                            </div>
                            <div class="content-part">
								[field:typename /]
								<!--{dede:channel typeid='16' type="son"}
								<a href="[field:typeurl/]" >[field:typename/]</a>
								{/dede:channel}-->
							</div>
                        </div>
                        <div class="year-bar">
                            <div class="title-part">
                                <h3>执业年限：</h3>
                            </div>
                            <div class="content-part" style="border-bottom: none;">[field:linkalltype/] [field:infotype /]</div>
                        </div>
                    </div>
                    <script>
						$("input[name='years']").click(function(){
							var yearsval = $(this).val();
							//$.get("/plus/list.php?channelid=[field:channelid/]&tid=[field:typeid/]&nativeplace=[field:selnat/]&infotype="+yearsval,)
							window.location.href="/plus/list.php?channelid=[field:channelid/]&tid=[field:typeid/]&nativeplace=[field:selnat/]&infotype=[field:selyears/]";
						})
					</script>