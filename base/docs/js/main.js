/**
 * @requires jquery
 * @requires jquery.ui.effect
 * @requires jquery.easyHover
 * @author Kevin Chen <k39chen@gmail.com>
 * @copyright 2013 Kevin Chen, All rights reserved.
 */
$(document).ready(function(){


	$(".nav-link").easyHover({
		start: {color: "#bbb"},
		end: {color: "#fff"}
	}).click(function(){
		var anchor = $( $(this).attr("dest") );
		$("html,body").stop().animate({scrollTop:anchor.offset().top},700);
	});

	$("#download-btn").easyButton();

	$(".browser").each(function(){
		$(this).easyHover({
			start: {opacity: ($(this).hasClass("supported")) ? 0.8 : 0.1},
			end: {opacity: ($(this).hasClass("supported")) ? 1.0 : 0.2}
		});
	});

	$("#demo-1").smartImage({ width: 300, height: 250, hCenter: -32 });
	$("#demo-2").smartImage({ width: 400, height: 400, hLeft: 0 });
	$("#demo-3").smartImage({ width: 200, height: 200, hRight: -30 });

});