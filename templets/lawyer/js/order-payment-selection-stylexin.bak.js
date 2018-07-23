$(document).ready(function()  {
	var payment_type = $('#OrderPaymentType').val();
	if(payment_type == 1)
	{
		confirmAlipay();
		$('#pay01').attr('checked','checked');
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
	else if(payment_type == 10)
	{
		confirmWeixinQrcode();
		$('#pay05').attr('checked','checked');
	}
});
function showAlipayNetbankList()
{
	$('#OrderPaymentType').val(2);
	$('#OrderPaymentBank').val('BOCB2C');
	$("input[value='BOCB2C'][name='alipay_netbank_option']").attr('checked','checked');
	$('.option-wrap').hide();
	$('#alipay-netbankpay-wrap').show();
}
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
function confirmAlipay()
{
	$('#OrderPaymentType').val(1);
	$('#OrderPaymentBank').val("");
	$('.option-wrap').hide();
}
function confirmWeixinQrcode()
{
	$('#OrderPaymentType').val(10);
	$('#OrderPaymentBank').val("");
	$('.option-wrap').hide();
}