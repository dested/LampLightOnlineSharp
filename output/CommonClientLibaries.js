////////////////////////////////////////////////////////////////////////////////
// CommonClientLibaries.CanvasInformation
var $CommonClientLibaries_CanvasInformation = function(context, domCanvas) {
	this.context = null;
	this.domCanvas = null;
	this.canvas = null;
	this.context = context;
	this.domCanvas = domCanvas;
	this.canvas = domCanvas[0];
};
$CommonClientLibaries_CanvasInformation.get_blackPixel = function() {
	if (ss.isNullOrUndefined($CommonClientLibaries_CanvasInformation.$blackPixel)) {
		var m = $CommonClientLibaries_CanvasInformation.create(0, 0);
		m.context.fillStyle = 'black';
		m.context.fillRect(0, 0, 1, 1);
		$CommonClientLibaries_CanvasInformation.$blackPixel = m.canvas;
	}
	return $CommonClientLibaries_CanvasInformation.$blackPixel;
};
$CommonClientLibaries_CanvasInformation.create = function(w, h) {
	var canvas = document.createElement('canvas');
	return $CommonClientLibaries_CanvasInformation.create$1(canvas, w, h);
};
$CommonClientLibaries_CanvasInformation.create$1 = function(canvas, w, h) {
	if (w === 0) {
		w = 1;
	}
	if (h === 0) {
		h = 1;
	}
	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext('2d');
	return new $CommonClientLibaries_CanvasInformation(ctx, $(canvas));
};
Type.registerClass(global, 'CommonClientLibaries.CanvasInformation', $CommonClientLibaries_CanvasInformation, Object);
$CommonClientLibaries_CanvasInformation.$blackPixel = null;
