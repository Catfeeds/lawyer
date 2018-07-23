/*$(document).ready(function()  {
	var payment_type = $('#OrderPaymentType').val();
	if(payment_type == 3)
	{
		confirmAlipay();
		$('#pay03').attr('checked','checked');
	}else if(payment_type == 2)
	{
		var bank = $('#OrderPaymentBank').val();
		$('.option-wrap').hide();
		$('#alipay-netbankpay-wrap').show();
		$('#pay02').attr('checked','checked');
		$("input[value="+bank+"][name='alipay_netbank_option']").attr('checked','checked');
	}else if(payment_type == 4)
	{
		confirmBankTransfer();
		$('#pay04').attr('checked','checked');
	}
	else if(payment_type == 7)
	{
		confirmWeixinQrcode();
		$('#pay07').attr('checked','checked');
	}
});*/
/*function confirmWeixinQrcode()
{*/
	$("#pay07").click(function(){
		$('#OrderPaymentType').val(7);
		/*$('#OrderPaymentBank').val("");
		$('.option-wrap').hide();*/
	});
/*}
function showAlipayNetbankList()
{*/
	$("#pay02").click(function(){
		$('#OrderPaymentType').val(2);
		$('#OrderPaymentBank').val('BOCB2C');
		/*$("input[value='BOCB2C'][name='alipay_netbank_option']").attr('checked','checked');
		$('.option-wrap').hide();
		$('#alipay-netbankpay-wrap').show();*/
	});
/*}
function confirmAlipay()
{*/
	$("#pay03").click(function(){
		$('#OrderPaymentType').val(3);
		/*$('#OrderPaymentBank').val("");
		$('.option-wrap').hide();*/
	});
/*}*/
/*function confirmWeixinQrcode()
{
	$('#OrderPaymentType').val(10);
	$('#OrderPaymentBank').val("");
	$('.option-wrap').hide();
}
function showAlipayNetbankList()
{
	$('#OrderPaymentType').val(2);
	$('#OrderPaymentBank').val('BOCB2C');
	$("input[value='BOCB2C'][name='alipay_netbank_option']").attr('checked','checked');
	$('.option-wrap').hide();
	$('#alipay-netbankpay-wrap').show();
}
function confirmAlipay()
{
	$('#OrderPaymentType').val(1);
	$('#OrderPaymentBank').val("");
	$('.option-wrap').hide();
}*/
function confirmAlipayNetbank()
{
	var bank = $("input[name='alipay_netbank_option']:checked").val();
	$('#OrderPaymentType').val(2);
	$('#OrderPaymentBank').val(bank);
}
function confirmBankTransfer()
{
	$('#OrderPaymentType').val(4);
	$('#OrderPaymentBank').val("");
	$('.option-wrap').hide();
	$('#bank-transfer-wrap').show();
}