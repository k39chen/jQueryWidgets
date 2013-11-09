/**
 * jquery.[name].js
 *
 * @author Kevin Chen <k39chen@gmail.com>
 * @copyright 20[date], Kevin Chen, All rights reserviced.
 */
$.widget("jQuery.[name]", {
	options: {
		// ...
	},
	_create: function(){
		var self = this,
			el = self.element;
		
		el.addClass("[class-name]");
		
		// ...
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
			el = self.element;
			
		el.removeClass("[class-name]");
		
		// ...
	}
});