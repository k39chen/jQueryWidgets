/**
 * jquery.smartImage.js
 *
 * @author Kevin Chen <k39chen@gmail.com>
 * @copyright 2013, Kevin Chen, All rights reserviced.
 */
$.widget("jQuery.smartImage", {
	options: {
		width: "auto",
		height: "auto",
		vTop: null,
		vBottom: null,
		vCenter: "0px",
		hLeft: null,
		hRight: null,
		hCenter: "0px",
		imgSrc: null,
		loadingGif: "assets/loading.gif",
		defaultImg: "assets/default.png"
	},
	_create: function(){
		var self = this,
			elem = self.element;
		
		// assign the source img URL
		if (self.options.imgSrc == null) {
			self.options.imgSrc = elem.attr("src");
		}	
		
		var targetDimensions = self._getTargetDimensions();
		var targetWidth = targetDimensions.width;
		var targetHeight = targetDimensions.height;
		
		// create the wrapper (this will act as a cropper)
		var wrapper = $("<div>")
			.addClass("smartImage-wrapper")
			.css({
				overflow: "hidden",
				width: targetWidth,
				height: targetHeight,
				position: "relative"
			});
		
		elem.after(wrapper);
		
		elem.addClass("smartImage")
			.css({position:"absolute"})
			.attr("src", self.options.imgSrc);
		
		var fallback = $("<img src='" + self.options.defaultImg + "' />")
			.addClass("smartImage-fallback")
			.css({position:"absolute"})
			.hide()
			.load(function(){
				$(this).css({
					top: (targetHeight - $(this).height())/2, 
					left: (targetWidth - $(this).width())/2
				});
			});
		var loading = $("<img src='" + self.options.loadingGif + "' />")
			.addClass("smartImage-loading")
			.css({position:"absolute"})
			.show()
			.load(function(){
				$(this).css({
					top: (targetHeight - $(this).height())/2, 
					left: (targetWidth - $(this).width())/2
				});
			});
		
		// remember all the components
		elem.data("components",{fallback:fallback,loading:loading});
		
		// add all the elements to the wrapper
		wrapper.append(elem,fallback,loading);
		
		self._processImage();
	},
	_processImage: function() {
		var self = this,
			elem = self.element;

		var targetDimensions = self._getTargetDimensions();
		var targetWidth = targetDimensions.width;
		var targetHeight = targetDimensions.height;

		elem.hide()
			.load(function(){
				// if we have successfully loaded the image, then we will try to resize
				// according to the specifications provided
				var goodFit = self._getGoodFitDimensions();
				
				// apply the good fit dimensions
				$(this).width(goodFit.width);
				$(this).height(goodFit.height);
				
				// set vertical crop position
				if (self.options.vTop != null) {
					$(this).css({top:self.options.vTop});
				} else if (self.options.vBottom != null) {
					$(this).css({bottom:self.options.vBottom});
				} else if (self.options.vCenter != null) {
					$(this).css({top:-(goodFit.height-targetHeight)/2 + parseInt(self.options.vCenter)});
				} else {
					$(this).css({top:-(goodFit.height-targetHeight)/2});
				}
				// set horizontal crop position
				if (self.options.hLeft != null) {
					$(this).css({left:self.options.hLeft});
				} else if (self.options.hRight != null) {
					$(this).css({right:self.options.hRight});
				} else if (self.options.hCenter != null) {
					$(this).css({left:-(goodFit.width-targetWidth)/2 + parseInt(self.options.hCenter)}); 
				} else {
					$(this).css({left:-(goodFit.width-targetWidth)/2});
				}
				$(this).show();
				$(this).data("components").loading.hide();
			})
			.error(function(){
				// there was a problem loading the imagem we will use a fallback picture
				$(this).hide();
				$(this).data("components").fallback.show();
				$(this).data("components").loading.hide();
			});
	
	},
	_getTargetDimensions: function() {
		// declare the source dimensions
		var width = this.element.width();
		var height = this.element.height();
		
		// determine the target dimensions
		var targetWidth = this.options.width;
		var targetHeight = this.options.height;
		
		// see if we need to handle "auto" dimensions
		if (targetWidth == "auto" && targetHeight == "auto") {
			return { width: width, height: height };
		} else if (targetWidth == "auto") {
			return { width: width * targetHeight / height, height: targetHeight };
		} else if (targetHeight == "auto") {
			return { width: targetWidth, height: height * targetWidth / width };
		}
		return { width: targetWidth, height: targetHeight };
	},
	_getGoodFitDimensions: function() {
		
		// declare the source dimensions
		var width = this.element.width();
		var height = this.element.height();
		
		var targetDimensions = this._getTargetDimensions();
		var targetWidth = targetDimensions.width;
		var targetHeight = targetDimensions.height;
		
		// store the source dimensions
		var srcWidth = width;
		var srcHeight = height;
		var scale = 1.0;
		
		// first, try scaling down the width first and see if there is any vertical remainder
		scale = targetWidth / srcWidth;
		width = srcWidth * scale;
		height = srcHeight * scale;
		
		// if its the case that there is exposed vertical space, then we will attempt to scale
		// the height instead
		if (height < targetHeight) {
			scale = targetHeight / srcHeight;
			width = srcWidth * scale;
			height = srcHeight * scale;
		}
		
		return {width: width, height: height};
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
		components.fallback.remove();
		components.loading.remove();
		elem.data("components",null);
			
		elem.removeClass("smartImage");
		elem.css({position:"relative"});
		elem.unwrap();
	}
});