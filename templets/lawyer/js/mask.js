jQuery.fn.maskHeight = function () {
	this.css("height", $(window).height()+"px");
	return this;
}
function clearMask(maskInfo) {
	$(".mask").toggle();
	$(document.body).css({
		"overflow-x":"hidden",
		"overflow-y":"auto"
	});
	$("."+maskInfo).unwrap();
	$(".maskBlack").remove();
	$("."+maskInfo).hide();
}
function mask(maskInfo){
	$("."+maskInfo).show();
	$("."+maskInfo).wrap("<div class=\"mask\"></div>");
	$(".mask").append("<div class=\"maskBlack\"></div>");
	$("."+maskInfo).append("<div class=\"maskClose\"></div>");
	$(".mask").maskHeight();
	$(document.body).css({
		"overflow-x":"hidden",
		"overflow-y":"hidden"
	});
	$('.maskBlack,.maskClose').click(function(){
		clearMask(maskInfo);
	})
	$("."+maskInfo).addClass('maskWhite');
}
