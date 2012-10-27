////////////////////////////////////////////////////////////////////////////////
// CommonWebLibraries.CanvasInformation
var $CommonWebLibraries_CanvasInformation = function(context, domCanvas) {
	this.context = null;
	this.domCanvas = null;
	this.canvas = null;
	this.context = context;
	this.domCanvas = domCanvas;
	this.canvas = domCanvas[0];
};
$CommonWebLibraries_CanvasInformation.get_blackPixel = function() {
	if (ss.isNullOrUndefined($CommonWebLibraries_CanvasInformation.$blackPixel)) {
		var m = $CommonWebLibraries_CanvasInformation.create(0, 0);
		m.context.fillStyle = 'black';
		m.context.fillRect(0, 0, 1, 1);
		$CommonWebLibraries_CanvasInformation.$blackPixel = m.canvas;
	}
	return $CommonWebLibraries_CanvasInformation.$blackPixel;
};
$CommonWebLibraries_CanvasInformation.create = function(w, h) {
	var canvas = document.createElement('canvas');
	return $CommonWebLibraries_CanvasInformation.create$1(canvas, w, h);
};
$CommonWebLibraries_CanvasInformation.create$1 = function(canvas, w, h) {
	if (w === 0) {
		w = 1;
	}
	if (h === 0) {
		h = 1;
	}
	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext('2d');
	return new $CommonWebLibraries_CanvasInformation(ctx, $(canvas));
};
Type.registerClass(global, 'CommonWebLibraries.CanvasInformation', $CommonWebLibraries_CanvasInformation, Object);
$CommonWebLibraries_CanvasInformation.$blackPixel = null;
