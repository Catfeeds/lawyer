<!--
$(document).ready(function()
{
	$('#regUser').submit(function ()
	{
		if(!$('#agree').get(0).checked) {
			alert("你必须同意注册协议！");
			return false;
		}
		if($('#txtUsername').val()==""){
			$('#txtUsername').focus();
			alert("用户名不能为空！");
			return false;
		}
		if($('#txtPhone').val()==""){
			$('#txtPhone').focus();
			alert("手机号不能为空！");
			return false;
		}
		if($('#txtPassword').val()=="")
		{
			$('#txtPassword').focus();
			alert("登陆密码不能为空！");
			return false;
		}
		if($('#vdcode').val()=="")
		{
			$('#vdcode').focus();
			alert("验证码不能为空！");
			return false;
		}
	});
	//验证用户名是否被注册
	$("#txtUsername").change( function() {
		$.ajax({type: reMethod,url: "index_do.php",
		data: "dopost=checkuser&fmdo=user&cktype=1&uid="+$("#txtUsername").val(),
		dataType: 'html',
		success: function(result){$("#_usercfrm").html(result);}});
		return false;
	});
	//验证手机号是否被注册
	$("#txtPhone").change( function() {
		//匹配手机号
		var reg2 =/1[3,4,5,7,8]\d{9}$/g;
		if(!reg2.exec($("#txtPhone").val()))
		{
			$('#_usercfrm').html("<span class='icon-font'></span><b>请输入正确格式的手机号码！</b>");
			$('#txtPhone').focus();
		}else{
			$.ajax({type: reMethod,url: "index_do.php",
			data: "dopost=checkphone&fmdo=user&phone="+$("#txtPhone").val(),
			dataType: 'html',
			success: function(result){$("#_usercfrm").html(result);}});
			$('#txtPhone').focus();
		}
	});	
	//验证密码
	$('#txtPassword').change( function(){
		if($('#txtPassword').val().length < pwdmin)
		{
			$('#_usercfrm').html("<span class='icon-font'></span><b>密码不能小于"+pwdmin+"位</b>");
			return false;
		}
	});
});
-->