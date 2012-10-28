////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.CanvasInformation
var $CommonClientLibraries_CanvasInformation = function(context, domCanvas) {
	this.context = null;
	this.domCanvas = null;
	this.canvas = null;
	this.context = context;
	this.domCanvas = domCanvas;
	this.canvas = domCanvas[0];
};
$CommonClientLibraries_CanvasInformation.get_blackPixel = function() {
	if (ss.isNullOrUndefined($CommonClientLibraries_CanvasInformation.$blackPixel)) {
		var m = $CommonClientLibraries_CanvasInformation.create(0, 0);
		m.context.fillStyle = 'black';
		m.context.fillRect(0, 0, 1, 1);
		$CommonClientLibraries_CanvasInformation.$blackPixel = m.canvas;
	}
	return $CommonClientLibraries_CanvasInformation.$blackPixel;
};
$CommonClientLibraries_CanvasInformation.create = function(w, h) {
	var canvas = document.createElement('canvas');
	return $CommonClientLibraries_CanvasInformation.create$1(canvas, w, h);
};
$CommonClientLibraries_CanvasInformation.create$1 = function(canvas, w, h) {
	if (w === 0) {
		w = 1;
	}
	if (h === 0) {
		h = 1;
	}
	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext('2d');
	return new $CommonClientLibraries_CanvasInformation(ctx, $(canvas));
};
Type.registerClass(global, 'CommonClientLibraries.CanvasInformation', $CommonClientLibraries_CanvasInformation, Object);
$CommonClientLibraries_CanvasInformation.$blackPixel = null;
