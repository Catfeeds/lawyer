<!--
$(document).ready(function()
{
	$("#txtUsername").change(function(){
		alert("dddd");
	});
	//用户类型
	/*if($('.usermtype2').attr("checked")==true) $('#uwname').text('公司名称：'); 
	$('.usermtype').click(function()
	{
		$('#uwname').text('用户笔名：');
	});
	$('.usermtype2').click(function()
	{
		$('#uwname').text('公司名称：');
	});*/
	//checkSubmit
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
		/*if($('#userpwdok').val()!=$('#txtPassword').val())
		{
			$('#userpwdok').focus();
			alert("两次密码不一致！");
			return false;
		}
		if($('#uname').val()=="")
		{
			$('#uname').focus();
			alert("用户昵称不能为空！");
			return false;
		}*/
		if($('#vdcode').val()=="")
		{
			$('#vdcode').focus();
			alert("验证码不能为空！");
			return false;
		}
	})
	//AJAX changChickValue
	$("#txtUsername").change( function() {
		$.ajax({type: reMethod,url: "index_do.php",
		data: "dopost=checkuser&fmdo=user&cktype=1&uid="+$("#txtUsername").val(),
		dataType: 'html',
		success: function(result){$("#_userid").html(result);}}); 
	});
	//验证手机号
	$("#txtPhone").change( function() {
		//匹配手机号
		var reg2 =/1[3,4,5,7,8]\d{9}$/g;
		if(!reg2.exec($("#txtPhone").val()))
		{
			$('#_usercfrm').html("<span class="icon-font"></span><b>请输入正确的手机号码！（手机号如：131xxx）</b>");
			$('#txtPhone').focus();
		}else{
			$.ajax({type: reMethod,url: "index_do.php",
			data: "dopost=checkphone&fmdo=user&email="+$("#txtPhone").val(),
			dataType: 'html',
			success: function(result){$("#_usercfrm").html(result);}}); 
		}
	});	
	
	/*
	$("#uname").change( function() {
		$.ajax({type: reMethod,url: "index_do.php",
		data: "dopost=checkuser&fmdo=user&cktype=0&uid="+$("#uname").val(),
		dataType: 'html',
		success: function(result){$("#_uname").html(result);}}); 
	});
	
	
	$("#email").change( function() {
		var sEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+);
		if(!sEmail.exec($("#email").val()))
		{
			$('#_email').html("<font color='red'><b>×Email格式不正确</b></font>");
			$('#email').focus();
		}else{
			$.ajax({type: reMethod,url: "index_do.php",
			data: "dopost=checkmail&fmdo=user&email="+$("#email").val(),
			dataType: 'html',
			success: function(result){$("#_email").html(result);}}); 
		}
	});	
	*/
	$('#txtPassword').change( function(){
		if($('#txtPassword').val().length < pwdmin)
		{
			$('#_usercfrm').html("<span class="icon-font"></span><b>密码不能小于"+pwdmin+"位</b>");
		}
		/*else if($('#userpwdok').val()!=$('txtPassword').val())
		{
			$('#_userpwdok').html("<font color='red'><b>×两次输入密码不一致</b></font>");
		}
		else if($('#txtPassword').val().length < pwdmin)
		{
			$('#_usercfrm').html("<span class="icon-font"></span><b>密码不能小于"+pwdmin+"位</b>");
		}
		else
		{
			$('#_usercfrm').html("<font color='#4E7504'><b>√填写正确</b></font>");
		}*/
	});
	
	/*$('#txtPassword').change( function(){
		if($('#txtPassword').val().length < pwdmin)
		{
			$('#_usercfrm').html("<span class="icon-font"></span><b>密码不能小于"+pwdmin+"位</b>");
		}
		else if($('#txtPassword').val()=='')
		{
			$('#txtPassword').html("<span class="icon-font"></span><b>请填写确认密码</b>");
		}
		else if($('#txtPassword').val()!=$('#txtPassword').val())
		{
			$('#_userpwdok').html("<font color='red'><b>×两次输入密码不一致</b></font>");
		}
		else
		{
			$('#_userpwdok').html("<font color='#4E7504'><b>√填写正确</b></font>");
		}
	});*/
	/*
	$("a[href*='#vdcode'],#vdimgck").bind("click", function(){
		$("#vdimgck").attr("src","../include/vdimgck.php?tag="+Math.random());
		return false;
	});*/
});
-->