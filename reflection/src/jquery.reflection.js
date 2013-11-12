/**
 * jquery.reflection.js
 *
 * @requires jquery
 * @requires jquery.ui.widget
 * @requires jquery.parseColor
 * @author Kevin Chen <k39chen@gmail.com>
 * @copyright 2013, Kevin Chen, All rights reserved.
 */
$.widget("jQuery.reflection", {
	options: {
		backgroundColor: "#000",
		length: 0.5,
		start: 0.3,
		end: 0
	},
	_create: function(){
		var self = this,
			elem = self.element;
		
		// create the wrapper (this will contain the source element and the reflection)
		var wrapper = $("<div>")
			.addClass("reflection-wrapper")
			.css({position: "relative"});

		elem.addClass("reflection-source").after(wrapper);

		var reflection = elem.clone()
			.addClass("reflection-clone")
			.css({
				transform: "scale(1,-1)"
			});
		var mask = $("<div>")
			.addClass("reflection-mask")
			.css({
				width: elem.width(),
				height: elem.height(),
				background: "-webkit-gradient(" + 
					["linear", "left top", "left bottom",
					 "color-stop(0.0,rgba("+self._getRGB()+","+(1-self.options.start)+"))",
					 "color-stop("+self.options.length+",rgba("+self._getRGB()+","+(1-self.options.end)+"))"],
				position: "absolute",
				top: elem.height()
			});

		// remember all the components
		elem.data("components",{reflection:reflection,mask:mask});

		wrapper.append(elem,reflection,mask);
	},
	_getRGB: function() {
		return $.parseColor(this.options.backgroundColor);
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
		components.reflection.remove();
		components.mask.remove();
		elem.data("components",null);
			
		elem.removeClass("reflection-source");
		elem.unwrap();
	}
});