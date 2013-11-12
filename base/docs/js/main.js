/**
 * @requires jquery
 * @requires jquery.ui.effect
 * @requires jquery.easyHover
 * @author Kevin Chen <k39chen@gmail.com>
 * @copyright 2013 Kevin Chen, All rights reserved.
 */
$(document).ready(function(){


	$(".nav-item a").easyHover({
		start: {color: "#aaa"},
		end: {color: "#fff"}
	}).click(function(){
		var anchor = $( $(this).attr("href") );
		$("html,body").stop().animate({scrollTop:anchor.offset().top},300);
	});

	$("#download-btn").easyButton();

	$("#demo-1").smartImage({ width: 300, height: 250, hCenter: -32 });
	$("#demo-2").smartImage({ width: 400, height: 400, hLeft: 0 });
	$("#demo-3").smartImage({ width: 200, height: 200, hRight: -30 });

});