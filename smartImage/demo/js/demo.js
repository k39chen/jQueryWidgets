/**
 * demo.js
 *
 * @author Kevin Chen <k39chen@gmail.com>
 * @copyright 20[date], Kevin Chen, All rights reserved.
 */
$(document).ready(function(){

	// initialize the code editor
	initEditor();

});

/**
 * Creates, initializes, and configures the CodeMirror editor.
 *
 * @method initEditor
 */
function initEditor() {
	var delay;
	var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
		lineNumbers: true,
		styleActiveLine: true,
		matchBrackets: true,
		theme: "monokai",
		mode: "text/html",
		tabMode: "indent",
		smartIndex: false,
		indentWithTabs: true,
		indentUnit: 4,
		viewportMargin: Infinity
	});
	
	editor.on("change", function() {
		clearTimeout(delay);
		delay = setTimeout(updatePreview, 300);
	});
	
	function updatePreview() {
		var previewFrame = document.getElementById('preview');
		previewFrame.innerHTML = editor.getValue();
	}

	setTimeout(updatePreview, 300);
}