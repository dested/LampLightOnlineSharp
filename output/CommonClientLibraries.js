////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.CanvasInformation
var $CommonClientLibraries_CanvasInformation = function(context, domCanvas) {
	this.context = null;
	this.domCanvas = null;
	this.canvas = null;
	this.image = null;
	this.imageReady = false;
	this.context = context;
	this.domCanvas = domCanvas;
	this.canvas = domCanvas[0];
};
$CommonClientLibraries_CanvasInformation.prototype = {
	ready: function() {
		return;
		var image = new Image();
		image.addEventListener('load', Function.mkdel(this, function(e) {
			this.image = image;
			this.imageReady = true;
		}), false);
		image.src = Type.cast(this.canvas.toDataURL(), String);
	}
};
$CommonClientLibraries_CanvasInformation.get_blackPixel = function() {
	if (ss.isNullOrUndefined($CommonClientLibraries_CanvasInformation.$blackPixel)) {
		var m = $CommonClientLibraries_CanvasInformation.create$2(0, 0);
		m.context.fillStyle = 'black';
		m.context.fillRect(0, 0, 1, 1);
		$CommonClientLibraries_CanvasInformation.$blackPixel = m.canvas;
	}
	return $CommonClientLibraries_CanvasInformation.$blackPixel;
};
$CommonClientLibraries_CanvasInformation.create$2 = function(w, h) {
	var canvas = document.createElement('canvas');
	return $CommonClientLibraries_CanvasInformation.create$3(canvas, w, h);
};
$CommonClientLibraries_CanvasInformation.create$3 = function(canvas, w, h) {
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
$CommonClientLibraries_CanvasInformation.create = function(tileImage) {
	var item = $CommonClientLibraries_CanvasInformation.create$2(tileImage.width, tileImage.height);
	item.context.drawImage(tileImage, 0, 0);
	return item;
};
$CommonClientLibraries_CanvasInformation.create$1 = function(imageData) {
	var item = $CommonClientLibraries_CanvasInformation.create$2(imageData.width, imageData.height);
	item.context.putImageData(imageData, 0, 0);
	return item;
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.Button
var $CommonClientLibraries_UIManager_Button = function(x, y, width, height, text) {
	this.font = null;
	this.toggle = false;
	this.toggled = false;
	this.clicking = false;
	this.button2Grad = null;
	this.button1Grad = null;
	this.buttonBorderGrad = null;
	this.text = null;
	this.color = null;
	$CommonClientLibraries_UIManager_Element.call(this, x, y);
	this.text = text;
	this.toggle = false;
	this.toggled = false;
	this.font = $CommonClientLibraries_UIManager_UIManager.buttonFont;
	this.clicking = false;
	this.button1Grad = null;
	this.button2Grad = null;
	this.buttonBorderGrad = null;
	this.width = width;
	this.height = height;
};
$CommonClientLibraries_UIManager_Button.prototype = {
	construct: function() {
		$CommonClientLibraries_UIManager_Element.prototype.construct.call(this);
		var canv = $CommonClientLibraries_CanvasInformation.create$2(1, 1).context;
		this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);
		this.button1Grad.addColorStop(0, '#FFFFFF');
		this.button1Grad.addColorStop(1, '#A5A5A5');
		this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
		this.button2Grad.addColorStop(0, '#A5A5A5');
		this.button2Grad.addColorStop(1, '#FFFFFF');
		this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
		this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
		this.buttonBorderGrad.addColorStop(1, '#7a7a7a');
	},
	onClick: function(e) {
		if (!this.visible) {
			return false;
		}
		this.clicking = true;
		if (this.toggle) {
			this.toggled = !this.toggled;
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onClick.call(this, e);
	},
	onMouseUp: function(e) {
		if (!this.visible) {
			return false;
		}
		if (this.clicking) {
			if (ss.isValue(this.click)) {
				this.click(CommonLibraries.Point.$ctor1(e.x, e.y));
			}
		}
		this.clicking = false;
		if (ss.isValue(this.mouseUp)) {
			this.mouseUp(CommonLibraries.Point.$ctor1(e.x, e.y));
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseUp.call(this, e);
	},
	onMouseOver: function(e) {
		if (!this.visible) {
			return false;
		}
		if (ss.isValue(this.mouseOver)) {
			this.mouseOver(CommonLibraries.Point.$ctor1(e.x, e.y));
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseOver.call(this, e);
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		canv.save();
		canv.strokeStyle = this.buttonBorderGrad;
		if (this.toggle) {
			canv.fillStyle = (this.toggled ? this.button1Grad : this.button2Grad);
		}
		else {
			canv.fillStyle = (this.clicking ? this.button1Grad : this.button2Grad);
		}
		canv.lineWidth = 2;
		$CommonClientLibraries_UIManager_CHelp.roundRect(canv, this.get_totalX(), this.get_totalY(), this.width, this.height, 2, true, true);
		if (!ss.referenceEquals(canv.font, this.font)) {
			canv.font = this.font;
		}
		canv.fillStyle = '#000000';
		var txt = Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit(this.text);
		canv.fillText(txt, this.get_totalX() + (ss.Int32.div(this.width, 2) - canv.measureText(txt).width / 2), this.get_totalY() + ss.Int32.div(this.height, 3) * 2);
		canv.restore();
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.Button
var $CommonClientLibraries_UIManager_Button$1 = function(T) {
	var $type = function(data, x, y, width, height, text) {
		this.data = T.getDefaultValue();
		$CommonClientLibraries_UIManager_Button.call(this, x, y, width, height, text);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $CommonClientLibraries_UIManager_Button$1, [T], function() {
		return $CommonClientLibraries_UIManager_Button;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'CommonClientLibraries.UIManager.Button$1', $CommonClientLibraries_UIManager_Button$1, 1);
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.CHelp
var $CommonClientLibraries_UIManager_CHelp = function() {
};
$CommonClientLibraries_UIManager_CHelp.roundRect = function(ctx, x, y, width, height, radius, fill, stroke) {
	ctx.save();
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width, y);
	//ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height);
	// ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x, y + height);
	// ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
	if (stroke) {
		ctx.stroke();
	}
	if (fill) {
		ctx.fill();
	}
	ctx.restore();
};
$CommonClientLibraries_UIManager_CHelp.getCursorPosition = function(ev) {
	if (!!(ev.originalEvent && ev.originalEvent.targetTouches && ev.originalEvent.targetTouches.length > 0)) {
		ev = ev.originalEvent.targetTouches[0];
	}
	if (!!(ss.isValue(ev.pageX) && ss.isValue(ev.pageY))) {
		return $CommonClientLibraries_UIManager_Pointer.$ctor1(ev.pageX, ev.pageY, 0, ev.which === 3);
	}
	//if (ev.x != null && ev.y != null) return new { x: ev.x, y: ev.y };
	return $CommonClientLibraries_UIManager_Pointer.$ctor1(ev.clientX, ev.clientY, 0, ev.which === 3);
};
$CommonClientLibraries_UIManager_CHelp.loadImageFromUrl = function(tileMapFile, loaded) {
	var element = new Image();
	element.addEventListener('load', function(e) {
		loaded(element);
	}, false);
	element.src = tileMapFile;
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.EditorEngine
var $CommonClientLibraries_UIManager_EditorEngine = function(el) {
	this.$points = null;
	this.editing = false;
	this.element = null;
	this.dragging = false;
	this.startDragging = null;
	this.dragg = null;
	this.element = el;
	this.$points = [$CommonClientLibraries_UIManager_EditorEnginePoint.$ctor(0, 0, 10, 'nw-resize', Function.mkdel(this, function(dv) {
		var x = dv.x;
		var y = dv.y;
		this.element.width += x;
		this.element.height += y;
		this.element.x -= x;
		this.element.y -= y;
		this.element.clearCache();
	})), $CommonClientLibraries_UIManager_EditorEnginePoint.$ctor(100, 0, 10, 'ne-resize', Function.mkdel(this, function(dv1) {
		var x1 = dv1.x;
		var y1 = dv1.y;
		this.element.width -= x1;
		this.element.height += y1;
		this.element.y -= y1;
		this.element.clearCache();
		dv1.x = 0;
	})), $CommonClientLibraries_UIManager_EditorEnginePoint.$ctor(100, 100, 10, 'se-resize', Function.mkdel(this, function(dv2) {
		var x2 = dv2.x;
		var y2 = dv2.y;
		this.element.width -= x2;
		this.element.height -= y2;
		this.element.clearCache();
		dv2.x = dv2.y = 0;
	})), $CommonClientLibraries_UIManager_EditorEnginePoint.$ctor(0, 100, 10, 'sw-resize', Function.mkdel(this, function(dv3) {
		var x3 = dv3.x;
		var y3 = dv3.y;
		this.element.width += x3;
		this.element.height -= y3;
		this.element.x -= x3;
		this.element.clearCache();
		dv3.y = 0;
	})), $CommonClientLibraries_UIManager_EditorEnginePoint.$ctor(50, 0, 5, 'n-resize', Function.mkdel(this, function(dv4) {
		var x4 = dv4.x;
		var y4 = dv4.y;
		this.element.height += y4;
		this.element.y -= x4;
		this.element.clearCache();
	})), $CommonClientLibraries_UIManager_EditorEnginePoint.$ctor(100, 50, 5, 'e-resize', Function.mkdel(this, function(dv5) {
		var x5 = dv5.x;
		var y5 = dv5.y;
		this.element.width -= y5;
		this.element.clearCache();
		dv5.x = dv5.y = 0;
	})), $CommonClientLibraries_UIManager_EditorEnginePoint.$ctor(50, 100, 5, 'n-resize', Function.mkdel(this, function(dv6) {
		var x6 = dv6.x;
		var y6 = dv6.y;
		this.element.height -= y6;
		this.element.clearCache();
		dv6.x = dv6.y = 0;
	})), $CommonClientLibraries_UIManager_EditorEnginePoint.$ctor(0, 50, 5, 'e-resize', Function.mkdel(this, function(dv7) {
		var x7 = dv7.x;
		var y7 = dv7.y;
		this.element.width += x7;
		this.element.x -= x7;
		this.element.clearCache();
	}))];
};
$CommonClientLibraries_UIManager_EditorEngine.prototype = {
	click: function(e) {
		var x = 0;
		var y = 0;
		var w = this.element.width;
		var h = this.element.height;
		//uiManager.propertyList.populate(this.Element);
		for (var $t1 = 0; $t1 < this.$points.length; $t1++) {
			var j = this.$points[$t1];
			j.editing = false;
		}
		for (var $t2 = 0; $t2 < this.$points.length; $t2++) {
			var j1 = this.$points[$t2];
			var sz = j1.size * 5;
			var rect = CommonLibraries.Rectangle.$ctor1(x + ss.Int32.div(w * j1.x, 100) - ss.Int32.div(sz, 2), y + ss.Int32.div(h * j1.y, 100) - ss.Int32.div(sz, 2), sz, sz);
			if (e.x > rect.x && e.x < rect.x + rect.width && e.y > rect.y && e.y < rect.y + rect.height) {
				document.body.style.cursor = j1.cursor;
				this.startDragging = CommonLibraries.Point.$ctor1(e.x, e.y);
				this.editing = true;
				j1.editing = true;
				return true;
			}
		}
		if (e.x > x && e.x < x + w && e.y > y && e.y < y + h) {
			this.dragg = CommonLibraries.Point.$ctor1(e.x, e.y);
			document.body.style.cursor = 'move';
			this.dragging = true;
			return false;
		}
		else {
			document.body.style.cursor = 'default';
		}
		return false;
	},
	mouseUp: function(e) {
		for (var $t1 = 0; $t1 < this.$points.length; $t1++) {
			var j = this.$points[$t1];
			j.editing = false;
		}
		this.editing = false;
		this.dragging = false;
		this.startDragging = null;
		this.dragg = null;
		return false;
	},
	mouseOver: function(e) {
		var x = 0;
		var y = 0;
		var w = this.element.width;
		var h = this.element.height;
		document.body.style.cursor = 'move';
		if (this.dragging) {
			//
			//                if (this.Element.ChildrenAreEditing())
			//
			//                {
			//
			//                return false;
			//
			//                }
			var jx = e.x - this.dragg.x;
			var jy = e.y - this.dragg.y;
			this.element.x += jx;
			this.element.y += jy;
			//   window.DEBUGLABELS[0] = "E: " + e.X + " " + e.Y;
			//   window.DEBUGLABELS[1] = "Dragg: " + this.dragg.X + " " + this.dragg.Y;
			//   window.DEBUGLABELS[2] = "Element: " + this.Element.X + " " + this.Element.Y;
			//   window.DEBUGLABELS[3] = "Offset: " + jx + " " + jy;
			//this.dragg.x += jx;
			//this.dragg.y += jy;
			return false;
		}
		for (var $t1 = 0; $t1 < this.$points.length; $t1++) {
			var j = this.$points[$t1];
			var sz = j.size * 5;
			if (j.editing) {
				document.body.style.cursor = j.cursor;
				var dv = CommonLibraries.Point.$ctor1(this.startDragging.x - e.x, this.startDragging.y - e.y);
				j.click(dv);
				this.startDragging = CommonLibraries.Point.$ctor1(e.x + dv.x, e.y + dv.y);
				return true;
			}
			var rect = CommonLibraries.Rectangle.$ctor1(x + ss.Int32.div(w * j.x, 100) - ss.Int32.div(sz, 2), y + ss.Int32.div(h * j.y, 100) - ss.Int32.div(sz, 2), sz, sz);
			if (e.x > rect.x && e.x < rect.x + rect.width && e.y > rect.y && e.y < rect.y + rect.height) {
				document.body.style.cursor = j.cursor;
				if (j.editing) {
					var dv1 = CommonLibraries.Point.$ctor1(this.startDragging.x - e.x, this.startDragging.y - e.y);
					j.click(dv1);
					this.startDragging = CommonLibraries.Point.$ctor1(e.x + dv1.x, e.y + dv1.y);
				}
				return true;
			}
		}
		this.startDragging = CommonLibraries.Point.$ctor1(e.x, e.y);
		return this.editing;
	},
	draw: function(canv) {
		canv.save();
		var size = 0;
		canv.strokeStyle = canv.fillStyle = 'white';
		canv.lineWidth = 3;
		canv.dashedRect(this.element.get_totalX() - size, this.element.get_totalY() - size, this.element.width + size * 2, this.element.height + size * 2, [2, 2]);
		//canv.strokeRect(this.element.totalX() - size, this.element.totalY() - size, this.element.width + size * 2, this.element.height + size * 2);
		var x = this.element.get_totalX();
		var y = this.element.get_totalY();
		var w = this.element.width;
		var h = this.element.height;
		for (var $t1 = 0; $t1 < this.$points.length; $t1++) {
			var j = this.$points[$t1];
			canv.fillRect(x + ss.Int32.div(w * j.x, 100) - ss.Int32.div(j.size, 2), y + ss.Int32.div(h * j.y, 100) - ss.Int32.div(j.size, 2), j.size, j.size);
		}
		canv.restore();
	},
	maxSize: function() {
		return 10;
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.EditorEnginePoint
var $CommonClientLibraries_UIManager_EditorEnginePoint = function() {
};
$CommonClientLibraries_UIManager_EditorEnginePoint.$ctor = function(x, y, size, cursor, click) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.size = 0;
	$this.cursor = null;
	$this.click = null;
	$this.editing = false;
	$this.x = x;
	$this.y = y;
	$this.size = size;
	$this.cursor = cursor;
	$this.click = click;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.Element
var $CommonClientLibraries_UIManager_Element = function(x, y) {
	this.$cachedForceRedrawing = $CommonClientLibraries_UIManager_Element$ForceRedrawing.$ctor();
	this.$myDepth = 0;
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.visible = false;
	this.cachedDrawing = null;
	this.click = null;
	this.mouseUp = null;
	this.mouseOver = null;
	this.editMode = false;
	this.editorEngine = null;
	this.parent = null;
	this.focused = false;
	this.x = x;
	this.y = y;
	this.editorEngine = new $CommonClientLibraries_UIManager_EditorEngine(this);
	this.visible = true;
	//
	//                        if (this.Construct) {
	//
	//                        this.Construct();
	//
	//                        }
};
$CommonClientLibraries_UIManager_Element.prototype = {
	get_depth: function() {
		return this.$myDepth;
	},
	set_depth: function(value) {
		this.$myDepth = value;
		if (Type.isInstanceOfType(this, $CommonClientLibraries_UIManager_UIArea)) {
			$CommonClientLibraries_UIManager_UIManager.instance.updateDepth();
		}
	},
	get_totalX: function() {
		return this.x + (ss.isValue(this.parent) ? this.parent.get_totalX() : 0);
	},
	get_totalY: function() {
		return this.y + (ss.isValue(this.parent) ? this.parent.get_totalY() : 0);
	},
	construct: function() {
	},
	isEditMode: function() {
		return this.editMode || ss.isValue(this.parent) && this.parent.isEditMode();
	},
	forceDrawing: function() {
		return this.$cachedForceRedrawing;
		//redraw=false,cache=false
	},
	onKeyDown: function(e) {
		return false;
	},
	focus: function(e) {
		this.focused = true;
	},
	loseFocus: function() {
		this.focused = false;
	},
	onClick: function(e) {
		if (this.isEditMode()) {
			if (this.editorEngine.click(e)) {
				return true;
			}
		}
		return false;
	},
	onMouseUp: function(e) {
		if (this.isEditMode()) {
			if (this.editorEngine.mouseUp(e)) {
				return true;
			}
		}
		return false;
	},
	onMouseOver: function(e) {
		if (this.isEditMode()) {
			if (this.editorEngine.mouseOver(e)) {
				return true;
			}
		}
		return false;
	},
	draw: function(canv) {
		if (this.isEditMode()) {
			this.editorEngine.draw(canv);
		}
	},
	clearCache: function() {
		this.cachedDrawing = null;
	},
	onScroll: function(e) {
		return false;
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.Element.ForceRedrawing
var $CommonClientLibraries_UIManager_Element$ForceRedrawing = function() {
};
$CommonClientLibraries_UIManager_Element$ForceRedrawing.createInstance = function() {
	return $CommonClientLibraries_UIManager_Element$ForceRedrawing.$ctor();
};
$CommonClientLibraries_UIManager_Element$ForceRedrawing.$ctor = function() {
	var $this = {};
	$this.redraw = false;
	$this.clearCache = false;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.HScrollBox
var $CommonClientLibraries_UIManager_HScrollBox = function(x, y, itemHeight, visibleItems, itemWidth) {
	this.itemWidth = 0;
	this.scrollWidth = 0;
	this.jWidth = 0;
	this.visibleItems = 0;
	this.itemHeight = 0;
	this.backColor = null;
	this.scrollOffset = 0;
	this.scrollPosition = 0;
	this.dragging = false;
	this.controls = null;
	this.scrolling = false;
	$CommonClientLibraries_UIManager_Element.call(this, x, y);
	this.itemWidth = itemWidth;
	this.scrollWidth = 14;
	this.jWidth = 5;
	this.visibleItems = visibleItems;
	this.itemHeight = itemHeight;
	this.controls = [];
};
$CommonClientLibraries_UIManager_HScrollBox.prototype = {
	construct: function() {
		this.width = this.visibleItems * (this.itemWidth + this.jWidth);
		this.height = this.itemHeight + this.scrollWidth;
		this.scrolling = false;
	},
	addControl: function(control) {
		control.parent = this;
		control.construct();
		this.controls.add(control);
		return control;
	},
	onClick: function(e) {
		if (!this.visible) {
			return false;
		}
		for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
			var control = this.controls[ij];
			if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				control.onClick(e);
				return true;
			}
		}
		if (e.y > this.itemHeight && e.y < this.itemHeight + this.scrollWidth) {
			var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;
			this.scrollOffset = ss.Int32.div(e.x, width) * (this.controls.length - this.visibleItems);
			this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);
		}
		this.dragging = true;
		return $CommonClientLibraries_UIManager_Element.prototype.onClick.call(this, e);
	},
	onMouseUp: function(e) {
		if (!this.visible) {
			return false;
		}
		this.dragging = false;
		for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
			var control = this.controls[ij];
			if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x + 2 && control.x + control.width + 2 > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				control.onMouseUp(e);
				return true;
			}
		}
		if (ss.isValue(this.mouseUp)) {
			this.mouseUp(CommonLibraries.Point.$ctor1(e.x, e.y));
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseUp.call(this, e);
	},
	onMouseOver: function(e) {
		if (!this.visible) {
			return false;
		}
		for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
			var control = this.controls[$t1];
			if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				control.onMouseOver(e);
				break;
			}
		}
		if (this.dragging && e.y > this.itemHeight && e.y < this.itemHeight + this.scrollWidth) {
			var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;
			this.scrollOffset = ss.Int32.trunc(e.x / width * (this.controls.length - this.visibleItems));
			this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);
		}
		if (ss.isValue(this.mouseOver)) {
			this.mouseOver(CommonLibraries.Point.$ctor1(e.x, e.y));
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseOver.call(this, e);
	},
	onScroll: function(e) {
		if (!this.visible) {
			return false;
		}
		if (e.wheelDelta > 0) {
			if (this.scrollOffset > 0) {
				this.scrollOffset--;
			}
		}
		else if (this.scrollOffset < this.controls.length - this.visibleItems) {
			this.scrollOffset++;
		}
		for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
			var control = this.controls[$t1];
			if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				return true;
			}
		}
		//if (this.scroll) this.scroll();
		return true;
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		canv.save();
		canv.fillStyle = this.backColor;
		var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;
		canv.fillStyle = this.backColor;
		canv.lineWidth = 1;
		canv.strokeStyle = '#333';
		$CommonClientLibraries_UIManager_CHelp.roundRect(canv, this.get_totalX(), this.get_totalY(), this.visibleItems * (this.itemWidth + this.jWidth) + 2, this.itemHeight + this.scrollWidth + 6, 3, true, true);
		canv.fillStyle = 'grey';
		canv.lineWidth = 1;
		canv.strokeStyle = '#444';
		canv.fillRect(this.get_totalX() + 2, this.get_totalY() + this.itemHeight + 6, this.visibleItems * (this.itemWidth + this.jWidth), this.scrollWidth);
		canv.fillStyle = 'FFDDFF';
		canv.lineWidth = 1;
		canv.strokeStyle = '#FFDDFF';
		this.scrollPosition = ss.Int32.div(width * this.scrollOffset, this.controls.length - this.visibleItems);
		canv.fillRect(this.get_totalX() + this.scrollPosition + 2, this.get_totalY() + this.itemHeight + 6, 5, this.scrollWidth - 2);
		var curX = 3;
		for (var i = this.scrollOffset; i < Math.min(this.controls.length, this.scrollOffset + this.visibleItems); i++) {
			this.controls[i].parent = this;
			this.controls[i].x = curX;
			this.controls[i].y = 2;
			this.controls[i].height = this.itemHeight;
			this.controls[i].width = this.itemWidth;
			curX += this.itemWidth + this.jWidth;
			this.controls[i].draw(canv);
		}
		canv.restore();
		$CommonClientLibraries_UIManager_Element.prototype.draw.call(this, canv);
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.HtmlBox
var $CommonClientLibraries_UIManager_HtmlBox = function(x, y) {
	this.$2$InitField = null;
	this.$2$UpdatePositionField = null;
	this.$2$_FocusField = null;
	this.$2$_HideField = null;
	$CommonClientLibraries_UIManager_Element.call(this, x, y);
};
$CommonClientLibraries_UIManager_HtmlBox.prototype = {
	get_init: function() {
		return this.$2$InitField;
	},
	set_init: function(value) {
		this.$2$InitField = value;
	},
	get_updatePosition: function() {
		return this.$2$UpdatePositionField;
	},
	set_updatePosition: function(value) {
		this.$2$UpdatePositionField = value;
	},
	get__Focus: function() {
		return this.$2$_FocusField;
	},
	set__Focus: function(value) {
		this.$2$_FocusField = value;
	},
	get__Hide: function() {
		return this.$2$_HideField;
	},
	set__Hide: function(value) {
		this.$2$_HideField = value;
	},
	construct: function() {
		this.get_init()();
		$CommonClientLibraries_UIManager_Element.prototype.construct.call(this);
	},
	focus: function(e) {
		this.get__Focus()();
		$CommonClientLibraries_UIManager_Element.prototype.focus.call(this, e);
	},
	loseFocus: function() {
		this.get__Hide()();
		$CommonClientLibraries_UIManager_Element.prototype.loseFocus.call(this);
	},
	onClick: function(e) {
		return false;
	},
	onMouseUp: function(e) {
		if (ss.isValue(this.mouseUp)) {
			this.mouseUp(CommonLibraries.Point.$ctor1(e.x, e.y));
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseUp.call(this, e);
	},
	onMouseOver: function(e) {
		if (ss.isValue(this.mouseOver)) {
			this.mouseOver(CommonLibraries.Point.$ctor1(e.x, e.y));
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseOver.call(this, e);
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		this.get_updatePosition()(this.get_totalX(), this.get_totalY());
		$CommonClientLibraries_UIManager_Element.prototype.draw.call(this, canv);
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.Image
var $CommonClientLibraries_UIManager_Image = function(x, y, width, height) {
	this.onDraw = null;
	$CommonClientLibraries_UIManager_Element.call(this, x, y);
	this.onDraw = null;
	this.width = width;
	this.height = height;
};
$CommonClientLibraries_UIManager_Image.prototype = {
	construct: function() {
		$CommonClientLibraries_UIManager_Element.prototype.construct.call(this);
	},
	onClick: function(e) {
		if (!this.visible) {
			return false;
		}
		debugger;
		if (ss.isValue(this.click)) {
			this.click(e);
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onClick.call(this, e);
	},
	onMouseUp: function(e) {
		if (!this.visible) {
			return false;
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseUp.call(this, e);
	},
	onMouseOver: function(e) {
		if (!this.visible) {
			return false;
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseOver.call(this, e);
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		canv.save();
		canv.lineWidth = 2;
		$CommonClientLibraries_UIManager_CHelp.roundRect(canv, this.get_totalX(), this.get_totalY(), this.width, this.height, 2, true, true);
		canv.fillStyle = '#000000';
		this.onDraw(canv, this.get_totalX(), this.get_totalY());
		canv.restore();
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.Image
var $CommonClientLibraries_UIManager_Image$1 = function(T) {
	var $type = function(data, x, y, width, height) {
		this.data = T.getDefaultValue();
		$CommonClientLibraries_UIManager_Image.call(this, x, y, width, height);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $CommonClientLibraries_UIManager_Image$1, [T], function() {
		return $CommonClientLibraries_UIManager_Image;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'CommonClientLibraries.UIManager.Image$1', $CommonClientLibraries_UIManager_Image$1, 1);
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.ImageButton
var $CommonClientLibraries_UIManager_ImageButton = function(x, y, width, height) {
	this.font = null;
	this.toggle = false;
	this.toggled = false;
	this.clicking = false;
	this.button2Grad = null;
	this.onDraw = null;
	this.button1Grad = null;
	this.buttonBorderGrad = null;
	this.text = null;
	this.color = null;
	$CommonClientLibraries_UIManager_Element.call(this, x, y);
	this.text = Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('');
	this.toggle = false;
	this.toggled = false;
	this.font = '';
	this.clicking = false;
	this.onDraw = null;
	this.button1Grad = null;
	this.button2Grad = null;
	this.buttonBorderGrad = null;
	this.width = width;
	this.height = height;
};
$CommonClientLibraries_UIManager_ImageButton.prototype = {
	construct: function() {
		$CommonClientLibraries_UIManager_Element.prototype.construct.call(this);
		var canv = $CommonClientLibraries_CanvasInformation.create$2(1, 1).context;
		this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);
		this.button1Grad.addColorStop(0, '#FFFFFF');
		this.button1Grad.addColorStop(1, '#A5A5A5');
		this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
		this.button2Grad.addColorStop(0, '#A5A5A5');
		this.button2Grad.addColorStop(1, '#FFFFFF');
		this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
		this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
		this.buttonBorderGrad.addColorStop(1, '#7a7a7a');
	},
	onClick: function(e) {
		if (!this.visible) {
			return false;
		}
		this.clicking = true;
		if (this.toggle) {
			this.toggled = !this.toggled;
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onClick.call(this, e);
	},
	onMouseUp: function(e) {
		if (!this.visible) {
			return false;
		}
		if (this.clicking) {
			if (ss.isValue(this.click)) {
				this.click(CommonLibraries.Point.$ctor1(e.x, e.y));
			}
		}
		this.clicking = false;
		if (ss.isValue(this.mouseUp)) {
			this.mouseUp(CommonLibraries.Point.$ctor1(e.x, e.y));
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseUp.call(this, e);
	},
	onMouseOver: function(e) {
		if (!this.visible) {
			return false;
		}
		if (ss.isValue(this.mouseOver)) {
			this.mouseOver(CommonLibraries.Point.$ctor1(e.x, e.y));
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseOver.call(this, e);
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		canv.save();
		canv.strokeStyle = this.buttonBorderGrad;
		if (this.toggle) {
			canv.fillStyle = (this.toggled ? this.button1Grad : this.button2Grad);
		}
		else {
			canv.fillStyle = (this.clicking ? this.button1Grad : this.button2Grad);
		}
		canv.lineWidth = 2;
		$CommonClientLibraries_UIManager_CHelp.roundRect(canv, this.get_totalX(), this.get_totalY(), this.width, this.height, 2, true, true);
		if (!ss.referenceEquals(canv.font, this.font)) {
			canv.font = this.font;
		}
		canv.fillStyle = '#000000';
		var txt = Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit(this.text);
		canv.save();
		this.onDraw(canv, this.get_totalX(), this.get_totalY());
		canv.restore();
		canv.fillText(txt, this.get_totalX() + (ss.Int32.div(this.width, 2) - canv.measureText(txt).width / 2), this.get_totalY() + this.height - 3);
		canv.restore();
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.ImageButton
var $CommonClientLibraries_UIManager_ImageButton$1 = function(T) {
	var $type = function(data, x, y, width, height) {
		this.data = T.getDefaultValue();
		$CommonClientLibraries_UIManager_ImageButton.call(this, x, y, width, height);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $CommonClientLibraries_UIManager_ImageButton$1, [T], function() {
		return $CommonClientLibraries_UIManager_ImageButton;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'CommonClientLibraries.UIManager.ImageButton$1', $CommonClientLibraries_UIManager_ImageButton$1, 1);
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.Panel
var $CommonClientLibraries_UIManager_Panel = function(x, y, width, height) {
	this.controls = null;
	this.outline = false;
	$CommonClientLibraries_UIManager_Element.call(this, x, y);
	this.outline = true;
	this.width = width;
	this.height = height;
	this.controls = [];
};
$CommonClientLibraries_UIManager_Panel.prototype = {
	clear: function() {
		this.controls.clear();
	},
	childrenAreEditing: function() {
		var ch = this.controls;
		for (var $t1 = 0; $t1 < ch.length; $t1++) {
			var t = ch[$t1];
			if (t.editorEngine.dragging || t.editorEngine.editing) {
				return true;
			}
			if (Type.isInstanceOfType(t, $CommonClientLibraries_UIManager_Panel) && Type.cast(t, $CommonClientLibraries_UIManager_Panel).childrenAreEditing()) {
				return true;
			}
		}
		return false;
	},
	focus: function(e) {
		var e2 = $CommonClientLibraries_UIManager_Pointer.$ctor1(0, 0, 0, false);
		var ch = this.controls;
		for (var $t1 = 0; $t1 < ch.length; $t1++) {
			var t = ch[$t1];
			if (t.visible && t.y <= e.y && t.y + t.height > e.y && t.x <= e.x && t.x + t.width > e.x) {
				e2.x = e.x - t.x;
				e2.y = e.y - t.y;
				t.focus(e2);
			}
		}
		$CommonClientLibraries_UIManager_Element.prototype.focus.call(this, e);
	},
	loseFocus: function() {
		var ch = this.controls;
		for (var $t1 = 0; $t1 < ch.length; $t1++) {
			var t = ch[$t1];
			t.loseFocus();
		}
		$CommonClientLibraries_UIManager_Element.prototype.loseFocus.call(this);
	},
	construct: function() {
		$CommonClientLibraries_UIManager_Element.prototype.construct.call(this);
		for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
			var element = this.controls[$t1];
			element.construct();
		}
	},
	onKeyDown: function(e) {
		$CommonClientLibraries_UIManager_Element.prototype.onKeyDown.call(this, e);
		if (!this.visible) {
			return false;
		}
		var ch = this.controls;
		for (var $t1 = 0; $t1 < ch.length; $t1++) {
			var t = ch[$t1];
			if (t.onKeyDown(e)) {
				return true;
			}
		}
		return false;
	},
	onClick: function(e) {
		var e2 = $CommonClientLibraries_UIManager_Pointer.$ctor1(0, 0, 0, false);
		if (!this.visible) {
			return false;
		}
		var clicked = false;
		var ch = this.controls;
		for (var $t1 = 0; $t1 < ch.length; $t1++) {
			var control = ch[$t1];
			if (control.visible && control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
				e2.x = e.x - control.x;
				e2.y = e.y - control.y;
				control.focus(e2);
				control.onClick(e2);
				clicked = true;
			}
			else {
				control.loseFocus();
			}
		}
		if (!clicked && !this.isEditMode() && Type.isInstanceOfType(this, $CommonClientLibraries_UIManager_UIArea)) {
			Type.cast(this, $CommonClientLibraries_UIManager_UIArea).dragging = CommonLibraries.Point.$ctor1(e.x, e.y);
		}
		return clicked;
	},
	onMouseOver: function(e) {
		if (!this.visible) {
			return false;
		}
		var dragging = null;
		var uiArea = Type.safeCast(this, $CommonClientLibraries_UIManager_UIArea);
		if (ss.isValue(uiArea)) {
			dragging = uiArea.dragging;
		}
		if (ss.isNullOrUndefined(dragging)) {
			for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
				var control = this.controls[$t1];
				if (control.visible && (control.editorEngine.editing || control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x)) {
					e.x -= control.x;
					e.y -= control.y;
					control.onMouseOver(e);
					return true;
				}
			}
			return true;
		}
		this.x += e.x - dragging.x;
		this.y += e.y - dragging.y;
		//this.onMove(); 
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseOver.call(this, e);
	},
	onMouseUp: function(e) {
		if (!this.visible) {
			return false;
		}
		for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
			var control = this.controls[$t1];
			control.onMouseUp($CommonClientLibraries_UIManager_Pointer.$ctor1(e.x - control.x, e.y - control.y, 0, false));
		}
		var uiArea = Type.safeCast(this, $CommonClientLibraries_UIManager_UIArea);
		if (ss.isValue(uiArea)) {
			uiArea.dragging = null;
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseUp.call(this, e);
	},
	onScroll: function(e) {
		if (!this.visible) {
			return false;
		}
		for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
			var control = this.controls[$t1];
			if (control.visible && (control.editorEngine.editing || control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x)) {
				e.x -= control.x;
				e.y -= control.y;
				return control.onScroll(e);
			}
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onScroll.call(this, e);
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		var _x = this.x;
		var _y = this.y;
		canv.save();
		if (this.outline) {
			var lingrad = canv.createLinearGradient(0, 0, 0, this.height);
			lingrad.addColorStop(0, 'rgba(220,220,220,0.85)');
			lingrad.addColorStop(1, 'rgba(142,142,142,0.85)');
			canv.fillStyle = lingrad;
			canv.strokeStyle = '#333';
			var rad = 5;
			$CommonClientLibraries_UIManager_CHelp.roundRect(canv, this.get_totalX(), this.get_totalY(), this.width, this.height, rad, true, true);
		}
		for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
			var t = this.controls[$t1];
			t.draw(canv);
		}
		this.x = _x;
		this.y = _y;
		canv.restore();
		$CommonClientLibraries_UIManager_Element.prototype.draw.call(this, canv);
	},
	addControl: function(T) {
		return function(element) {
			element.parent = this;
			element.construct();
			this.controls.add(element);
			return element;
		};
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.Panel
var $CommonClientLibraries_UIManager_Panel$1 = function(T) {
	var $type = function(data, x, y, width, height) {
		this.data = T.getDefaultValue();
		$CommonClientLibraries_UIManager_Panel.call(this, x, y, width, height);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $CommonClientLibraries_UIManager_Panel$1, [T], function() {
		return $CommonClientLibraries_UIManager_Panel;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'CommonClientLibraries.UIManager.Panel$1', $CommonClientLibraries_UIManager_Panel$1, 1);
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.Pointer
var $CommonClientLibraries_UIManager_Pointer = function() {
};
$CommonClientLibraries_UIManager_Pointer.clonePointer = function($this) {
	return $CommonClientLibraries_UIManager_Pointer.$ctor1($this.x, $this.y, $this.wheelDelta, $this.right);
};
$CommonClientLibraries_UIManager_Pointer.$ctor1 = function(x, y, delta, right) {
	var $this = CommonLibraries.Point.$ctor1(x, y);
	$this.wheelDelta = 0;
	$this.right = false;
	$this.wheelDelta = delta;
	$this.right = right;
	return $this;
};
$CommonClientLibraries_UIManager_Pointer.$ctor = function(x, y, pointer) {
	var $this = CommonLibraries.Point.$ctor1(x, y);
	$this.wheelDelta = 0;
	$this.right = false;
	$this.wheelDelta = pointer.wheelDelta;
	$this.right = pointer.right;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.PropertyButton
var $CommonClientLibraries_UIManager_PropertyButton = function(x, y) {
	$CommonClientLibraries_UIManager_Element.call(this, x, y);
};
$CommonClientLibraries_UIManager_PropertyButton.prototype = {
	construct: function() {
		$CommonClientLibraries_UIManager_Element.prototype.construct.call(this);
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.ScrollBox
var $CommonClientLibraries_UIManager_ScrollBox = function(x, y, itemHeight, visibleItems, itemWidth) {
	this.itemWidth = 0;
	this.scrollWidth = 0;
	this.jHeight = 0;
	this.visibleItems = 0;
	this.itemHeight = 0;
	this.backColor = null;
	this.scrollIndex = 0;
	this.scrollPosition = 0;
	this.dragging = false;
	this.controls = null;
	this.scrolling = false;
	$CommonClientLibraries_UIManager_Element.call(this, x, y);
	this.itemWidth = itemWidth;
	this.scrollWidth = 14;
	this.visibleItems = visibleItems;
	this.itemHeight = itemHeight;
	this.backColor = '';
	this.jHeight = 5;
	this.controls = [];
};
$CommonClientLibraries_UIManager_ScrollBox.prototype = {
	construct: function() {
		this.height = this.visibleItems * (this.itemHeight + this.jHeight);
		this.width = this.itemWidth + this.scrollWidth;
		this.scrolling = false;
	},
	addControl: function(T) {
		return function(control) {
			control.parent = this;
			control.construct();
			this.controls.add(control);
			return control;
		};
	},
	onClick: function(e) {
		if (!this.visible) {
			return false;
		}
		for (var ij = this.scrollIndex; ij < this.controls.length; ij++) {
			var control = this.controls[ij];
			if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				control.onClick(e);
				return true;
			}
		}
		if (e.x > this.itemWidth && e.x < this.itemWidth + this.scrollWidth) {
			var height = this.visibleItems * (this.itemHeight + this.jHeight) - 2;
			this.scrollIndex = ss.Int32.div(e.y, height) * (this.controls.length - this.visibleItems);
			this.scrollIndex = Math.min(Math.max(this.scrollIndex, 0), this.controls.length);
		}
		this.dragging = true;
		return $CommonClientLibraries_UIManager_Element.prototype.onClick.call(this, e);
	},
	onMouseUp: function(e) {
		if (!this.visible) {
			return false;
		}
		this.dragging = false;
		for (var ij = this.scrollIndex; ij < this.controls.length; ij++) {
			var control = this.controls[ij];
			if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x + 2 && control.x + control.width + 2 > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				control.onMouseUp(e);
				return true;
			}
		}
		if (ss.isValue(this.mouseUp)) {
			this.mouseUp(CommonLibraries.Point.$ctor1(e.x, e.y));
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseUp.call(this, e);
	},
	onMouseOver: function(e) {
		if (!this.visible) {
			return false;
		}
		for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
			var control = this.controls[$t1];
			if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				control.onMouseOver(e);
				break;
			}
		}
		if (this.dragging && e.x > this.itemWidth && e.x < this.itemWidth + this.scrollWidth) {
			var height = this.visibleItems * (this.itemHeight + this.jHeight) - 2;
			this.scrollIndex = ss.Int32.trunc(e.y / height * (this.controls.length - this.visibleItems));
			this.scrollIndex = Math.min(Math.max(this.scrollIndex, 0), this.controls.length);
		}
		if (ss.isValue(this.mouseOver)) {
			this.mouseOver(CommonLibraries.Point.$ctor1(e.x, e.y));
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseOver.call(this, e);
	},
	onScroll: function(e) {
		if (!this.visible) {
			return false;
		}
		if (e.wheelDelta > 0) {
			if (this.scrollIndex > 0) {
				this.scrollIndex--;
			}
		}
		else if (this.scrollIndex < this.controls.length - this.visibleItems) {
			this.scrollIndex++;
		}
		for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
			var control = this.controls[$t1];
			if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				return true;
			}
		}
		//if (this.scroll) this.scroll();
		return true;
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		canv.save();
		canv.fillStyle = this.backColor;
		var height = this.visibleItems * (this.itemHeight + this.jHeight) - 2;
		canv.fillStyle = this.backColor;
		canv.lineWidth = 1;
		canv.strokeStyle = '#333';
		$CommonClientLibraries_UIManager_CHelp.roundRect(canv, this.get_totalX(), this.get_totalY(), this.itemWidth + this.scrollWidth + 6, this.visibleItems * (this.itemHeight + this.jHeight), 3, true, true);
		canv.fillStyle = 'grey';
		canv.lineWidth = 1;
		canv.strokeStyle = '#444';
		canv.fillRect(this.get_totalX() + this.itemWidth + 2 + 2, this.get_totalY() + 2, this.scrollWidth, this.height);
		canv.fillStyle = 'FFDDFF';
		canv.lineWidth = 1;
		canv.strokeStyle = '#FFDDFF';
		this.scrollPosition = ss.Int32.div(height * this.scrollIndex, this.controls.length - this.visibleItems);
		canv.fillRect(this.get_totalX() + this.itemWidth + 2 + 2 + 2, this.get_totalY() + 2 + this.scrollPosition, this.scrollWidth - 2, 5);
		var curY = 3;
		for (var i = this.scrollIndex; i < Math.min(this.controls.length, this.scrollIndex + this.visibleItems); i++) {
			this.controls[i].parent = this;
			this.controls[i].x = 2;
			this.controls[i].y = curY;
			this.controls[i].height = this.itemHeight;
			this.controls[i].width = this.itemWidth;
			curY += this.itemHeight + this.jHeight;
			this.controls[i].draw(canv);
		}
		canv.restore();
		$CommonClientLibraries_UIManager_Element.prototype.draw.call(this, canv);
	},
	clearControls: function() {
		this.controls = [];
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.Table
var $CommonClientLibraries_UIManager_Table = function(x, y, width, height) {
	this.rows = null;
	$CommonClientLibraries_UIManager_Element.call(this, x, y);
	this.width = width;
	this.height = height;
	this.rows = [];
};
$CommonClientLibraries_UIManager_Table.prototype = {
	childrenAreEditing: function() {
		var ch = this.rows;
		for (var $t1 = 0; $t1 < ch.length; $t1++) {
			var t = ch[$t1];
			if (t.editorEngine.dragging || t.editorEngine.editing) {
				return true;
			}
			if (t.childrenAreEditing()) {
				return true;
			}
		}
		return false;
	},
	$buildSizeMap: function() {
		var spots = [];
		var totalWidth = { $: this.width };
		var totalHeight = { $: this.height };
		var lastRowRect = CommonLibraries.Rectangle.$ctor1(0, 0, 0, 0);
		var mainRow = this.rows[0];
		for (var $t1 = 0; $t1 < this.rows.length; $t1++) {
			var row = this.rows[$t1];
			var lastRowRectData = CommonLibraries.Extensions.withData(CommonLibraries.Rectangle, $CommonClientLibraries_UIManager_TableRow).call(null, this.$calculateRowSize(row, lastRowRect.y + lastRowRect.height, totalWidth, totalHeight), row);
			lastRowRect = Type.makeGenericType(CommonLibraries.ExtraData$2, [CommonLibraries.Rectangle, $CommonClientLibraries_UIManager_TableRow]).op_Implicit(lastRowRectData);
			var lastCellRect = CommonLibraries.Rectangle.$ctor1(0, lastRowRect.y, 0, 0);
			for (var $t2 = 0; $t2 < row.cells.length; $t2++) {
				var cell = row.cells[$t2];
				var lastCellRectData = CommonLibraries.Extensions.withData(CommonLibraries.Rectangle, $CommonClientLibraries_UIManager_TableCell).call(null, this.$calculateCellSize(cell, lastCellRect.x + lastCellRect.width, lastCellRect.y, totalWidth, totalHeight), cell);
				spots.add(lastCellRectData);
				lastCellRect = Type.makeGenericType(CommonLibraries.ExtraData$2, [CommonLibraries.Rectangle, $CommonClientLibraries_UIManager_TableCell]).op_Implicit(lastCellRectData);
			}
		}
		return spots;
	},
	$calculateRowSize: function(row, y, totalWidth, totalHeight) {
		var height;
		if (ss.isNullOrUndefined(CommonLibraries.SizeNumber.op_Implicit$1(row.get_rowHeight()))) {
			height = totalHeight.$ / row.get_table().rows.length;
		}
		else if (CommonLibraries.SizeNumber.op_Implicit$1(row.get_rowHeight()).endsWith('%')) {
			height = totalHeight.$ * CommonLibraries.SizeNumber.op_Implicit(row.get_rowHeight()) / 100;
		}
		else {
			if (CommonLibraries.SizeNumber.op_Implicit(row.get_rowHeight()) + y > totalHeight.$) {
				var resetHeight = ss.Int32.trunc(y + CommonLibraries.SizeNumber.op_Implicit(row.get_rowHeight()));
				totalHeight.$ = resetHeight;
			}
			height = CommonLibraries.SizeNumber.op_Implicit(row.get_rowHeight());
		}
		return CommonLibraries.Rectangle.$ctor1(0, y, totalWidth.$, ss.Int32.trunc(height));
	},
	$calculateCellSize: function(cell, x, y, totalWidth, totalHeight) {
		var width;
		var height;
		var lastCellAtThisIndex;
		var rowIndex = cell.get_row().get_table().rows.indexOf(cell.get_row());
		if (rowIndex === 0) {
			lastCellAtThisIndex = null;
		}
		else {
			lastCellAtThisIndex = cell.get_row().get_table().rows[rowIndex - 1].cells[cell.get_row().cells.indexOf(cell)];
		}
		if (ss.isNullOrUndefined(CommonLibraries.SizeNumber.op_Implicit$1(cell.cellWidth))) {
			width = (ss.isNullOrUndefined(lastCellAtThisIndex) ? (totalWidth.$ / cell.get_row().cells.length) : CommonLibraries.SizeNumber.op_Implicit(lastCellAtThisIndex.cellWidth));
		}
		else if (CommonLibraries.SizeNumber.op_Implicit$1(cell.cellWidth).endsWith('%')) {
			width = totalWidth.$ * CommonLibraries.SizeNumber.op_Implicit(cell.cellWidth) / 100;
		}
		else {
			if (CommonLibraries.SizeNumber.op_Implicit(cell.cellWidth) + x > totalWidth.$) {
				totalWidth.$ = ss.Int32.trunc(x + CommonLibraries.SizeNumber.op_Implicit(cell.cellWidth));
			}
			width = CommonLibraries.SizeNumber.op_Implicit(cell.cellWidth);
		}
		if (ss.isNullOrUndefined(CommonLibraries.SizeNumber.op_Implicit$1(cell.cellHeight))) {
			height = totalHeight.$;
		}
		else if (CommonLibraries.SizeNumber.op_Implicit$1(cell.cellHeight).endsWith('%')) {
			height = totalHeight.$ * CommonLibraries.SizeNumber.op_Implicit(cell.cellHeight) / 100;
		}
		else {
			if (CommonLibraries.SizeNumber.op_Implicit(cell.cellHeight) + y > totalHeight.$) {
				totalHeight.$ = ss.Int32.trunc(y + CommonLibraries.SizeNumber.op_Implicit(cell.cellHeight));
			}
			height = CommonLibraries.SizeNumber.op_Implicit(cell.cellHeight);
		}
		if (cell.fullSize) {
			for (var $t1 = 0; $t1 < cell.controls.length; $t1++) {
				var cnt = cell.controls[$t1];
				cnt.x = 0;
				cnt.y = 0;
				cnt.width = ss.Int32.trunc(width);
				cnt.height = ss.Int32.trunc(height);
			}
		}
		return CommonLibraries.Rectangle.$ctor1(x, y, ss.Int32.trunc(width), ss.Int32.trunc(height));
	},
	focus: function(e) {
		$CommonClientLibraries_UIManager_Element.prototype.focus.call(this, e);
	},
	loseFocus: function() {
		$CommonClientLibraries_UIManager_Element.prototype.loseFocus.call(this);
	},
	construct: function() {
		$CommonClientLibraries_UIManager_Element.prototype.construct.call(this);
	},
	onKeyDown: function(e) {
		return $CommonClientLibraries_UIManager_Element.prototype.onKeyDown.call(this, e);
	},
	onClick: function(e) {
		return $CommonClientLibraries_UIManager_Element.prototype.onClick.call(this, e);
	},
	onMouseOver: function(e) {
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseOver.call(this, e);
	},
	onMouseUp: function(e) {
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseUp.call(this, e);
	},
	onScroll: function(e) {
		return $CommonClientLibraries_UIManager_Element.prototype.onScroll.call(this, e);
	},
	draw: function(canv) {
		var fm = this.$buildSizeMap();
		for (var $t1 = 0; $t1 < fm.length; $t1++) {
			var extraData = fm[$t1];
			extraData.data.x = extraData.item.x;
			extraData.data.y = extraData.item.y;
			extraData.data.cellWidth = CommonLibraries.SizeNumber.op_Implicit$2(extraData.item.width);
			extraData.data.cellHeight = CommonLibraries.SizeNumber.op_Implicit$2(extraData.item.height);
			extraData.data.draw(canv);
		}
		$CommonClientLibraries_UIManager_Element.prototype.draw.call(this, canv);
	},
	addRow: function(element) {
		element.parent = this;
		element.construct();
		this.rows.add(element);
		return element;
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.Table
var $CommonClientLibraries_UIManager_Table$1 = function(T) {
	var $type = function(data, x, y, width, height) {
		this.data = T.getDefaultValue();
		$CommonClientLibraries_UIManager_Table.call(this, x, y, width, height);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $CommonClientLibraries_UIManager_Table$1, [T], function() {
		return $CommonClientLibraries_UIManager_Table;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'CommonClientLibraries.UIManager.Table$1', $CommonClientLibraries_UIManager_Table$1, 1);
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.TableCell
var $CommonClientLibraries_UIManager_TableCell = function() {
	this.cellHeight = null;
	this.cellWidth = null;
	this.fullSize = false;
	this.rowSpan = 0;
	this.colSpan = 0;
	$CommonClientLibraries_UIManager_Panel.call(this, 0, 0, 0, 0);
};
$CommonClientLibraries_UIManager_TableCell.prototype = {
	get_row: function() {
		return Type.cast(this.parent, $CommonClientLibraries_UIManager_TableRow);
	},
	focus: function(e) {
		$CommonClientLibraries_UIManager_Panel.prototype.focus.call(this, e);
	},
	loseFocus: function() {
		$CommonClientLibraries_UIManager_Panel.prototype.loseFocus.call(this);
	},
	construct: function() {
		$CommonClientLibraries_UIManager_Panel.prototype.construct.call(this);
	},
	onKeyDown: function(e) {
		return $CommonClientLibraries_UIManager_Panel.prototype.onKeyDown.call(this, e);
	},
	onClick: function(e) {
		return $CommonClientLibraries_UIManager_Panel.prototype.onClick.call(this, e);
	},
	onMouseOver: function(e) {
		return $CommonClientLibraries_UIManager_Panel.prototype.onMouseOver.call(this, e);
	},
	onMouseUp: function(e) {
		return $CommonClientLibraries_UIManager_Panel.prototype.onMouseUp.call(this, e);
	},
	onScroll: function(e) {
		return $CommonClientLibraries_UIManager_Panel.prototype.onScroll.call(this, e);
	},
	draw: function(canv) {
		this.width = ss.Int32.trunc(CommonLibraries.SizeNumber.op_Implicit(this.cellWidth));
		this.height = ss.Int32.trunc(CommonLibraries.SizeNumber.op_Implicit(this.cellHeight));
		$CommonClientLibraries_UIManager_Panel.prototype.draw.call(this, canv);
	}
};
$CommonClientLibraries_UIManager_TableCell.$ctor1 = function(width, height) {
	this.cellHeight = null;
	this.cellWidth = null;
	this.fullSize = false;
	this.rowSpan = 0;
	this.colSpan = 0;
	$CommonClientLibraries_UIManager_Panel.call(this, 0, 0, 0, 0);
	this.cellWidth = width;
	this.cellHeight = height;
	this.outline = true;
	this.fullSize = true;
};
$CommonClientLibraries_UIManager_TableCell.$ctor1.prototype = $CommonClientLibraries_UIManager_TableCell.prototype;
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.TableRow
var $CommonClientLibraries_UIManager_TableRow = function(height) {
	this.cells = null;
	this.$2$RowHeightField = null;
	$CommonClientLibraries_UIManager_Element.call(this, 0, 0);
	this.set_rowHeight(height);
	this.cells = [];
};
$CommonClientLibraries_UIManager_TableRow.prototype = {
	get_rowHeight: function() {
		return this.$2$RowHeightField;
	},
	set_rowHeight: function(value) {
		this.$2$RowHeightField = value;
	},
	get_table: function() {
		return Type.cast(this.parent, $CommonClientLibraries_UIManager_Table);
	},
	childrenAreEditing: function() {
		var ch = this.cells;
		for (var $t1 = 0; $t1 < ch.length; $t1++) {
			var t = ch[$t1];
			if (t.editorEngine.dragging || t.editorEngine.editing) {
				return true;
			}
			if (t.childrenAreEditing()) {
				return true;
			}
		}
		return false;
	},
	focus: function(e) {
		$CommonClientLibraries_UIManager_Element.prototype.focus.call(this, e);
	},
	loseFocus: function() {
		$CommonClientLibraries_UIManager_Element.prototype.loseFocus.call(this);
	},
	construct: function() {
		$CommonClientLibraries_UIManager_Element.prototype.construct.call(this);
	},
	onKeyDown: function(e) {
		return $CommonClientLibraries_UIManager_Element.prototype.onKeyDown.call(this, e);
	},
	onClick: function(e) {
		return $CommonClientLibraries_UIManager_Element.prototype.onClick.call(this, e);
	},
	onMouseOver: function(e) {
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseOver.call(this, e);
	},
	onMouseUp: function(e) {
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseUp.call(this, e);
	},
	onScroll: function(e) {
		return $CommonClientLibraries_UIManager_Element.prototype.onScroll.call(this, e);
	},
	draw: function(canv) {
		$CommonClientLibraries_UIManager_Element.prototype.draw.call(this, canv);
	},
	addCell: function(element) {
		element.parent = this;
		element.construct();
		this.cells.add(element);
		return element;
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.TextArea
var $CommonClientLibraries_UIManager_TextArea = function(x, y, text) {
	this.$oldText = null;
	this.text = null;
	this.font = null;
	this.color = null;
	$CommonClientLibraries_UIManager_Element.call(this, x, y);
	this.text = text;
	this.font = $CommonClientLibraries_UIManager_UIManager.textFont;
	this.color = 'black';
	this.$oldText = '';
};
$CommonClientLibraries_UIManager_TextArea.prototype = {
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		var txt = Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit(this.text);
		if (!ss.referenceEquals(canv.font, this.font)) {
			canv.font = this.font;
		}
		//var w = canv.MeasureText(txt).Width;
		//var h = int.Parse(canv.Font.Split("pt")[0]);
		//   canv.fillStyle = "rgba(255,255,255,0.78)";
		// var pad = 3;
		//     canv.fillRect(this.parent.x + this.x - pad, this.parent.y + this.y - h - pad, w + (pad * 2), h + (pad * 2));
		canv.fillStyle = this.color;
		canv.fillText(txt, this.get_totalX(), this.get_totalY());
	},
	construct: function() {
		$CommonClientLibraries_UIManager_Element.prototype.construct.call(this);
	},
	forceDrawing: function() {
		var txt = Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit(this.text);
		this.$cachedForceRedrawing.redraw = false;
		this.$cachedForceRedrawing.clearCache = false;
		if (ss.referenceEquals(txt, this.$oldText)) {
			this.$cachedForceRedrawing.redraw = true;
		}
		else {
			this.$oldText = txt;
			this.$cachedForceRedrawing.redraw = true;
			this.$cachedForceRedrawing.clearCache = true;
		}
		return this.$cachedForceRedrawing;
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.TextBox
var $CommonClientLibraries_UIManager_TextBox = function(x, y, width, height, text) {
	this.$blinkTick = 0;
	this.$blinked = false;
	this.$can = null;
	this.$oldText = null;
	this.textChanged = null;
	this.text = null;
	this.font = null;
	this.clicking = false;
	this.color = null;
	this.cursorPosition = 0;
	this.dragPosition = 0;
	this.drawTicks = 0;
	this.lastClickTick = 0;
	this.blinked = false;
	this.blinkTick = 0;
	this.button1Grad = null;
	this.button2Grad = null;
	this.buttonBorderGrad = null;
	this.can = false;
	$CommonClientLibraries_UIManager_Element.call(this, x, y);
	this.text = Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit(text);
	this.width = width;
	this.height = height;
	this.font = $CommonClientLibraries_UIManager_UIManager.textFont;
	this.dragPosition = -1;
};
$CommonClientLibraries_UIManager_TextBox.prototype = {
	construct: function() {
		$CommonClientLibraries_UIManager_Element.prototype.construct.call(this);
		var canv = $CommonClientLibraries_CanvasInformation.create$2(1, 1).context;
		this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);
		this.button1Grad.addColorStop(0, '#FFFFFF');
		this.button1Grad.addColorStop(1, '#A5A5A5');
		this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
		this.button2Grad.addColorStop(0, '#A5A5A5');
		this.button2Grad.addColorStop(1, '#FFFFFF');
		this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
		this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
		this.buttonBorderGrad.addColorStop(1, '#7a7a7a');
	},
	onKeyDown: function(e) {
		if (e.altKey) {
			return false;
		}
		if (this.focused) {
			if (e.ctrlKey) {
				if (e.keyCode === 65) {
					this.dragPosition = 0;
					this.cursorPosition = this.text.length;
				}
				else if (e.keyCode === 67) {
					// _H.copy_to_clipboard(this.text.substring(Math.min(this.cursorPosition, this.dragPosition), Math.max(this.cursorPosition, this.dragPosition)));
				}
				else if (e.keyCode === 88) {
					//  _H.copy_to_clipboard(this.text.substring(Math.min(this.cursorPosition, this.dragPosition), Math.max(this.cursorPosition, this.dragPosition)));
					this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
					this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
					this.dragPosition = -1;
				}
			}
			else if (e.keyCode === 37) {
				if (e.shiftKey) {
					if (this.dragPosition === -1) {
						this.dragPosition = this.cursorPosition;
					}
					this.cursorPosition = Math.max(this.cursorPosition - 1, 0);
				}
				else {
					this.dragPosition = -1;
					this.cursorPosition = Math.max(this.cursorPosition - 1, 0);
				}
			}
			else if (e.keyCode === 39) {
				if (e.shiftKey) {
					if (this.dragPosition === -1) {
						this.dragPosition = this.cursorPosition;
					}
					this.cursorPosition = Math.min(this.cursorPosition + 1, this.text.length);
				}
				else {
					this.dragPosition = -1;
					this.cursorPosition = Math.min(this.cursorPosition + 1, this.text.length);
				}
			}
			else {
				if (e.keyCode === 8) {
					if (this.dragPosition === -1) {
						this.text = this.text.substring(0, this.cursorPosition - 1) + this.text.substring(this.cursorPosition, this.text.length);
					}
					else {
						this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
					}
					if (this.dragPosition === -1) {
						if (this.cursorPosition > 0) {
							this.cursorPosition--;
						}
					}
					else {
						this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
					}
				}
				else if (e.keyCode === 46) {
					if (this.dragPosition === -1) {
						this.text = this.text.substring(0, this.cursorPosition) + this.text.substring(Math.min(this.cursorPosition + 1, this.text.length), this.text.length);
					}
					else {
						this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
					}
					if (this.dragPosition === -1) {
					}
					else {
						this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
					}
				}
				else {
					var m = e.keyCode;
					var t = String.fromCharCode(m);
					if (this.dragPosition === -1) {
						this.text = this.text.substring(0, this.cursorPosition) + t + this.text.substring(this.cursorPosition, this.text.length);
					}
					else {
						this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + t + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
					}
					if (this.dragPosition === -1) {
						this.cursorPosition++;
					}
					else {
						this.cursorPosition = Math.max(this.cursorPosition, this.dragPosition);
					}
				}
				this.dragPosition = -1;
			}
			if (ss.isValue(this.textChanged)) {
				this.textChanged();
			}
			e.preventDefault();
			return true;
		}
		return false;
	},
	forceDrawing: function() {
		var redraw = this.focused;
		if (!ss.referenceEquals(this.$oldText, this.text)) {
			this.$oldText = this.text;
			redraw = true;
		}
		this.$cachedForceRedrawing.redraw = redraw;
		return this.$cachedForceRedrawing;
	},
	onClick: function(e) {
		if (!this.visible) {
			return false;
		}
		this.clicking = true;
		this.$can.save();
		if (!ss.referenceEquals(this.$can.font, this.font)) {
			this.$can.font = this.font;
		}
		for (var i = 0; i < this.text.length; i++) {
			this.dragPosition = -1;
			var w = this.$can.measureText(this.text.substring(0, i)).width;
			if (w > e.x - 14) {
				this.cursorPosition = i;
				if (this.drawTicks - this.lastClickTick < 15) {
					this.$selectWord();
				}
				this.lastClickTick = this.drawTicks;
				return false;
			}
		}
		this.cursorPosition = this.text.length;
		if (this.drawTicks - this.lastClickTick < 20) {
			this.$selectWord();
		}
		this.lastClickTick = this.drawTicks;
		this.$can.restore();
		return $CommonClientLibraries_UIManager_Element.prototype.onClick.call(this, e);
	},
	$selectWord: function() {
		var j = this.text.split(' ');
		var pos = 0;
		for (var i = 0; i < j.length; i++) {
			if (this.cursorPosition < j[i].length + pos) {
				this.dragPosition = pos;
				this.cursorPosition = j[i].length + pos;
				return;
			}
			else {
				pos += j[i].length + 1;
			}
		}
		this.dragPosition = pos - j[j.length - 1].length;
		this.cursorPosition = this.text.length;
	},
	onMouseUp: function(e) {
		if (!this.visible) {
			return false;
		}
		if (this.clicking) {
		}
		this.clicking = false;
		if (ss.isValue(this.mouseUp)) {
			this.mouseUp(CommonLibraries.Point.$ctor1(e.x, e.y));
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseUp.call(this, e);
	},
	onMouseOver: function(e) {
		if (!this.visible) {
			return false;
		}
		document.body.style.cursor = 'text';
		if (this.clicking) {
			if (this.dragPosition === -1) {
				this.dragPosition = this.cursorPosition;
			}
			this.$can.save();
			if (!ss.referenceEquals(this.$can.font, this.font)) {
				this.$can.font = this.font;
			}
			for (var i = 0; i < this.text.length; i++) {
				var w = this.$can.measureText(this.text.substring(0, i)).width;
				if (w > e.x - 14) {
					this.cursorPosition = i;
					return false;
				}
			}
			this.$can.restore();
			this.cursorPosition = this.text.length;
		}
		if (ss.isValue(this.mouseOver)) {
			this.mouseOver(CommonLibraries.Point.$ctor1(e.x, e.y));
		}
		return $CommonClientLibraries_UIManager_Element.prototype.onMouseOver.call(this, e);
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		canv.save();
		if (!this.focused) {
			this.cursorPosition = -1;
			this.dragPosition = -1;
		}
		this.drawTicks++;
		this.$can = canv;
		canv.strokeStyle = this.buttonBorderGrad;
		canv.fillStyle = (this.clicking ? this.button1Grad : this.button2Grad);
		canv.lineWidth = 2;
		$CommonClientLibraries_UIManager_CHelp.roundRect(canv, this.get_totalX(), this.get_totalY(), this.width, this.height, 2, true, true);
		if (!ss.referenceEquals(canv.font, this.font)) {
			canv.font = this.font;
		}
		if (this.dragPosition !== -1) {
			canv.fillStyle = '#598AFF';
			var w1 = canv.measureText(this.text.substring(0, Math.min(this.dragPosition, this.cursorPosition))).width;
			var w2 = canv.measureText(this.text.substring(0, Math.max(this.dragPosition, this.cursorPosition))).width;
			canv.fillRect(this.get_totalX() + 8 + w1, this.get_totalY() + 3, w2 - w1, this.height - 7);
		}
		canv.fillStyle = '#000000';
		var hc;
		if (canv.font.indexOf('pt') !== -1) {
			hc = parseInt(canv.font.substr(0, canv.font.indexOf('pt')));
		}
		else {
			hc = parseInt(canv.font.substr(0, canv.font.indexOf('px')));
		}
		canv.fillText(this.text, this.get_totalX() + 8, this.get_totalY() + ss.Int32.div(this.height - hc, 2) + ss.Int32.div(this.height, 2));
		if (this.focused && this.$blinkTick++ % 35 === 0) {
			this.$blinked = !this.$blinked;
		}
		if (this.focused && this.$blinked) {
			canv.strokeStyle = '#000000';
			var w = canv.measureText(this.text.substring(0, this.cursorPosition)).width;
			canv.beginPath();
			canv.moveTo(this.get_totalX() + 8 + w, this.get_totalY() + 3);
			canv.lineTo(this.get_totalX() + 8 + w, this.get_totalY() + (this.height - 7));
			canv.lineWidth = 2;
			canv.stroke();
		}
		canv.restore();
		$CommonClientLibraries_UIManager_Element.prototype.draw.call(this, canv);
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.UIArea
var $CommonClientLibraries_UIManager_UIArea = function(x, y, width, height) {
	this.dragging = null;
	this.closable = false;
	$CommonClientLibraries_UIManager_Panel.call(this, x, y, width, height);
	this.closable = true;
	this.outline = false;
};
$CommonClientLibraries_UIManager_UIArea.prototype = {
	addControl: function(T) {
		return function(element) {
			var fm = $CommonClientLibraries_UIManager_Panel.prototype.addControl(T).call(this, element);
			fm.construct();
			return fm;
		};
	},
	construct: function() {
		if (this.closable) {
			var $t1 = new $CommonClientLibraries_UIManager_Button(this.width - 30, 4, 26, 23, Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('X'));
			$t1.font = $CommonClientLibraries_UIManager_UIManager.buttonFont;
			$t1.color = 'Green';
			$t1.click = Function.mkdel(this, function(p) {
				this.loseFocus();
				this.visible = false;
			});
			this.addControl($CommonClientLibraries_UIManager_Button).call(this, $t1);
		}
		$CommonClientLibraries_UIManager_Panel.prototype.construct.call(this);
	},
	onClick: function(e) {
		var base = $CommonClientLibraries_UIManager_Panel.prototype.onClick.call(this, e);
		if (!base && !this.isEditMode()) {
			this.dragging = CommonLibraries.Point.$ctor1(e.x, e.y);
		}
		return base;
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		canv.save();
		if (!this.cachedDrawing) {
			var cg = $CommonClientLibraries_CanvasInformation.create$2(this.width + 20, this.height + 20);
			var cv = cg.context;
			cv.translate(10, 10);
			var lingrad = cv.createLinearGradient(0, 0, 0, this.height);
			lingrad.addColorStop(0, 'rgba(220,220,220,0.85)');
			lingrad.addColorStop(1, 'rgba(142,142,142,0.85)');
			cv.fillStyle = lingrad;
			cv.strokeStyle = '#333';
			var xy = CommonLibraries.Point.$ctor1(this.x, this.y);
			this.x = 0;
			this.y = 0;
			var rad = 30;
			$CommonClientLibraries_UIManager_CHelp.roundRect(cv, this.x, this.y, this.width, this.height, rad, true, true);
			cv.beginPath();
			cv.moveTo(this.x, this.y + rad);
			cv.lineTo(this.x + this.width, this.y + rad);
			cv.lineWidth = 2;
			cv.strokeStyle = '#000000';
			cv.stroke();
			for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
				var t1 = this.controls[$t1];
				var good = t1.forceDrawing();
				if (good.redraw) {
					t1.draw(cv);
				}
			}
			this.x = xy.x;
			this.y = xy.y;
			this.cachedDrawing = cg;
		}
		this.$drawCache(canv);
		if (this.cachedDrawing.canvas.width !== this.width + 20 || this.cachedDrawing.canvas.height !== this.height + 20) {
			this.cachedDrawing = null;
		}
		for (var $t2 = 0; $t2 < this.controls.length; $t2++) {
			var t = this.controls[$t2];
			var good1 = t.forceDrawing();
			if (!good1.redraw) {
				t.draw(canv);
			}
			if (good1.clearCache) {
				this.cachedDrawing = null;
			}
		}
		canv.restore();
		$CommonClientLibraries_UIManager_Panel.prototype.draw.call(this, canv);
	},
	$drawCache: function(canv) {
		canv.drawImage(this.cachedDrawing.canvas, this.x - 10, this.y - 10);
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.UIArea
var $CommonClientLibraries_UIManager_UIArea$1 = function(T) {
	var $type = function(data, x, y, width, height) {
		this.data = T.getDefaultValue();
		$CommonClientLibraries_UIManager_UIArea.call(this, x, y, width, height);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $CommonClientLibraries_UIManager_UIArea$1, [T], function() {
		return $CommonClientLibraries_UIManager_UIArea;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'CommonClientLibraries.UIManager.UIArea$1', $CommonClientLibraries_UIManager_UIArea$1, 1);
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.UIManager
var $CommonClientLibraries_UIManager_UIManager = function() {
	this.$messages = [];
	this.uiAreas = null;
	this.canvasDepths = null;
	this.$1$UIManagerAreasField = null;
	$CommonClientLibraries_UIManager_UIManager.instance = this;
	this.uiAreas = [];
	this.set_uiManagerAreas(new $CommonClientLibraries_UIManager_UIManagerAreas());
	this.updateDepth();
};
$CommonClientLibraries_UIManager_UIManager.prototype = {
	get_uiManagerAreas: function() {
		return this.$1$UIManagerAreasField;
	},
	set_uiManagerAreas: function(value) {
		this.$1$UIManagerAreasField = value;
	},
	onClick: function(cell) {
		var goodArea = null;
		var cl = Enumerable.from(this.uiAreas).orderBy(function(f) {
			return -f.get_depth();
		}).toArray();
		for (var $t1 = 0; $t1 < cl.length; $t1++) {
			var are = cl[$t1];
			if (are.visible && (are.isEditMode() ? (are.y - are.editorEngine.maxSize() <= cell.y && are.y + are.editorEngine.maxSize() + are.height > cell.y && are.x - are.editorEngine.maxSize() <= cell.x && are.x + are.editorEngine.maxSize() + are.width > cell.x) : (are.y <= cell.y && are.y + are.height > cell.y && are.x <= cell.x && are.x + are.width > cell.x))) {
				goodArea = are;
				var ec = $CommonClientLibraries_UIManager_Pointer.$ctor1(cell.x - are.x, cell.y - are.y, 0, cell.right);
				are.onClick(ec);
				break;
			}
		}
		if (goodArea) {
			for (var $t2 = 0; $t2 < this.uiAreas.length; $t2++) {
				var are1 = this.uiAreas[$t2];
				if (ss.referenceEquals(goodArea, are1)) {
					are1.set_depth(1);
					are1.focus(cell);
				}
				else if (are1.visible) {
					are1.set_depth(0);
					are1.loseFocus();
				}
			}
			return true;
		}
		else {
			for (var $t3 = 0; $t3 < this.uiAreas.length; $t3++) {
				var are2 = this.uiAreas[$t3];
				if (are2.visible) {
					are2.set_depth(0);
					are2.loseFocus();
				}
			}
		}
		return false;
	},
	onMouseMove: function(cell) {
		var cl = Enumerable.from(this.uiAreas).orderBy(function(f) {
			return -f.get_depth();
		}).toArray();
		for (var $t1 = 0; $t1 < cl.length; $t1++) {
			var are = cl[$t1];
			if (are.dragging || are.isEditMode() || are.visible && are.y <= cell.y && are.y + are.height > cell.y && are.x <= cell.x && are.x + are.width > cell.x) {
				var cell2 = $CommonClientLibraries_UIManager_Pointer.$ctor1(cell.x - are.x, cell.y - are.y, 0, cell.right);
				return are.onMouseOver(cell2);
			}
		}
		return false;
	},
	onMouseUp: function(cell) {
		for (var $t1 = 0; $t1 < this.uiAreas.length; $t1++) {
			var are = this.uiAreas[$t1];
			var ec = $CommonClientLibraries_UIManager_Pointer.$ctor1(cell.x - are.x, cell.y - are.y, 0, cell.right);
			are.onMouseUp(ec);
		}
	},
	onMouseScroll: function(e) {
		var delta = ss.Nullable.unbox(Type.cast((!!e.wheelDelta ? (e.wheelDelta / 40) : (!!e.detail ? -e.detail : 0)), ss.Int32));
		var cell = $CommonClientLibraries_UIManager_CHelp.getCursorPosition(e);
		for (var $t1 = 0; $t1 < this.uiAreas.length; $t1++) {
			var are = this.uiAreas[$t1];
			if (are.visible && are.y <= cell.y && are.y + are.height > cell.y && are.x <= cell.x && are.x + are.width > cell.x) {
				var cell2 = $CommonClientLibraries_UIManager_Pointer.$ctor1(cell.x - are.x, cell.y - are.y, delta, cell.right);
				return are.onScroll(cell2);
			}
		}
		return false;
	},
	onKeyDown: function(jQueryEvent) {
		for (var $t1 = 0; $t1 < this.uiAreas.length; $t1++) {
			var are = this.uiAreas[$t1];
			if (are.onKeyDown(jQueryEvent)) {
				return true;
			}
		}
		return false;
	},
	addArea: function(uiArea) {
		uiArea.construct();
		this.uiAreas.add(uiArea);
		this.updateDepth();
	},
	updateDepth: function() {
		this.canvasDepths = Enumerable.from(this.uiAreas).orderBy(function(f) {
			return f.get_depth();
		}).toArray();
	},
	draw: function(canvas) {
		canvas.save();
		for (var $t1 = 0; $t1 < this.canvasDepths.length; $t1++) {
			var are = this.canvasDepths[$t1];
			are.draw(canvas);
		}
		if (true) {
			for (var i = 0; i < this.$messages.length; i++) {
				canvas.fillText(this.$messages[i], 10, 25 + i * 30);
			}
		}
		canvas.restore();
	}
};
$CommonClientLibraries_UIManager_UIManager.get_curLevelName = function() {
	return $CommonClientLibraries_UIManager_UIManager.$_curLevelName;
};
$CommonClientLibraries_UIManager_UIManager.set_curLevelName = function(value) {
	$CommonClientLibraries_UIManager_UIManager.updateTitle('- Our Sonic - ' + value);
	$CommonClientLibraries_UIManager_UIManager.$_curLevelName = value;
};
$CommonClientLibraries_UIManager_UIManager.updateTitle = function(title) {
	document.title = title;
};
////////////////////////////////////////////////////////////////////////////////
// CommonClientLibraries.UIManager.UIManagerAreas
var $CommonClientLibraries_UIManager_UIManagerAreas = function() {
};
Type.registerClass(global, 'CommonClientLibraries.CanvasInformation', $CommonClientLibraries_CanvasInformation, Object);
Type.registerClass(global, 'CommonClientLibraries.UIManager.CHelp', $CommonClientLibraries_UIManager_CHelp, Object);
Type.registerClass(global, 'CommonClientLibraries.UIManager.EditorEngine', $CommonClientLibraries_UIManager_EditorEngine, Object);
Type.registerClass(global, 'CommonClientLibraries.UIManager.EditorEnginePoint', $CommonClientLibraries_UIManager_EditorEnginePoint, Object);
Type.registerClass(global, 'CommonClientLibraries.UIManager.Element', $CommonClientLibraries_UIManager_Element, Object);
Type.registerClass(global, 'CommonClientLibraries.UIManager.Element$ForceRedrawing', $CommonClientLibraries_UIManager_Element$ForceRedrawing, Object);
Type.registerClass(global, 'CommonClientLibraries.UIManager.HScrollBox', $CommonClientLibraries_UIManager_HScrollBox, $CommonClientLibraries_UIManager_Element);
Type.registerClass(global, 'CommonClientLibraries.UIManager.HtmlBox', $CommonClientLibraries_UIManager_HtmlBox, $CommonClientLibraries_UIManager_Element);
Type.registerClass(global, 'CommonClientLibraries.UIManager.Image', $CommonClientLibraries_UIManager_Image, $CommonClientLibraries_UIManager_Element);
Type.registerClass(global, 'CommonClientLibraries.UIManager.ImageButton', $CommonClientLibraries_UIManager_ImageButton, $CommonClientLibraries_UIManager_Element);
Type.registerClass(global, 'CommonClientLibraries.UIManager.Panel', $CommonClientLibraries_UIManager_Panel, $CommonClientLibraries_UIManager_Element);
Type.registerClass(global, 'CommonClientLibraries.UIManager.Pointer', $CommonClientLibraries_UIManager_Pointer);
Type.registerClass(global, 'CommonClientLibraries.UIManager.PropertyButton', $CommonClientLibraries_UIManager_PropertyButton, $CommonClientLibraries_UIManager_Element);
Type.registerClass(global, 'CommonClientLibraries.UIManager.ScrollBox', $CommonClientLibraries_UIManager_ScrollBox, $CommonClientLibraries_UIManager_Element);
Type.registerClass(global, 'CommonClientLibraries.UIManager.Table', $CommonClientLibraries_UIManager_Table, $CommonClientLibraries_UIManager_Element);
Type.registerClass(global, 'CommonClientLibraries.UIManager.TableCell', $CommonClientLibraries_UIManager_TableCell, $CommonClientLibraries_UIManager_Panel);
Type.registerClass(global, 'CommonClientLibraries.UIManager.TableRow', $CommonClientLibraries_UIManager_TableRow, $CommonClientLibraries_UIManager_Element);
Type.registerClass(global, 'CommonClientLibraries.UIManager.TextArea', $CommonClientLibraries_UIManager_TextArea, $CommonClientLibraries_UIManager_Element);
Type.registerClass(global, 'CommonClientLibraries.UIManager.TextBox', $CommonClientLibraries_UIManager_TextBox, $CommonClientLibraries_UIManager_Element);
Type.registerClass(global, 'CommonClientLibraries.UIManager.UIArea', $CommonClientLibraries_UIManager_UIArea, $CommonClientLibraries_UIManager_Panel);
Type.registerClass(global, 'CommonClientLibraries.UIManager.UIManager', $CommonClientLibraries_UIManager_UIManager, Object);
Type.registerClass(global, 'CommonClientLibraries.UIManager.UIManagerAreas', $CommonClientLibraries_UIManager_UIManagerAreas, Object);
Type.registerClass(global, 'CommonClientLibraries.UIManager.Button', $CommonClientLibraries_UIManager_Button, $CommonClientLibraries_UIManager_Element);
$CommonClientLibraries_CanvasInformation.$blackPixel = null;
$CommonClientLibraries_UIManager_UIManager.smallTextFont = '8pt Calibri ';
$CommonClientLibraries_UIManager_UIManager.buttonFont = '12pt Calibri ';
$CommonClientLibraries_UIManager_UIManager.smallButtonFont = '13pt Arial bold ';
$CommonClientLibraries_UIManager_UIManager.textFont = '11pt Arial bold ';
$CommonClientLibraries_UIManager_UIManager.$_curLevelName = null;
$CommonClientLibraries_UIManager_UIManager.instance = null;
