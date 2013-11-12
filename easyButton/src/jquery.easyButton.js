/**
 * jquery.easyButton.js
 *
 * @requires jquery
 * @requires jquery.ui.widget
 * @author Kevin Chen <k39chen@gmail.com>
 * @copyright 2013, Kevin Chen, All rights reserved.
 */
$.widget("jQuery.easyButton", {
	options: {
	},
	_create: function(){
		var self = this,
			elem = self.element;
		
		elem.addClass("easyButton")
			.css({
				position: "relative",
				cursor: "pointer",
				display: "inline-block",
				textAlign: "center",
				borderRadius: 5,
				userSelect: "none"
			});

		elem.wrapInner("<div class='easyButton-label'></div>");

		$(".easyButton-label", elem).css({
			margin: "12px 20px"
		});

		var mask = $("<div>").addClass("easyButton-mask")
			.css({
				borderRadius: 5,
				width: elem.width(), 
				height: elem.height(),
				position: "absolute",
				top: 0,
				left: 0
			})
			.appendTo(elem);

		// register all widget components
		elem.data("components", {mask:mask});

		// handle button states
		elem.mouseover(function(){ $(this).addClass("hover"); self._updateState(); })
			.mouseout(function(){ $(this).removeClass("hover"); $(this).removeClass("active"); self._updateState(); })
			.mousedown(function(){ $(this).addClass("active"); self._updateState(); })
			.mouseup(function(){ $(this).removeClass("active"); self._updateState(); });
	},
	_updateState: function(){
		var isHover = this.element.hasClass("hover");
		var isActive = this.element.hasClass("active");
		var mask = this.element.data("components").mask;

		if (isActive) {
			mask.show().css({ background: "black", opacity: 0.0 }).stop().animate({opacity:0.2},100);
		} else if (isHover) {
			mask.show().css({ background: "white", opacity: 0.0 }).stop().animate({opacity:0.2},100);
		} else {
			mask.hide();
		}
	},
	_setOptions: function(){
		this._superApply(arguments);
		this._create();
	},
	_setOption: function(key, value) {
		this._super(key, value);
	},
	_destroy: function() {
		var self = this,
			elem = self.element;
		
		var components = elem.data("components");
		components.mask.remove();
		elem.data("components",null);

		elem.removeClass("easyButton");
		elem.unbind("mouseover");
		elem.unbind("mouseout");
		elem.unbind("mousedown");
		elem.unbind("mouseup");

		$(".easyButton-label", elem).unwrap();
	}
});